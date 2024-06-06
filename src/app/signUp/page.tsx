"use client";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {auth} from '@/firebase/config'  // Adjust the path as necessary
import { SignUpVendor } from "@/lib/services";


interface FormData {
  username: string;
  password: string;
  isAdmin: boolean;
  isVendor: boolean;
  email: string;
  address: string;
  age: string;
  name: string;
  license_number: string;
  country: string;
  city: string;
  services_description: string;
  mobile: string;
  document_tradelicense: File | null;
  document_other: File | null;
}

const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    isAdmin: false,
    isVendor: false,
    email: "",
    address: "",
    age: "",
    name: "",
    license_number: "",
    country: "",
    city: "",
    services_description: "",
    mobile: "",
    document_tradelicense: null,
    document_other: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
      ...(name === 'role' && {
        isAdmin: value === 'admin',
        isVendor: value === 'vendor',
      }),
    }));
  };

  const [createUserWithEmailAndPassword, user, loading, error] =
  useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof FormData]) {
        newErrors[key] = `${key.replace('_', ' ')} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        let data = await createUserWithEmailAndPassword(formData.email, formData.password);
        let userData = {
          "uid": data,
          ...formData
        }
        await SignUpVendor(userData)
        // Handle additional user info here, like updating Firestore with user data
      } catch (error) {
        console.error("Error signing up with email and password", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-white">Name</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-black rounded mt-1"

              />
            </div>

            <div className="mb-4">
              <label className="block text-white">Age</label>
              <input
                required
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-black rounded mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4 w-full">
              <label className="block text-white">Username</label>
              <input
                required
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-black rounded mt-1"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-white">Password</label>
              <input
                required
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-black rounded mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-white">Email</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-black rounded mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Mobile</label>
              <input
                required
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-black rounded mt-1"
              />
            </div>
          </div>          

          <div className="mb-4">
            <label className="block text-white">Address</label>
            <input
              required
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-black rounded mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-white">City</label>
              <input
                required
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-black rounded mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white">Country</label>
              <input
                required
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-black rounded mt-1"
              />
            </div>
          </div>          

          <div className="mb-4">
            <label className="block text-white">License Number</label>
            <input
              required
              type="text"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-black rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white">Services Description</label>
            <textarea
              name="services_description"
              value={formData.services_description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-black rounded mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-white">Role</label>
              <div className="flex items-center">
                <label className="mr-4 text-white">
                  <input
                    required
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.isAdmin}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Admin
                </label>
                <label className="text-white">
                  <input
                    required
                    type="radio"
                    name="role"
                    value="vendor"
                    checked={formData.isVendor}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Vendor
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white">
              Trade License Document
            </label>
            <input
              required
              type="file"
              name="document_tradelicense"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white">Other supporting Document</label>
            <input
              type="file"
              name="document_other"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
