"use client"
import { getAboutUsDetails } from "@/lib/services"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, debounce } from "@mui/material"
import { DataGrid, GridColDef, GridDeleteIcon, GridRowId } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"


interface Row {
  id: GridRowId;
  email: string;
  firstName: string;
}

const Aboutus = () => {
  const [aboutus, setAboutUs] = useState<Row[]>([]);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);
  const [filteredRows, setFilteredRows] = useState<Row[]>(aboutus);
    useEffect(()=>{
        const getData= async ()=>{
          let res = await getAboutUsDetails()  
            setAboutUs([res])
            setFilteredRows([res])
        }
        getData()
    },[])

    const columns: GridColDef<(typeof aboutus)[number]>[] = [
      { field: "id", headerName: "ID", flex: 1 },
      {
        field: "title",
        headerName: "Name",
        flex: 1,
        editable: true,
      },
      {
        field: "subtitle",
        headerName: "Subtitle",
        type: "number",
        flex: 1,
        editable: true,
      },
      {
        field: "heading1",
        headerName: "heading1",
        flex: 1,
        editable: true,
      },
      {
        field: "heading2",
        headerName: "heading2",
        flex: 1,
        editable: true,
      },
      {
        field: "subheading2",
        headerName: "subheading2",
        flex: 1,
        editable: true,
      },
      {
        field: "text",
        headerName: "Text",
        flex: 1,
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        renderCell: (params) => {
          return (
            <button
              onClick={() => handleOpenDialog(params.row)}
              className="flex mt-3 items-center justify-center px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              <MdDelete />
            </button>
          );
        },
      },
    ];
  
    const handleOpenDialog = (row?: any) => {
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
      const filtered = aboutus.filter((row) =>
        row.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRows(filtered);
    }, 300);

    return (
      <div className="mt-5">
      <Box  sx={{ width: "100%", backgroundColor: "white", borderRadius: 3}}>
      <div className="mb-4 ml-4 flex justify-between">
          <TextField
            label="Search by email"
            variant="standard"
            onChange={handleInputChange}
            className="my-2 rounded-full ml-4"
          />
          <Button
            onClick={() => handleOpenDialog()}
            disabled={selectedRows.length === 0}
            className={`${
              selectedRows.length <= 1 && "hidden"
            } mt-2 mr-2 px-4 py-2 rounded-3xl bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600`}
          >
            <GridDeleteIcon />
            Delete Selected Rows
          </Button>
          <Dialog open={open} onClose={() => handleCloseDialog()}>
            <DialogTitle>
              Delete {selectedRow ? "Row" : "Selected Rows"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {selectedRow
                  ? `Are you sure you want to delete the row with ID ${selectedRow.id}?`
                  : "Are you sure you want to delete the selected rows?"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCloseDialog()}>Cancel</Button>
              <Button
                onClick={
                  selectedRow
                    ? () => handleDeleteRow(selectedRow.id)
                    : handleDeleteSelectedRows
                }
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          autoHeight
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
        />
      </Box>
    </div>
  )
}

export default Aboutus