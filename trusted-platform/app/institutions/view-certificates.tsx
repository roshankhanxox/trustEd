// app/institutions/view-certificates.tsx

import React, { useState, useEffect } from "react";

type Certificate = {
  id: number;
  studentName: string;
  course: string;
  issueDate: string;
};

export default function ViewCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    // Placeholder data (replace with actual API/smart contract call)
    const mockCertificates = [
      { id: 1, studentName: "John Doe", course: "B.Sc. Computer Science", issueDate: "2024-12-10" },
      { id: 2, studentName: "Jane Smith", course: "MBA", issueDate: "2024-12-09" },
    ];
    setCertificates(mockCertificates);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Issued Certificates</h1>
      {certificates.length > 0 ? (
        <ul className="space-y-4">
          {certificates.map((cert) => (
            <li key={cert.id} className="border p-4 rounded shadow-sm">
              <p><strong>Student:</strong> {cert.studentName}</p>
              <p><strong>Course:</strong> {cert.course}</p>
              <p><strong>Issued On:</strong> {cert.issueDate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No certificates issued yet.</p>
      )}
    </div>
  );
}
