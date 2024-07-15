// DataGridContainer.tsx

import React from "react";
import { Box } from "@mui/material"; // Import Box from MUI for layout
import { DataGrid, GridColDef } from "@mui/x-data-grid"; // Import DataGrid from MUI/x-data-grid

interface DataGridContainerProps {
  rows: any[]; // Adjust type according to your data structure
  columns: GridColDef[]; // Define GridColDef type from @mui/x-data-grid
}

const DataGridContainer: React.FC<DataGridContainerProps> = ({
  rows,
  columns,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: 3,
        paddingX: 1,
        paddingY: 1,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 5rem)",
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .css-qcqlck-MuiDataGrid-root .MuiDataGrid-cell--flex": {
          border: "none",
        },
        // '& .MuiDataGrid-columnHeaderTitleContainer': {
        //   justifyContent: 'center',
        // },
      }}
    >
      <Box
        sx={{
          overflowY: "hidden",
          flexGrow: 1,
        }}
      >
        <DataGrid
          rowHeight={100}
          rows={rows}
          columns={columns}
          getRowClassName={(params: any) =>
            `rounded-3xl font-semibold my-1 bg-white `
          }
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          className="border-none"
        />
      </Box>
    </Box>
  );
};

export default DataGridContainer;
