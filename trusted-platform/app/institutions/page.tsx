// app/institutions/page.tsx

import Link from "next/link";

export default function InstitutionsPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Institutions Dashboard</h1>
      <p className="mb-4">Manage certificates and view issued records here.</p>
      <div className="space-y-4">
        <Link href="/institutions/issue-certificate">
       
            Issue Certificate
          
        </Link>
        <Link href="/institutions/view-certificates">
        
            View Certificates
          
        </Link>
      </div>
    </div>
  );
}
