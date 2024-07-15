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
import Vendors from "../page";
import Link from "next/link";
const excludedFields = [
  "id",
  "vatDocument",
  "bankDocument",
  "document_tradelicense",
  "document_other",
  "tours",
];
const linkFields = [
  "vatDocument",
  "bankDocument",
  "document_tradelicense",
  "document_other",
];
const VendorDetail = () => {
  const [vendordetail, setVendorDetail] = useState<Vendor>({
    id: 0,
    uid: "",
    username: "",
    isAdmin: false,
    isVendor: false,
    isApproved: false,
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
  const uid = Array.isArray(params.id) ? params.id[0] : params.id;
  console.log(uid);
  useEffect(() => {
    const FetchVendorDetails = async (uid: string) => {
      const response = await getVendorDetail(uid);
      console.log(response);
      setVendorDetail(response.data);
    };

    if (uid) {
      FetchVendorDetails(uid);
    }
  }, [uid]);
  return (
    <Card className="shadow-lg mt-8 rounded-xl">
      <CardHeader>
        <CardTitle className="mb-8"> Details</CardTitle>
        <div className="grid grid-cols-3 gap-2  ">
          {Object.keys(vendordetail)
            .filter((key) => !excludedFields.includes(key))
            .map((key) => (
              <CardContent
                key={key}
                className="flex flex-row items-center justify-start"
              >
                <div className="text-center flex flex-row ">
                  <CardTitle className="flex flex-row">
                    <p className="mx-1">{key.toUpperCase()}:</p>
                  </CardTitle>
                  <CardContent>
                    {String(vendordetail[key as keyof Vendor])}
                  </CardContent>
                </div>
              </CardContent>
            ))}
        </div>
      </CardHeader>

      <CardHeader>
        <CardTitle className="mb-8"> Documents</CardTitle>
        <div className="grid grid-cols-2 gap-2  ">
          {Object.keys(vendordetail)
            .filter((key) => linkFields.includes(key))
            .map((key) => (
              <CardContent
                key={key}
                className="flex flex-row items-center justify-start"
              >
                <div className="text-center flex flex-row ">
                  <CardTitle className="flex flex-row">
                    <p className="mx-2">{key.toUpperCase()}:</p>
                  </CardTitle>
                  <a
                    href={`${process.env.NEXT_PUBLIC_URL}${String(
                      vendordetail[key as keyof Vendor]
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    click here to see
                  </a>
                </div>
              </CardContent>
            ))}
        </div>
      </CardHeader>
    </Card>
  );
};
export default VendorDetail;
