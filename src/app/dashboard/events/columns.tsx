"use client";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/interfaces/eventinterface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { MdDelete, MdEdit, MdViewAgenda } from "react-icons/md";

export const columns: ColumnDef<Event, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "imagePath",
    header: "Image", // Adjust this accessor to match your Event interface
    cell: (row: any) => (
      <img
        src={row.value}
        alt="Event Image"
        style={{ width: "100px", height: "auto" }}
      />
    ),
  },

  {
    accessorKey: "eventName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Duration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "eventType",
    header: "Event Type",
  },
  {
    accessorKey: "recommended",
    header: "Recommended",
    cell: ({ row }) => (row.original.recommended ? "Yes" : "No"),
  },
  {
    accessorKey: "isVisible",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is Visible
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'Actions',
    cell: (row: any) => {
      return (
        <div className="flex max-w-full gap-2 h-full items-center justify-center">
          <Link
            href={`/dashboard/events/${row?.row?.original?.eventdetail[0]?.id}`}
            className="flex items-center justify-center px-2 py-1 rounded bg-green-300 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            <MdEdit />
          </Link>
          <Link
            href={`/dashboard/events/view?data=${row?.row?.original?.Id}`}
            className="flex items-center justify-center px-2 py-1 rounded bg-yellow-300 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
          >
            <MdViewAgenda />
          </Link>
          <button className="flex items-center justify-center px-2 py-1 rounded bg-red-300 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600">
            <MdDelete />
          </button>
        </div>
      );
    },
  },

  // Add more columns as needed for your Event model
];
