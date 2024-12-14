"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function StudentDashboard() {
  const [certificates, setCertificates] = useState([])

  const handleAddCertificate = () => {
    const newCertificate = `Certificate ${certificates.length + 1}`
    setCertificates(prevCertificates => [...prevCertificates, newCertificate])
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-white p-8">
      <div className="flex w-full max-w-7xl space-x-8">
        {/* Uploaded Certificates Section (on the left) */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-2/3">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Uploaded Certificates</h2>
          <div className="space-y-4">
            {certificates.length === 0 ? (
              <p className="text-gray-600">No certificates uploaded yet.</p>
            ) : (
              certificates.map((certificate, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-md border border-blue-300">
                  <p className="text-lg text-gray-700">{certificate}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Student Dashboard Section (on the right) */}
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center w-1/3">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Student Dashboard</h1>
          <p className="text-gray-600 mb-8 text-center">Manage your certificates easily and efficiently.</p>
          <Button
            className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg mb-4 transition-transform transform hover:scale-105"
            onClick={handleAddCertificate}
          >
            Add a Certificate
          </Button>
          <Button className="w-full py-3 text-lg font-semibold bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-transform transform hover:scale-105">
            Request a Certificate
          </Button>
        </div>
      </div>
    </div>
  )
}
