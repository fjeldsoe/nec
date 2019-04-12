import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import firebase from 'firebase';
import 'firebase/firestore';
import Gallery from './Gallery';

const config = {
    apiKey: 'AIzaSyDHmbdXOUwR8oEHREt-Qc1Pwe6CQYrcQx0',
    authDomain: 'necgallery-9b4b2.firebaseapp.com',
    databaseURL: 'https://necgallery-9b4b2.firebaseio.com',
    projectId: 'necgallery-9b4b2',
    storageBucket: 'necgallery-9b4b2.appspot.com',
    messagingSenderId: '534201773677'
};

firebase.initializeApp(config);

const db = firebase.firestore();
const galleryCollection = db.collection('gallery');
const getGalleryCollection = galleryCollection.get();
const storage = firebase.storage();
const storageRef = storage.ref();

function onDropHandler(event) {
    event.preventDefault();

    const {
        dataTransfer: { files = {} }
    } = event;

    const images = Object.values(files).reduce((acc, file) => {
        return file.type.includes('image') ? [...acc, file] : acc;
    }, []);

    upload(images)
        .then(getDownloadURLs)
        .then(addToDb);
}

function uploadProgress(snapshot) {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
}

function upload(images) {
    return Promise.all(
        images.map(image => {
            return new Promise(resolve => {
                const id = uuid();
                const imageRef = storageRef.child(`gallery/${id}.jpg`);
                const uploadTask = imageRef.put(image);
                uploadTask.on('state_changed', uploadProgress);
                uploadTask.then(snapshot => {
                    resolve({ ...snapshot, id });
                });
            });
        })
    );
}

function getDownloadURLs(snapshots) {
    return Promise.all(
        snapshots.map(snapshot => {
            return new Promise(resolve => {
                snapshot.ref.getDownloadURL().then(downloadUrl => {
                    resolve({ ...snapshot, downloadUrl });
                });
            });
        })
    );
}

function addToDb(imagesData) {
    imagesData.forEach(imageData => {
        const {
            id,
            downloadUrl,
            metadata: { bucket, md5Hash, name, size, timeCreated, updated }
        } = imageData;

        galleryCollection.doc(id).set({
            downloadUrl,
            metadata: {
                bucket,
                md5Hash,
                name,
                size,
                timeCreated,
                updated
            }
        });
    });
}

function onDragoverHandler(event) {
    event.preventDefault();
}

function App() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function waitForDb() {
            const querySnapshot = await getGalleryCollection;
            const imagesFromDb = [];
            querySnapshot.forEach(doc => {
                const id = doc.id;
                const data = doc.data();
                imagesFromDb.push({ id, ...data });
            });
            setImages(imagesFromDb);
        }

        waitForDb();

        galleryCollection.onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.data());
            });
        });

        document.addEventListener('drop', onDropHandler);
        document.addEventListener('dragover', onDragoverHandler);
    }, []);

    return <Gallery images={images} />;
}

export default App;
