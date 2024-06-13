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
    <div className="mx-8 grid grid-cols-2 items-center bg-primary min-h-16 rounded-2xl">
      <div className="text-primary-bodytext font-bold text-transform: capitalize hidden md:block ml-5">
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
