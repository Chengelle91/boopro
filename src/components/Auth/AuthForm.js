import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/authentication-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLoggingIn, setIsLoggedIn] = useState(true);
  const history = useHistory();

  const switchLoggedIn = () => {
    setIsLoggedIn((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredMail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (enteredMail === "example@boopro.tech" && enteredPassword === "123123") {
      authCtx.login("someTokenSinceIDontHaveARealOne");
      history.replace("/movies");
      //save auth token in local storage
    } else if (enteredMail !== "example@boopro.tech") {
      alert("Email not Valid");
    } else if (enteredPassword !== "123123") {
      alert("incorrect password");
    }
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
          <button>{isLoggingIn ? "Login" : "Create a New Account"}</button>
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
