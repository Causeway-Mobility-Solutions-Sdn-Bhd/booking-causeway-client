"use client";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MdKeyboardArrowDown } from "react-icons/md";
import { setAllCurrencies, setCurrency } from "@/store/slices/reservationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import hqApi from "@/lib/hqApi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const currencies = ["myr", "sgd", "usd", "eur", "cny"];

function CurrencyDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterCurrencies, setFilterCurrencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const currency = useAppSelector((state) => state.reservation.currency);
  const allCurrencies = useAppSelector(
    (state) => state.reservation.allCurrencies
  );
  const dispatch = useAppDispatch();

  const handleCurrencyChange = (newCurrency) => {
    if (newCurrency !== currency) {
      dispatch(setCurrency(newCurrency));
    }
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currencyRes = await hqApi.get("/fleets/currencies");
        dispatch(setAllCurrencies(currencyRes?.data?.data));
        setFilterCurrencies(currencyRes?.data?.data);
      } catch (error) {
        console.log("API error:", error);
      }
    };

    fetchData();
  }, [isDrawerOpen]);

  const handleClearInput = () => {
    setSearchTerm("");
    setFilterCurrencies(allCurrencies);
  };

  const filterLocations = (value) => {
    if (value === "") {
      setFilterCurrencies(allCurrencies);
      setSearchTerm("");
      return;
    }
    const filtered = allCurrencies?.filter((cur) =>
      cur?.label?.toLowerCase().includes(value.toLowerCase())
    );
    setFilterCurrencies(filtered);
    setSearchTerm(value);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <div className="text-cSecondary cursor-pointer z-100 text-cGreen font-bold flex justify-center gap-0 items-center">
          <span>{currency.toUpperCase()}</span>{" "}
          <MdKeyboardArrowDown size={20} />{" "}
        </div>
      </DrawerTrigger>
      <DrawerContent className={`z-90 flex flex-col `}>
        <DrawerHeader className="flex items-center justify-between border-b border-[#e6e6e6] px-4 py-3 relative">
          <DrawerTitle className="text-center w-full text-lg font-semibold text-gray-800">
            Currency
          </DrawerTitle>
        </DrawerHeader>
        <div className="h-fit">
          <div className="border-b py-[15px] px-[10px] flex-shrink-0">
            <div className="border rounded-lg flex justify-between gap-1 items-center">
              <input
                value={searchTerm}
                onChange={(e) => filterLocations(e.target.value)}
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

          <div className="flex-1 h-[300px] overflow-y-auto">
            {filterCurrencies?.length >= 0 && (
              <div className="bg-[#F0F0F0] px-[10px] py-[8px] font-semibold">
                Recommended
              </div>
            )}
            <div>
              <RadioGroup
                className="px-[10px]"
                value={currency}
                onValueChange={(val) => handleCurrencyChange(val)}
              >
                {filterCurrencies
                  ?.filter((crf) => currencies.includes(crf?.code))
                  .map((cur, index) => (
                    <div key={index}>
                      <div
                        key={cur?.code}
                        className="py-[4px] w-full border-b flex items-center justify-between  cursor-pointer"
                      >
                        <div className="flex justify-start items-center space-x-2">
                          <RadioGroupItem
                            value={cur?.code.toString()}
                            id={`location-${cur?.code}`}
                          />
                          <Label
                            className="w-full cursor-pointer py-[10px]"
                            htmlFor={`location-${cur?.code}`}
                          >
                            {cur?.label}
                          </Label>
                        </div>
                        <p className="text-cGray text-[12px]">
                          {cur?.code?.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  ))}
              </RadioGroup>
            </div>
            {filterCurrencies?.length >= 0 && (
              <div className="bg-[#F0F0F0] px-[10px] py-[8px] font-semibold">
                Other
              </div>
            )}
            <div>
              <RadioGroup
                className="px-[10px]"
                value={currency}
                onValueChange={(val) => handleCurrencyChange(val)}
              >
                {filterCurrencies
                  ?.filter((crf) => !currencies.includes(crf?.code))
                  .map((cur, index) => (
                    <div key={index}>
                      <div
                        key={cur?.code}
                        className="py-[4px] w-full border-b flex items-center justify-between  cursor-pointer"
                      >
                        <div className="flex justify-start items-center space-x-2">
                          <RadioGroupItem
                            value={cur?.code.toString()}
                            id={`location-${cur?.code}`}
                          />
                          <Label
                            className="w-full cursor-pointer py-[10px]"
                            htmlFor={`location-${cur?.code}`}
                          >
                            {cur?.label}
                          </Label>
                        </div>
                        <p className="text-cGray text-[12px]">
                          {cur?.code?.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CurrencyDrawer;
