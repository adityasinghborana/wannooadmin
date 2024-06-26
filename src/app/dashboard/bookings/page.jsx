'use client'
import DataGridContainer from "@/app/ui/dashboard/DataGridContainer/DataGridContainer";
import Container from "@/app/ui/dashboard/container/Container";
import { GetAllBookings } from "@/lib/services";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";


const Bookings = () => {
  // const users = useAppSelector((state) => state.user.Users);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const getBookings = async()=>{
       let data = await GetAllBookings()
       setRows(data)
    } 
    getBookings();
  }, []);

  const handleDeleteSelectedRows = () => {
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(updatedRows);
    setSelectedRows([]);
    handleCloseDialog();
  };

  const columns = [
    { field: "status", headerName: "status", flex: 1 },
    {
      field: "bookingId",
      headerName: "Booking_Id",
      flex: 1,      
    },
    {
      field: "serviceUniqueId",
      headerName: "Service_Unique_Id",
      flex: 1,      
    },
    {
      field: "serviceType",
      headerName: "Service Type",
      flex: 1,      
    },
    {
      field: "bookingResultId",
      headerName: "Booking_Result_Id",
      flex: 1,      
    },
    // {
    //   field: "bookingResult",
    //   headerName: "Reference_No",
    //   flex: 1,      
    // },
    {
      field: "bookingResult",
      headerName: "Reference_No",
      flex: 1,
      renderCell: (params) => (
        <span>{params?.row?.bookingResult?.referenceNo}</span>
      ),
    },
    {
      field: "userId",
      headerName: "User_Id",
      flex: 1,
      renderCell: (params) => (
        <span>{params?.row?.bookingResult?.userId}</span>
      ),
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Button
    //       onClick={() => handleOpenDialog(params.row)}
    //       className="flex mt-3 items-center justify-center px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600"
    //     >
    //       <MdDelete />
    //     </Button>
    //   ),
    // },
  ];

  return (
    <Container>
      <DataGridContainer rows={rows} columns={columns} />
    </Container>
  );
};

export default Bookings;

 