"use client";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/interfaces/eventinterface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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

  // Add more columns as needed for your Event model
];
