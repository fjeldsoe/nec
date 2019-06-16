const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const mkdirp = require('mkdirp-promise');
const path = require('path');
const os = require('os');
const fs = require('fs');
const admin = require('firebase-admin');
const vision = require('@google-cloud/vision');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://necgallery-9b4b2.firebaseio.com'
});

const { join, dirname } = path;

const runtimeOpts = {
    timeoutSeconds: 300,
    memory: '1GB'
};

// // Create and Deploy Your First Cloud Functions
exports.optimizeImages = functions
    .runWith(runtimeOpts)
    .storage.object()
    .onFinalize(async data => {
        // Exit if this is triggered on a file that is not an image.
        if (!data.contentType.startsWith('image/')) {
            console.log('This is not an image.');
            return false;
        }

        // Exit if this is a move or deletion event.
        if (data.resourceState === 'not_exists') {
            console.log('This is a deletion event.');
            return false;
        }

        // Exit if file exists but is not new and is only being triggered
        // because of a metadata change.
        if (data.resourceState === 'exists' && data.metageneration > 1) {
            console.log('This is a metadata change event.');
            return false;
        }

        // File and directory paths.
        const filePath = data.name;
        const sourceFileName = data.name.split('/').pop();
        const tempWorkingDir = path.join(os.tmpdir(), 'workingDir');
        const tempSourceFile = path.join(tempWorkingDir, sourceFileName);
        const bucketDir = dirname(filePath);
        const id = bucketDir.split('/').pop();

        // Cloud Storage files.
        const bucket = gcs.bucket(data.bucket);
        const file = bucket.file(filePath);
        const [metadata] = await file.getMetadata();

        if (metadata.metadata && metadata.metadata.optimized) {
            return new Error('Image has been already optimized');
        }

        const visionData = {};

        try {
            const imagePath = 'gs://' + join(data.bucket, data.name);
            const client = new vision.ImageAnnotatorClient();
            const [labelResult] = await client.labelDetection(imagePath);
            const [colorResult] = await client.imageProperties(imagePath);
            visionData.labels = labelResult.labelAnnotations;
            visionData.colors = colorResult.imagePropertiesAnnotation.dominantColors.colors;
        } catch (err) {
            console.log('Vision error: ', err);
        }

        const sizes = ['400x400>', '600x600>', '800x800>', '1000x1000>', '2000x2000>'];

        await mkdirp(tempWorkingDir);
        await file.download({ destination: tempSourceFile });
        const [...urls] = await Promise.all(
            sizes.map(async size => {
                return new Promise(async resolve => {
                    const optimizedFileName = `${size.split('>')[0]}.jpg`;
                    const tempOptimizedFile = join(tempWorkingDir, optimizedFileName);
                    await spawn('convert', [
                        tempSourceFile,
                        '-geometry',
                        size,
                        '-gravity',
                        'center',
                        '-strip',
                        '-interlace',
                        'Plane',
                        '-quality',
                        '90',
                        tempOptimizedFile
                    ]);
                    const [file] = await bucket.upload(tempOptimizedFile, {
                        destination: join(bucketDir, optimizedFileName),
                        metadata: {
                            metadata: {
                                optimized: true
                            }
                        }
                    });
                    file.getSignedUrl({ action: 'read', expires: '01-01-2100' }, (err, url) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        resolve({ [size.split('>')[0]]: url });
                    });
                });
            })
        );

        const db = admin.firestore();

        await db
            .collection('gallery')
            .doc(id)
            .set({
                downloadUrls: urls,
                metadata: { ...metadata, visionData }
            });

        try {
            await file.delete();
        } catch (err) {
            console.log('file.delete() failed: ', err);
        }

        return fs.unlinkSync(tempSourceFile);
    });
