import React from 'react';

const recoveryResources = [
  {
    category: 'Government Services',
    items: [
      {
        name: 'National Disaster Management Authority (NDMA)',
        link: 'https://ndma.gov.in',
      },
      {
        name: 'State Emergency Relief Fund',
        link: 'https://example.gov.in/relief-fund',
      },
    ],
  },
  {
    category: 'NGOs & Relief Organizations',
    items: [
      {
        name: 'Goonj – Relief Supplies & Clothing',
        link: 'https://goonj.org',
      },
      {
        name: 'SEEDS India – Disaster Recovery',
        link: 'https://www.seedsindia.org',
      },
    ],
  },
  {
    category: 'Insurance Assistance',
    items: [
      {
        name: 'LIC Disaster Claims',
        link: 'https://licindia.in',
      },
      {
        name: 'IRDAI Guidelines for Natural Disasters',
        link: 'https://irdai.gov.in',
      },
    ],
  },
  {
    category: 'Local Repair Agencies',
    items: [
      {
        name: 'SafeHome Restorations',
        link: 'https://www.google.com/maps/search/SafeHome+Restorations',
      },
      {
        name: 'QuickFix Electricians',
        link: 'https://www.google.com/maps/search/QuickFix+Electricians',
      },
    ],
  },
];

export default function RecoveryDirectory() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Recovery Resource Directory</h2>
      {recoveryResources.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-indigo-700">{section.category}</h3>
          <ul className="list-disc list-inside text-gray-800">
            {section.items.map((item, i) => (
              <li key={i} className="mb-1">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
