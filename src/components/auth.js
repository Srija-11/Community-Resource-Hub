import { auth, googleProvider } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';



export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error("Sign In Error:", err.message);
      alert(err.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error("Google Auth Error:", err.message);
      alert(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login / Signup</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login & Signup buttons side-by-side */}
         <div className="remember-me">
          <input type="checkbox" /> Remember me
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button className="login-btn-in" onClick={signIn}>
            Login
          </button>
        </div>
        
        <p style={{ margin: "20px 0 10px" }}>or Sign In with</p>

        <button className="google-btn" onClick={handleGoogleAuth}>
          Google
        </button>
        <p>Not a member? <Link to="/signup">Sign up now</Link></p>
      </div>
    </div>
  );
};
