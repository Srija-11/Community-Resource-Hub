import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';

export default function SupportGroups() {
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    topic: '',
    meetingLink: '',
  });

  useEffect(() => {
    const q = query(collection(db, 'supportGroups'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroups(data);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, topic, meetingLink } = formData;

    if (!name || !topic || !meetingLink) {
      alert('Please fill all fields');
      return;
    }

    try {
      await addDoc(collection(db, 'supportGroups'), {
        name,
        topic,
        meetingLink,
        timestamp: serverTimestamp(),
      });

      alert('Support group created successfully!');
      setFormData({ name: '', topic: '', meetingLink: '' });
    } catch (err) {
      console.error('Error adding group:', err);
      alert('Error creating group.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🧑‍🤝‍🧑 Community Support Groups</h2>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Host Name"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          placeholder="Support Topic"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="meetingLink"
          value={formData.meetingLink}
          onChange={handleChange}
          placeholder="Meeting Link (Zoom / Google Meet)"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Create Group
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">📅 Active Groups</h3>

        {groups.length === 0 ? (
          <p className="text-gray-500 italic">No groups available yet.</p>
        ) : (
          <ul className="space-y-4">
            {groups.map((group) => (
              <li key={group.id} className="bg-gray-50 border border-gray-200 p-4 rounded shadow-sm">
                <p className="text-lg font-semibold text-gray-800">{group.topic}</p>
                <p className="text-sm text-gray-600 mb-1">👤 Host: {group.name}</p>
                <a
                  href={group.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  🔗 Join Meeting
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
