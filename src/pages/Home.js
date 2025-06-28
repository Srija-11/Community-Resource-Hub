// src/pages/Home.js
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Community Resource Hub</h1>
      <Link to="/login">
        <button style={{ padding: "10px 20px", fontSize: "16px" }}>Login / Signup</button>
      </Link>
    </div>
  );
};
