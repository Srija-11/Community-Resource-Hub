import React from 'react';

export default function VerifiedRepairServices() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Verified Repair Services</h2>
      <p>
        This section will list local verified repair businesses to help with recovery services such as electrical work,
        plumbing, structural repair, insurance agents, etc.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <h3>Example Services:</h3>
        <ul>
          <li><strong>Fix-It Hub</strong> - Electrical & Plumbing Repairs - 📞 9876543210</li>
          <li><strong>SmartRestorers</strong> - Construction & Roof Repair - 📞 9123456789</li>
          <li><strong>InsureEase</strong> - Insurance Claims Assistant - 📞 9988776655</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', color: 'gray' }}>
        <p>Want your verified service listed? Contact admin@example.com</p>
      </div>
    </div>
  );
}
