"use client";
import TourCard from "@/app/ui/tours/tourCards";
import { getAllTours } from "@/lib/services";
import { Box, Button, TextField, debounce } from "@mui/material";
import { FC, useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridColDef, GridDeleteIcon, GridRowId } from "@mui/x-data-grid";
import { MdDelete, MdEdit, MdViewAgenda } from "react-icons/md";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import Container from "@/app/ui/dashboard/container/Container";

interface Row {
  id: GridRowId;
  email: string;
  firstName: string;
  tourdetails:[{
    imagePath: string
  }]
}

const Tours: FC = () => {
  const Tours = useAppSelector((state)=>state.tour.Tours)
  const [allEvents, setAllEvents] = useState<any[]>(Tours);
  // const [filteredCards, setFilteredCards] = useState<any[]>(allTours);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);
  const [filteredRows, setFilteredRows] = useState<Row[]>(allEvents);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "",
      headerName: "Thumbnail",
      flex: 1,
      width: 200,
      maxWidth:200,
      // editable: true,
      renderCell: (params) => {
        return <img src={`${params.row?.tourdetails[0].imagePath}`} alt="thumbnail"/>;
      },
    },
    { field: "tourId", headerName: "ID",},
    {
      field: "tourName",
      headerName: "Name",
      width:200,
      // editable: true,
    },
    {
      field: "tourShortDescription",
      headerName: "Description",
      width: 400,
      // editable: true,
    },    
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="min-h-full content-center max-w-[200px]">
          <div className="grid grid-cols-3 mt-6 gap-2">
          <Link href={`/dashboard/tours/${params.row.id}`}            
            className="flex mt-3 items-center justify-center px-2 py-1 rounded bg-green-300 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
            <MdEdit />
          </Link>
          <Link href={`/dashboard/tours/view${params.row.id}`}
            // onClick={() => handleOpenDialog(params.row)}
            className="flex mt-3 items-center justify-center px-2 py-1 rounded bg-yellow-300 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
          >
            <MdViewAgenda />
          </Link>
          <button
            // onClick={() => handleOpenDialog(params.row)}
            className="flex mt-3 items-center justify-center px-2 py-1 rounded bg-red-300 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            <MdDelete />
          </button>
          </div>
          </div>
        );
      },
    },
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  const handleSearch = debounce((value: string) => {
    const FilteredCards = allEvents.filter((tours) =>
      tours.tourName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRows(FilteredCards);
  }, 300);


  return (
    <Container>
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-35"><CircularProgress /></div>} 
      <Box  sx={{ width: "100%", backgroundColor: "white", borderRadius: 3}}>
        <div className="mb-4 ml-4 flex justify-between">
          <TextField
            label="Search by name"
            variant="standard"
            onChange={handleInputChange}
            className="my-2 rounded-full ml-4"
          />
          <Button
            className={`
            ${
              selectedRows.length <= 1 && "hidden"
            }
             mt-2 mr-2 px-4 py-2 rounded-3xl bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600`}
          >
            <GridDeleteIcon />
            Delete Selected Rows
          </Button>          
        </div>
        <DataGrid
          rowHeight={100}
          rows={filteredRows}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
        />
      </Box>
    </Container>
  );
};

export default Tours;
