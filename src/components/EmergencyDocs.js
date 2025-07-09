import React, { useState, useEffect } from 'react';
import { db, storage } from '../config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  Timestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export default function EmergencyDocs() {
  const [file, setFile] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const fileId = uuidv4();
    const fileRef = ref(storage, `emergency_docs/${fileId}_${file.name}`);

    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      await addDoc(collection(db, 'emergency_docs'), {
        name: file.name,
        url: downloadURL,
        uploadedAt: Timestamp.now()
      });

      alert('Document uploaded successfully!');
      setFile(null);
      fetchDocuments();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload document');
    }
  };

  const fetchDocuments = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'emergency_docs'));
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUploadedDocs(docs);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Emergency Documents</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload Document
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Uploaded Documents:</h3>
        {uploadedDocs.length === 0 ? (
          <p className="text-gray-600">No documents uploaded yet.</p>
        ) : (
          <ul className="space-y-3">
            {uploadedDocs.map((doc) => (
              <li key={doc.id} className="p-4 bg-gray-100 rounded shadow-sm">
                <p className="font-medium">{doc.name}</p>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View / Download
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
