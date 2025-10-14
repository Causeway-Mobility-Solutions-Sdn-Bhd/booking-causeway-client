import { parse, format } from "date-fns";

export const transformCustomerFormData = (formData) => {
  // Helper to transform date from dd/MM/yy → yyyy-MM-dd
  const transformDate = (dateString) => {
    if (!dateString) return "";
    try {
      const parsedDate = parse(dateString, "dd/MM/yy", new Date());
      return format(parsedDate, "yyyy-MM-dd");
    } catch (error) {
      console.log("Error transforming date:", error);
      return "";
    }
  };

  const phone = `${formData.phoneCountryCode}-${formData.phone}`;
  const transformedBirthDate = transformDate(formData.birthDate);

  const result = {
    field_2: formData.firstName,
    field_3: formData.lastName,
    field_62: formData.country,
    field_15: transformedBirthDate,
    field_8: phone,
    field_9: formData.email,
    field_279: phone,
  };

  // Add emergency contact info only if at least one field is filled
  const hasEmergencyInfo =
    formData.emergencyPhone?.trim() || formData.emergencyRelationship?.trim();

  if (hasEmergencyInfo) {
    result.field_277 = `${formData.emergencyPhoneCountryCode}-${formData.emergencyPhone}`;
    if (formData.emergencyRelationship?.trim()) {
      result.field_280 = formData.emergencyRelationship;
    }
  }

  return result;
};
export const transformCustomerData = (data) => {
  const reverseTransformDate = (dateString) => {
    if (!dateString) return "";

    try {
      const dateOnly = dateString.split(" ")[0];

      const parsedDate = parse(dateOnly, "yyyy-MM-dd", new Date());

      return format(parsedDate, "dd/MM/yy");
    } catch (error) {
      console.log("Error reverse transforming date:", error);
      return "";
    }
  };

  const phone = data.f279 || "";
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

    country: data.country || "MY",

    // Contact information
    phone: phoneNumber,
    phoneCountryCode: phoneCountryCode,

    birthDate: reverseTransformDate(data.birthdate),

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

    agreeTerms: true, // Default to true since we're loading existing data
  };
};
