"use client";
import { useEffect, useState } from "react";
import Card from "../ui/dashboard/card/Card";
import Charts from "../ui/dashboard/charts/Charts";
import {
  GetAllCardDetails,
  getAllTours,
  getAllUsers,
  getAllVendors,
  getVendorDetail,
} from "@/lib/services";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addUsers } from "@/lib/store/features/user/userSlice";
import { addTours } from "@/lib/store/features/tours/tourSlice";
import { addVendors } from "@/lib/store/features/vendors/vendorSlice";
import Container from "../ui/dashboard/container/Container";
import Cookie from "js-cookie";
import { DashboardChart } from "./charts";

const Dashboard = () => {
  const [data, setData] = useState<any>({});
  const [vendors, setVendors] = useState(0);
  const [tours, setTours] = useState(0);
  const dispatch = useAppDispatch();
  const CheckIsAdmin = useAppSelector((state) => state.CheckIsAdmin.isAdmin);
  const GetCardDetails = async () => {
    let data = await GetAllCardDetails();
    console.log(data)
    setData(data);
  };

  const getMetrics = async () => {
    const userCookie = JSON.parse(Cookie.get("user")!);
    let res = await getVendorDetail(userCookie.uid);
    if (res?.data?.isAdmin == true) {
      GetCardDetails();
    } else {
      dispatch(addTours(res?.data?.tours));
      setTours(res?.data?.tours.length || 0);
    }
  };

  useEffect(() => {
    getMetrics();
  }, []);

  return (
    <Container>
      <div className="overflow-y-auto" style={{ height: "calc(100vh - 10rem)", scrollbarWidth: "none" }}>
        <div className="flex gap-2 mb-4">
          <Card title="Total Users" value={data?.users} desc="......" />
          <Card title="Total Vendors" value={data?.Vendors} desc="......" />
          <Card title="Total Tours" value={data.totaltours} desc="......" />
          <Card title="Total Sales" value={data?.TotalSales} desc="......" />
          <Card title="Total Bookings" value={data?.bookings} desc="......" />
        </div>
        {/* <Charts /> */}
        <DashboardChart />
      </div>
    </Container>
  );
};
export default Dashboard;
