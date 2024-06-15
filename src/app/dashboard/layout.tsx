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
      <div className="flex md:flex-row md:gap-5 min-w-full overflow-hidden" style={{maxHeight:"calc(100vh)"}}>
        {pathName.includes("tours/") ? (
          <div className="flex flex-col w-full h-full">
            {children}
          </div>
        ) : (
          <div className="flex flex-row w-full h-full">
            <div className="shadow-2xl w-full pr-2 md:w-1/6 bg-primary-foreground hidden md:block rounded-r-3xl">
              <Sidebar />
            </div>
            <div className="flex flex-col flex-grow w-full h-full overflow-y-auto">
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
