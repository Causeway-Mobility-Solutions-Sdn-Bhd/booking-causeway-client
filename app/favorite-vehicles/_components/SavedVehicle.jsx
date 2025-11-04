"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { setFavorites } from "@/store/slices/reservationSlice";
import { useGetFavoriteVehiclesQuery } from "@/store/api/fleetApiSlice";
import SavedCar from "./SavedCar";
import { SavedCarSkeleton } from "@/components/custom/Skeleton";

function SavedVehicle() {
  const dispatch = useDispatch();
  const favorites = useAppSelector((state) => state.reservation.favorites);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    dispatch(setFavorites(storedFavorites));
  }, [dispatch]);

  const {
    data: favoriteVehicles = [],
    isLoading,
    isError,
  } = useGetFavoriteVehiclesQuery(favorites, {
    skip: favorites.length === 0,
  });

  console.log("Favorite Vehicles:", favoriteVehicles);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-6">
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6">
          {[...Array(10)].map((_, i) => (
            <SavedCarSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && !isError && favoriteVehicles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {favoriteVehicles.map((car) => (
            <SavedCar key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedVehicle;
