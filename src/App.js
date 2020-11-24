import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import Gallery from './Gallery';
import ImageDetails from './ImageDetails';
import arrayMove from 'array-move';

const LoggedInBar = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #333;
`;

const LoginForm = styled.form`
    width: 100%;
    max-width: 500px;
    padding: 20px;
    margin: 0 auto;
`;

const FormInput = styled.input`
    display: block;
    width: 100%;
    height: 40px;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #999;
    background: #fff;
`;

const LoginButton = styled.button`
    width: 100%;
    height: 40px;
`;

const StyledLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    margin-top: 20px;
    color: #fff;
`;

const firebaseConfig = {
    apiKey: 'AIzaSyBPG6_rLNCqJKQaQxRxoL9kiNRrst_SGng',
    authDomain: 'necgallery-9b4b2.firebaseapp.com',
    databaseURL: 'https://necgallery-9b4b2.firebaseio.com',
    projectId: 'necgallery-9b4b2',
    storageBucket: 'necgallery-9b4b2.appspot.com',
    messagingSenderId: '534201773677',
    appId: '1:534201773677:web:57fa8d6f25817e60155964',
};

firebase.initializeApp(firebaseConfig);

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    function getImagesFromDb() {
        galleryCollection
            .orderBy('order')
            .get()
            .then((querySnapshot) => {
                setImages(imagesFromDBArray(querySnapshot));
            });
    }

    function updateDescription({ id, description }) {
        galleryCollection.doc(id).update({ description });
        getImagesFromDb();
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
                // File deleted successfully
                console.log('successfully deleted images');
                getImagesFromDb();
            })
            .catch(function (error) {
                // Uh-oh, an error occurred!
                console.log(error);
            });
    }

    function signIn(event) {
        event.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(errorMessage);
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

    function imagesFromDBArray(querySnapshot) {
        const imagesFromDb = [];

        querySnapshot.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();
            imagesFromDb.push({ id, ...data });
        });

        return imagesFromDb;
    }

    useEffect(() => {
        getImagesFromDb();

        galleryCollection.onSnapshot((querySnapshot) => {
            const fromDB = imagesFromDBArray(querySnapshot);

            const maxSortOrder = Math.max(...fromDB.map(({ order }) => order));
            const notOrdered = fromDB.find(({ order }) => order === -1);

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

    console.log(user);

    return (
        <AppContext.Provider value={{ user }}>
            {user && (
                <LoggedInBar>
                    <span>Du er logget ind</span>
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
                                user={user}
                                signOut={signOut}
                                uploadProgress={uploadProgress}
                                handleSortEnd={handleSortEnd}
                                shouldCancelStart={shouldCancelStart}
                            ></Gallery>
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
                                    <ImageDetails
                                        {...props}
                                        image={image}
                                        removeImage={removeImage}
                                        updateDescription={updateDescription}
                                        user={user}
                                    />
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
                                <LoginForm onSubmit={signIn}>
                                    <FormInput
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                    <FormInput
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <LoginButton>Log ind</LoginButton>
                                    <StyledLink to="/nec">Tilbage</StyledLink>
                                </LoginForm>
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
