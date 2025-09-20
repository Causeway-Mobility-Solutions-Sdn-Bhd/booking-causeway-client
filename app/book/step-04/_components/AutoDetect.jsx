import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoCheckmarkCircle } from "react-icons/io5";

function AutoDetect() {
  return (
    <Dialog  >
      <DialogTrigger asChild>
        <Button>Open Auto Detect</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl p-6 text-center">
        <div className="flex justify-center">
          <IoCheckmarkCircle size={100} className=" text-cSecondary" />
        </div>

        <DialogHeader className={'w-[85%] mx-auto'} >
          <DialogTitle className="text-[28px] text-center font-bold">
            Sign-in to your account?
          </DialogTitle>
          <DialogDescription className="text-[15px] text-center mt-2">
            We have found your account with your License Number.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3 flex flex-col gap-3">
          <Button className="bg-cPrimary hover:bg-cPrimary  h-12 text-white w-full">
            Sign in
          </Button>
          <Button
            variant="outline"
            className="border-cPrimary hover:bg-transparent hover:text-cPrimary text-cPrimary h-12 w-full"
          >
            Continue as guest
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AutoDetect;
