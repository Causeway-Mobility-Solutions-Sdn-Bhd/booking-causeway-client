import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Spinner from "@/components/custom/Spinner";
import { IoIosSearch } from "react-icons/io";
import { format } from "date-fns";
import hqApi from "@/lib/hqApi";
import { showErrorToast } from "@/app/_lib/toast";
import {
  setSelectedVehicleClasses,
  setVehicleLoader,
} from "@/store/slices/reservationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const features = [
  {
    id: 1,
    title: "Seats",
    label: "seats",
    options: [
      {
        id: 1,
        name: "1 - 5 Seats",
        ids: [18, 19, 20, 21, 8],
      },
      {
        id: 2,
        name: "6 - 7 Seats",
        ids: [22, 12],
      },
      {
        id: 3,
        name: "8 - 10 Seats",
        ids: [23, 24, 13],
      },
    ],
  },
  {
    id: 2,
    title: "Fuel Type",
    label: "fuelType",
    options: [
      {
        id: 10,
        name: "Petrol",
      },
      {
        id: 11,
        name: "Diesel",
      },
      {
        id: 17,
        name: "Electric",
      },
    ],
  },
  {
    id: 3,
    title: "Connectivity",
    label: "connectivity",
    options: [
      {
        id: 14,
        name: "Bluetooth",
      },
      {
        id: 16,
        name: "Android",
      },
      {
        id: 15,
        name: "Apple",
      },
    ],
  },
  {
    id: 4,
    title: "Transmission",
    label: "transmission",
    options: [
      {
        id: 0,
        name: "Any",
      },
      {
        id: 1,
        name: "Auto",
      },
      {
        id: 2,
        name: "Manual",
      },
    ],
  },
];

