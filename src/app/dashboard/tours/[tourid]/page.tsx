"use client";

import { getTourDetails } from "@/lib/services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowBack, MdArrowLeft } from "react-icons/md";

interface TourData {
  [key: string]: string[];
}

export default function EditTour({ params }: { params: { tourid: String } }) {
  const [tourdetails, setTourDetails] = useState<TourData>({});
  const [isedit, SetIsEdit] = useState<boolean>(true);

  useEffect(() => {
    const Tourdetails = async () => {
      if (params.tourid.includes("view")) {
        SetIsEdit(false);
        params.tourid = params.tourid.replace("view", "");
      }
      let res = await getTourDetails(params.tourid);
      res && setTourDetails(res);
      // console.log(await getTourDetails(params.tourid))
    };
    Tourdetails();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTourDetails({ ...tourdetails, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission with formData
    console.log("Form submitted with data:", tourdetails);
  };

  return (
    <div className="flex justify-between w-full">
      <div className="w-full justify-self-center">
        <form
          onSubmit={handleSubmit}
          className="px-4 py-4 border rounded-xl bg-white"
        >
          <div className="mb-5">
            <Link href={"/dashboard/tours"} className="text-black text-3xl">
              <MdArrowBack />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {Object.keys(tourdetails).map((key) => (
              <>
                {key.includes("tourImages") ? (
                  <>
                    {tourdetails[key].map((images: any) => {
                      <img src={`${images.imagePath}`} alt="" />;
                    })}
                  </>
                ) : (
                  <div key={key} className="mb-4">
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700 uppercase"
                    >
                      {key}
                    </label>
                    <input
                      type="text"
                      id={key}
                      name={key}
                      disabled={!isedit}
                      value={tourdetails[key] || ""}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
                    />
                  </div>
                )}
              </>
            ))}
          </div>
          {isedit && (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
