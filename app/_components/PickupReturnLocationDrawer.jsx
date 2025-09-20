"use client";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import { RxCross2 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import hqApi from "@/lib/hqApi";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Spinner from "@/components/custom/Spinner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsDifferentReturnLocation } from "@/store/slices/reservationSlice";

function PickupReturnLocationDrawer({
  name,
  bookingLocation,
  setBookingLocation,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [locationBrands, setLocationBrands] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrandLocations, setSelectedBrandLocations] = useState(0);

  const dispatch = useAppDispatch();
  const isDifferentReturnLocation = useAppSelector(
    (state) => state.reservation.isDifferentReturnLocation
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsRes, locationsRes] = await Promise.all([
          hqApi.get("/fleets/locations-brands"),
          hqApi.get("/fleets/locations"),
        ]);

        setLocationBrands(brandsRes?.data);
        const groupedBrands = transformLocationsByBrand(locationsRes?.data);
        setLocations(groupedBrands);
        setFilteredLocations(groupedBrands);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, []);

  const transformLocationsByBrand = (locations) => {
    const brandMap = new Map();

    locations.forEach((location) => {
      const { brand_id, brand } = location;

      if (!brandMap.has(brand_id)) {
        brandMap.set(brand_id, {
          brand_id,
          brand_name: brand?.name || `Brand ${brand_id}`,
          locations: [],
        });
      }

      brandMap.get(brand_id).locations.push(location);
    });

    return Array.from(brandMap.values());
  };

  const handleBookingLocationChange = (selectedId) => {
    const selectedLocation = locations
      .flatMap((brand) => brand.locations)
      .find((loc) => loc.id.toString() === selectedId);

    if (!selectedLocation) return;

    if (name === "Pickup Point") {
      setBookingLocation((prev) => ({
        ...prev,
        pickupLocation: selectedLocation.id,
        pickupLocationName: selectedLocation.name,
        brandId: selectedLocation.brand_id,
      }));
    }
    if (name === "Return Point") {
      setBookingLocation((prev) => ({
        ...prev,
        returnLocation: selectedLocation.id,
        returnLocationName: selectedLocation.name,
      }));
    }

    if (name === "Pickup & Return Point") {
      setBookingLocation((prev) => ({
        ...prev,
        pickupLocation: selectedLocation.id,
        returnLocation: selectedLocation.id,
        pickupLocationName: selectedLocation.name,
        returnLocationName: selectedLocation.name,
        brandId: selectedLocation.brand_id,
      }));
    }
    setIsDrawerOpen(false);
  };

  const filterLocations = (term, brandId) => {
    let filtered = locations;
    setSelectedBrandLocations(brandId);
    setSearchTerm(term);

    if (brandId !== 0) {
      filtered = filtered.filter((brand) => brand.brand_id === brandId);
    } else {
      filtered = locations;
    }

    if (term.trim() !== "") {
      filtered = filtered
        .map((brand) => {
          const filteredBrandLocations = brand.locations.filter((location) =>
            location.name.toLowerCase().includes(term.toLowerCase())
          );

          return {
            ...brand,
            locations: filteredBrandLocations,
          };
        })
        .filter((brand) => brand.locations.length > 0);
    }

    setFilteredLocations(filtered);
  };

  const handleClearInput = () => {
    setSearchTerm("");
    filterLocations("", selectedBrandLocations);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <div className="basis-[100%] lg:basis-[40%] w-full">
        <DrawerTrigger asChild>
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-_R_9h5fdb_"
            className="flex cursor-pointer text-left justify-between items-center w-full border-1 border-cGrayLight rounded-lg py-2 px-3"
          >
            <div className="text-left">
              <p className="text-cGray text-[12px] text-left">{name}</p>
              <h3 className="text-[14px] xsm:text-[16px]">
                {(() => {
                  const selectedName =
                    name === "Pickup Point"
                      ? bookingLocation?.pickupLocationName
                      : name === "Return Point"
                      ? bookingLocation?.returnLocationName
                      : bookingLocation?.pickupLocationName;

                  if (!selectedName) return `Select ${name}`;

                  return selectedName.length > 30
                    ? selectedName.slice(0, 30) + "..."
                    : selectedName;
                })()}
              </h3>
            </div>
            <MdKeyboardArrowDown className="text-cSecondary text-[20px] sm:text-[30px]" />
          </button>
        </DrawerTrigger>
        {name !== "Return Point" && (
          <label className="mt-2 hidden lg:flex justify-start gap-1 items-center">
            <Checkbox
              checked={isDifferentReturnLocation}
              onCheckedChange={(checked) => {
                dispatch(
                  setIsDifferentReturnLocation(
                    reservation?.pick_up_location?.id !==
                      reservation?.return_location?.id
                  )
                );
              }}
              id="terms"
            />
            <h3 className="m-0 text-[15px] lg:text-[16px]">
              {isDifferentReturnLocation
                ? "Return at same location"
                : "Return at different location"}
            </h3>
          </label>
        )}
      </div>

      <DrawerContent className="h-[80vh] z-95 flex flex-col">
        <DrawerHeader className="flex items-center flex-row justify-between border-b relative w-full px-[10px] mx-auto py-1 flex-shrink-0">
          <DrawerTitle className="text-lg text-center py-[8px] w-full ">
            {name}
          </DrawerTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDrawerOpen(false)}
            className="h-8 w-8 p-0  absolute cursor-pointer left-2 text-cSecondary"
          >
            <RxCross2 className="text-cSecondary text-[25px]" />
          </Button>
        </DrawerHeader>

        {locations?.length === 0 ? (
          <div className="w-full h-[200px] flex justify-center items-center">
            <Spinner size={30} color={"#2dbdb6"} thickness={4} />
          </div>
        ) : (
          <>
            {/* Search Bar */}
            <div className="border-b py-[15px] px-[10px] flex-shrink-0">
              <div className="border rounded-lg flex justify-between gap-1 items-center">
                <input
                  value={searchTerm}
                  onChange={(e) =>
                    filterLocations(e.target.value, selectedBrandLocations)
                  }
                  type="text"
                  placeholder="Search"
                  className="text-[16px] text-ctextGray placeholder:text-ctextGray outline-none border-none pl-2 py-3 basis-[90%] w-full"
                />
                {!searchTerm ? (
                  <IoIosSearch className="basis-[10%] flex justify-end items-center text-right pr-2 text-[20px] text-cSecondary" />
                ) : (
                  <RxCross2
                    className="basis-[10%] flex justify-end cursor-pointer items-center text-right pr-2 text-[20px] text-cSecondary"
                    onClick={() => handleClearInput()}
                  />
                )}
              </div>
            </div>

            {filteredLocations?.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-ctextGray">No locations found.</p>
              </div>
            ) : (
              <>
                {/* Filter Buttons */}
                <div className="overflow-x-auto flex-shrink-0">
                  <div className="py-[15px] pl-[10px] flex justify-start gap-2 w-max">
                    <div
                      className={`rounded-full cursor-pointer py-2 px-4 font-semibold ${
                        selectedBrandLocations === 0
                          ? "border-2 border-cSecondary text-cSecondary"
                          : "border border-ctextGray text-ctextGray"
                      }`}
                      onClick={() => filterLocations(searchTerm, 0)}
                    >
                      <p className="text-center text-[12px]">All Location</p>
                    </div>
                    {locationBrands?.map((brand) => (
                      <div
                        key={brand.id}
                        className={`rounded-full cursor-pointer py-2 px-4 font-semibold ${
                          selectedBrandLocations === brand.id
                            ? "border-2 border-cSecondary text-cSecondary"
                            : "border border-ctextGray text-ctextGray"
                        }`}
                        onClick={() => filterLocations(searchTerm, brand?.id)}
                      >
                        <p className="text-center text-[12px]">{brand?.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div>
                    {filteredLocations?.map((brand) => (
                      <div key={brand.brand_id}>
                        <div className="bg-[#F0F0F0] px-[10px] py-[8px] font-semibold">
                          {brand?.brand_name}
                        </div>

                        <RadioGroup
                          className="px-[10px]"
                          value={
                            name === "Pickup Point"
                              ? bookingLocation?.pickupLocation?.toString()
                              : name === "Return Point"
                              ? bookingLocation?.returnLocation?.toString()
                              : bookingLocation?.pickupLocation?.toString()
                          }
                          onValueChange={(val) =>
                            handleBookingLocationChange(val)
                          }
                        >
                          {brand?.locations?.map((location) => (
                            <div
                              key={location?.id}
                              className="py-[4px] w-full border-b flex items-center space-x-2 cursor-pointer"
                            >
                              <RadioGroupItem
                                value={location.id.toString()}
                                id={`location-${location.id}`}
                              />
                              <Label
                                className="w-full cursor-pointer py-[10px]"
                                htmlFor={`location-${location?.id}`}
                              >
                                {location?.name}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default PickupReturnLocationDrawer;
