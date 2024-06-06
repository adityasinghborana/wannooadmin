"use client"
import { getBackgroundImage } from "@/lib/services"
import { useEffect, useState } from "react"

interface Image {
    id: number;
    url: string;
    filename: string;
  }

const BgImage = () => {
    const [bgimage, setBgImage] = useState<Image[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(()=>{
        const getData = async () =>{
            setBgImage(await getBackgroundImage())
        }
        getData()
    },[])

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bgimage.length);
      };
    
      const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? bgimage.length - 1 : prevIndex - 1
        );
      };
    
      const deleteImage = () => {
        if (window.confirm("Are you sure you want to delete this image?")) {
          // Make an API request to delete the current image
          // After deletion, you may want to fetch the updated list of images
        }
      };
    
      const updateImage = () => {
        
      };

  return (
    <div className="mt-5">{bgimage.length > 0 && (
        <div id={String(currentImageIndex)} className="carousel flex justify-center">
          <div className="bg-black grid h-64 w-full">
            <img
              src={bgimage[currentImageIndex].url }
              alt={`${bgimage[currentImageIndex].filename}`}
            />
            <div className="controls mt-4 flex justify-between">
              <button onClick={prevImage}>Previous</button>
              <button onClick={deleteImage}>Delete</button>
              <button onClick={updateImage}>Update</button>
              <button onClick={nextImage}>Next</button>
            </div>
          </div>
          {bgimage.length === 0 && <p>No images available.</p>}
        </div>
      )}</div>
  )
}

export default BgImage