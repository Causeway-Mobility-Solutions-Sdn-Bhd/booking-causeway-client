"use client";

import { useAppSelector, useAppDispatch, useLoggedUser } from "@/store/hooks";
import { setOpenBg, setSidebarOpen } from "@/store/slices/generalSlice";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLogoutMutation } from "@/store/api/authApiSlice";
import { showErrorToast, showSuccessToast } from "../_lib/toast";

function SideBar() {
  const sidebarOpen = useAppSelector((state) => state.general.sidebarOpen);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const user = useLoggedUser();

  const links = [
    {
      label: "Manage Booking",
      href: user ? "/manage-booking" : "manage",
    },
    { label: "Support", href: "/support" },
    { label: "Partnership", href: "/partnership" },
    { label: "Terms & Condition", href: "/terms-and-condition" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ];

  const handleCloseSidebar = () => {
    dispatch(setOpenBg(false));
    dispatch(setSidebarOpen(false));
  };

  const [logout, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      showSuccessToast("Logged out successfully");
      handleCloseSidebar();
      router.push("/");
    } catch (error) {
      showErrorToast("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      className={`sidebar shadow-xl px-[20px] py-[25px] block xxl:hidden custom-trans ${
        sidebarOpen && "sidebar-active"
      }`}
    >
      {/* Logo Section */}
      <div className="flex justify-left items-left mb-8">
        <Link href="/" onClick={handleCloseSidebar}>
          <Image
            priority
            className="object-contain w-[150px]"
            src="/logo/logo-black.svg"
            alt="Causeway Logo"
            width={150}
            height={50}
          />
        </Link>
      </div>

      <div>
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={handleCloseSidebar}>
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
        {user ? (
          <button
            onClick={handleLogout}
            className="border-none cursor-pointer outline-none bg-cPrimary rounded-lg w-full py-[13px] font-bold text-white flex justify-center items-center gap-1.5 text-[16px]"
          >
            <span>Logout</span>
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default SideBar;