import SImageModalGrid from "./SImageModalGrid";
import CustomPagination from '../Pagination/Pagination';
import { useState } from "react";

const SImageModalContent = ({ availableImages, handleImageSelect, selectedImage, handleImageUpload, imagePreviews, handleRemoveImage, uploadNewImages, setIsModalOpen, isModalOpen,...props }) => {
  const imagesPerPage = 6;
  const totalPages = Math.ceil(availableImages.length / imagesPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderImages = () => {
    const startIndex = currentPage * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    return availableImages.slice(startIndex, endIndex);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Select or Upload Image
        </h2>
        <button
          type="button"
          onClick={() => setIsModalOpen()}
          className="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>

      <div className="container">
        <SImageModalGrid images={renderImages()} handleImageSelect={handleImageSelect} selectedImage={selectedImage} {...props} />
        <div className="mt-2">
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700">
          Upload New Image
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleImageUpload(e)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        <div className="grid grid-cols-3 gap-2 mt-2">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Uploaded ${index}`}
                className="w-full h-32 object-contain border"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                onClick={() => handleRemoveImage(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>        
      </div>

      <div className="flex justify-end mt-4">        
        <button
          type="button"
          onClick={() => uploadNewImages()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Done
        </button>
      </div>
    </>
  );
};

export default SImageModalContent;
