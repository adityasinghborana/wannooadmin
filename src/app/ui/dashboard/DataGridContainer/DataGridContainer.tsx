// DataGridContainer.tsx

import React from 'react';
import { Box } from '@mui/material'; // Import Box from MUI for layout
import { DataGrid, GridColDef } from '@mui/x-data-grid'; // Import DataGrid from MUI/x-data-grid

interface DataGridContainerProps {
  rows: any[]; // Adjust type according to your data structure
  columns: GridColDef[]; // Define GridColDef type from @mui/x-data-grid
}

const DataGridContainer: React.FC<DataGridContainerProps> = ({ rows, columns }) => {
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
        '& .MuiDataGrid-cell': {
          border: 'none',
        },
        height: "calc(100vh - 5rem)",
        '& .MuiDataGrid-virtualScroller': {
          border: 'none',
          height: '100%',
        },
        '& .MuiDataGrid-root': {
          border: 'none',
          textAlign: 'center',
        },
        '& .MuiDataGrid-columnHeaderTitleContainer': {
          border: 'none',
          justifyContent: 'center',
        },
        '& .Mui-lastChild': {
          border: 'none',
          margin: 2,
        },
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
          getRowClassName={(params:any) => `rounded-3xl font-semibold my-1 bg-[#ecd6fd]`}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          className="data-grid-no-border"
        />
      </Box>
    </Box>
  );
};

export default DataGridContainer;
