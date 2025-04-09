"use client";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import { UploadBackgroundImage } from "@/lib/services";
import { Button } from "@/components/ui/button";

const CustomImageUpload = ({ onImageSelect, Images }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [availableImages, setAvailableImages] = useState([]);

  const getImages = async () => {
    const images = await Images();
    setAvailableImages(images || []);
  };

  const closeModal = () => {
    onImageSelect(selectedImages);
    setIsModalOpen(false);
  };

  const imagesPerPage = 6;
  const totalPages = Math.ceil(availableImages.length / imagesPerPage);

  const handleImageSelect = (url) => {
    setSelectedImages((prevSelectedImages) => {
      const newSelection = prevSelectedImages.includes(url)
        ? prevSelectedImages.filter((image) => image !== url)
        : [...prevSelectedImages, url];

      onImageSelect(newSelection); // Update parent right away
      return newSelection;
    });
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const previews = filesArray.map((file) => URL.createObjectURL(file));

      setImagePreviews((prev) => [...prev, ...previews]);
      setUploadedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const uploadNewImages = async () => {
    if (uploadedImages.length === 0) return;

    const formData = new FormData();
    uploadedImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await UploadBackgroundImage(formData);

      // Assuming response structure: { files: [{ path: "..." }] }
      const uploadedPaths = response?.files?.map((file) => file.path) || [];

      if (uploadedPaths.length) {
        const newSelection = [...selectedImages, ...uploadedPaths];
        setSelectedImages(newSelection);
        onImageSelect(newSelection);
        await getImages();
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }

    // Clear upload state & close modal
    setImagePreviews([]);
    setUploadedImages([]);
    closeModal();
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="mb-4">
      <Button
        variant={"outline"}
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="rounded-xl"
      >
        Select or Upload Images
      </Button>

      {isModalOpen && (
        <ImageModal
          availableImages={availableImages}
          currentPage={currentPage}
          imagesPerPage={imagesPerPage}
          imagePreviews={imagePreviews}
          selectedImages={selectedImages}
          setCurrentPage={setCurrentPage}
          setIsModalOpen={closeModal}
          isModalOpen={isModalOpen}
          setSelectedImages={setSelectedImages}
          uploadedImages={uploadedImages}
          handleImageSelect={handleImageSelect}
          handleImageUpload={handleImageUpload}
          handleRemoveImage={handleRemoveImage}
          uploadNewImages={uploadNewImages}
        />
      )}
    </div>
  );
};

export default CustomImageUpload;