function Filter({
  setTobBarFilter,
  topBarFilter,
  vehiTypes,
  loader,
  setLoader,
  setReLoader,
  isDrawerOpen,
  setIsDrawerOpen,
  variant = "primary",
}) {
  const [tempTopBarFilter, setTempTopBarFilter] = useState(topBarFilter);

  const dispatch = useAppDispatch();
  const reservation = useAppSelector((state) => state.reservation.reservation);

  useEffect(() => {
    setTempTopBarFilter(topBarFilter);
  }, [topBarFilter, isDrawerOpen]);

  const handlePriceChange = (value) => {
    setTempTopBarFilter((prev) => ({
      ...prev,
      priceRange: value,
    }));
  };

  const handleSelectVehicleType = (vt) => {
    setTempTopBarFilter((prev) => {
      const existingTypes = prev?.carType || [];
      const exists = existingTypes.some((item) => item?.id === vt?.id);

      const updatedTypes = exists
        ? existingTypes.filter((item) => item?.id !== vt?.id)
        : [...existingTypes, { id: vt?.id, label: vt?.label }];

      return {
        ...prev,
        carType: updatedTypes,
      };
    });
  };

  const handleFeatures = (ft, ftop) => {
    if (ft?.label !== "seats") {
      setTempTopBarFilter((prev) => {
        const currentValue = prev[ft?.label];
        const isAlreadySelected = currentValue === ftop?.id;

        return {
          ...prev,
          [ft?.label]: isAlreadySelected ? null : ftop?.id,
        };
      });
    } else {
      setTempTopBarFilter((prev) => {
        const currentValue = prev[ft?.label];
        const isAlreadySelected = currentValue?.id === ftop?.id;

        return {
          ...prev,
          [ft?.label]: isAlreadySelected
            ? null
            : {
                ids: ftop?.ids,
                id: ftop?.id,
              },
        };
      });
    }
  };

  const handleSearch = async (isReload) => {
    fetchData(isReload);
  };

  const fetchData = async (isReload) => {
    if (!reservation) return;

    if (variant === "secondary") {
      dispatch(setSelectedVehicleClasses([]));
      dispatch(setVehicleLoader(true));
      setIsDrawerOpen(false);
    }

    try {
      const carTypeIds = tempTopBarFilter?.carType?.map((item) => item.id);
      let requestData = {};
      if (isReload) {
        setIsDrawerOpen(false);
        dispatch(setSelectedVehicleClasses([]));
        dispatch(setVehicleLoader(true));
        setReLoader(true);
        requestData = {
          pick_up_date: reservation?.pick_up_date
            ? format(reservation.pick_up_date, "yyyy-MM-dd")
            : null,
          pick_up_time: reservation?.pick_up_time || null,
          return_date: reservation?.return_date
            ? format(reservation.return_date, "yyyy-MM-dd")
            : null,
          return_time: reservation?.return_time || null,
          pick_up_location: reservation?.pick_up_location?.id || null,
          return_location: reservation?.return_location?.id || null,
          brand_id: reservation?.brand_id ?? null,
          isCreate: false,
        };
      } else {
        setLoader(true);
        requestData = {
          pick_up_date: reservation?.pick_up_date
            ? format(reservation.pick_up_date, "yyyy-MM-dd")
            : null,
          pick_up_time: reservation?.pick_up_time || null,
          return_date: reservation?.return_date
            ? format(reservation.return_date, "yyyy-MM-dd")
            : null,
          return_time: reservation?.return_time || null,
          pick_up_location: reservation?.pick_up_location?.id || null,
          return_location: reservation?.return_location?.id || null,
          brand_id: reservation?.brand_id ?? null,
          isCreate: false,
          min_price: tempTopBarFilter?.priceRange?.[0],
          max_price: tempTopBarFilter?.priceRange?.[1],
          ...(carTypeIds ? { car_type: carTypeIds } : {}),
          ...(tempTopBarFilter?.sortBy
            ? { sort_by: tempTopBarFilter.sortBy }
            : {}),
          ...(tempTopBarFilter?.connectivity
            ? { connectivity: tempTopBarFilter?.connectivity }
            : {}),
          ...(tempTopBarFilter?.seats
            ? { seats: tempTopBarFilter?.seats?.ids }
            : {}),
          ...(tempTopBarFilter?.fuelType
            ? { fuelType: tempTopBarFilter.fuelType }
            : {}),
          ...(tempTopBarFilter?.transmission !== null &&
          tempTopBarFilter?.transmission !== 0
            ? { transmission: tempTopBarFilter.transmission }
            : {}),
        };
      }

      const response = await hqApi.post(
        "car-rental/reservations/dates",
        requestData
      );

      if (response?.status === 200) {
        const vehicles = response.data?.VehicleClasses || [];
        if (vehicles?.length > 0) {
          dispatch(setSelectedVehicleClasses(vehicles));
          if (!isReload) {
            setTobBarFilter(tempTopBarFilter);
          } else {
            setTobBarFilter({
              sortBy: null,
              carType: null,
              priceRange: [100, 900],
              seats: null,
              fuelType: null,
              connectivity: null,
              transmission: 0,
            });
            setTempTopBarFilter({
              sortBy: null,
              carType: null,
              priceRange: [100, 900],
              seats: null,
              fuelType: null,
              connectivity: null,
              transmission: 0,
            });
          }
        } else {
          showErrorToast("Vehicle Not Found in Selected Filter");
        }
        if (variant !== "secondary") {
          setIsDrawerOpen(false);
        }
        setReLoader(false);
        dispatch(setVehicleLoader(false));
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      setReLoader(false);
      dispatch(setVehicleLoader(false));
      console.log("Error fetching vehicle classes:", error);
    }
  };

  const renderPriceRangeFilter = () => (
    <div>
      {variant === "primary" && (
        <div>
          <h1 className="text-[18px] font-semibold">Price range</h1>
          <p className="text-[12px] leading-[15px] font-normal">
            Price per day
          </p>
        </div>
      )}

      <div className="my-[22px]">
        <Slider
          min={100}
          max={900}
          step={10}
          defaultValue={tempTopBarFilter?.priceRange ?? [100, 900]}
          onValueChange={handlePriceChange}
        />
      </div>
      <div className="flex justify-between items-center">
        <div
          className={`py-2 px-2 w-[100px] text-left border-[#E6E6E6] ${
            variant === "primary" ? "bg-white" : "bg-cWhite"
          }  rounded-md`}
        >
          <p className="text-[10px] text-cGray leading-[10px]">Minimum</p>
          <h3 className="font-semibold text-[14px] leading-[20px] mt-1">
            RM {tempTopBarFilter?.priceRange[0]}
          </h3>
        </div>
        <div
          className={`py-2 px-2 w-[100px] border-[#E6E6E6] text-right  ${
            variant === "primary" ? "bg-white" : "bg-cWhite"
          } rounded-md`}
        >
          <p className="text-[10px] text-cGray leading-[10px]">Maximum</p>
          <h3 className="font-semibold text-[14px] leading-[20px] mt-1">
            RM {tempTopBarFilter?.priceRange[1]}
          </h3>
        </div>
      </div>
    </div>
  );

  console.log(tempTopBarFilter.carType);

  // Render Car Type Filter
  const renderCarTypeFilter = () => (
    <div>
      {variant === "primary" && (
        <div>
          <h1 className="text-[17px] font-semibold">Car Type</h1>
        </div>
      )}
      {vehiTypes && (
        <div>
          <div className="flex gap-2 pt-[10px] pb-[17px] overflow-x-auto scrollbar-hide">
            {vehiTypes
              ?.filter((cf) => cf?.id !== 1)
              .map((category) => (
                <div
                  key={category.id}
                  className={`flex items-center gap-2  rounded-full cursor-pointer py-[10px] px-6 font-semibold whitespace-nowrap bg-white flex-shrink-0 ${
                    tempTopBarFilter?.carType?.filter(
                      (fv) => fv?.id === category?.id
                    ).length > 0
                      ? "border border-cSecondary font-medium text-cSecondary"
                      : "border border-[#E6E6E6] font-semibold text-[#BFBFBF]"
                  }`}
                  onClick={() => handleSelectVehicleType(category)}
                >
                  <img
                    style={{
                      width: "35px",
                      height: "100%",
                      filter:
                        tempTopBarFilter?.carType?.filter(
                          (fv) => fv?.id === category?.id
                        ).length > 0
                          ? "brightness(0) saturate(100%) invert(70%) sepia(31%) saturate(1026%) hue-rotate(128deg) brightness(91%) contrast(86%)"
                          : "grayscale(100%) opacity(0.4)",
                    }}
                    src={category.images[0].public_link}
                  />
                  <p
                    className={`text-center ${
                      tempTopBarFilter?.carType?.filter(
                        (fv) => fv?.id === category?.id
                      ).length > 0
                        ? "font-semibold"
                        : "font-normal"
                    } text-[13px]`}
                  >
                    {category.label}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  // Render Feature Filter
  const renderFeatureFilter = (ft) => {
    if (ft?.id === 4) {
      return (
        <div>
          {variant === "primary" && (
            <div>
              <h1 className="text-[17px] font-semibold">{ft?.title}</h1>
            </div>
          )}

          <div className="mt-[10px] border-[#E6E6E6] border-1 rounded-md relative overflow-hidden">
            <div className="flex w-full justify-between items-center relative">
              <div
                className={`absolute top-1 bottom-1 left-0 ${
                  tempTopBarFilter[ft?.label] === 0 ? "ml-1" : "mr-3"
                } w-[33.33%] rounded-md border border-cSecondary bg-white z-0 transition-all duration-300 ease-in-out`}
                style={{
                  transform: `translateX(${
                    (ft?.options?.findIndex(
                      (opt) => opt.id === tempTopBarFilter[ft?.label]
                    ) || 0) * 98
                  }%)`,
                }}
              />
              {ft?.options?.map((ftp) => {
                const isActive = tempTopBarFilter[ft?.label] === ftp?.id;
                return (
                  <div
                    key={ftp.id}
                    className={`relative z-10 rounded-md basis-[33%] cursor-pointer py-[14px] px-4 whitespace-nowrap flex-shrink-0 text-center text-[12px] ${
                      isActive
                        ? "text-cSecondary font-bold"
                        : "text-black font-semibold"
                    }`}
                    onClick={() => handleFeatures(ft, ftp)}
                  >
                    {ftp?.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {variant === "primary" && (
            <div>
              <h1 className="text-[17px] font-semibold">{ft?.title}</h1>
            </div>
          )}
          <div className="mt-[10px]">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-[17px]">
              {ft?.options?.map((ftp) => {
                return (
                  <div
                    key={ftp.id}
                    className={`rounded-full cursor-pointer py-[10px] px-6 font-semibold bg-white whitespace-nowrap flex-shrink-0 ${
                      (ft?.label === "seats"
                        ? tempTopBarFilter[ft?.label]?.id
                        : tempTopBarFilter[ft?.label]) === ftp?.id
                        ? "border border-cSecondary text-cSecondary"
                        : "border border-[#E6E6E6] text-[#BFBFBF]"
                    }`}
                    onClick={() => handleFeatures(ft, ftp)}
                  >
                    <p
                      className={`text-center ${
                        tempTopBarFilter[ft?.label] === ftp?.id
                          ? "font-semibold"
                          : "font-normal"
                      } text-[13px]`}
                    >
                      {ftp?.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  };

  // Primary Layout (Original Design)
  const renderPrimaryLayout = () => (
    <>
      <div className="overflow-y-auto overflow-x-hidden bg-cWhite px-4 pb-2 pt-2 flex-1">
        <div className="w-[95%] mx-auto">
          {/* Price Range Filter */}
          <div className="pt-[8px] pb-[17px] border-b border-[#E6E6E6]">
            {renderPriceRangeFilter()}
          </div>

          {/* Car Type Filter */}
          <div className="pt-[10px] border-b border-[#E6E6E6]">
            {renderCarTypeFilter()}
          </div>

          {/* Feature Filters */}
          {features?.map((ft) => (
            <div
              key={ft.id}
              className={`pt-[10px] ${
                ft?.id !== 4 && "border-b border-[#E6E6E6]"
              }`}
            >
              {renderFeatureFilter(ft)}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="border-t border-cGrayLight px-4 py-4 bg-white">
        <div className="flex justify-between items-center w-[90%] mx-auto">
          <p
            onClick={() => handleSearch(true)}
            className="text-cGray text-[16px] underline cursor-pointer"
          >
            Reset
          </p>
          <Button
            onClick={() => handleSearch(false)}
            className="h-10 flex justify-center items-center bg-cPrimary w-[150px] px-3"
          >
            {loader ? (
              <Spinner size={20} color="#fff" thickness={3} />
            ) : (
              <>
                <span>Search</span>
                <IoIosSearch size={30} />
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );

  // Secondary Layout (Accordion Design)
  const renderSecondaryLayout = () => (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[18px] font-bold">Filters</h1>
      </div>
      <div className="bg-white rounded-md flex-1 shadow-lg px-5 pb-5">
        <div className="flex-1">
          <div className="w-full">
            <Accordion type="multiple" className="space-y-2">
              {/* Price Range Accordion */}
              <AccordionItem value="price-range">
                <AccordionTrigger className="pb-4 text-[16px] font-semibold">
                  <div>
                    <h1 className="text-[16px] font-semibold">Price range</h1>
                    <p className="text-[12px] leading-[15px] font-normal">
                      Price per day
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>{renderPriceRangeFilter()}</AccordionContent>
              </AccordionItem>

              {/* Car Type Accordion */}
              <AccordionItem value="car-type">
                <AccordionTrigger className="py-4 text-[16px] font-semibold">
                  Car Type
                </AccordionTrigger>
                <AccordionContent>{renderCarTypeFilter()}</AccordionContent>
              </AccordionItem>

              {/* Feature Accordions */}
              {features?.map((ft) => (
                <AccordionItem key={ft.id} value={`feature-${ft.id}`}>
                  <AccordionTrigger className="py-4 text-[16px] font-semibold">
                    {ft.title}
                  </AccordionTrigger>
                  <AccordionContent>{renderFeatureFilter(ft)}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Footer Buttons */}
        <div>
          <div className="flex justify-between items-center">
            <p
              onClick={() => handleSearch(true)}
              className="text-cGray text-[16px] underline cursor-pointer"
            >
              Reset
            </p>
            <Button
              onClick={() => handleSearch(false)}
              className="h-10 flex justify-center items-center bg-cPrimary w-[150px] px-3"
            >
              {loader ? (
                <Spinner size={20} color="#fff" thickness={3} />
              ) : (
                <>
                  <span>Search</span>
                  <IoIosSearch size={30} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return variant === "primary"
    ? renderPrimaryLayout()
    : renderSecondaryLayout();
}

export default Filter;
