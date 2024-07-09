"use client";
import React from "react";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GetBookingDetail, getVendorDetail } from "@/lib/services";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Vendor } from "@/lib/interfaces/vendorinterface";

const VendorDetail = () => {
  const [vendordetail, setVendorDetail] = useState<Vendor>({
    id: 0,
    uid: "",
    username: "",
    isAdmin: false,
    isVendor: false,
    email: "",
    address: "",
    age: 0,
    name: "",
    license_number: "",
    country: "",
    city: "",
    services_description: "",
    mobile: "",
    document_tradelicense: "",
    document_other: "",
    created_at: "", // Or new Date().toISOString() if you want to initialize it with the current date
  });
  const params = useParams();
  const uid = Array.isArray(params.bookingId)
    ? params.bookingId[0]
    : params.bookingId;
  useEffect(() => {
    const FetchVendorDetails = async (id: string) => {
      const response = await getVendorDetail(id);
      setVendorDetail(response);
    };

    if (uid) {
      FetchVendorDetails(uid);
    }
  }, [uid]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{vendordetail.id}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
export default VendorDetail;
