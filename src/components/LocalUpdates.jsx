import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export default function LocalUpdates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "authority_updates"));
    const unsub = onSnapshot(q, (snapshot) => {
      setUpdates(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", margin: "1rem" }}>
      <h2>✅ Official Emergency Updates</h2>
      <ol>
        {updates.map((u, i) => (
          <li key={i}>
            <strong>{u.title}</strong> — {u.message}
          </li>
        ))}
      </ol>
    </div>
  );
}
