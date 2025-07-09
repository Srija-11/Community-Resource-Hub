import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RepairService() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Recovery Assistance
      </h2>
      <p style={{ fontSize: '1rem', color: '#333' }}>
        Access help for repair services and insurance assistance.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => navigate('/recovery/report')}
          style={{
            backgroundColor: '#5f4dee',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            marginRight: '1rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Start Recovery
        </button>

        <button
          onClick={() => navigate('/recovery/verified')}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Verified Services
        </button>
      </div>
    </div>
  );
}
