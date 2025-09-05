// src/components/VolunteerList.js
import React, { useEffect, useState } from "react";
import { db } from '../config/firebase';

import { collection, getDocs } from "firebase/firestore";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      const querySnapshot = await getDocs(collection(db, "volunteers"));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVolunteers(list);
    };

    fetchVolunteers();
  }, []);

  return (
    <div>
      <h2>Available Volunteers</h2>
      {volunteers.map((volunteer) => (
        <div key={volunteer.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
          <p><strong>Name:</strong> {volunteer.name}</p>
          <p><strong>Role:</strong> {volunteer.role}</p>
          <p><strong>Location:</strong> {volunteer.location}</p>
          <p><strong>Availability:</strong> {volunteer.availability}</p>
        </div>
      ))}
    </div>
  );
};

export default VolunteerList;
