"use client";
import DataGridContainer from "@/app/ui/dashboard/DataGridContainer/DataGridContainer";
import Container from "@/app/ui/dashboard/container/Container";
import { deleteTour, getAllTours } from "@/lib/services";
import { addTours } from "@/lib/store/features/tours/tourSlice";
import { useAppSelector,useAppDispatch  } from "@/lib/store/hooks";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { MdDelete, MdEdit, MdViewAgenda } from "react-icons/md";
import { toast } from "react-toastify";

interface Row {
  id: GridRowId;
  email: string;
  firstName: string;
  tourdetails: {
    imagePath: string;
  };
  tourShortDescription: string;
}

const Tours: FC = () => {
  const dispatch = useAppDispatch();
  const Tours = useAppSelector((state) => state.tour.Tours);
  const [rows, setRows] = useState<Row[]>(Tours);

  const fetchTours = async () => {
    const data = await getAllTours();
    dispatch(addTours(data));
    setRows(data);
  };

  useEffect(() => {
    if (Tours.length === 0) {
      fetchTours();
    } else {
      setRows(Tours); // keep rows in sync with Redux
    }
  }, [Tours]);

  const handleDelete = async (params: any) => {
    try {
      const result = await deleteTour(params?.row?.tourId);
      if (result) {
        toast.success("Tour deleted successfully!");
        fetchTours(); // refresh list in Redux and local state
      } else {
        toast.error("Failed to delete tour.");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting.");
      console.error(error);
    }
  };

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
          <img
  src={`${process.env.NEXT_PUBLIC_URL+imagePath}`}
  alt={imagePath}
  height={130}
  width={130}
/>   
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
      field: "tourShortDescription",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "cityName",
      headerName: "City",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-2 h-full items-center justify-center">
          <Link
            href={`/admin/dashboard/tours/${params.row.id}`}
            className="flex items-center justify-center px-2 py-1 rounded bg-green-300 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            <MdEdit />
          </Link>
          <Link
            href={`/admin/dashboard/tours/view${params.row.id}`}
            className="flex items-center justify-center px-2 py-1 rounded bg-yellow-300 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
          >
            <MdViewAgenda />
          </Link>
          <button onClick={() => handleDelete(params)}  className="flex items-center justify-center px-2 py-1 rounded bg-red-300 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600">
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
