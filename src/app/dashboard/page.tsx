"use client"
import { useEffect, useState } from "react";
import Card from "../ui/dashboard/card/Card";
import Charts from "../ui/dashboard/charts/Charts";
import { getAllTours, getAllUsers, getAllVendors, getVendorDetail } from "@/lib/services";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addUsers } from "@/lib/store/features/user/userSlice";
import { addTours } from "@/lib/store/features/tours/tourSlice";
import { addVendors } from "@/lib/store/features/vendors/vendorSlice";
import Container from "../ui/dashboard/container/Container";
import Cookie from 'js-cookie';

const Dashboard = () => {
  const [users,setUsers] = useState(0)
  const [vendors,setVendors] = useState(0)
  const [tours,setTours] = useState(0)
  const dispatch = useAppDispatch()
  const CheckIsAdmin = useAppSelector((state) => state.CheckIsAdmin.isAdmin);
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

  const getMetrics = async ()=>{
    const userCookie = JSON.parse(Cookie.get('user')!);
    let res = await getVendorDetail(userCookie.uid)
    if(res?.data?.isAdmin == true){
      GetTotalUsers()
      GetTotalTours()
      GetTotalVendors()
    }else{      
      dispatch(addTours(res?.data?.tours))
      setTours(res?.data?.tours.length || 0)
    }
  }

  useEffect(()=>{
    getMetrics()
  },[])


  return (
    <Container>
      <div className="">
        <div className="flex gap-2 mb-4">
          <Card title="Total Users" value={users} desc="......" />
          <Card title="Total Vendors" value={vendors} desc="......"/>
          <Card title="Total Tours" value={tours} desc="......"/>
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
