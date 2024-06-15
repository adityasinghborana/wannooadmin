'use client'
import Container from '@/app/ui/dashboard/container/Container';
import { AddCity, AddTourTypes, GetAllCities, GetAllImages, GetAllTourTypes, UploadImage } from '@/lib/services';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

// Define types for the form data
interface FormData {
  cityId: string;
  cityName: string;
  tourName: string;
  duration: string;
  departurePoint: string;
  reportingTime: string;
  tourLanguage: string;
  // imagePath: string; // removed image path from the state and created a new one
  cityTourTypeId: string;
  cityTourType: string;
  tourDescription: string;
  tourInclusion: string;
  tourShortDescription: string;
  whatsInThisTour: string;
  importantInformation: string;
  itenararyDescription: string;
  usefulInformation: string;
  faqDetails: string;
  childAge: string;
  infantAge: string;
  infantCount: string;
  isSlot: string;
  onlyChild: string;
  contractId: string;
  latitude: string;
  longitude: string;
  startTime: string;
  meal: string;
  googleMapUrl: string;
  tourExclusion: string;

  cutOffhrs: string;
}

const TourForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    cityId: '',
    cityName: '',
    tourName: '',
    duration: '',
    departurePoint: '',
    reportingTime: '',
    tourLanguage: '',
    cityTourTypeId: '',
    cityTourType: '',
    tourDescription: '',
    tourInclusion: '',
    tourShortDescription: '',
    whatsInThisTour: '',
    importantInformation: '',
    itenararyDescription: '',
    usefulInformation: '',
    faqDetails: '',
    childAge: '',
    infantAge: '',
    infantCount: '',
    isSlot: '',
    onlyChild: '',
    contractId: '',
    latitude: '',
    longitude: '',
    startTime: '',
    meal: '',
    googleMapUrl: '',
    tourExclusion: '',
    cutOffhrs: '',
  });

  const [cities, setCities] = useState([
    { CityId: '0', CityName: 'No record found' }
  ])

  const [tourTypes, settTourTypes] = useState([
    { cityTourType: 'No record found' }
  ])

  const [customCity, setCustomCity] = useState<string>('');
  const [customTourType, setCustomTourType] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [availableImages, setAvailableImages] = useState<Image[]>([{ name: '1', url: 'image1.jpg' }]);

  const imagesPerPage = 6;
  const totalPages = Math.ceil(availableImages.length / imagesPerPage);

  const openModal = async () => {
      let allImages = await GetAllImages()
      setAvailableImages(allImages)
      setIsModalOpen(true);}

  const closeModal = () => setIsModalOpen(false);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const handleImageSelect = (url: string) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.includes(url)
        ? prevSelectedImages.filter((image) => image !== url)
        : [...prevSelectedImages, url]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
      setUploadedImages((prevUploadedImages) => [...prevUploadedImages, ...filesArray]);
      console.log(uploadedImages)
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setUploadedImages((prevUploadedImages) => prevUploadedImages.filter((_, i) => i !== index));
  };

  const uploadNewImages = async () => {
    const formData = new FormData();
    uploadedImages.forEach((file) => {
      formData.append('image', file);
    });
    // selectedImages.forEach((url, index) => {
    //   formData.append(`selectedImage${index}`, url);
    // });
    uploadedImages.length > 0 && await UploadImage(formData)
    closeModal()
  }

  useEffect(() => {
    const getCitiesAndTourTypes = async () => {
      let cities = await GetAllCities();
      let tourTypes = await GetAllTourTypes();
      setCities(cities)
      settTourTypes(tourTypes)
    }

    getCitiesAndTourTypes()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.cityName === 'custom' && await AddCity(customCity)
    formData.cityTourType === 'custom' && await AddTourTypes(customTourType)
    console.log(formData);
  };

  return (
    <Container>
      <div className="bg-white p-8  rounded-3xl" style={{height:'calc(100vh)', overflowY:'auto', scrollbarWidth:'none'}}>
        <h2 className="text-2xl text-black font-bold mb-6 text-center">Create Tour</h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-4 mb-16'>
          {/* Form fields */}
          {Object.keys(formData).map((key) => {
            if (key === 'cityName' || key === 'cityTourType' || key === 'cityId') return null;
            return (
              <div className="mb-4" key={key}>
                <label className="block text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData[key as keyof FormData]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                  required
                />
              </div>
            );
          })}
          <div className="flex justify-center col-span-3">
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-purple-400 w-1/3"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

interface Image {
  name: string;
  url: string;
}

export default TourForm;
