"use client";

import Nav from "./_components/Nav";
import Banner from "./_components/Banner";
import BottomBar from "./_components/BottomBar";
import SideBar from "./_components/SideBar";
import CarList from "./_components/CarList";
import WhyCauseway from "./_components/WhyCauseway";
import Partners from "./_components/Partners";
import SpecialOffer from "./_components/SpecialOffer";
import Feauters from "./_components/Feauters";
import TopRanked from "./_components/Topranked";

export default function Home() {
  return (
    <div>
      <Nav isMain={true} value="Home"/>
      <Banner />
      <Feauters />
      <SpecialOffer />
      <BottomBar />
      <SideBar />
      <CarList />
      <TopRanked />
      <WhyCauseway />
      <Partners />
    </div>
  );
}


