import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

export default function ResourceList() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "resources"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResources(data);
    });

    return () => unsubscribe();
  }, []);

  const formatTime = (isoString) => {
    const time = new Date(isoString);
    return time.toLocaleString();
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h2>🔄 Live Resource Feed</h2>

      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Need Section */}
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "red" }}>🆘 Needs</h3>
          {resources
            .filter((r) => r.action === "Need")
            .map((res) => (
              <div key={res.id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
                <strong>{res.type}</strong> – {res.description}  
                <br />
                <small>Qty: {res.quantity || "N/A"}</small><br />
                <small>Posted: {formatTime(res.timestamp)}</small>
              </div>
            ))}
        </div>

        {/* Offer Section */}
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "green" }}>✅ Offers</h3>
          {resources
            .filter((r) => r.action === "Offer")
            .map((res) => (
              <div key={res.id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
                <strong>{res.type}</strong> – {res.description}
                <br />
                <small>Qty: {res.quantity || "N/A"}</small><br />
                <small>Posted: {formatTime(res.timestamp)}</small>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
