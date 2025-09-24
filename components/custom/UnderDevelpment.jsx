import { Wrench } from "lucide-react";
import React from "react";

function UnderDevelpment() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <Wrench className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Under Development
        </h1>

        <p className="text-gray-600 mb-6">
          We're working hard to bring you something great. Please check back
          soon!
        </p>

        <div className="text-sm text-gray-500">Coming Soon</div>
      </div>
    </div>
  );
}

export default UnderDevelpment; 
