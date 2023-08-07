import React from "react";
import "../../styles/login.scss";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

function Login() {
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(login({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }));
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Sign-in error:", error.message);
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://static.dezeen.com/uploads/2020/10/gmail-google-logo-rebrand-workspace-design_dezeen_2364_col_0.jpg"
          alt=""
        />
        <Button variant="contained" color="primary" onClick={signIn}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
