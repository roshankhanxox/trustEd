// app/institutions/layout.tsx

import React from "react";

export default function InstitutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="bg-blue-600 text-white py-4 px-8">
        <h1 className="text-2xl">Institutions Dashboard</h1>
      </header>
      <main className="p-8">{children}</main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        © 2024 TrustEd Platform
      </footer>
    </div>
  );
}
