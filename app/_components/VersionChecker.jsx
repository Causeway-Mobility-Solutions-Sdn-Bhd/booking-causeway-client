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
  const [data, setData] = useState({});

  const checkForUpdate = async () => {
    try {
      const response = await hqApi.get("/version"); // Get version from backend
      console.log("Version data:", response.data);
      const data = response.data;
      const storedVersion = localStorage.getItem("appVersion");
      setData(data);

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

  const handleUpdate = async () => {
    // Clear storage
    localStorage.clear();
    sessionStorage.clear();

    // Clear Cache API
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    }

    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
    });

    // Unregister service workers
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      regs.forEach((reg) => reg.unregister());
    }

    // Force reload bypassing HTTP cache
    const currentUrl = window.location.href.split("?")[0];
    window.location.replace(`${currentUrl}?v=${Date.now()}`);
  };

  return (
    <Dialog open={showUpdatePopup}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Version Available</DialogTitle>
          <DialogDescription>
            A new version of the application is available. Please click the
            button to update.
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
