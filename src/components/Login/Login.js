import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import "./Login.css";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false,
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        const { displayName, email, photoURL } = user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        console.log(user);
      })
      .catch((error) => {});
  };
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(signedOutUser);
      })
      .catch((error) => {});
  };
  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const credential = result.credential;
        const user = result.user;
        const accessToken = credential.accessToken;
        console.log("signed in successfully", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
  };

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === "email") {
      const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      isFormValid = isEmailValid;
    }
    if (e.target.name === "password") {
      const isPassValid = e.target.value.length > 6;
      const passwordHasNum = /\d{1}/.test(e.target.value);
      isFormValid = passwordHasNum && isPassValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);

          console.log(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log("name updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-field">
      {user.isSignedIn ? (
        <button className="sign-buttons" onClick={handleSignOut}>
          sign out
        </button>
      ) : (
        <button className="sign-buttons" onClick={handleGoogleSignIn}>
          google sign in
        </button>
      )}
      {user.isSignedIn && (
        <div>
          <p>name:{user.name} </p>
          <p>email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
          )}
          <br/>
      <button className="sign-buttons" onClick={handleFbSignIn}>fb-sign-in</button>
      <form className="form-control" style={{ textAlign: "center" }}>
        <input
          onChange={() => setNewUser(!newUser)}
          type="checkbox"
          name=""
                  id=""
                  className="check-field"
        />
        <label htmlFor="newUser">New User sign Up</label>
        <br />

        {newUser && <label htmlFor="name">Name</label>}
        <br />
        {newUser && (
          <input
            className="input-field"
            onBlur={handleBlur}
            name="name"
            type="name"
            placeholder="your name(min 3 character)"
            required
          />
        )}
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="input-field"
          onBlur={handleBlur}
          type="email"
          name="email"
          id=""
          placeholder="write your email"
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          className="input-field"
          onBlur={handleBlur}
          type="password"
          name="password"
          id=""
          placeholder="write your password"
          required
        />
        <br />
        <input
          className="buttons"
          onClick={handleSubmit}
          type="submit"
          value={newUser ? "sign-up" : "sign-in"}
        />
      </form>

      {user.success ? (
        <p style={{ color: "green" }}>
          user {newUser ? "created" : "logged in"} successfully
        </p>
      ) : (
        <p style={{ color: "red" }}>{user.error}</p>
      )}
    </div>
  );
};

export default Login;
