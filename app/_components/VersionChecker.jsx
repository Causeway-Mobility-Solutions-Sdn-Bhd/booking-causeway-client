import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import hqApi from "@/lib/hqApi";

function VersionChecker() {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [data , setData] = useState({})

  const checkForUpdate = async () => {
    try {
      const response = await hqApi.get("/version"); // Get version from backend
      console.log("Version data:", response.data);
      const data = response.data;
      const storedVersion = localStorage.getItem("appVersion");
      setData(data)

      if (storedVersion && storedVersion !== data.version) {
        setShowUpdatePopup(true); // Show update popup
      }

      localStorage.setItem("appVersion", data.version); 
     
    } catch (error) {
      console.error("Error checking app version:", error);
    }
  };

  useEffect(() => {
    checkForUpdate();
  }, []);

  const handleUpdate = () => {

    // Clear local storage
    localStorage.clear();

    // Clear session storage
    sessionStorage.clear();

    // Clear caches
    caches.keys().then((names) => names.forEach((name) => caches.delete(name)));

    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "") // Trim spaces
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`); // Expire the cookie
    });


    // Reload to fetch the latest version
    window.location.replace(window.location.href);
  };

  return (
    <Dialog open={true} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Version Available</DialogTitle>
          <DialogDescription>
            A new version of the application is available. Please click the button to update.
          </DialogDescription>
        </DialogHeader>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-cPrimary border-none outline-none text-white rounded"
        >
          Update Now
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default VersionChecker;
