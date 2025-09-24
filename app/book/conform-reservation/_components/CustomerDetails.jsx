import React from "react";
import PersonalInformation from "./CustomerDataComponents/PersonalInformation";
import ContactDetails from "./CustomerDataComponents/ContactDetails";
import DriverLicenseDetails from "./CustomerDataComponents/DriverLicenseDetails";

const CustomerDetails = ({ data }) => {
  const personalInfoData = {
    fullName: data.fullName,
    birthDate: data.birthDate,
    passportNumber: data.passportNumber,
  };

  const contactDetailsData = {
    phone: data.phoneCountryCode + data.phone,
    email: data.email,
    address: data.address,
    zipCode: data.zipCode,
    city: data.city,
    state: data.state,
    country: data.country,
  };
  const licenseData = {
    driverLicense: data.driverLicense,
    licenseExpiry: data.licenseExpiry,
  };

  console.log(data);

  return (
    <div className="p-4">
      {/* Accordion content goes here */}
      <PersonalInformation personalInfoData={personalInfoData} />
      <ContactDetails contactDetailsData={contactDetailsData} />
      <DriverLicenseDetails licenseData={licenseData} />
    </div>
  );
};

export default CustomerDetails;
