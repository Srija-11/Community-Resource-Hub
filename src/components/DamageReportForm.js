import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function DamageReportForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    type: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'damageReports'), {
        ...formData,
        timestamp: Timestamp.now()
      });
      setSubmitted(true);
      setFormData({
        name: '',
        contact: '',
        location: '',
        type: '',
        description: '',
      });
    } catch (err) {
      console.error('Error submitting damage report:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Report Damage</h2>
      {submitted && (
        <div className="text-green-600 text-center mb-4">Damage report submitted successfully.</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Info (Phone/Email)"
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location of Damage"
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Damage Type</option>
          <option value="property">Property</option>
          <option value="agriculture">Agriculture</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="other">Other</option>
        </select>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the damage..."
          required
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
