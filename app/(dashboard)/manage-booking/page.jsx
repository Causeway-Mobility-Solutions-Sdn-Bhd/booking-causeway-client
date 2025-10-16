"use client";
import React from "react";
import {
  useLazyTestPermissionQuery,
  useTestPermissionQuery,
} from "@/store/api/authApiSlice";

function Page() {
  const [triggerTestPermission, { isFetching }] = useLazyTestPermissionQuery();
  const handleTestPermission = async () => {
    try {
      console.log("🔐 Testing permission...");
      const response = await triggerTestPermission().unwrap;
      console.log("✅ Permission granted:", response);
      alert("Permission granted! Check console for details.");
    } catch (error) {
      console.error("❌ Permission denied:", error);
      alert("Permission denied! Check console for error details.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleTestPermission}
        disabled={isFetching}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        TEST PERMISSION
      </button>
    </div>
  );
}

export default Page;
