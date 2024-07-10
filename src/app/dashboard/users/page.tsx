"use client";
import DataGridContainer from "@/app/ui/dashboard/DataGridContainer/DataGridContainer";
import Container from "@/app/ui/dashboard/container/Container";
import { getAllUsers } from "@/lib/services";
import { useAppSelector } from "@/lib/store/hooks";
import {
  debounce
} from "@mui/material";
import {
  GridColDef,
  GridRowId
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

interface Row {
  id: GridRowId;
  email: string;
  firstName: string;
}

const User = () => {
  const Users = useAppSelector((state)=> state.user.Users)
  const [rows, setRows] = useState<Row[]>(Users);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);
  const [filteredRows, setFilteredRows] = useState<Row[]>(Users);
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "orders",
      headerName: "Bookings",
      type: "number",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 h-full items-center justify-center">
            <button
            onClick={() => handleOpenDialog(params.row)}
            className="flex items-center justify-center px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
            <MdDelete />
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(()=>{
    Users.length === 0 && getAllUsers().then((data)=>setRows(data))
  },[])

  const handleOpenDialog = (row?: Row) => {
    row && setSelectedRow(row);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedRow(null);
    setOpen(false);
  };

  const handleDeleteRow = (id: any) => {
    console.log("Button clicked for ID:", id);
    handleCloseDialog();
    // Handle button click event here, you can access the id of the row
  };

  const handleDeleteSelectedRows = () => {
    // const updatedRows = rows.filter(row => !selectedRows.includes(row.id));
    // setRows(updatedRows);
    setSelectedRows([]);
    console.log("Deleted selected rows:", selectedRows);
    handleCloseDialog();
    // Perform any additional delete actions here
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  const handleSearch = debounce((value: string) => {
    const filtered = rows.filter((row) =>
      row.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRows(filtered);
  }, 300);

  return (
    <Container>
      <DataGridContainer rows={rows} columns={columns} />
    </Container>
  );
};

export default User;
