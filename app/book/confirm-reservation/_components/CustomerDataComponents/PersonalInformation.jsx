import React from "react";

import { ShowData } from "./ShowData";

const PersonalInformation = ({ personalInfoData }) => {
  return (
    <div>
      <h2 className="text-lg font-normal mb-4 text-gray-900">
        Personal Information
      </h2>

      <div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {/* First Name */}
          <ShowData
            label="Full Name"
            className="col-span-2 sm:col-span-1"
            value={personalInfoData?.fullName}
          />

          {/* ID Card/Passport Number */}
          <ShowData
            label="ID Card/Passport Number"
            value={personalInfoData?.passportNumber}
          />

          {/* Birthday */}
          <ShowData label="Birthday" value={personalInfoData?.birthDate} />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
