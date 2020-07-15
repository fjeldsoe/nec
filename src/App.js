import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/firestore';
import Gallery from './Gallery';
import ImageDetails from './ImageDetails';
import arrayMove from 'array-move';

const LoggedInBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #999;
`;

const config = {
    apiKey: 'AIzaSyBPG6_rLNCqJKQaQxRxoL9kiNRrst_SGng',
    authDomain: 'necgallery-9b4b2.firebaseapp.com',
    databaseURL: 'https://necgallery-9b4b2.firebaseio.com',
    projectId: 'necgallery-9b4b2',
    storageBucket: 'necgallery-9b4b2.appspot.com',
    messagingSenderId: '534201773677',
};

firebase.initializeApp(config);

const db = firebase.firestore();
const galleryCollection = db.collection('gallery');
const storage = firebase.storage();
const storageRef = storage.ref();
export const AppContext = createContext();

function upload(images, setUploadProgress) {
    return Promise.all(
        images.map((image) => {
            return new Promise((resolve, reject) => {
                const id = uuidv4();

                const imageRef = storageRef.child(`gallery/${id}/original.jpg`);
                const uploadTask = imageRef.put(image);
                uploadTask.on('state_changed', function uploadProgress(snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                });
                uploadTask
                    .then((snapshot) => {
                        resolve({ ...snapshot, id });
                    })
                    .catch((err) => {
                        reject(new Error(err.message_));
                    });
            });
        })
    ).catch((err) => {
        alert(err);
    });
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
            dataTransfer: { files = {} },
        } = event;

        const images = Object.values(files).reduce((acc, file) => {
            return file.type.includes('image') ? [...acc, file] : acc;
        }, []);

        upload(images, setUploadProgress);
    }

    function shouldCancelStart() {
        return user !== false ? false : true;
    }

    function handleSortEnd({ oldIndex, newIndex }) {
        setImages((imagesArray) => arrayMove(imagesArray, oldIndex, newIndex));
    }

    function removeImage(image) {
        const sure = window.confirm('Er du sikker på du vil slette billedet?');

        if (!sure) {
            return;
        }

        const { id, downloadUrls } = image;
        const keys = downloadUrls.map((obj) => {
            const [key] = Object.keys(obj);
            return key;
        });
        Promise.all([keys.map((key) => deleteImageRef(`gallery/${id}/${key}.jpg`)), deleteDocRef(id)])
            .then(function () {
                console.log('successfully deleted images');
                // File deleted successfully
            })
            .catch(function (error) {
                console.log(error);
                // Uh-oh, an error occurred!
            });
    }

    async function signOut() {
        await firebase.auth().signOut();
        setUser(false);
    }

    // Check login status
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUser(user);
            }
        });

        return () => {
            unregisterAuthObserver();
        };
    }, []);

    useEffect(() => {
        galleryCollection
            .orderBy('order')
            .get()
            .then((querySnapshot) => {
                const imagesFromDb = [];

                querySnapshot.forEach((doc) => {
                    const id = doc.id;
                    const data = doc.data();
                    imagesFromDb.push({ id, ...data });
                });

                setImages(imagesFromDb);
            });

        galleryCollection.onSnapshot((querySnapshot) => {
            const test = [];

            querySnapshot.forEach((doc) => {
                const id = doc.id;
                const data = doc.data();
                test.push({ id, ...data });
            });

            const maxSortOrder = Math.max(...test.map(({ order }) => order));
            const notOrdered = test.find(({ order }) => order === -1);

            if (notOrdered) {
                setImages((imagesArray) => [...imagesArray, { ...notOrdered, order: maxSortOrder + 1 }]);
            }
        });

        document.addEventListener('drop', onDropHandler);
        document.addEventListener('dragover', onDragoverHandler);

        return () => {
            document.removeEventListener('drop', onDropHandler);
            document.removeEventListener('dragover', onDragoverHandler);
        };
    }, []);

    useEffect(() => {
        if (user) {
            const batch = db.batch();
            Object.entries(images).forEach(([key, val]) => {
                const { id } = val;
                const docRef = galleryCollection.doc(id);
                batch.update(docRef, { order: parseInt(key) });
            });
            batch.commit().then(() => {
                console.log('committed batch');
            });
        }
    }, [user, images]);

    return (
        <AppContext.Provider value={{ user }}>
            {user && (
                <LoggedInBar>
                    <span>Hej {user.displayName}</span>
                    <button onClick={signOut}>Log ud</button>
                </LoggedInBar>
            )}
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/nec"
                        render={(props) => (
                            <Gallery
                                {...props}
                                images={images}
                                uploadProgress={uploadProgress}
                                handleSortEnd={handleSortEnd}
                                shouldCancelStart={shouldCancelStart}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/nec/image/:id"
                        render={(props) => {
                            if (images.length) {
                                const id = props.match.params.id;
                                const image = images.find((image) => image.id === id);
                                return image ? (
                                    <ImageDetails {...props} image={image} removeImage={removeImage} />
                                ) : (
                                    <Redirect to="/nec" />
                                );
                            }
                        }}
                    />
                    <Route
                        exact
                        path="/nec/login"
                        render={() =>
                            user === false ? (
                                <StyledFirebaseAuth
                                    uiConfig={{
                                        signInFlow: 'popup',
                                        signInSuccessUrl: '/nec',
                                        signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
                                    }}
                                    firebaseAuth={firebase.auth()}
                                />
                            ) : (
                                <Redirect to="/nec" />
                            )
                        }
                    />
                    <Redirect to="/nec" />
                </Switch>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
