"use client";
import {
  UploadBackgroundImage,
  deleteBackgroundImage,
  getBackgroundImage,
} from "@/lib/services";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FiTrash, FiUpload } from "react-icons/fi";

interface Image {
  id: number;
  url: string;
  filename: string;
  [key: string]: any;
}

const ImageManagement: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const imagesPerPage = 15;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  useEffect(() => {
    Modal.setAppElement("#__next");
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await getBackgroundImage();
      setImages(response);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedImages((prev) => [...prev, ...filesArray]);

      const preview = URL.createObjectURL(filesArray[0]);
      setSelectedFile(filesArray[0]);
      setImagePreviews([preview]);
      setIsModalOpen(true);
    }
  };

  const handleSaveImage = async () => {
    if (uploadedImages.length > 0) {
      const formData = new FormData();
      uploadedImages.forEach((file) => {
        formData.append("images", file);
      });

      try {
        await UploadBackgroundImage(formData);
        setIsModalOpen(false);
        setUploadedImages([]);
        setImagePreviews([]);
        setSelectedFile(null);
        fetchImages();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleImageSelect = (url: string) => {
    setSelectedImages((prev) =>
      prev.includes(url) ? prev.filter((i) => i !== url) : [...prev, url]
    );
  };

  const handleRemoveImage = async (index: number, imageUrl: string) => {
    const imageToRemove = images[index];
    try {
      await deleteBackgroundImage(imageToRemove.url); // or imageToRemove.id depending on API
      setImages((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-white p-8 overflow-y-auto h-full shadow-md w-full rounded-3xl">
      <div className="mb-4 flex justify-between items-center">
        <label className="block text-gray-700 text-lg">Upload Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          id="upload-input"
        />
        <label
          htmlFor="upload-input"
          className="cursor-pointer bg-primary text-white px-4 py-2 hover:bg-black flex items-center rounded-xl"
        >
          <FiUpload className="mr-2" /> Upload
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 rounded-2xl gap-6 mt-4">
        {images
          .slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage)
          .map((image, index) => (
            <div
              key={image.id}
              className="relative group bg-gray-100 rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={process.env.NEXT_PUBLIC_URL + image.url}
                alt={image.filename}
                className={`w-full h-44 transition-transform duration-200 ease-in-out transform group-hover:scale-105 object-cover ${
                  selectedImages.includes(image.url)
                    ? "border-4 border-blue-500"
                    : "border"
                }`}
                onClick={() => handleImageSelect(image.url)}
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveImage(index, image.url)}
              >
                <FiTrash />
              </button>
            </div>
          ))}
      </div>

      {images.length > imagesPerPage && (
        <div className="flex justify-center items-center mt-10 text-white">
          <button
            onClick={handlePrevPage}
            className="py-2 px-4 rounded-full text-lg bg-primary hover:bg-gray-400 mr-2"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-2 ${
                index === currentPage ? "bg-primary" : "bg-primary-bodytext"
              }`}
            />
          ))}
          <button
            onClick={handleNextPage}
            className="py-2 px-4 rounded-full bg-primary text-lg hover:bg-gray-400 ml-2"
          >
            &gt;
          </button>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Image Upload Modal"
        className="bg-white p-6 rounded-2xl shadow-lg w-1/2 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        {imagePreviews.map((preview, index) => (
          <div key={index} className="mb-4 w-full flex justify-center">
            <img
              src={preview}
              alt={`Uploaded ${index}`}
              className="max-h-64 object-contain"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={handleSaveImage}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ImageManagement;
