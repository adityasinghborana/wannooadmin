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
    <div className="grid grid-cols-2 items-center bg-primary min-h-16 rounded-2xl">
      <div className="text-primary-bodytext font-bold text-transform: capitalize hidden md:block ml-5">
        {pathname.split("/").pop()}
      </div>      
    </div>
  );
}
