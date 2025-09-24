import { Poppins } from "next/font/google";
import "./globals.css";
import BlackBg from "@/components/custom/BlackBg";
import { Toaster } from "sonner";
import Providers from "./provider";
import RefreshTokenLoader from "./_components/RefreshTokenLoader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Causeway Car Rental Booking",
  description: "A car rental booking application for Causeway Car Rental",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/banner/banner.webp" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
          <Providers>
            {children}
            {/* <RefreshTokenLoader /> */}
            <BlackBg />
            <Toaster
              position="top-left"
              expand={true}
              richColors={true}
              closeButton={false}
              duration={5000}
            />
          </Providers>
      </body>
    </html>
  );
}
