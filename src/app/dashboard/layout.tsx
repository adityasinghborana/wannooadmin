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
            <div className=" shadow-2xl w-full pr-2 md:w-1/6 min-h-[97vh] bg-primary-foreground hidden md:block rounded-2xl mt-2">
              <Sidebar />
            </div>
            <div className="w-full md:w-5/5 mt-4">
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
