"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setOpenBg, setSidebarOpen } from "@/store/slices/generalSlice";
import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { label: "Manage Booking", href: "/manage" },
  { label: "Support", href: "/support" },
  { label: "Partnership", href: "/partnership" },
  { label: "Terms & Condition", href: "/terms-and-condition" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

function SideBar() {
  const sidebarOpen = useAppSelector((state) => state.general.sidebarOpen);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const handleCloseSidebar = () => {
    dispatch(setOpenBg(false));
    dispatch(setSidebarOpen(false));
  };

  return (
    <div
      className={`sidebar shadow-xl px-[20px] py-[25px] block xxl:hidden custom-trans ${
        sidebarOpen && "sidebar-active"
      }`}
    >
      <div>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={handleCloseSidebar}
          >
            <p
              className={`py-[15px] cursor-pointer border-b border-cGrayLight font-[400] text-[16px] transition-colors
                ${
                  pathname === link.href
                    ? "text-cSecondary font-semibold"
                    : "hover:text-cSecondary"
                }`}
            >
              {link.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-7">
        <Link href="/login" onClick={handleCloseSidebar}>
          <button className="border-none cursor-pointer outline-none bg-cPrimary rounded-lg w-full py-[13px] font-bold text-white flex justify-center items-center gap-1.5 text-[16px]">
            <span>Login</span>
          </button>
        </Link>
        <Link href="/signup" onClick={handleCloseSidebar}>
          <button className="border-none cursor-pointer mt-3 outline-none bg-cPrimary rounded-lg w-full py-[13px] font-bold text-white flex justify-center items-center gap-1.5 text-[16px]">
            <span>Signup</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
