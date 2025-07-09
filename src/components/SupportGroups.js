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
      setFormData({ name: '', topic: '', meetingLink: '' });
    } catch (err) {
      console.error('Error adding group:', err);
      alert('Error creating group.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🧑‍🤝‍🧑 Community Support Groups</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded shadow">
        <input
          type="text"
          name="name"
          placeholder="Host Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="topic"
          placeholder="Support Topic (e.g. Flood Relief)"
          value={formData.topic}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="meetingLink"
          placeholder="Google Meet / Zoom Link"
          value={formData.meetingLink}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Group
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">📅 Active Groups</h3>
        {groups.length === 0 ? (
          <p className="text-gray-500">No groups yet. Be the first to create one!</p>
        ) : (
          groups.map((group) => (
            <div key={group.id} className="bg-white p-3 mb-3 rounded border shadow-sm">
              <p className="font-medium text-lg">{group.topic}</p>
              <p className="text-sm text-gray-700">Host: {group.name}</p>
              <a
                href={group.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Join Meeting
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
