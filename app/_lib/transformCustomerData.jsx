import { parse, format } from "date-fns";

export const transformCustomerFormData = (formData) => {
  // Helper function to transform date from dd/MM/yy to yyyy-MM-dd
  const transformDate = (dateString) => {
    if (!dateString) return "";

    try {
      // Parse the date from dd/MM/yy format
      const parsedDate = parse(dateString, "dd/MM/yy", new Date());

      // Format to yyyy-MM-dd
      return format(parsedDate, "yyyy-MM-dd");
    } catch (error) {
      console.log("Error transforming date:", error);
      return "";
    }
  };

  const countryCode = formData.country;
  const state = formData.state;

  const phone = formData.phoneCountryCode + "-" + formData.phone;
  const emergencyPhone =
    formData.emergencyPhoneCountryCode + "-" + formData.emergencyPhone;

  // Transform dates
  const transformedBirthDate = transformDate(formData.birthDate);
  const transformedLicenseExpiry = transformDate(formData.licenseExpiry);

  return {
    // Customer information
    field_2: formData.firstName,
    field_3: formData.lastName,
    field_9: formData.email || "",
    field_193: formData.address || "",
    field_195: formData.city || "",
    field_198: formData.zipCode || "",
    field_62: countryCode,
    field_8: phone,
    field_15: transformedBirthDate, // Transformed date
    field_273: formData.passportNumber || "",
    field_194: formData.address2 || "",
    field_196: state,
    field_254: formData.driverLicense || "",
    field_256: transformedLicenseExpiry, // Transformed date
    // field_275: formData.emergencyName || "",
    field_277: emergencyPhone,
    // field_278: formData.emergencyEmail || "",
    field_280: formData.emergencyRelationship || "",
  };
};

export const transformCustomerData = (data) => {
  // Helper function to transform date from yyyy-MM-dd to dd/MM/yy
  const reverseTransformDate = (dateString) => {
    if (!dateString) return "";

    try {
      // Handle both date formats: "2025-12-31" and "2025-12-31 00:00:00"
      const dateOnly = dateString.split(" ")[0]; // Get just the date part

      // Parse the date from yyyy-MM-dd format
      const parsedDate = parse(dateOnly, "yyyy-MM-dd", new Date());

      // Format to dd/MM/yy
      return format(parsedDate, "dd/MM/yy");
    } catch (error) {
      console.log("Error reverse transforming date:", error);
      return "";
    }
  };

  // Extract country code and phone components
  const phone = data.phone_number || "";
  const emergencyPhone = data.f277 || "";

  // Extract country code (assuming it's the first part before the phone number)
  const [phoneCountryCode, ...phoneParts] = phone.split("-");
  const phoneNumber = phoneParts.join("-");

  const [emergencyPhoneCountryCode, ...emergencyPhoneParts] =
    emergencyPhone.split("-");
  const emergencyPhoneNumber = emergencyPhoneParts.join("-");

  return {
    id: data.id,
    // Personal information
    firstName: data.first_name || "",
    lastName: data.last_name || "",
    fullName: data.first_name + " " + data.last_name,
    email: data.email || "",

    // Address information
    address: data.street || "",
    address2: data.street2 || "",
    city: data.city || "",
    state: data.state || "Johor",
    zipCode: data.zip || "",
    country: data.country || "MY",

    // Contact information
    phone: phoneNumber,
    phoneCountryCode: phoneCountryCode,

    // Identification
    birthDate: reverseTransformDate(data.birthdate), // Reverse transformed date
    passportNumber: data.f273 || "",
    driverLicense: data.driver_license || "",
    licenseExpiry: reverseTransformDate(data.f256), // Reverse transformed date

    // Emergency contact
    // emergencyName: data.f275 || "",
    emergencyRelationship: data.f280 || "",
    emergencyPhone: emergencyPhoneNumber,
    emergencyPhoneCountryCode: emergencyPhoneCountryCode,
    // emergencyEmail: data.f278 || "",

    // File arrays (extract from API response)
    licenseFiles: data.f252
      ? data.f252.map((file) => ({
          id: file.id,
          label: file.label,
          public_link: file.public_link,
        }))
      : [],

    idCardOrPass: data.f274
      ? data.f274.map((file) => ({
          id: file.id,
          label: file.label,
          public_link: file.public_link,
        }))
      : [],
    // licenseFiles: [],

    // idCardOrPass: [],
    // Other fields
    otherInfo: data.f279 || "",
    agreeTerms: true, // Default to true since we're loading existing data
  };
};
