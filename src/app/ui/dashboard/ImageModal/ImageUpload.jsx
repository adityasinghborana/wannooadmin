import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import { UploadTourImage } from "@/lib/services";

const CustomImageUpload = ({ onImageSelect, Images }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [availableImages, setAvailableImages] = useState([{}]);
    
    const getImages = async()=>{
      const images = await Images();
      setAvailableImages(images);
    }
    
    const closeModal = () => {  
      onImageSelect(selectedImages);
      setIsModalOpen(false);
    }
    
    const imagesPerPage = 6;
    const totalPages = Math.ceil(availableImages.length / imagesPerPage);
    
    const handleImageSelect = (url) => {
      setSelectedImages((prevSelectedImages) =>
        prevSelectedImages.includes(url)
          ? prevSelectedImages.filter((image) => image !== url)
          : [...prevSelectedImages, url]
      );
    // console.log(selectedImages)
      // Pass updated selectedImages state to onImageSelect
      onImageSelect(selectedImages); 
    };
    
  
    const handleImageUpload = (e) => {
      console.log(e)
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
      if(uploadedImages.length > 0){
        const formData = new FormData();
        uploadedImages.forEach((image) => {
        formData.append("image", image);
        });
      await UploadTourImage(formData)
      getImages()}      
      closeModal()
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
        <div
          onClick={() => setIsModalOpen(true)}
          className="w-full p-2 border border-gray-300 rounded mt-1 cursor-pointer"
        >
          Select or Upload Images
        </div>
  
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