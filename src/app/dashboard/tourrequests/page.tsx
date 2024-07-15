"use client";
import DataGridContainer from "@/app/ui/dashboard/DataGridContainer/DataGridContainer";
import Container from "@/app/ui/dashboard/container/Container";
import { getAllTours } from "@/lib/services";
import { useAppSelector } from "@/lib/store/hooks";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { MdDelete, MdEdit, MdViewAgenda } from "react-icons/md";

interface Row {
  isvisible: boolean;
  id: GridRowId;
  email: string;
  firstName: string;
  tourdetails: {
    imagePath: string;
  };
  tourShortDescription: string;
}

const Tours: FC = () => {
  const Tours = useAppSelector((state) => state.tour.Tours);
  const [rows, setRows] = useState<Row[]>(Tours);

  useEffect(() => {
    if (Tours.length === 0) {
      getAllTours().then((data) => {
        const filteredData = data.filter(
          (item: Row) => item.isvisible === false
        );
        setRows(filteredData);
      });
    }
  }, [Tours]);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      flex: 1,
      renderCell: (params) => {
        const imagePath = params.row.tourdetails?.imagePath;
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img src={imagePath} alt={imagePath} height={130} width={130} />
            </div>
          </>
        );
      },
    },
    {
      field: "tourName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "isvisible",
      headerName: "Approved",
      flex: 1,
      renderCell: ({ row }) => (row.isvisible ? "Yes" : "No"),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-2 h-full items-center justify-center">
          <Link
            href={`/dashboard/tours/${params.row.id}`}
            className="flex items-center justify-center px-2 py-1 rounded bg-green-300 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            <MdEdit />
          </Link>
          <Link
            href={`/dashboard/tours/view${params.row.id}`}
            className="flex items-center justify-center px-2 py-1 rounded bg-yellow-300 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
          >
            <MdViewAgenda />
          </Link>
          <button className="flex items-center justify-center px-2 py-1 rounded bg-red-300 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600">
            <MdDelete />
          </button>
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

export default Tours;
