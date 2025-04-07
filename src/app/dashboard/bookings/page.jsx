"use client";
import DataGridContainer from "@/app/ui/dashboard/DataGridContainer/DataGridContainer";
import Link from "next/link";
import Container from "@/app/ui/dashboard/container/Container";
import { GetAllBookings } from "@/lib/services";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete, MdVisibility } from "react-icons/md";

const Bookings = () => {
  const router = useRouter();
  // const users = useAppSelector((state) => state.user.Users);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      let data = await GetAllBookings();
      setRows(data);
    };
    getBookings();
  }, []);

  const handleOpenView = (bookingId) => {
    router.push(`/dashboard/bookings/${bookingId}`);
  };

  const handleDeleteSelectedRows = () => {
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(updatedRows);
    setSelectedRows([]);
    handleCloseDialog();
  };

  const columns = [
    { field: "status", headerName: "status", flex: 1 },
    {
      field: "id",
      headerName: "BookingId",
      flex: 1,
    },
    {
      field: "serviceTotal",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <span>${parseFloat(params.value).toFixed(2)}</span>
      ),
    },
    {
      field: "passengers",
      headerName: "Passengers",
      flex: 1,
    },
    {
      field: "tourDate",
      headerName: "Tour Date",
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "FullName",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
   
    {
      field: "role",
      headerName: "Vendor Name",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row?.role?.username || 'N/A'}</span>
      ),
    },
    

    {
      field: "userId",
      headerName: "User Id",
      flex: 1,
      
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex h-full items-center justify-center">
          <Button
            onClick={() => handleOpenDialog(params.row)}
            className="flex mt-3 items-center justify-center py-1 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            <MdDelete />
          </Button>
          <Button
            onClick={() => handleOpenView(params.row.bookingId)}
            className="flex mt-3 items-center justify-center py-1 rounded text-white focus:outline-none"
          >
            {/* <Link href={`/dashboard/bookings/${params.row.bookingId}`}>
          
            </Link> */}
            <MdVisibility />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <DataGridContainer rows={rows} columns={columns} />
    </Container>
  );
};

export default Bookings;
