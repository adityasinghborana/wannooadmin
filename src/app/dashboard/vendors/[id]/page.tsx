"use client";

import { getTourDetails, getVendorDetail } from "@/lib/services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowBack, MdArrowLeft } from "react-icons/md";

interface TourData {
  [key: string]: string[];
}

interface Image {
  id: number;
  imagePath: string;
}

export default function EditVendor({ params }: { params: { id: String } }) {
  const [tourdetails, setTourDetails] = useState<any>({});
  const [isedit, SetIsEdit] = useState<boolean>(true);
  const [images, setImages] = useState<Image[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const Tourdetails = async () => {
      console.log(params.id)
      if (params.id.includes("view")) {
        SetIsEdit(false);
        params.id = params.id.replace("view", "");
      }
      let res = await getVendorDetail(params.id);      
      console.log(res.data)
      res && setTourDetails(res.data);
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

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const deleteImage = () => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      // Make an API request to delete the current image
      // After deletion, you may want to fetch the updated list of images
    }
  };

  const updateImage = () => {
    // Add logic to allow users to update the current image
  };

  return (
    <div className="w-full flex justify-center overflow-y-scroll px-20">
      <div className="w-full justify-self-center">
        <form
          onSubmit={handleSubmit}
          className="px-4 py-4 border rounded-xl bg-white"
        >
          <div className="mb-5">
            <Link href={"/dashboard/vendors"} className="text-black text-3xl">
              <MdArrowBack />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {Object.keys(tourdetails).map((key) => (
              <div key={key}>
                <div key={currentImageIndex} className="mb-4">
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700 uppercase"
                  >
                    {key}
                  </label>
                  <textarea
                    id={key}
                    name={key}
                    disabled={!isedit}
                    value={tourdetails[key] || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-black"
                  />
                </div>
              </div>
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
