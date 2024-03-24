"use client";
import { getAllUsers } from "@/lib/services";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";



const User = () => {

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },   
  ];
  
  const [rows,setRows] = useState([]) 

  useEffect(() => {
    const getData = async()=>{
      let res = await getAllUsers()
      setRows(res);
    }
    if(rows.length === 0) getData()
    
  }, []);

  return (
    <div className="mt-5">
      <Box sx={{minHeight:'88vh', width: "100%", backgroundColor: "white" }}>
        <DataGrid
          rows={rows}
          columns={columns}                    
        />
      </Box>
    </div>
  );
};

export default User;
