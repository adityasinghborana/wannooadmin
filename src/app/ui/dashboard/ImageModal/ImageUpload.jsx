import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import { UploadBackgroundImage } from "@/lib/services";
import { Button } from "@/components/ui/button";

const CustomImageUpload = ({ onImageSelect, Images }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availableImages, setAvailableImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const getImages = async () => {
        try {
            const images = await Images();
            setAvailableImages(images);
        } catch (err) {
            console.error("Error fetching images:", err);
            setError("Failed to load images.");
        }
    };

    const closeModal = () => {  
        onImageSelect(selectedImages);
        setIsModalOpen(false);
    };

    const handleImageSelect = (url) => {
        setSelectedImages((prevSelectedImages) =>
            prevSelectedImages.includes(url)
                ? prevSelectedImages.filter((image) => image !== url)
                : [...prevSelectedImages, url]
        );
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
            setIsLoading(true);
            setError(""); // Reset error message
            try {
                const formData = new FormData();
                uploadedImages.forEach((image) => {
                    formData.append("image", image);
                });
                await UploadBackgroundImage(formData);
                await getImages();
            } catch (err) {
                console.error("Error uploading images:", err);
                setError("Failed to upload images.");
            } finally {
                setIsLoading(false);
            }
        }
        closeModal();
    };

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
        <div className="mb-4 max-w-2xl">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(true)} className="rounded-xl">
                Select or Upload Images
            </Button>

            {error && <div className="text-red-600">{error}</div>}

            {isModalOpen && (
                <ImageModal
                    availableImages={availableImages}
                    imagePreviews={imagePreviews}
                    selectedImages={selectedImages}
                    setIsModalOpen={closeModal}
                    setSelectedImages={setSelectedImages}
                    uploadedImages={uploadedImages}
                    handleImageSelect={handleImageSelect}
                    handleImageUpload={handleImageUpload}
                    handleRemoveImage={handleRemoveImage}
                    uploadNewImages={uploadNewImages}
                    isLoading={isLoading} // Pass loading state
                />
            )}
        </div>
    );
};

export default CustomImageUpload;
