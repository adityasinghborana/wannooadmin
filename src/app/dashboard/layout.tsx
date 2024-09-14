"use client";
import { auth } from "@/firebase/config";
import { CheckIsVendor } from "@/lib/services";
import { CheckIsAdmin } from "@/lib/store/features/isAdmin/isAdminSlice";
import Cookie from 'js-cookie';
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import Navbar from "../ui/dashboard/navbar/Navbar";
import Sidebar from "../ui/dashboard/sidebar/Sidebar";

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
        let user = JSON.parse(Cookie.get('user')!);
        let data = await CheckIsVendor(user?.uid ?? "nun");        
        if (data?.data?.isAdmin == true) {
          dispatch(CheckIsAdmin(true));
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkUser();
  }, []);

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
