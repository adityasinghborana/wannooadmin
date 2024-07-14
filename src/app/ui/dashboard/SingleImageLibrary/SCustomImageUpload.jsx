import { useEffect, useState } from "react";
import SImageModal from "./SImageModal";
import { UploadBackgroundImage } from "@/lib/services";
import { Button } from "@/components/ui/button";

const SCustomImageUpload = ({ onImageSelect, Images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [availableImages, setAvailableImages] = useState([{}]);
  
  const getImages = async () => {
    const images = await Images();
    setAvailableImages(images);
  }
  
  const closeModal = () => {  
    onImageSelect(selectedImage);
    setIsModalOpen(false);
  }
  
  const imagesPerPage = 6;
  const totalPages = Math.ceil(availableImages.length / imagesPerPage);
  
  const handleImageSelect = (url) => {
    setSelectedImage(url === selectedImage ? null : url);
    onImageSelect(url === selectedImage ? null : url);
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
      setUploadedImages((prevUploadedImages) => [
        ...prevUploadedImages,
        ...filesArray,
      ]);
    }
  };

  const uploadNewImages = async () => {
    if (uploadedImages.length > 0) {
      const formData = new FormData();
      uploadedImages.forEach((image) => {
        formData.append("image", image);
      });
      await UploadBackgroundImage(formData);
      getImages();
    }      
    closeModal();
  }

  useEffect(() => {
    getImages();
  }, []);   
  
  const handleRemoveImage = (index) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setUploadedImages((prevUploadedImages) =>
      prevUploadedImages.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="mb-4">
      <Button variant={"outline"} type="button" onClick={() => setIsModalOpen(true)} className="rounded-xl">
        Select or Upload Image
      </Button>

      {isModalOpen && (
        <SImageModal
          availableImages={availableImages}
          currentPage={currentPage}
          imagesPerPage={imagesPerPage}
          imagePreviews={imagePreviews}
          selectedImage={selectedImage}
          setCurrentPage={setCurrentPage}
          setIsModalOpen={closeModal}
          isModalOpen={isModalOpen}
          setSelectedImage={setSelectedImage}
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

export default SCustomImageUpload;
