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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Cancel Booking",
  modalSubTitle,
  description = "Please review the cancellation policy and select an option.",
  cancellationOptions,
  confirmButtonText = "Cancellation Options",
  cancelButtonText,
}) => {
  const handleConfirm = () => {
    if (selectedOption) {
      onConfirm(selectedOption);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent closeButtonColor="#ff748b" className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className={"font-extrabold"}>{title}</DialogTitle>
          {/* <DialogDescription>{description}</DialogDescription> */}
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            {modalSubTitle && <h4 className="font-bold">{modalSubTitle}</h4>}
            {cancellationOptions.length > 0 && (
              <div className="space-y-3">
                {cancellationOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-start space-x-2 py-3`}
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

        <DialogFooter className="flex !flex-col">
          <Button
            onClick={handleConfirm}
            className={"cursor-pointer bg-cPrimary !py-6"}
          >
            {confirmButtonText}
          </Button>
          {cancelButtonText && (
            <Button
              className={"cursor-pointer bg-transparent text-cPrimary !py-6"}
              onClick={onClose}
            >
              {cancelButtonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
