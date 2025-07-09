import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import {
collection,
addDoc,
onSnapshot,
serverTimestamp,
query,
orderBy,
} from 'firebase/firestore';

export default function SkillsBoard() {
const [skills, setSkills] = useState([]);
const [formData, setFormData] = useState({
name: '',
skill: '',
contact: '',
});

useEffect(() => {
const skillsRef = collection(db, 'skills');
const q = query(skillsRef, orderBy('timestamp', 'desc'));
const unsubscribe = onSnapshot(q, (snapshot) => {
  const fetchedSkills = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  setSkills(fetchedSkills);
});

return () => unsubscribe();
}, []);

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({
...prev,
[name]: value,
}));
};

const handleSubmit = async (e) => {
e.preventDefault();
if (!formData.name || !formData.skill || !formData.contact) {
alert('Please fill in all fields');
return;
}

try {
  await addDoc(collection(db, 'skills'), {
    ...formData,
    timestamp: serverTimestamp(),
  });
  setFormData({ name: '', skill: '', contact: '' });
} catch (error) {
  console.error('Error adding skill:', error);
}
};

return (
<div className="max-w-xl mx-auto px-4 py-6">
<h2 className="text-2xl font-bold mb-4">🛠 Community Skills Board</h2>

  <form onSubmit={handleSubmit} className="space-y-3 mb-6">
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Your Name"
      className="w-full border p-2 rounded"
    />
    <input
      type="text"
      name="skill"
      value={formData.skill}
      onChange={handleChange}
      placeholder="Skill (e.g. First Aid)"
      className="w-full border p-2 rounded"
    />
    <input
      type="text"
      name="contact"
      value={formData.contact}
      onChange={handleChange}
      placeholder="Phone or Email"
      className="w-full border p-2 rounded"
    />
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Submit
    </button>
  </form>

  <div>
    <h3 className="text-xl font-semibold mb-3">👥 Shared Skills</h3>
    {skills.length === 0 ? (
      <p className="text-gray-500">No skills shared yet.</p>
    ) : (
      skills.map((skill) => (
        <div key={skill.id} className="border p-3 mb-2 rounded shadow-sm bg-white">
          <p className="font-medium">{skill.skill}</p>
          <p className="text-sm text-gray-600">👤 {skill.name}</p>
          <p className="text-sm text-gray-600">📞 {skill.contact}</p>
        </div>
      ))
    )}
  </div>
</div>
);
}
