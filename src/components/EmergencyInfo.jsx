import React from 'react';
import LocalUpdates from './LocalUpdates';
import AdminPostForm from './AdminPostForm';
// import { auth } from '../config/firebase';

export default function EmergencyInfo() {
//   const isAdmin = auth.currentUser?.email === "admin@example.com"; // or use custom claims

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📢 Emergency Information Center</h1>
      
      <LocalUpdates />
        <AdminPostForm />
      {/* {isAdmin && (
        <div style={{ marginTop: "2rem" }}>
          <h3>🔐 Admin Panel: Post Emergency Update</h3>
          <AdminPostForm />
        </div> */}
    </div>
  );
}
