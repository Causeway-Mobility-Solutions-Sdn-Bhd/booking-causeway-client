"use client";

import Nav from "../components/custom/Nav";
import Banner from "./_components/Banner";
import BottomBar from "./_components/BottomBar";
import SideBar from "./_components/SideBar";
import CarList from "./_components/CarList";
import WhyCauseway from "./_components/WhyCauseway";
import Partners from "./_components/Partners";
import SpecialOffer from "./_components/SpecialOffer";
import Feauters from "./_components/Feauters";
import TopRanked from "./_components/Topranked";

import { Wrench } from 'lucide-react';


export default function Home() {
  return (
   <>
    {
      process.env.NODE_ENV !== 'production' ? (<UnderDevelopment />) :
      (
          <div>
      <Nav isPrimary={false} />
      <Banner />
      <Feauters />
      <SpecialOffer />
      <BottomBar page="Home" />
      <SideBar />
      <CarList />
      <TopRanked />
      <WhyCauseway />
      <Partners />
    </div>
      )
    }
   </>
  
  );
}


function UnderDevelopment() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <Wrench className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Under Development
        </h1>
        
        <p className="text-gray-600 mb-6">
          We're working hard to bring you something great. Please check back soon!
        </p>
        
        <div className="text-sm text-gray-500">
          Coming Soon
        </div>
      </div>
    </div>
  );
}