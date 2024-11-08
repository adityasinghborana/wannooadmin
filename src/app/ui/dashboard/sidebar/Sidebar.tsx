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
import Cookie from 'js-cookie';
import { BiLogoSketch } from "react-icons/bi";

const Sidebar = () => {
  const [user, setUser] = useState<any>();
  const userCookie = Cookie.get('user');
    useEffect(() => {
      setUser(userCookie ? JSON.parse(userCookie) : null);
    },[])
  const CheckIsAdmin = useAppSelector((state) => state.CheckIsAdmin.isAdmin);
  const [menuItems, setMenuItems] = useState([
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
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
              path: "/dashboard",
              icon: <MdDashboard />,
            },
            {
              title: "Blogs",
              path: "/dashboard/blogs",
              icon: <BiLogoSketch />,
            },
            {
              title: "Users",
              path: "/dashboard/users",
              icon: <MdSupervisedUserCircle />,
            },
            {
              title: "Vendors",
              path: "/dashboard/vendors",
              icon: <MdVerifiedUser />,
            },
            {
              title: "Pending-Requests",
              path: "/dashboard/pending-requests",
              icon: <MdPending />,
            },
          ],
        },
        {
          title: "Services",
          list: [
            {
              title: "Tours",
              path: "/dashboard/tours",
              icon: <MdTour />,
            },
            {
              title: "Tours Request",
              path: "/dashboard/tourrequests",
              icon: <MdTour />,
            },

            {
              title: "Add Tours",
              path: "/dashboard/add-tours",
              icon: <MdAddCard />,
            },
            {
              title: "Events",
              path: "/dashboard/events",
              icon: <MdFestival />,
            },
            {
              title: "Events Request",
              path: "/dashboard/eventrequests",
              icon: <MdTour />,
            },
            {
              title: "Add Event",
              path: "/dashboard/addevents",
              icon: <MdEvent />,
            },
          ],
        },
        {
          title: "Email",
          list: [
            {
              title: "Email Templates",
              path: "/dashboard/email",
              icon: <MdEmail />,
            },
          ],
        },
        {
          title: "Home Page",
          list: [
            {
              title: "Home Page Data",
              path: "/dashboard/homepage/home",
              icon: <MdHome />,
            },
            {
              title: "Library",
              path: "/dashboard/homepage/library",
              icon: <MdImage />,
            },
          ],
        },
        {
          title: "Other",
          list: [
            {
              title: "About us",
              path: "/dashboard/about-us",
              icon: <MdWorkHistory />,
            },
            {
              title: "Contact us",
              path: "/dashboard/contact-us",
              icon: <MdWorkHistory />,
            },
            {
              title: "Forms Submission",
              path: "/dashboard/forms",
              icon: <MdWorkHistory />,
            },
            {
              title: "Coupons",
              path: "/dashboard/coupons",
              icon: <MdDiscount />,
            },
          ],
        },
        {
          title: "Bookings",
          list: [
            {
              title: "Bookings",
              path: "/dashboard/bookings",
              icon: <MdWorkHistory />,
            },
            // {
            //   title: "Canceled Bookings ",
            //   path: "/dashboard/tours",
            //   icon: <MdWorkHistory />,
            // },
          ],
        },
        {
          title: "API",
          list: [
            {
              title: "Api's",
              path: "/dashboard/api",
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
              path: "/dashboard",
              icon: <MdDashboard />,
            },
          ],
        },
        {
          title: "Services",
          list: [
            {
              title: "Tours",
              path: "/dashboard/tours",
              icon: <MdTour />,
            },

            {
              title: "Add Tours",
              path: "/dashboard/add-tours",
              icon: <MdAddCard />,
            },
            {
              title: "Events",
              path: "/dashboard/events",
              icon: <MdFestival />,
            },
            {
              title: "Add Event",
              path: "/dashboard/addevents",
              icon: <MdEvent />,
            },
            {
              title: "Coupons",
              path: "/dashboard/coupons",
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
          signOut(auth), Cookie.remove('user');
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
