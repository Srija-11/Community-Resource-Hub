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
      alert('✅ Report created successfully!');
    } catch (err) {
      console.error('Error submitting damage report:', err);
      alert('❌ Failed to submit report');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">🛠️ Report Damage</h2>

      {submitted && (
        <div className="mb-4 text-green-600 text-center font-medium">
          ✅ Damage report submitted successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Phone or Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location of Damage</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type of Damage</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select type</option>
            <option value="property">Property</option>
            <option value="agriculture">Agriculture</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the damage in detail..."
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-700"
        >
          📤 Submit Report
        </button>
      </form>
    </div>
  );
}
