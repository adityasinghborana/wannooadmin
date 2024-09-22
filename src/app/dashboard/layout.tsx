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
      if (!user) return; // Exit if user is not available

      try {
        const userCookie = Cookie.get('user');
        if (userCookie) {
          const parsedUser = JSON.parse(userCookie);
          const data = await CheckIsVendor(parsedUser?.uid ?? "none");
          
          if (data?.data?.isAdmin) {
            dispatch(CheckIsAdmin(true));
          }
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      }
    };

    checkUser();
  }, [user, dispatch]); // Add user and dispatch as dependencies

  // Redirect if loading or error
  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error('Authentication error:', error);
    router.push('/admin/signIn'); // Redirect to sign-in on error
    return null; // Render nothing while redirecting
  }

  if (!user) {
    router.push('/admin/signIn'); // Redirect to sign-in if not logged in
    return null; // Render nothing while redirecting
  }

  return (
    <div className="flex md:flex-row md:gap-5 min-w-full overflow-hidden">
      {pathName.includes("tours/") ? (
        <div className="flex flex-col w-full h-full">{children}</div>
      ) : (
        <div className="flex flex-row w-full" style={{ maxHeight: "calc(100vh)" }}>
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
};

export default DashboardLayout;
