import React, { useState, useRef } from "react";
import {
  Plus,
  X,
  Camera,
  ImageIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
export const ImageUpload = ({
  files,
  setFiles,
  placeholder = "Upload Document Here",
  accept = ".jpg,.jpeg,.png,.webp",
  multiple = true,
  maxFiles = 4,
  label,
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile on component mount
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
    e.target.value = null;
  };

  const fileArray = Array.isArray(files) ? files : [];

  const processFiles = (selectedFiles) => {
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (multiple) {
      const currentFileCount = fileArray.length;
      const remainingSlots = maxFiles - currentFileCount;
      const filesToAdd = imageFiles.slice(0, remainingSlots);

      setFiles([...fileArray, ...filesToAdd]);
    } else {
      setFiles(imageFiles.slice(0, 1));
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(fileArray.filter((_, index) => index !== indexToRemove));
  };

  const createImagePreview = (file) => {
    return URL.createObjectURL(file);
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const handleGalleryUpload = () => {
    fileInputRef.current?.click();
  };

  const handleButtonClick = () => {
    if (!isMobile) {
      fileInputRef.current?.click();
    }
  };

  const UploadButton = () => {
    const buttonContent = (
      <Button
        type="button"
        variant="outline"
        onClick={!isMobile ? handleButtonClick : undefined}
        className={`w-full h-full flex items-center justify-between px-3 bg-white transition-colors hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 border-gray-200 ${
          error ? "border-red-500" : ""
        }`}
      >
        <span className="font-light text-gray-500 text-sm">{placeholder}</span>
        <Plus className="h-4 w-4" style={{ color: "#2dbdb6" }} />
      </Button>
    );

    if (isMobile) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{buttonContent}</DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={handleCameraCapture}
              className="cursor-pointer"
            >
              <Camera className="mr-2 h-4 w-4" />
              <span>Take a Photo</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleGalleryUpload}
              className="cursor-pointer"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              <span>From Image Gallery</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return buttonContent;
  };

  return (
    <div className="w-full">
      {/* Upload Button Container - Fixed Height */}
      <div className="h-11 w-full">
        {/* Regular file input for gallery/desktop */}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Camera input for mobile camera capture */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple={multiple}
          onChange={handleFileUpload}
          className="hidden"
        />

        <UploadButton />
      </div>

      {/* Label - Outside the height-constrained container */}

      {/* <p className={`text-sm mt-2 ${error ? "text-red-500" : ""}`}>{label}</p> */}

      {/* Instuction */}
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full mt-2"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-normal text-gray-800">Instructions</p>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-9 p-0 flex items-center gap-2"
            >
              {isOpen ? (
                <>
                  <ChevronUp color="#000" className="h-4 w-4" />
                </>
              ) : (
                <>
                  <ChevronDown color="#000" className="h-4 w-4" />
                </>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <ul className="list-disc list-inside text-sm">
            <li>File must be JPG, PNG & PDF</li>
            <li>Max 4 files, up to 5 MB</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>

      {/* Image Previews - Outside the height-constrained container */}
      {fileArray && fileArray.length > 0 && (
        <div className="w-full mt-2 flex flex-wrap gap-3">
          {fileArray.map((file, index) => (
            <div
              key={index}
              className="relative group w-[70px] h-[70px] flex-shrink-0"
            >
              <div className="w-full h-full rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={createImagePreview(file)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 z-20"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
