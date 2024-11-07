"use client";

import CustomImageUpload from "@/app/ui/dashboard/ImageModal/ImageUpload";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { editTour, GetAllImages, getTourDetails, updateAvailability } from "@/lib/services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";

interface TourData {
  [key: string]: string | string[] | number;
}

interface Image {
  id: number;
  imagePath: string;
}

export default function EditTour({ params }: { params: { tourid: String } }) {
  const [tourdetails, setTourDetails] = useState<TourData>({});
  const [isedit, setIsEdit] = useState<boolean>(true);
  const [images, setImages] = useState<Image[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [availability, setAvailability] = useState<number | string>("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // Manage selected images

  useEffect(() => {
    const fetchTourDetails = async () => {
      if (params.tourid.includes("view")) {
        setIsEdit(false);
        params.tourid = params.tourid.replace("view", "");
      }
      let res = await getTourDetails(params.tourid);
      if (res) {
        setImages(res?.tourImages);
        delete res?.tourImages;
        setTourDetails(res);
        setAvailability(res?.availability || "");
      }
    };
    fetchTourDetails();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTourDetails({ ...tourdetails, [name]: value });
  };

  const handleAvailabilityChange = (e: any) => {
    const value = e.target.value;
    setAvailability(value === "" ? "" : Number(value));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { TourId, ...rest } = tourdetails; // Destructure to remove TourId
    const updatedTourData = { ...rest, images: selectedImages, tourId: TourId }; // Spread the rest and add images

    availability && await updateAvailability({id: tourdetails.id, available:availability})
    await editTour(updatedTourData)
    
    // Call the API to update tour details
    // await updateTourDetails(updatedTourData);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const deleteImage = () => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      // Implement image deletion logic
    }
  };

  const updateImage = () => {
    // Implement image upload logic
  };

  return (
    <div className="w-full flex justify-center px-20">
      <div className="w-full max-w-7xl" style={{ maxHeight: "90vh", overflow: "auto" }}>
        <form
          onSubmit={handleSubmit}
          className="px-4 py-4 border rounded-xl bg-white"
        >
          <div className="mb-5">
            <Link href={"/dashboard/tours"} className="text-black text-3xl">
              <MdArrowBack />
            </Link>
          </div>
          {images.length > 0 && (
            <Carousel
              id={String(currentImageIndex)}
              opts={{
                align: "start",
              }}
              className="w-[90%] mx-auto"
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem className='md:basis-1/2 lg:basis-1/3' key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img
                            src={image.imagePath}
                            alt={`Image ${index + 1}`}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
          {isedit && <CustomImageUpload
            onImageSelect={setSelectedImages} // Set selected images here
            Images={GetAllImages} // Pass existing images
          />}
          <div className="grid grid-cols-1 gap-5">
            {Object.keys(tourdetails).map((key) => (
              <div key={key}>
                <div className="mb-4">
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700 uppercase"
                  >
                    {key}
                  </label>
                  <textarea
                    id={key}
                    name={key}
                    disabled={!isedit}
                    value={tourdetails[key] || ""}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-black"
                  />
                </div>
              </div>
            ))}
            <div className="mb-4">
              <label
                htmlFor="availability"
                className="block text-sm font-medium text-gray-700 uppercase"
              >
                Availability
              </label>
              <input
                type="number"
                id="availability"
                value={availability}
                onChange={handleAvailabilityChange}
                disabled={!isedit}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-black"
                placeholder="Enter availability number"
              />
            </div>
          </div>
          {isedit && (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
