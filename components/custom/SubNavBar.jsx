import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdMenu } from "react-icons/io";

function SubNavBar({ name, menuRequired = false, onOpenMenu }) {
  const router = useRouter();
  const onClick = () => {
    router.replace("/");
  };
  return (
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative border-b border-gray-200 bg-white">
      <button
        onClick={onClick}
        className=" p-2 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft className="w-7 h-7 text-[#2DBDB6]" strokeWidth={3} />
      </button>
      <h1 className="text-gray-900 text-base font-bold leading-[18px]">
        {name}
      </h1>
      {menuRequired && (
        <IoMdMenu
          onClick={onOpenMenu}
          color="#2DBDB6"
          size={35}
          className="block sm:hidden cursor-pointer"
        />
      )}
    </div>
  );
}

export default SubNavBar;
