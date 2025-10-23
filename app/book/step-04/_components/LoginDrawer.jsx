"use client";

import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
} from "@/components/ui/drawer";
import LoginC from "@/app/_components/LoginC";

function LoginDrawer({ isDrawerOpen, setIsDrawerOpen, setActiveTab }) {
  const handleDrawer = (open) => {
    setActiveTab("guest");
    setIsDrawerOpen(open);
  };
  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleDrawer}>
      <DrawerContent className="z-90 flex flex-col h-[75vh]">
        {/* Header in white */}
        <DrawerHeader className="flex items-center flex-row justify-between border-b relative w-full px-[10px] mx-auto py-1 flex-shrink-0 bg-white">
          <DrawerTitle className="text-lg text-center py-[8px] w-full">
            Sign In
          </DrawerTitle>
        </DrawerHeader>

        {/* Content in cWhite */}
        <div className="flex-1 pt-4 bg-cWhite">
          <div className="w-[95%] mx-auto flex justify-center items-center">
            <LoginC type="secondary" setIsDrawerOpen={setIsDrawerOpen} />
          </div>
          <div className="text-center mt-4">
            <p className="text-[16px]">
              Don&apos;t have an account?{" "}
              <span className="text-cSecondary font-bold transition-colors cursor-pointer">
                Sign up
              </span>
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default LoginDrawer;
