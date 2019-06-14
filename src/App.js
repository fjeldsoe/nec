import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import uuid from 'uuid/v4';
import firebase from 'firebase';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
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
                const imageRef = storageRef.child(`gallery/${id}/original.jpg`);
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

function onDragoverHandler(event) {
    event.preventDefault();
}

function deleteDocRef(id) {
    return galleryCollection.doc(id).delete();
}

function deleteImageRef(path) {
    return storageRef.child(path).delete();
}

function App() {
    const [images, setImages] = useState([]);
    const [user, setUser] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    function onDropHandler(event) {
        event.preventDefault();

        const {
            dataTransfer: { files = {} }
        } = event;

        const images = Object.values(files).reduce((acc, file) => {
            return file.type.includes('image') ? [...acc, file] : acc;
        }, []);

        upload(images, setUploadProgress);
    }

    function removeImage(image) {
        const { id, downloadUrls } = image;
        const keys = downloadUrls.map(obj => {
            const [key] = Object.keys(obj);
            return key;
        });
        Promise.all([keys.map(key => deleteImageRef(`gallery/${id}/${key}.jpg`)), deleteDocRef(id)])
            .then(function() {
                console.log('success');
                // File deleted successfully
            })
            .catch(function(error) {
                console.log(error);
                // Uh-oh, an error occurred!
            });
    }

    // Check login status
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUser(user);
                console.log(user);
            }
        });

        return () => {
            unregisterAuthObserver();
        };
    }, []);

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
                    path="/image/:id"
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
                            return <Redirect to="/" />;
                        }
                    }}
                />
                <Route
                    exact
                    path="/login"
                    render={() =>
                        user === false ? (
                            <StyledFirebaseAuth
                                uiConfig={{
                                    signInFlow: 'popup',
                                    signInSuccessUrl: '/',
                                    signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID]
                                }}
                                firebaseAuth={firebase.auth()}
                            />
                        ) : (
                            <Redirect to="/" />
                        )
                    }
                />
                {/* <Route render={() => <Redirect to="/" />} /> */}
            </Switch>
        </Router>
    );
}

export default App;
