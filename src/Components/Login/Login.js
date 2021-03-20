import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [success, SetSuccess] = useState("");
  const [errorInfo, setErrorInfo] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const GoogleSignIn = () => {
    const GProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(GProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signInUser = { name: displayName, email };
        setLoggedInUser(signInUser);
        history.replace(from);
        console.log(signInUser);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleBlur = (e) => {
    let formValidation = true;
    if (e.target.name === "email") {
      formValidation = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name === "password") {
      formValidation = e.target.value.length > 5;
    }

    if (formValidation) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
    setErrorInfo("");
    SetSuccess("");
  };
  const emailLogin = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const user = res.user;
          const newUser = { ...user };
          setUser(newUser);
          setErrorInfo("");
          SetSuccess("Account creation successful");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorInfo(errorMessage);
          SetSuccess("");
          console.log(errorMessage);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const user = res.user;
          const newUser = { ...user };
          setUser(newUser);
          setLoggedInUser(newUser);
          history.replace(from);
          setErrorInfo("");
          SetSuccess("");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorInfo(errorMessage);
          console.log(errorMessage);
        });
    }

    e.preventDefault();
  };

  return (
    <div>
      <header className="container pt-2">
        <nav className="navbar navbar-expand-lg navbar-light border-bottom  border-dark">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/home">
              Street Riders
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to="/home"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contacts
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <form
        onSubmit={emailLogin}
        className="mt-5 m-auto p-4 bg-light  border-white rounded"
        style={{ width: "18rem" }}
      >
        {newUser ? <h4>Create new account</h4> : <h4>Login</h4>}
        {newUser && (
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Name
            </label>
            <input
              name="name"
              type="name"
              className="form-control"
              id="exampleInputPassword1"
              onBlur={handleBlur}
              required
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onBlur={handleBlur}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="Password1"
            onBlur={handleBlur}
            required
          />
        </div>
        <div id="emailHelp" className="form-text">
          <p style={{ color: "red" }}>
            <small>{errorInfo}</small>
          </p>
        </div>
        {success && (
          <div id="emailHelp" className="form-text">
            <p style={{ color: "green" }}>
              <small>{success}</small>
            </p>
          </div>
        )}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onClick={() => setNewUser(!newUser)}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Don't have an account?
          </label>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button type="submit" className="btn btn-dark">
            {newUser ? "Sign-Up" : "Login"}
          </button>
        </div>
      </form>
      <div className="text-center mt-3">
        <h5>Or</h5>
        <button onClick={GoogleSignIn} className="btn btn-light m-5">
          <FcGoogle /> Sign-in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
