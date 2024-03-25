import { usePathname } from "next/navigation";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-2 items-center bg-[#182237] min-h-16 rounded">
      <div className="text-[#b7bac1] font-bold text-transform: capitalize hidden md:block ml-5">
        {pathname.split("/").pop()}
      </div>
      
        {/* <div className="flex items-center gap-3 bg-[#2e374a] p-3 rounded-full">
          <MdSearch />
          <input
            type="text"
            className="bg-transparent border-none text-white"
            placeholder="Search..."
          />
        </div> */}
        {/* <div className="flex md:gap-5 gap-3 cursor-pointer">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div> */}
      
    </div>
  );
}
