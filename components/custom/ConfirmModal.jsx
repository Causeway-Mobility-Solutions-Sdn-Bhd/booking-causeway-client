import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
  DrawerFooter,
} from "@/components/ui/drawer";
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Cancel Booking",
  modalSubTitle,
  description,
  cancellationOptions = [],
  confirmButtonText = "Cancellation Options",
  cancelButtonText,
  drawerVariantRequired,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <>
      {drawerVariantRequired && window.innerWidth <= 640 && (
        <Drawer open={isOpen} onOpenChange={onClose}>
          <DrawerContent className="z-90 flex flex-col h-[65vh]">
            {/* Header in white */}
            <DrawerHeader className="flex items-center flex-row justify-between border-b relative w-full px-[10px] mx-auto py-1 flex-shrink-0 bg-white">
              <DrawerTitle className="text-lg text-center py-[8px] w-full">
                Cancel booking
              </DrawerTitle>
            </DrawerHeader>

            {/* Content in cWhite */}
            <div className="flex-1  bg-cWhite">
              <div className="space-y-4 p-8">
                {modalSubTitle && (
                  <h4 className="font-bold">{modalSubTitle}</h4>
                )}

                {cancellationOptions.length > 0 && (
                  <div className="space-y-3">
                    {cancellationOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-start space-x-2 py-3"
                      >
                        <div className="flex items-center h-5">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              option.isFree ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                        </div>
                        <div className="grid gap-1.5 leading-none">
                          <span
                            className={`text-sm font-medium ${
                              option.isFree ? "text-green-800" : "text-red-800"
                            }`}
                          >
                            {option.label}
                          </span>
                          <p className="text-sm text-gray-800">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <DrawerFooter className="flex !flex-col border-t">
              <Button
                onClick={handleConfirm}
                className="cursor-pointer font-bold bg-cPrimary !py-6"
              >
                {confirmButtonText}
              </Button>
              {cancelButtonText && (
                <Button
                  className="cursor-pointer font-bold bg-transparent text-cPrimary !py-6"
                  onClick={onClose}
                >
                  {cancelButtonText}
                </Button>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      {(!drawerVariantRequired || window.innerWidth >= 640) && (
        <div
          className={`${drawerVariantRequired ? "hidden sm:block" : "block"}`}
        >
          <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
              closeButtonColor="#ff748b"
              className="w-[85vw] max-w-md sm:max-w-sm"
            >
              <DialogHeader className={"!text-left"}>
                <DialogTitle className="font-extrabold leading-normal pr-4">
                  {title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-2">
                {description && (
                  <p className="font-normal leading-snug">{description}</p>
                )}
                {modalSubTitle && (
                  <h4 className="font-bold">{modalSubTitle}</h4>
                )}

                {cancellationOptions.length > 0 && (
                  <div className="space-y-3">
                    {cancellationOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-start space-x-2 py-3"
                      >
                        <div className="flex items-center h-5">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              option.isFree ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                        </div>
                        <div className="grid gap-1.5 leading-none">
                          <span
                            className={`text-sm font-medium ${
                              option.isFree ? "text-green-800" : "text-red-800"
                            }`}
                          >
                            {option.label}
                          </span>
                          <p className="text-sm text-gray-800">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <DialogFooter className="flex !flex-col">
                <Button
                  onClick={handleConfirm}
                  className="cursor-pointer font-bold bg-cPrimary !py-6"
                >
                  {confirmButtonText}
                </Button>
                {cancelButtonText && (
                  <Button
                    className="cursor-pointer hover:font-extrabold hover:bg-transparent bg-transparent font-bold text-cPrimary !py-6"
                    onClick={onClose}
                  >
                    {cancelButtonText}
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
