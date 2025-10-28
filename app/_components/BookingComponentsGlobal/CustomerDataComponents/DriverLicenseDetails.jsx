import React from "react";
import { ShowData } from "./ShowData";

const DriverLicenseDetails = ({ licenseData }) => {
  return (
    <div className="mt-9">
      <h2 className="text-lg font-normal mb-4 text-gray-900">
        Driver License Details
      </h2>

      <div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {/* First Name */}
          <ShowData label="License Number" value={licenseData?.driverLicense} />

          {/* ID Card/Passport Number */}
          <ShowData label="Exp Date" value={licenseData?.licenseExpiry} />
        </div>
      </div>
    </div>
  );
};

export default DriverLicenseDetails;
