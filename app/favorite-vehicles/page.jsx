"use client"
import SubNavBar from '@/components/custom/SubNavBar'
import React from 'react'
import SavedVehicle from './_components/SavedVehicle'

function page() {
  return (
    <div>
        <SubNavBar name="Favourite Vehicles" />
        <SavedVehicle />
    </div>
  )
}

export default page