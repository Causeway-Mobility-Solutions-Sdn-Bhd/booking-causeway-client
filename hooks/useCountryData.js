import { useState, useEffect } from "react";

export const useCountryData = () => {
  const [data, setData] = useState({
    countryCodes: null,
    countryStates: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const { countryCodes, countryStates } = await import(
          "@/lib/countryData"
        );
        setData({
          countryCodes,
          countryStates,
          loading: false,
          error: null,
        });
      } catch (error) {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    loadData();
  }, []);

  return data;
};
