import {
  MdApi,
  MdDashboard,
  MdHome,
  MdImage,
  MdLogout,
  MdPending,
  MdSupervisedUserCircle,
  MdVerifiedUser,
  MdWorkHistory,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
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
          icon: <MdWorkHistory />,
        },

        {
          title: "Add Tours",
          path: "/dashboard/add-tours",
          icon: <MdWorkHistory />,
        },
        {
          title: "Events",
          path: "/dashboard/events",
          icon: <MdWorkHistory />,
        },
      ],
    },
    {
      title: "Email",
      list: [
        {
          title: "Email Templates",
          path: "/dashboard/email",
          icon: <MdWorkHistory />,
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
          title: "Experiences",
          path: "/dashboard/experiences",
          icon: <MdWorkHistory />,
        },
        {
          title: "Footer",
          path: "/dashboard/footer",
          icon: <MdWorkHistory />,
        },
      ],
    },
    {
      title: "Bookings",
      list: [
        {
          title: "Confirmed Bookings",
          path: "/dashboard/tours",
          icon: <MdWorkHistory />,
        },
        {
          title: "Canceled Bookings ",
          path: "/dashboard/tours",
          icon: <MdWorkHistory />,
        },
        {
          title: "Bookings",
          path: "/dashboard/bookings",
          icon: <MdWorkHistory />,
        },
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
  ];
  return (
    <div
      className="mx-1 px-global mt-4 h-full overflow-y-auto"
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
          <li className="list-none" key={cat.title}>
            <span className="font-bold text-primary text-sm" key={i}>
              {cat.title}
            </span>
            {cat.list.map((item, i) => (
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
