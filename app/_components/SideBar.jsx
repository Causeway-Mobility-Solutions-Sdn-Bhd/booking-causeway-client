"use client";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenBg, setSidebarOpen } from "@/store/slices/generalSlice";
import { useRouter } from "next/navigation"; 

function SideBar() {
  const sidebarOpen = useAppSelector(
    (state) => state.general.sidebarOpen
  );
  const dispatch = useAppDispatch();
  const router = useRouter(); 

  const handleLinkClick = (href) => {
    
    dispatch(setOpenBg(false));
    dispatch(setSidebarOpen(false));
    
    
    router.push(href);
  };

  return (
    <div
      className={`sidebar shadow-xl px-[20px] py-[25px] block xxl:hidden custom-trans ${
        sidebarOpen && "sidebar-active"
      }`}
    >
      <div>
        <div onClick={() => handleLinkClick("/manage")}>
          <p className="py-[15px] cursor-pointer border-b border-cGrayLight font-[400] text-[16px] hover:text-cSecondary transition-colors">
            Manage Booking
          </p>
        </div>
        <div onClick={() => handleLinkClick("/partnership")}>
          <p className="py-[15px] cursor-pointer border-b border-cGrayLight font-[400] text-[16px] hover:text-cSecondary transition-colors">
            Support
          </p>
        </div>
        <div onClick={() => handleLinkClick("/partnership")}>
          <p className="py-[15px] cursor-pointer border-b border-cGrayLight font-[400] text-[16px] hover:text-cSecondary transition-colors">
            Partnership
          </p>
        </div>
        <div onClick={() => handleLinkClick("/terms-and-condition")}>
          <p className="py-[15px] cursor-pointer border-b border-cGrayLight font-[400] text-[16px] hover:text-cSecondary transition-colors">
            Terms & Condition
          </p>
        </div>
        <div onClick={() => handleLinkClick("/privacy-policy")}>
          <p className="py-[15px] cursor-pointer border-b border-cGrayLight font-[400] text-[16px] hover:text-cSecondary transition-colors">
            Privacy Policy
          </p>
        </div>
      </div>
      <div className="mt-7">
        <div onClick={() => handleLinkClick("/login")}>
          <button className="border-none cursor-pointer outline-none bg-cPrimary rounded-lg w-full py-[13px] font-bold text-white flex justify-center items-center gap-1.5 text-[16px]">
            <span>Login</span>
          </button>
        </div>
        <div onClick={() => handleLinkClick("/Signup")}>
          <button className="border-none cursor-pointer mt-3 outline-none bg-cPrimary rounded-lg w-full py-[13px] font-bold text-white flex justify-center items-center gap-1.5 text-[16px]">
            <span>Signup</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;