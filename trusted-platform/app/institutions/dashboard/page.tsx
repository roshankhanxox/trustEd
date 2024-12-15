"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function InstitutionDashboard() {
  const [issues, setIssues] = useState([
    { name: "Marlyn Jade", status: "Issued" },
    { name: "John Doe", status: "Issued" },
  ]);

  const handleAddIssue = () => {
    const newIssue = { name: `User ${issues.length + 1}`, status: "Issue" };
    setIssues((prevIssues) => [...prevIssues, newIssue]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-white dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="flex w-full max-w-7xl space-x-8">
        
        {/* Reported Issues Section (on the left) */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-2/3 dark:bg-gray-800 dark:text-white">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Reported Issues</h2>
          <div className="space-y-4">
            {issues.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No issues reported yet. Add new issues to track them.</p>
            ) : (
              issues.map((issue, index) => (
                <div
                  key={index}
                  className="bg-blue-50 p-4 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600 flex justify-between items-center"
                >
                  <p className="text-lg text-gray-700 dark:text-white font-semibold">{issue.name}</p>
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                    {issue.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Institution Dashboard Section (on the right) */}
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center w-1/3 dark:bg-gray-800 dark:text-white">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-6">Institution Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Manage reported issues, track progress, and take immediate action.
          </p>
          <Button
            className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg mb-4 transition-transform transform hover:scale-105"
            onClick={handleAddIssue}
          >
            Add New Issue
          </Button>
          <Button
            className="w-full py-3 text-lg font-semibold bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-transform transform hover:scale-105"
          >
            View All Reports
          </Button>
        </div>
      </div>
    </div>
  );
}
