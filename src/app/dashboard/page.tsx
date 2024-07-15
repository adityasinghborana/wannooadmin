"use client"
import { useEffect, useState } from "react";
import Card from "../ui/dashboard/card/Card";
import Charts from "../ui/dashboard/charts/Charts";
import { getAllTours, getAllUsers, getAllVendors } from "@/lib/services";
import { useAppDispatch } from "@/lib/store/hooks";
import { addUsers } from "@/lib/store/features/user/userSlice";
import { addTours } from "@/lib/store/features/tours/tourSlice";
import { addVendors } from "@/lib/store/features/vendors/vendorSlice";
import Container from "../ui/dashboard/container/Container";

const Dashboard = () => {
  const [users,setUsers] = useState(0)
  const [vendors,setVendors] = useState(0)
  const [tours,setTours] = useState(0)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    const GetTotalUsers = async ()=>{
      let data = await getAllUsers()
      dispatch(addUsers(data))
      setUsers(data?.length || 0)
    }

    const GetTotalVendors = async ()=>{
      let data = await getAllVendors()
      dispatch(addVendors(data))
      setVendors(data.length || 0)
    }

    const GetTotalTours = async ()=>{
      let data = await getAllTours()
      dispatch(addTours(data))
      setTours(data?.length || 0)
    }

    GetTotalUsers()
    GetTotalTours()
    GetTotalVendors()
  },[])


  return (
    <Container>
      <div className="">
        <div className="hidden md:grid grid-cols-3 gap-5 mb-4">
          <Card title="Total Users" value={users} desc="......" />
          <Card title="Total Vendors" value={vendors} desc="......"/>
          <Card title="Total Tours" value={tours} desc="......"/>
        </div>
        <div className="hidden md:grid grid-cols-3 gap-5 mb-4">
          <Card title="Total Payout" value={users} desc="......" />
          <Card title="Total Bookings" value={vendors} desc="......"/>
          <Card title="Total Sales" value={tours} desc="......"/>
        </div>
          {/* <Charts /> */}
      </div>
    </Container>
  );
};
export default Dashboard;
