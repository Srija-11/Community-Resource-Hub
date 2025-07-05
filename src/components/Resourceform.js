import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase"; // adjust path if needed
import { useNavigate } from "react-router-dom";

export default function ResourceForm() {
  const [type, setType] = useState("");
  const [action, setAction] = useState("Need");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "resources"), {
        userId: auth.currentUser?.uid || "anonymous",
        type,
        action,
        description,
        quantity,
        timestamp: new Date().toISOString(),
      });

      alert("Resource info submitted successfully!");
      setType("");
      setAction("Need");
      setDescription("");
      setQuantity("");
      navigate("/resources/view"); // 👈 redirect to view list
    } catch (err) {
      console.error("Error adding resource:", err);
      alert("You must be logged in to submit resources.");
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: "500px", margin: "2rem auto", padding: "1.5rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Find or Offer Resources</h2>
      <form onSubmit={handleSubmit}>
        <label>Resource Type*</label>
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">-- Select --</option>
          <option value="Water">Water</option>
          <option value="Food">Food</option>
          <option value="Medicine">Medicine</option>
          <option value="Shelter">Shelter</option>
          <option value="Electricity">Electricity</option>
          <option value="Other">Other</option>
        </select>

        <br /><br />

        <label>Action*</label>
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="Need">Need</option>
          <option value="Offer">Offer</option>
        </select>

        <br /><br />

        <label>Description*</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Need 5 liters of clean water"
          required
        />

        <br /><br />

        <label>Quantity (optional)</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g. 10 tablets, 2kg rice"
        />
        <br /><br />
        <button type="submit" style={{ padding: "0.6rem 1.5rem", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}
