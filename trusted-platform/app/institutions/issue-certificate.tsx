// app/institutions/issue-certificate.tsx

import React from "react";

export default function IssueCertificate() {
  const handleIssueCertificate = () => {
    // Placeholder logic for issuing a certificate
    alert("Certificate issued successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Issue Certificate</h1>
      <p className="mb-4">Use this form to issue certificates to students.</p>
      <button
        onClick={handleIssueCertificate}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Issue Certificate
      </button>
    </div>
  );
}
