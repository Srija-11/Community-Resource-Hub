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
      alert('✅ Damage report submitted successfully!');
      setFormData({
        name: '',
        contact: '',
        location: '',
        type: '',
        description: '',
      });
    } catch (err) {
      console.error('Error submitting damage report:', err);
      alert('❌ Failed to submit report.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🛠️ Report Damage
      </h2>

      {submitted && (
        <div className="text-green-600 text-center font-medium mb-4">
          ✅ Report submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-1">Your Name*</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Contact Info*</label>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
