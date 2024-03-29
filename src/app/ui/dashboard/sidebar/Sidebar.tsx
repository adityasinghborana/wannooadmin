
import { MdApi, MdDashboard, MdLogout, MdPending, MdSupervisedUserCircle, MdVerifiedUser, MdWorkHistory } from "react-icons/md"
import MenuLink from "./menuLink/menuLink"
import { Avatar } from "@mui/material"
import { deepOrange } from "@mui/material/colors"


const Sidebar = () => {

  const menuItems = [{
    title:'pages',
    list:[
      {
        title: 'Dashboard',
        path:'/dashboard',
        icon: <MdDashboard />
      },
      {
        title: 'Users',
        path:'/dashboard/users',
        icon: <MdSupervisedUserCircle />
      },
      {
        title: 'Vendors',
        path:'/dashboard/vendors',
        icon: <MdVerifiedUser />
      },
      {
        title: 'Pending-Requests',
        path:'/dashboard/pending-requests',
        icon: <MdPending />
      }
    ]
  },
  {
    title:'Services',
    list:[
      {
        title: 'Tours',
        path:'/dashboard/tours',
        icon: <MdWorkHistory />
      },    
    ]
  },

  {
    title:'Email',
    list:[
      {
        title: 'Email Templates',
        path:'/dashboard/email',
        icon: <MdWorkHistory />
      },    
    ]
  },
  // {
  //   title:'Bookings',
  //   list:[
  //     {
  //       title: 'Confirmed Bookings',
  //       path:'/dashboard/tours',
  //       icon: <MdWorkHistory />
  //     },  
  //     {
  //       title: 'Canceled Bookings ',
  //       path:'/dashboard/tours',
  //       icon: <MdWorkHistory />
  //     },     
  //   ]
  // },
  {
    title:'API',
    list:[
      {
        title: "Api's",
        path:'/dashboard/api',
        icon: <MdApi />
      },     
    ]
  }
  ]

  return (
    <div className="shadow-md ml-3 mt-4 h-full">
      <div className="flex items-center gap-[20px] mb-2 flex-col md:flex-row">
      <Avatar sx={{bgcolor: deepOrange[500] }}>A</Avatar>
      <div className="flex flex-col">
        <span className="font-[500]">Arsalaan</span>
        <span className="text-sm text-[#b7bac1]">Admin</span>
      </div>
      </div>
      <ul>
      {menuItems.map((cat,i)=>(
        <li className="list-none" key={cat.title}>
            <span className="font-bold text-[#b7bac1] text-sm" key={i}>
            {cat.title}
            </span>
            {cat.list.map((item,i)=>(
              <MenuLink items={item} key={i}/>
            ))} 
          </li>
      ))}
      </ul>
      <button className="p-5 mt-2 flex items-center gap-3 cursor-pointer rounded-xl bg-none border-none w-full hover:bg-[#2e374a]">
         <MdLogout/>Logout
      </button>
    </div>
  )
}
export default Sidebar