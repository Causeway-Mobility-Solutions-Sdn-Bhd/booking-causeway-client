import React, { useEffect } from "react";
import { ShowData } from "./ShowData";
import { useCountryData } from "@/hooks/useCountryData";
const ContactDetails = ({ contactDetailsData }) => {
  const { countryCodes, loading: dataLoading } = useCountryData();

  const country = dataLoading
    ? "..."
    : countryCodes[contactDetailsData?.country].n;

  return (
    <div className="mt-9">
      <h2 className="text-lg font-normal mb-4 text-gray-900">
        Contact Details
      </h2>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* Phone and Email - 2 per row on md and up */}
          <ShowData label="Phone Number" value={contactDetailsData?.phone} />

          <ShowData label="Email Address" value={contactDetailsData?.email} />

          {/* Street - full width */}
          <ShowData
            label="Street"
            className="col-span-1 md:col-span-2"
            value={contactDetailsData?.address}
          />

          {/* Zip code, City, State, Country - 4 in one line on md and up, 2 per row on sm */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            <ShowData label="Zip code" value={contactDetailsData?.zipCode} />

            <ShowData label="City" value={contactDetailsData?.city} />

            <ShowData label="State" value={contactDetailsData?.state} />

            <ShowData label="Country" value={country} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
