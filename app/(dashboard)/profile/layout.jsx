"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User, FileText, Shield, HelpCircle, ChevronRight } from "lucide-react";
import Nav from "@/app/_components/Nav";
import ProfileSidebar from "./_components/ProfileSidebar";

export default function ProfileLayout({ children }) {
  return (
    <>
      <Nav isMain={true} value="Home" />
      <div className="pb-32 py-5  sm:py-[30px] max-w-[1400px] mx-auto w-[92%]">
        <div className="mt-2.5 flex justify-start items-start gap-5 flex-col lg:flex-row">
          {/* Sidebar */}

          <ProfileSidebar />
          {/* Active Section */}
          <div className="flex-1 w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
