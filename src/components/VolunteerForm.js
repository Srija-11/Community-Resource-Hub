// src/components/VolunteerForm.js
import React, { useState } from "react";
import { db } from '../config/firebase';

import { collection, addDoc } from "firebase/firestore";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    location: "",
    availability: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "volunteers"), formData);
      alert("Volunteer registered successfully!");
      setFormData({
        name: "",
        email: "",
        role: "",
        location: "",
        availability: ""
      });
    } catch (error) {
      console.error("Error adding volunteer:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>Volunteer Sign-Up</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="role" value={formData.role} onChange={handleChange} placeholder="Role (e.g. Medical Aid)" required />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
      <input name="availability" value={formData.availability} onChange={handleChange} placeholder="Availability" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default VolunteerForm;
