import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { setUser } from "./userSlice";
import { Dispatch } from "@reduxjs/toolkit";

function validateForm(
  email: string,
  password: string,
  name: string | undefined,
  setEmailError: (message: string) => void,
  setPassError: (message: string) => void,
  setCommError: (message: string) => void,
  dispatch: Dispatch,
  isSignIn: boolean
): void {

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isValidPass =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isValidEmail) {
    setEmailError("Invalid email");
  } else {
    setEmailError("");
  }

  if (!isValidPass) {
    setPassError(
      "Password must be at least 8 characters long and contain uppercase, lowercase, and a number"
    );
  } else {
    setPassError("");
  }

  // Handle Sign-Up
  if (!isSignIn && isValidEmail && isValidPass) {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            if (auth.currentUser) {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(setUser({ uid, email, displayName }));
            } else {
              console.log("current user is null");
            }
          })
          .catch((error) => {
            setCommError(error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setCommError(`${errorCode} ${errorMessage}`);
      });

    // Handle Sign-In
  } else if (isSignIn && isValidEmail && isValidPass) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setCommError(`${errorCode} ${errorMessage}`);
      });
  }
}

export default validateForm;
