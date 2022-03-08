import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
// import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { GET_USER_INFO_CALL, SIGNIN_CALL } from "../../requests/services";
import { showNotification } from "../../utils/notifications";
import ForgotPassword from "./ForgotPassword";
import { SignInContainer, SignInFormContainer } from "./SignIn.style";
import { Link } from "react-router-dom";

const SignInContent = () => {
  // const { register, handleSubmit } = useForm();
  const history = useHistory();
  const location = useLocation();
  // let { from } = location.state || { from: { pathname: "/" } };
  // const { user, products,signInWithGoogle } = useContext(UserContext);
  const { user,signInWithGoogle ,products, signInWithFacebook} = useAuth();
  const [loggedInUser, setLoggedInUser] = user;
  const [error, setError] = useState(null);
  const [showForgetPass, setShowForgetPass] = useState(false);

  // const onSubmit = (data, e) => {
  //   console.log(data);
  //   if (data.phone.length >= 11 && data.password.length >= 4) {
  //     SIGNIN_CALL(data)
  //       .then((response) => {
  //         if (response.data) {
  //           console.log(response);
  //           setError(null);
  //           localStorage["token"] = JSON.stringify(response.data.access_token);
  //           console.log(response);
  //           GET_USER_INFO_CALL(response.data.access_token)
  //             .then((response) => {
  //               if (response.data) {
  //                 setError(null);
  //                 setLoggedInUser(response.data);
  //                 console.log(response);
  //                 history.replace(from);
  //                 showNotification("Logged in Successfully!");
  //               }
  //             })
  //             .catch((err) => {
  //               setError("Something went wrong! Please try again later.");
  //             });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //         setError("Credentials not found! Please register.");
  //       });
  //   } else {
  //     if (data.phone.length < 11) {
  //       setError("Phone number must be 11 numbers!");
  //     } else if (data.password.length <= 4) {
  //       setError("Password must be 4 charecters or more!");
  //     }
  //   }
  // };

  const handleForgotPassword = () => {
    setShowForgetPass(true);
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle(history, location);
    showNotification("Logged in Successfully!");
    // history.replace(from);
       history.replace("/")
  }
  const handleFaceBookSignIn = () => {
    signInWithFacebook(history, location)
    history.replace("/");
    
  }


  return (
    <>
      <SignInContainer>
        <SignInFormContainer>
          {!showForgetPass && (
            <>
              {/* <h1 className="">Login</h1> */}
              {/* <br />
              <p>Please enter your email and password:</p> */}
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              {/* <form >
                <div className="input__wrap">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    required
                  />
                </div>

                <div className="input__wrap">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    required
                  />
                  <span onClick={() => handleForgotPassword()}>
                    Forget password ?
                  </span>
                </div>
                <small>{error ? error : null}</small>
                <button type="submit">
                  <PrimaryButton>Login</PrimaryButton>
                </button>
              </form> */}
              {/* <p>
                Don't have an account ?
                <span onClick={() => history.push("/sign-up")}>
                  {" "}
                  Create one
                </span>
              </p> */}
              {/* <div>
              <button type="submit" onClick={ handleGoogleSignIn } className="">
              <PrimaryButton>Google Login</PrimaryButton>
              </button>
                
              <button type="submit" onClick={handleFaceBookSignIn} className="">
              <PrimaryButton>FaceBook Login</PrimaryButton>
              </button>
                <Link to="/phoneOtp">
                    <PrimaryButton>Phone Verification</PrimaryButton>
                </Link>
                
              </div> */}
              {/* start login button  */}
               <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form >
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
                </div>
            <div className="d-grid gap-2 mt-3">
            <Button onClick={handleFaceBookSignIn} variant="secondary" type="Submit">
              Sign in with facebook
            </Button>
          </div>
               
        <Link to="/phoneOtp">
          <div className="d-grid gap-2 mt-3">
            <Button variant="success" type="Submit">
              Sign in with Phone
            </Button>
          </div>
        </Link>
      </div>
      <div className="p-3 box mt-3 text-center">
       <p>
                Don't have an account ?
          <span onClick={() => history.push("/sign-up")}>
                  {" "}
                  Create one
                </span>
              </p>
      </div>
              {/* End login button */}
              
            </>
          )}

          {showForgetPass && (
            <ForgotPassword setShowForgetPass={setShowForgetPass} />
          )}
        </SignInFormContainer>
      </SignInContainer>
    </>
  
  );
};

export default SignInContent;
