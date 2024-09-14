"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Vendor } from "@/lib/interfaces/vendorinterface";
import { getVendorDetail } from "@/lib/services";
import { useEffect, useState } from "react";
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
export default function VendorDetail({ params }: { params: { id: String } }) {
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

  if (params.id.includes("view")) {
    params.id = params.id.replace("view", "");
  }

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const uid = params.id;
  useEffect(() => {
    const FetchVendorDetails = async (uid: String) => {
      const response = await getVendorDetail(uid);
      setVendorDetail({...response.data});
    };

    if (uid) {
      FetchVendorDetails(uid);
    }
  }, [uid]);
  return (
    <Card className="shadow-lg mt-8 rounded-xl" style={{ height: 'calc(100vh - 5rem)', overflowY: 'scroll' }}>
      <CardHeader>
        <CardTitle className="mb-8">Details</CardTitle>
        <div className="grid grid-cols-1 gap-2 h-[400px] overflow-y-scroll">
          {Object.keys(vendordetail)
            .filter((key) => !excludedFields.includes(key))
            .map((key) => (
              <CardContent
                key={key}
                className="flex flex-row items-center justify-start"
              >
                <div className="text-center flex flex-row">
                  <CardTitle className="flex flex-row">
                    <p className="mx-1">{key.toUpperCase()}:</p>
                  </CardTitle>
                  <CardContent>
                    {key === 'created_at'
                      ? formatDate(vendordetail[key])
                      : String(vendordetail[key as keyof Vendor])}
                  </CardContent>
                </div>
              </CardContent>
            ))}
        </div>
      </CardHeader>
  
      <CardHeader>
        <CardTitle className="mb-8">Documents</CardTitle>
        <div className="grid grid-cols-2 gap-2 h-[400px] overflow-y-scroll">
          {Object.keys(vendordetail)
            .filter((key) => linkFields.includes(key))
            .map((key) => (
              <CardContent
                key={key}
                className="flex flex-row items-center justify-start"
              >
                <div className="text-center flex flex-row">
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