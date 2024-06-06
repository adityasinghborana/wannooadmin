'use client'
import { usePathname, useRouter } from "next/navigation";
import Navbar from "../ui/dashboard/navbar/Navbar";
import Sidebar from "../ui/dashboard/sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useState } from "react";

const DashboardLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter()
  const [user, loading, error] = useAuthState(auth);
  
  if (!user && !loading && !error && !pathName.includes('/signIn')) {
    router.replace('/signIn');
    return null; // Render nothing while redirecting
  }

  if(user){
    return (
      <div className="flex md:flex-row md:gap-5 min-w-full min-h-full">
        {pathName.includes("tours/") ? (
          <>
            {children}
          </>
        ) : (
          <>
            <div className="w-full md:w-1/5 min-h-[97vh] bg-[#182237] hidden md:block">
              <Sidebar />
            </div>
            <div className="w-full md:w-4/5 mt-2">
              <Navbar />
              {children}
            </div>
          </>
        )}
      </div>
    );
  }
};

export default DashboardLayout;
