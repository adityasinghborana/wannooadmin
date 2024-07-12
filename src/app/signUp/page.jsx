"use client";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { SignUpVendor, UploadBackgroundImage } from "@/lib/services";
import ImageUploadModal from "../ui/dashboard/SingleImageModal/CustomSingleImageUpload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const initialFormData = {
  username: "",
  password: "",
  isAdmin: false,
  isVendor: false,
  email: "",
  address: "",
  age: 22,
  name: "",
  license_number: "",
  country: "",
  city: "",
  services_description: "",
  mobile: "",
  document_tradelicense: null,
  document_other: null,
  document_bank: null,
  document_vat: null,
};

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [isModalOpen, setIsModalOpen] = useState({
    document_tradelicense: false,
    document_other: false,
    document_bank: false,
    document_vat: false,
  });
  const [selectedImage, setSelectedImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "isAdmin" && key !== "isVendor") {
        if (!formData[key]) {
          newErrors[key] = `${key.replace("_", " ")} is required`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        await createUserWithEmailAndPassword(
          formData.email,
          formData.password
        ).then(async (res) => {
          console.log(res, "this is resssposne ");
          if (res.user.accessToken !== null) {
            console.log("hello this works if ");
            const userData = {
              uid: res.user.uid,
              ...formData,
            };
            // console.log(userData.uid,"this is uid ");
            await SignUpVendor(userData).then(() =>
              router.push("/admin/dashboard")
            );
          } else {
            console.log(res);
          }
        });
      } catch (error) {
        console.error("Error signing up with email and password", error);
      }
    }
  };

  const handleImageSelect = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSelectedImage(file);
        setIsModalOpen((prevState) => ({ ...prevState, [type]: true }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async (name) => {
    let formData = new FormData();
    formData.append("image", selectedImage);
    let imgData = await UploadBackgroundImage(formData);
    // Assuming you're storing image paths in a field named "imagepaths"
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: imgData?.path,
    }));
    setIsModalOpen({
      document_tradelicense: false,
      document_other: false,
      document_bank: false,
      document_vat: false,
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-primary-foreground p-4">
      <div className="bg-white  w-1/2 px-8 shadow-lg  max-w-4xl rounded-2xl py-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-field"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="text-field"
              />
              {errors.age && (
                <span className="text-red-500 text-sm">{errors.age}</span>
              )}
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
                className="text-field"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username}</span>
              )}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="text-field"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
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
                className="text-field"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="text-field"
              />
              {errors.mobile && (
                <span className="text-red-500 text-sm">{errors.mobile}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="text-field"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="text-field"
              />
              {errors.city && (
                <span className="text-red-500 text-sm">{errors.city}</span>
              )}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="text-field"
              />
              {errors.country && (
                <span className="text-red-500 text-sm">{errors.country}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">License Number</label>
            <input
              type="text"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
              className="text-field"
            />
            {errors.license_number && (
              <span className="text-red-500 text-sm">
                {errors.license_number}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Services Description</label>
            <textarea
              name="services_description"
              value={formData.services_description}
              onChange={handleChange}
              className="text-field"
            />
            {errors.services_description && (
              <span className="text-red-500 text-sm">
                {errors.services_description}
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-x-12 mb-4 max-w-max">
            <div className="flex flex-row">
              <input
                type="file"
                id="document_tradelicense"
                style={{ display: "none" }}
                onChange={(e) => handleImageSelect(e, "document_tradelicense")}
              />

              <Button
                variant={"outline"}
                type="button"
                className="bg-primary w-full text-white rounded py-2 px-4  "
                onClick={() =>
                  document.getElementById("document_tradelicense").click()
                }
              >
                Upload Trade
                <br /> License
              </Button>
              <ImageUploadModal
                isOpen={isModalOpen.document_tradelicense}
                onClose={() =>
                  setIsModalOpen((prevState) => ({
                    ...prevState,
                    document_tradelicense: false,
                  }))
                }
                onConfirm={handleConfirm}
                imagePreview={imagePreview}
                name="document_tradelicense"
              />
              {errors.document_tradelicense && (
                <span className="text-red-500 text-sm">
                  {errors.document_tradelicense}
                </span>
              )}
            </div>

            <div>
              <input
                type="file"
                id="document_other"
                style={{ display: "none" }}
                onChange={(e) => handleImageSelect(e, "document_other")}
              />

              <Button
                variant={"outline"}
                type="button"
                className="bg-primary text-white py-2 px-4 rounded w-full"
                onClick={() =>
                  document.getElementById("document_other").click()
                }
              >
                Upload Supporting
                <br />
                Document
              </Button>
              <ImageUploadModal
                isOpen={isModalOpen.document_other}
                onClose={() =>
                  setIsModalOpen((prevState) => ({
                    ...prevState,
                    document_other: false,
                  }))
                }
                onConfirm={handleConfirm}
                imagePreview={imagePreview}
                name="document_other"
              />
              {errors.document_other && (
                <span className="text-red-500 text-sm">
                  {errors.document_other}
                </span>
              )}
            </div>

            <div>
              <input
                type="file"
                id="document_bank"
                style={{ display: "none" }}
                onChange={(e) => handleImageSelect(e, "document_bank")}
              />

              <Button
                variant={"outline"}
                type="button"
                className="bg-primary text-white py-2 px-4 rounded w-full"
                onClick={() => document.getElementById("document_bank").click()}
              >
                Upload Bank <br /> Documents
              </Button>
              <ImageUploadModal
                isOpen={isModalOpen.document_bank}
                onClose={() =>
                  setIsModalOpen((prevState) => ({
                    ...prevState,
                    document_bank: false,
                  }))
                }
                onConfirm={handleConfirm}
                imagePreview={imagePreview}
                name="document_bank"
              />
              {errors.document_bank && (
                <span className="text-red-500 text-sm">
                  {errors.document_bank}
                </span>
              )}
            </div>

            <div>
              <input
                type="file"
                id="document_vat"
                style={{ display: "none" }}
                onChange={(e) => handleImageSelect(e, "document_vat")}
              />

              <Button
                variant={"outline"}
                type="button"
                className="bg-primary text-white py-2 px-4 rounded w-full"
                onClick={() => document.getElementById("document_vat").click()}
              >
                Upload VAT <br /> Document
              </Button>
              <ImageUploadModal
                isOpen={isModalOpen.document_vat}
                onClose={() =>
                  setIsModalOpen((prevState) => ({
                    ...prevState,
                    document_vat: false,
                  }))
                }
                onConfirm={handleConfirm}
                imagePreview={imagePreview}
                name="document_vat"
              />
              {errors.document_vat && (
                <span className="text-red-500 text-sm">
                  {errors.document_vat}
                </span>
              )}
            </div>
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
