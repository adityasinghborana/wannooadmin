import {
  MdAddCard,
  MdApi,
  MdDashboard,
  MdDiscount,
  MdEmail,
  MdEvent,
  MdFestival,
  MdHome,
  MdImage,
  MdLogout,
  MdPending,
  MdSupervisedUserCircle,
  MdTour,
  MdVerifiedUser,
  MdWorkHistory,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const CheckIsAdmin = useAppSelector((state) => state.CheckIsAdmin.isAdmin);
  const [menuItems, setMenuItems] = useState([
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/admin/dashboard",
          icon: <MdDashboard />,
        },
      ],
    },
  ]);

  useEffect(() => {
    if (CheckIsAdmin) {
      setMenuItems([
        {
          title: "Pages",
          list: [
            {
              title: "Dashboard",
              path: "/admin/dashboard",
              icon: <MdDashboard />,
            },
            {
              title: "Users",
              path: "/admin/dashboard/users",
              icon: <MdSupervisedUserCircle />,
            },
            {
              title: "Vendors",
              path: "/admin/dashboard/vendors",
              icon: <MdVerifiedUser />,
            },
            {
              title: "Pending-Requests",
              path: "/admin/dashboard/pending-requests",
              icon: <MdPending />,
            },
          ],
        },
        {
          title: "Services",
          list: [
            {
              title: "Tours",
              path: "/admin/dashboard/tours",
              icon: <MdTour />,
            },
            {
              title: "Tours Request",
              path: "/admin/dashboard/tourrequests",
              icon: <MdTour />,
            },

            {
              title: "Add Tours",
              path: "/admin/dashboard/add-tours",
              icon: <MdAddCard />,
            },
            {
              title: "Events",
              path: "/admin/dashboard/events",
              icon: <MdFestival />,
            },
            {
              title: "Events Request",
              path: "/admin/dashboard/eventrequests",
              icon: <MdTour />,
            },
            {
              title: "Add Event",
              path: "/admin/dashboard/addevents",
              icon: <MdEvent />,
            },
          ],
        },
        {
          title: "Email",
          list: [
            {
              title: "Email Templates",
              path: "/admin/dashboard/email",
              icon: <MdEmail />,
            },
          ],
        },
        {
          title: "Home Page",
          list: [
            {
              title: "Home Page Data",
              path: "/admin/dashboard/homepage/home",
              icon: <MdHome />,
            },
            {
              title: "Library",
              path: "/admin/dashboard/homepage/library",
              icon: <MdImage />,
            },
          ],
        },
        {
          title: "Other",
          list: [
            {
              title: "About us",
              path: "/admin/dashboard/about-us",
              icon: <MdWorkHistory />,
            },
            {
              title: "Contact us",
              path: "/admin/dashboard/contact-us",
              icon: <MdWorkHistory />,
            },
            {
              title: "Forms Submission",
              path: "/admin/dashboard/forms",
              icon: <MdWorkHistory />,
            },
            {
              title: "Coupons",
              path: "/admin/dashboard/coupons",
              icon: <MdDiscount />,
            },
          ],
        },
        {
          title: "Bookings",
          list: [
            {
              title: "Bookings",
              path: "/admin/dashboard/bookings",
              icon: <MdWorkHistory />,
            },
            // {
            //   title: "Canceled Bookings ",
            //   path: "/admin/dashboard/tours",
            //   icon: <MdWorkHistory />,
            // },
          ],
        },
        {
          title: "API",
          list: [
            {
              title: "Api's",
              path: "/admin/dashboard/api",
              icon: <MdApi />,
            },
          ],
        },
      ]);
    } else {
      setMenuItems([
        {
          title: "Pages",
          list: [
            {
              title: "Dashboard",
              path: "/admin/dashboard",
              icon: <MdDashboard />,
            },
          ],
        },
        {
          title: "Services",
          list: [
            {
              title: "Tours",
              path: "/admin/dashboard/tours",
              icon: <MdTour />,
            },

            {
              title: "Add Tours",
              path: "/admin/dashboard/add-tours",
              icon: <MdAddCard />,
            },
            {
              title: "Events",
              path: "/admin/dashboard/events",
              icon: <MdFestival />,
            },
            {
              title: "Add Event",
              path: "/admin/dashboard/addevents",
              icon: <MdEvent />,
            },
            {
              title: "Coupons",
              path: "/admin/dashboard/coupons",
              icon: <MdDiscount />,
            },
          ],
        },
      ]);
    }
  }, [CheckIsAdmin]);

  return (
    <div
      className="mx-1 px-global mt-4 h-screen overflow-y-auto"
      style={{ maxHeight: "calc(100vh)", scrollbarWidth: "none" }}
    >
      <div className="flex items-center gap-[20px] mb-2 flex-col md:flex-row ">
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {user?.email.charAt(0)}
        </Avatar>
        <div className="flex flex-col pr-global mt-global">
          <span
            className="font-[500] text-ellipsis overflow-hidden max-w-[100px] whitespace-nowrap"
            title={user?.email}
          >
            {user?.email}
          </span>
          <span className="text-sm text-primary">Admin</span>
        </div>
      </div>
      <ul>
        {menuItems.map((cat, i) => (
          //@ts-ignore
          <li className="list-none" key={cat?.title}>
            <span className="font-bold text-primary text-sm" key={i}>
              {cat?.title}
            </span>
            {cat?.list.map((item, i) => (
              <MenuLink items={item} key={i} />
            ))}
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          signOut(auth), localStorage.removeItem("user");
        }}
        className="p-global flex items-center gap-3 cursor-pointer rounded-xl bg-none border-none w-full text-primary-text  hover:bg-primary hover:text-primary-bodytext mb-6" //Added margin bottom here
      >
        <MdLogout />
        Logout
      </button>
    </div>
  );
};
export default Sidebar;
