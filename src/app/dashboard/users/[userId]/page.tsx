"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { getUserDetails, updateUserDetails } from "@/lib/services";
import { toast } from "react-toastify";

interface Cart {
  id: number;
  totalamount: number;
  uniqueNo: number;
  userId: string;
}

interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string;
}

interface UserData {
  id: number;
  email: string;
  address: string | null;
  age: number | null;
  mobileNo: string | null;
  dob: string | null;
  isUser: boolean;
  uid: string;
  username: string | null;
  orders: Order[];
  carts: Cart | null;
}

export default function EditUser({ params }: { params: { userId: string } }) {
  const [userDetails, setUserDetails] = useState<UserData | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (params.userId.includes("view")) {
        setIsEdit(false);
        params.userId = params.userId.replace("view", "");
      }
      const res = await getUserDetails(params.userId);
      console.log(res);
      setUserDetails(res[0]);
    };
    fetchUserDetails();
  }, [params.userId]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      await updateUserDetails(userDetails);
      toast.success("User updated successfully!"); // Success toast
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user."); // Error toast
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (!userDetails) {
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
            <Link href={"/dashboard/users"} className="text-black text-3xl">
              <MdArrowBack />
            </Link>
          </div>

          {/* User Details Section */}
          <div className="grid grid-cols-1 gap-5">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 uppercase"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                disabled={!isEdit}
                value={userDetails.email || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-black"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 uppercase"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                disabled={!isEdit}
                value={userDetails.address || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-black"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 uppercase"
              >
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                disabled={!isEdit}
                value={userDetails.age || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-black"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="mobileNo"
                className="block text-sm font-medium text-gray-700 uppercase"
              >
                Mobile No
              </label>
              <input
                id="mobileNo"
                name="mobileNo"
                type="text"
                disabled={!isEdit}
                value={userDetails.mobileNo || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-black"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700 uppercase"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                disabled={!isEdit}
                value={userDetails.dob || ""}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-black"
              />
            </div>
          </div>

          {/* Orders Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Orders</h3>
            {userDetails.orders.length === 0 ? (
              <p className="mt-2 text-sm text-gray-500">No orders available.</p>
            ) : (
              <ul className="mt-4">
                {userDetails.orders.map((order) => (
                  <li
                    key={order.id}
                    className="mb-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <span>Order ID: {order.id}</span>
                      <span>Status: {order.status}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span>Total Amount: ${order.total}</span>
                      <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
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
