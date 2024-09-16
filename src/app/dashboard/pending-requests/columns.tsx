"use client";
import { Button } from "@/components/ui/button";
import { Vendor } from "@/lib/interfaces/vendorinterface";
import axiosInstance from "@/lib/loader.interceptor";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCheck } from "lucide-react";
import Link from "next/link";
import { MdDelete, MdVisibility } from "react-icons/md";

export const columns: ColumnDef<Vendor, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "uid",
    header: "Uid", // Adjust this accessor to match your Event interface
  },

  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vendor Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "isAdmin",
  //   cell: ({ row }) => (row.original.isVendor ? "Yes" : "No"),
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Admin
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "isApproved",
  //   header: "Vendor",
  //   cell: ({ row }) => (row.original.isVendor ? "Yes" : "No"),
  // },

  // {
  //   accessorKey: "isApproved",
  //   cell: ({ row }) => (row.original.isApproved ? "Yes" : "No"),
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Approved
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "Actions",
    cell: (row: any) => {
      return (
        <div className="flex max-w-full gap-2 h-full items-center justify-center">
          <Button variant="ghost">
            <button onClick={() => axiosInstance.patch(`/updatevendor`, { uid: row.row.original.uid, "status":true})} className="flex items-center justify-center px-2 py-1 rounded bg-green-300 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600">
              <CheckCheck size={15} />
            </button>
          </Button>

          <Link href={`/dashboard/vendors/view${row.row.original.uid}`}>
            <button className="flex items-center justify-center px-2 py-1 rounded bg-yellow-400 text-white hover:bg-blue-600 focus:outline-none focus:bg-red-600">
              <MdVisibility size={15} />
            </button>
          </Link>

          <button onClick={() => axiosInstance.patch(`/updatevendor`, { uid: row.row.original.uid, "status":false})} className="flex items-center justify-center px-2 py-1 rounded bg-red-300 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600">
            <MdDelete size={15} />
          </button>
        </div>
      );
    },
  },
];
