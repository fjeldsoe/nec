import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import uuid from 'uuid/v4';
import firebase from 'firebase';
import 'firebase/firestore';
import Gallery from './Gallery';
import ImageDetails from './ImageDetails';

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

function upload(images, setUploadProgress) {
    return Promise.all(
        images.map(image => {
            return new Promise(resolve => {
                const id = uuid();
                const imageRef = storageRef.child(`gallery/${id}.jpg`);
                const uploadTask = imageRef.put(image);
                uploadTask.on('state_changed', function uploadProgress(snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                });
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

function deleteDocRef(id) {
    return galleryCollection.doc(id).delete();
}

function deleteImageRef(id) {
    return storageRef.child(`gallery/${id}.jpg`).delete();
}

function App() {
    const [images, setImages] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    function onDropHandler(event) {
        event.preventDefault();

        const {
            dataTransfer: { files = {} }
        } = event;

        const images = Object.values(files).reduce((acc, file) => {
            return file.type.includes('image') ? [...acc, file] : acc;
        }, []);

        upload(images, setUploadProgress)
            .then(getDownloadURLs)
            .then(addToDb);
    }

    function removeImage(image) {
        const { id } = image;

        Promise.all([deleteImageRef(id), deleteDocRef(id)])
            .then(function() {
                console.log('success');
                // File deleted successfully
            })
            .catch(function(error) {
                console.log(error);
                // Uh-oh, an error occurred!
            });
    }

    useEffect(() => {
        galleryCollection.onSnapshot(function(querySnapshot) {
            const imagesFromDb = [];
            querySnapshot.forEach(function(doc) {
                const id = doc.id;
                const data = doc.data();
                imagesFromDb.push({ id, ...data });
            });
            setImages(imagesFromDb);
        });

        document.addEventListener('drop', onDropHandler);
        document.addEventListener('dragover', onDragoverHandler);
    }, []);

    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={props => <Gallery {...props} images={images} uploadProgress={uploadProgress} />}
                />
                <Route
                    exact
                    path="/:id"
                    render={props => {
                        if (images.length) {
                            const id = props.match.params.id;
                            const image = images.find(image => image.id === id);
                            return image ? (
                                <ImageDetails {...props} image={image} removeImage={removeImage} />
                            ) : (
                                <Redirect to="/" />
                            );
                        } else {
                            return <div>Vent venligst...</div>;
                        }
                    }}
                />
                <Route render={() => <div>Siden findes ikke :(</div>} />
            </Switch>
        </Router>
    );
}

export default App;
