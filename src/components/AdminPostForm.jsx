import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

export default function AdminPostForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      setStatus("You must be logged in.");
      return;
    }

    try {
      await addDoc(collection(db, "authority_updates"), {
        title,
        message,
        timestamp: new Date().toISOString(),
        author: user.email || user.uid,
      });
      setStatus("✅ Update posted!");
      setTitle("");
      setMessage("");
    } catch (error) {
      console.error("Error posting update:", error);
      setStatus("❌ Failed to post update.");
    }
  };

  return (
    <div style={{ padding: "1rem", margin: "1rem", border: "2px solid #aaa", borderRadius: "8px" }}>
      <h3>🛡️ Post Official Update (Admins Only)</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title of the update"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          style={{ width: "100%", padding: "0.5rem" }}
        />
        <br /><br />
        <button type="submit" style={{ padding: "0.6rem 1.2rem", backgroundColor: "#007bff", color: "#fff", border: "none" }}>
          📤 Post Update
        </button>
        <p>{status}</p>
      </form>
    </div>
  );
}
