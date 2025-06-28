// src/pages/LoginPage.js
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>LOGIN</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="remember-me">
          <input type="checkbox" /> Remember me
        </div>
        <button onClick={signUp} className="login-btn">LOGIN</button>
        <p>Or login with</p>
        <div className="social-login">
          <button className="facebook-btn">Facebook</button>
          <button onClick={signInWithGoogle} className="google-btn">Google</button>
        </div>
        <p>Not a member? <a href="#">Sign up now</a></p>
      </div>
    </div>
  );
};
