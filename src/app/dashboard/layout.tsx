'use client'
import { usePathname } from "next/navigation";
import Navbar from "../ui/dashboard/navbar/Navbar";
import Sidebar from "../ui/dashboard/sidebar/Sidebar";

const Layout=({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=>{

    const pathname = usePathname()


    return(
        <div className="flex md:flex-row md:gap-5 min-w-full min-h-full">
           {pathname.includes('tours/') ? (
           <>
           {children}
           </>
           ) : (
           <>
            <div className="w-full md:w-1/5 min-h-[97vh] bg-[#182237] hidden md:block">
                <Sidebar/>
            </div>
            <div className="w-full md:w-4/5 mt-2">
                <Navbar/>
                {children}
            </div>
           </>)}            
        </div>
    )
}

export default Layout