"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

import { toast } from "react-toastify";
import { getVendorDetail, updateVendorDetails } from "@/lib/services";

interface Tour {
  id: number;
  tourId: number;
  countryId: number;
  countryName: string;
  cityId: number;
  cityName: string;
  tourName: string;
  duration: string;
  imagePath: string;
  cityTourTypeId: string;
  cityTourType: string;
  contractId: number;
  recommended: boolean;
  isPrivate: boolean;
  isvisible: boolean;
  vendorUid: string;
}

interface VendorData {
  id: number;
  uid: string;
  username: string;
  isAdmin: boolean;
  isVendor: boolean;
  email: string;
  address: string;
  age: number;
  name: string;
  license_number: string;
  isApproved: boolean;
  country: string;
  city: string;
  services_description: string;
  mobile: string;
  vatDocument: string | null;
  bankDocument: string | null;
  document_tradelicense: string;
  document_other: string;
  tours: Tour[];
}

export default function EditVendor({ params }: { params: { id: string } }) {
  const [vendorDetails, setVendorDetails] = useState<VendorData | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    const fetchVendorDetails = async () => {
      if (params.id.includes("view")) {
        setIsEdit(false);
        params.id = params.id.replace("view", "");
      }
      const res = await getVendorDetail(params.id);
      console.log(res)
      setVendorDetails(res.data);
    };
    fetchVendorDetails();
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVendorDetails((prevDetails) => (prevDetails ? { ...prevDetails, [name]: value } : prevDetails));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(false); // Start loading
    try {
      await updateVendorDetails(vendorDetails);
      toast.success("Vendor updated successfully!"); // Success toast
    } catch (error) {
      console.error(error);
      toast.error("Failed to update vendor."); // Error toast
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (!vendorDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="px-4 py-4 border rounded-xl overflow-y-auto mt-5 bg-white"
          style={{ height: "calc(100vh - 10rem)" }}
        >
          <div className="mb-5">
            <Link href={"/dashboard/vendors"} className="text-black text-3xl">
              <MdArrowBack />
            </Link>
          </div>

          {/* Vendor Details Section */}
          <div className="grid grid-cols-1 gap-5">
            {/* Input Fields */}
            {Object.entries(vendorDetails).map(([key, value]) => (
              key !== 'tours' && (
                <div className="mb-4" key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700 uppercase">
                    {key.replace(/_/g, ' ').toUpperCase()}
                  </label>
                  <input
                    id={key}
                    name={key}
                    type={key === 'email' ? 'email' : 'text'}
                    disabled={!isEdit}
                    value={key === 'created_at' ? new Date(value) : value || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-black"
                  />
                </div>
              )
            ))}
          </div>

          {/* Documents Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Documents</h3>
            <div className="mt-4">
              <div className="mb-2">
                <strong>Trade License:</strong>
                {vendorDetails.document_tradelicense && (
                  <a href={`http://69.48.163.45:3000/${vendorDetails.document_tradelicense}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Document
                  </a>
                )}
              </div>
              <div className="mb-2">
                <strong>VAT Document:</strong>
                {vendorDetails.vatDocument && (
                  <a href={`http://69.48.163.45:3000/${vendorDetails.document_other}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Document
                  </a>
                )}
              </div>
              <div className="mb-2">
                <strong>Bank Document:</strong>
                {vendorDetails.bankDocument && (
                  <a href={`http://69.48.163.45:3000/${vendorDetails.document_other}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Document
                  </a>
                )}
              </div>
              <div className="mb-2">
                <strong>Other Document:</strong>
                {vendorDetails.document_other && (
                  <a href={`http://69.48.163.45:3000/${vendorDetails.document_other}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Other Document
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Tours Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Tours</h3>
            {vendorDetails.tours.length === 0 ? (
              <p className="mt-2 text-sm text-gray-500">No tours available.</p>
            ) : (
              <ul className="mt-4">
                {vendorDetails.tours.map((tour) => (
                  <li key={tour.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>Tour Name: {tour.tourName}</span>
                      <span>Duration: {tour.duration}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span>City: {tour.cityName}</span>
                      <span>Country: {tour.countryName}</span>
                    </div>
                    <img src={`http://69.48.163.45:3000/${tour.imagePath}`} alt={tour.tourName} className="mt-2 w-32 h-32 object-cover" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {loading ? (
            <button
              type="button"
              disabled
              className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Updating...
            </button>
          ) : (
            isEdit && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Submit
              </button>
            )
          )}
        </form>
      </div>
    </div>
  );
}
