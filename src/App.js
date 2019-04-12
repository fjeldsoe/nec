import React, { Component } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import firebase from 'firebase';
import 'firebase/firestore';
import { resolve } from 'path';

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
const storage = firebase.storage();
const storageRef = storage.ref();

readDb();

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

        console.log(id, downloadUrl);
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

function readDb() {
    galleryCollection.get().then(snapshot => {
        console.log(snapshot);
    });
}

function onDragoverHandler(event) {
    event.preventDefault();
}

function upload(images) {
    return Promise.all(
        images.map(image => {
            return new Promise(resolve => {
                const id = uuid();
                const imageRef = storageRef.child(`gallery/${id}.jpg`);
                imageRef.put(image).then(snapshot => {
                    resolve({ ...snapshot, id });
                });
            });
        })
    );
}

document.addEventListener('drop', onDropHandler);
document.addEventListener('dragover', onDragoverHandler);

const Wrapper = styled.div``;

function App() {
    return <Wrapper className="App"> React app </Wrapper>;
}

export default App;
