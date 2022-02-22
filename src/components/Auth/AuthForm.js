import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/authentication-context";
import classes from "./AuthForm.module.css";
import LoadingSpinner from "../Layout/LoadingSpinner";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLoggingIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const switchLoggedIn = () => {
    setIsLoggedIn((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredMail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url;

    if (isLoggingIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpTZ8447EgwaJ1b-2m_SsQIJVn02wdB1g";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpTZ8447EgwaJ1b-2m_SsQIJVn02wdB1g";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredMail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);

        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data && data.error && data.error.message) {
              const errMsg = data.error.message;

              throw new Error(errMsg);
            }
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace("/logged-in");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLoggingIn ? "Login" : "Sign up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email" id="email" required></label>
          <input type="email" id="email" required ref={emailInputRef}></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="password" id="password" required></label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          ></input>
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLoggingIn ? "Login" : "Create a New Account"}</button>
          )}
          {isLoading && <LoadingSpinner />}
          <button
            type="button"
            onClick={switchLoggedIn}
            className={classes.toggle}
          >
            {isLoggingIn ? "Create New Account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
