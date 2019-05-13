const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const mkdirp = require('mkdirp-promise');
const path = require('path');
const os = require('os');
const fs = require('fs');
const admin = require('firebase-admin');

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
        const tempLocalFile = path.join(os.tmpdir(), filePath);
        const tempLocalDir = path.dirname(tempLocalFile);
        const bucketDir = dirname(filePath);
        const id = bucketDir.split('/').pop();

        // Cloud Storage files.
        const bucket = gcs.bucket(data.bucket);
        const file = bucket.file(filePath);
        const [metadata] = await file.getMetadata();

        if (metadata.metadata && metadata.metadata.optimized) {
            return new Error('Image has been already optimized');
        }

        var db = admin.firestore();

        const sizes = ['400x400>', '600x600>', '800x800>', '1000x1000>'];

        await mkdirp(tempLocalDir);
        await file.download({ destination: tempLocalFile });
        const [...urls] = await Promise.all(
            sizes.map(async size => {
                return new Promise(async resolve => {
                    await spawn('convert', [
                        tempLocalFile,
                        '-geometry',
                        size,
                        '-gravity',
                        'center',
                        '-strip',
                        '-interlace',
                        'Plane',
                        '-quality',
                        '90',
                        tempLocalFile
                    ]);
                    const [file] = await bucket.upload(tempLocalFile, {
                        destination: join(bucketDir, size.split('>')[0]),
                        metadata: {
                            metadata: {
                                optimized: true
                            }
                        }
                    });
                    file.getSignedUrl({ action: 'read', expires: '03-17-2025' }, (err, url) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        resolve({ [size.split('>')[0]]: url });
                    });
                });
            })
        );

        await db
            .collection('gallery')
            .doc(id)
            .set({
                downloadUrls: urls,
                metadata
            });

        return fs.unlinkSync(tempLocalFile);
    });
