"use client";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { SignUpVendor } from "@/lib/services";

const initialFormData = {
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
};

const SignupForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,      
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if(key !== 'isAdmin' && key !== 'isVendor' ){
        if (!formData[key]) {
        newErrors[key] = `${key.replace('_', ' ')} is required`;
      }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        createUserWithEmailAndPassword(formData.email, formData.password).then((res)=>{
          if(res.status === 200){
            const userData = {
              "uid": res.uid,
              ...formData
            };
            console.log(userData)
            // await SignUpVendor(userData);
          }else{
            console.log(res)
          }
        });        
      } catch (error) {
        console.error("Error signing up with email and password", error);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-primary p-4">
      <div className="bg-white p-4 shadow-lg w-full max-w-4xl rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              />
              {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              />
              {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              />
              {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
            />
            {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              />
              {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              />
              {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">License Number</label>
            <input
              type="text"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
            />
            {errors.license_number && <span className="text-red-500 text-sm">{errors.license_number}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Services Description</label>
            <textarea
              name="services_description"
              value={formData.services_description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
            />
            {errors.services_description && <span className="text-red-500 text-sm">{errors.services_description}</span>}
          </div>

          {/* <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Role</label>
              <div className="flex items-center mt-1">
                <label className="mr-4 text-gray-700">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.isAdmin}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Admin
                </label>
                <label className="text-gray-700">
                  <input
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
          </div> */}

          <div className="mb-4">
            <label className="block text-gray-700">Trade License Document</label>
            <input
              type="file"
              name="document_tradelicense"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
            />
            {errors.document_tradelicense && <span className="text-red-500 text-sm">{errors.document_tradelicense}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Other Supporting Document</label>
            <input
              type="file"
              name="document_other"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
            />
            {errors.document_other && <span className="text-red-500 text-sm">{errors.document_other}</span>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition-all duration-200"
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
