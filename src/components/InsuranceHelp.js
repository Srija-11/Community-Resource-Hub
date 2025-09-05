import React from 'react';

export default function InsuranceHelp() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Insurance Assistance Guide
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        If your property has been damaged due to a natural disaster, you may be eligible to file a claim
        with your insurance provider. Here's how to get started:
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem' }}>Steps to File an Insurance Claim:</h3>
      <ol style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
        <li>📸 Take clear photos of the damage before cleanup.</li>
        <li>📝 Make a list of all damaged items and areas.</li>
        <li>📄 Gather your insurance policy details and ID proof.</li>
        <li>📞 Contact your insurance company immediately to report the claim.</li>
        <li>📂 Submit documentation as requested (photos, estimates, bills, etc).</li>
      </ol>

      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem' }}>Helpful Resources:</h3>
      <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
        <li>
          <a href="https://irdai.gov.in" target="_blank" rel="noopener noreferrer">
            IRDAI – Insurance Regulatory & Development Authority of India
          </a>
        </li>
        <li>
          <a href="https://www.policybazaar.com/" target="_blank" rel="noopener noreferrer">
            PolicyBazaar – Compare Home & Disaster Insurance
          </a>
        </li>
        <li>
          <a href="https://licindia.in" target="_blank" rel="noopener noreferrer">
            LIC – Life & Property Insurance Disaster Claims
          </a>
        </li>
      </ul>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <strong>Note:</strong> Keep a copy of all your documents and correspondence. Follow up regularly with your insurer.
      </div>
    </div>
  );
}
