import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Arsalaan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ToastContainer />
      <StoreProvider>
        <body className={inter.className} id="__next">
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
