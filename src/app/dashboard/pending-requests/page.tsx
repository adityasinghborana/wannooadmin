"use client";
// App.tsx
import { getAllVendors } from "@/lib/services";
import React, { useEffect, useState } from "react";
import { Vendor } from "../../../lib/interfaces/vendorinterface";
import { columns } from "./columns";
import { DataTable } from "./datatable";

const PendingVendors: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        getAllVendors().then((response) => {
          const approvedVendors = response.filter(
            (vendor: Vendor) => vendor.isApproved == false
          );
          setVendors(approvedVendors);
        });
      } catch (err) {
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="scrollable-container my-10 bg-white rounded-2xl px-6 container">
      <DataTable columns={columns} data={vendors} />
    </div>
  );
};

export default PendingVendors;
