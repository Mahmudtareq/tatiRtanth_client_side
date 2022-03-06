import React, { useState } from 'react';
import { GoogleAuthProvider, getAuth,signInWithPopup } from "firebase/auth";
import initializeAuthentication from '../Firebase/firebase.init';
initializeAuthentication();

const useFirebase = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [cartProducts, setCartProducts] = useState([]);
    const [userOrder, setUserOrder] = useState({});
    // const [ isUser, setIsUser] = useState({});
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                // const destination = location?.state?.from || '/'
                // history.replace(destination);
                console.log(user);
    
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });

    }
    return {
        signInWithGoogle,
        user: [loggedInUser, setLoggedInUser],
        products: [cartProducts, setCartProducts],
        order: [userOrder, setUserOrder],


    }
};

export default useFirebase;