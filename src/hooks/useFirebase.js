import React, { useState } from 'react';
import { showNotification } from "../utils/notifications";
import { GoogleAuthProvider, getAuth,signInWithPopup , RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
import initializeAuthentication from '../Firebase/firebase.init';
initializeAuthentication();

const useFirebase = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [cartProducts, setCartProducts] = useState([]);
    const [userOrder, setUserOrder] = useState({});
    const [error, setError] = useState('');
    // const [ isUser, setIsUser] = useState({});
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    const signInWithGoogle = (location,history) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                  console.log(user);
                setError('');
                setLoggedInUser(user);
                // const destination = location?.state?.from || '/'
                // history.replace(destination);
                // let destination = location.state || { from: { pathname: "/" } };
                // history.replace(destination);
                const destination = location?.state?.from || '/'
                history.replace(destination);
                showNotification("Logged in Successfully!");
              
    
            }).catch((error) => {
                setError(error.message);
            });

    }

    // phone otp verification
    const setUpRecaptcha = (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      auth);
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, number, recaptchaVerifier); 
  }

    return {
        signInWithGoogle,
        user: [loggedInUser, setLoggedInUser],
        products: [cartProducts, setCartProducts],
        order: [userOrder, setUserOrder],
        setUpRecaptcha,
        error,
    }
};

export default useFirebase;