"use client";
import { Button } from "@/components/ui/button";
import { Vendor } from "@/lib/interfaces/vendorinterface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdDelete, MdEdit, MdViewAgenda, MdVisibility } from "react-icons/md";

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
  {
    accessorKey: "isAdmin",
    cell: ({ row }) => (row.original.isVendor ? "Yes" : "No"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Admin
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isVendor",
    header: "Vendor",
    cell: ({ row }) => (row.original.isVendor ? "Yes" : "No"),
  },

  {
    accessorKey: "isApproved",
    cell: ({ row }) => (row.original.isApproved ? "Yes" : "No"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Approved
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Actions",
    cell: (row: any) => {
      return (
        <div className="flex max-w-full gap-2 h-full items-center justify-center">
          <Link href={`/dashboard/vendors/${row.row.original.uid}`}>
            <button className="flex items-center justify-center px-2 py-1 rounded bg-yellow-400 text-white hover:bg-blue-600 focus:outline-none focus:bg-red-600">
              <MdVisibility />
            </button>
          </Link>

          <button className="flex items-center justify-center px-2 py-1 rounded bg-red-300 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600">
            <MdDelete />
          </button>
        </div>
      );
    },
  },
];
