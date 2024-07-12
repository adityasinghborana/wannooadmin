"use client";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "../ui/dashboard/navbar/Navbar";
import Sidebar from "../ui/dashboard/sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { CheckIsAdmin } from "@/lib/store/features/isAdmin/isAdminSlice";
import { CheckIsVendor } from "@/lib/services";

const DashboardLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUser = async () => {
      try {
        let user = JSON.parse(localStorage.getItem("user")!);
        let data = await CheckIsVendor(user?.uid ?? "nun");

        if (data?.data?.isAdmin == true) {
          dispatch(CheckIsAdmin(true));
        } else {
          dispatch(CheckIsAdmin(false));
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkUser();
  }, []);

  if (!user && !loading && !error && !pathName.includes("/signIn")) {
    router.replace("/admin/signIn");
    return null; // Render nothing while redirecting
  }

  if (user) {
    return (
      <div className="flex md:flex-row md:gap-5 min-w-full overflow-hidden">
        {pathName.includes("tours/") ? (
          <div className="flex flex-col w-full h-full">{children}</div>
        ) : (
          <div
            className="flex flex-row w-full"
            style={{ maxHeight: "calc(100vh)" }}
          >
            <div className="shadow-2xl w-full pr-2 md:w-1/6 bg-primary-foreground hidden md:block rounded-r-3xl">
              <Sidebar />
            </div>
            <div className="flex flex-col flex-grow w-full h-full">
              <div className="mx-8 my-2">
                <Navbar />
                {children}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default DashboardLayout;
