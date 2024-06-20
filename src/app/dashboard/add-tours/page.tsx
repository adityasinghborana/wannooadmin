'use client'
import Container from '@/app/ui/dashboard/container/Container';
import { AddCity, AddTourTypes, GetAllCities, GetAllImages, GetAllTourTypes, UploadTourImage } from '@/lib/services';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FiTrash } from 'react-icons/fi';
import Select from 'react-select';

// Define types for the form data
interface TourDetails {
  countryId: number | null;
  countryName: string;
  cityId: number | null;
  cityName: string;
  tourName: string;
  duration: string;
  imagePath: string;
  cityTourTypeId: string;
  cityTourType: string;
  contractId: number | null;
  isRecommended: boolean;
  isPrivate: boolean;
  isSlot: boolean;
  tourDescription: string;
  tourInclusion: string;
  shortDescription: string;
  importantInformation: string;
  itineraryDescription: string;
  usefulInformation: string;
  childAge: string;
  infantAge: string;
  infantCount: number | null;
  isOnlyChild: boolean;
  startTime: string;
  meal: string;
  googleMapUrl: string;
  tourExclusion: string;
  imagePaths: string[];
  adultprice: number | null;
  childprice: number | null;
  amount: number | null;
  infantprice: number | null;
  optionList: TourOption[];
}

interface TourOption {
  optionName: string;
  childAge: string;
  infantAge: string;
  optionDescription: string;
  minPax: number;
  maxPax: number;
  duration: string;
  operationDays: { [day: string]: number }; // Key is weekday string (e.g., "monday"), value is 1 (available) or 0 (not available)
  timeSlots: TimeSlot[];
}

interface TimeSlot {
  timeSlotId: string;
  timeSlot: string;
  available: number;
  adultPrice: number;
  childPrice: number;
}


const TourForm: React.FC = () => {
  const [formData, setFormData] = useState<TourDetails>({
    countryId: null,
    countryName: '', // Empty string placeholder
    cityId: null,
    cityName: '',
    tourName: '',
    duration: '',
    imagePath: '',
    cityTourTypeId: '',
    cityTourType: '',
    contractId: null,
    isRecommended: false,
    isPrivate: false,
    isSlot: false,
    tourDescription: '',
    tourInclusion: '',
    shortDescription: '',
    importantInformation: '',
    itineraryDescription: '',
    usefulInformation: '',
    childAge: '',
    infantAge: '',
    infantCount: null,
    isOnlyChild: false,
    startTime: '',
    meal: '',
    googleMapUrl: '',
    tourExclusion: '',
    imagePaths: [],
    adultprice: 0,
    childprice: 0,
    amount: 0,
    infantprice: 0,
    optionList: [
      {
        optionName: '',
        childAge: '',
        infantAge: '',
        optionDescription: '',
        minPax: 0,
        maxPax: 0,
        duration: '',
        operationDays: { },
        timeSlots: [
          {
            timeSlotId: '',
            timeSlot: '',
            available: 0,
            adultPrice: 0,
            childPrice: 0,
          }
        ]
      }
    ],
  })

  const [hiddenFields, setHiddenFields] = useState(['cityTourTypeId', 'cityId', 'cityid', 'countryId', 'cityName', 'cityTourType'])

  const [cities, setCities] = useState([
    { id: 0, CityId: 0, CityName: 'No record found' }
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
    setIsModalOpen(true);
  }

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
    uploadedImages.length > 0 && await UploadTourImage(formData)
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
    if (name === 'cityName') {
      const city = cities.find((city) => city.CityName === value);
      if (city) {
        setFormData((prevData) => ({
          ...prevData,
          cityid: city.CityId,
        }));
      }
    }
  };

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [optionList, setOptionList] = useState(formData.optionList);

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, i: number) => {
    const { name, value } = e.target;
    const newOptionList = [...optionList];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedOption = { ...newOptionList[i], [name]: value } as any;
    newOptionList[i] = updatedOption;
    setOptionList(newOptionList);
  };

  const addOption = () => {
    setFormData({
      ...formData,
      optionList: [...optionList,
      {
        optionName: '',
        childAge: '',
        infantAge: '',
        optionDescription: '',
        minPax: 0,
        maxPax: 0,
        duration: '',
        operationDays: { },
        timeSlots: [
          {
            timeSlotId: '',
            timeSlot: '',
            available: 0,
            adultPrice: 0,
            childPrice: 0,
          }
        ]
      }
      ]
    })
    setOptionList(formData.optionList)
  }

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];


  const handleDaysChange = (selectedDays:any, index:any) => {
    const updatedOptionList = [...optionList];
    let operationDays = {};
    selectedDays.forEach((day: { value: string; }) => {
      operationDays = { ...operationDays, [day.value]: 1 };
    });
    updatedOptionList[index].operationDays = operationDays;
    setOptionList(updatedOptionList);
    setFormData({
      ...formData,
      optionList: [...optionList]
    })    
  };


  const removeOption = (optionIndex: number) => {
    const newOptionList = optionList.filter((_, index) => index !== optionIndex);
    setFormData({
      ...formData,
      optionList: [...optionList]
    })
    setOptionList(newOptionList);
  }

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.cityName === 'custom' && await AddCity(customCity)
    formData.cityTourType === 'custom' && await AddTourTypes(customTourType)
    console.log(formData);
  };

  return (
    <Container>
      <div className="bg-white p-8 shadow-md w-full rounded-3xl" style={{ height: 'calc(100vh - 6rem)' }}>
        <h2 className="text-2xl text-black font-bold mb-6 text-center">Create Tour</h2>
        <div className="overflow-y-auto" style={{ maxHeight: '90%', scrollbarWidth: 'none' }}>
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">City Name</label>
              <select
                name="cityName"
                value={formData.cityName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-black rounded mt-1"
                required
              >
                <option value="" disabled>Select a city</option>
                {cities.map((city, i) => (
                  <option key={i} value={city.CityName}>
                    {city.CityName}
                  </option>
                ))}
                <option value="custom">Other</option>
              </select>
              {formData.cityName === 'custom' && (
                <input
                  type="text"
                  name="customCity"
                  value={customCity}
                  onChange={(e) => setCustomCity(e.target.value)}
                  placeholder="Enter city name"
                  className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                  required
                />
              )}
            </div>

            {/* Tour Type Dropdown */}
            <div className="mb-4 text-black">
              <label className="block text-gray-700">Tour Type</label>
              <select
                name="cityTourType"
                value={formData.cityTourType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                required
              >
                <option value="" disabled>Select a tour type</option>
                {tourTypes.map((type, i) => (
                  <option key={i} value={type.cityTourType}>
                    {type.cityTourType}
                  </option>
                ))}
                <option value="custom">Other</option>
              </select>
              {formData.cityTourType === 'custom' && (
                <input
                  type="text"
                  name="customTourType"
                  value={customTourType}
                  onChange={(e) => setCustomTourType(e.target.value)}
                  placeholder="Enter tour type"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              )}
            </div>

            {/* Image Upload and Select */}
            <div className="mb-4">
              <label className="block text-gray-700">Images</label>
              <div onClick={openModal} className="w-full p-2 border border-gray-300 rounded mt-1 cursor-pointer">
                Select or Upload Images
              </div>

              {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                  <div className="bg-white p-4 rounded shadow-lg w-3/4 max-w-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Select or Upload Images</h2>
                      <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                        &times;
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {availableImages
                        .slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage)
                        .map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={process.env.NEXT_PUBLIC_URL + image.url}
                              alt={image.name}
                              className={`w-full h-32 object-cover ${selectedImages.includes(image.url) ? 'border-4 border-blue-500' : 'border'
                                }`}
                              onClick={() => handleImageSelect(image.url)}
                            />
                            {selectedImages.includes(image.url) && (
                              <span className="absolute top-0 right-0 bg-blue-500 text-white p-1 rounded-full">✓</span>
                            )}
                          </div>
                        ))}
                    </div>

                    {availableImages.length > imagesPerPage && (
                      <div className="flex justify-center items-center mt-4">
                        <button type='button' onClick={handlePrevPage} className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 mr-2">
                          &lt;
                        </button>
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full mx-1 ${index === currentPage ? 'bg-blue-500' : 'bg-gray-300'
                              }`}
                          />
                        ))}
                        <button type='button' onClick={handleNextPage} className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 ml-2">
                          &gt;
                        </button>
                      </div>
                    )}

                    <div className="mt-4">
                      <label className="block text-gray-700">Upload New Images</label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                      />
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img src={preview} alt={`Uploaded ${index}`} className="w-full h-32 object-contain border" />
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
                        onClick={() => uploadNewImages()}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other form fields */}
            {Object.keys(formData).map((key, i) => {
              if (hiddenFields.includes(key)) return null;
              let type: 'text' | 'checkbox' | 'number' | 'time' | 'file' | 'textarea' = 'text';
              if (key === 'duration' || key === 'startTime') {
                type = 'time';
              } else if (key === 'imagePath') {
                type = 'file';
              } else if (key === 'contractId') {
                type = 'number';
              } else if (['childAge', 'infantAge', 'infantCount'].includes(key)) {
                type = 'number';
              } else if (['description', 'shortDescription'].includes(key)) {
                type = 'textarea'; // Use textarea type for these keys
              } else {
                type = 'text';
              }
              if (key !== 'optionList') return (
                <div className='mb-4'>
                  {
                    <div className="mb-4" key={i}>
                      <label className="block text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                      </label>
                      {type === 'textarea' ? (
                        <textarea
                          name={key}
                          defaultValue={(formData as any)[key as keyof FormData]}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                          required
                        />
                      ) : (
                        <input
                          type={type}
                          name={key}
                          defaultValue={(formData as any)[key as keyof FormData]}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                          required
                        />
                      )}
                    </div>
                  }
                </div>
              );
              return (
                <div className='col-span-3'>
                  <label className="flex justify-center text-xl rounded-xl px-4 py-3 text-white capitalize w-full bg-primary mb-4">
                    <h1>Options</h1>
                  </label>
                  {
                    (formData as any)[key as keyof FormData].map((option: any, index: any) => (
                      <div key={index} className='accordion-item border border-gray-300 rounded-lg mb-4 shadow-md'>
                        <div
                          className='accordion-header cursor-pointer bg-blue-100 p-4 flex justify-between items-center rounded-t-lg'
                        >
                          <h2 className='text-lg font-semibold text-blue-700'>
                            Option {index + 1}
                          </h2>
                          <div className='flex items-center justify-between'>
                            <span className="text-blue-700 mx-8" onClick={() => toggleAccordion(index)}>
                              {expandedIndex === index ? '-' : '+'}
                            </span>
                            <span className="text-red-500 hover:text-blue-400" onClick={() => removeOption(index)}>
                              <FiTrash />
                            </span>
                          </div>

                        </div>
                        <div className={`accordion-content transition-max-height duration-300 ease-in-out ${expandedIndex === index ? 'max-h-full p-4' : 'max-h-0 p-0 overflow-hidden'}`}>
                          <div className='grid grid-cols-3 gap-6'>
                            <div>
                              <label className="block text-gray-700 capitalize mb-1">
                                Option Name
                              </label>
                              <input
                                type="text"
                                name={`optionList[${index}].optionName`}
                                defaultValue={option.optionName}
                                onChange={(e) => handleOptionChange(e, index)}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 capitalize mb-1">
                                Child Age
                              </label>
                              <input
                                type="number"
                                name={`optionList[${index}].childAge`}
                                defaultValue={option.childAge}
                                onChange={(e) => handleOptionChange(e, index)}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 capitalize mb-1">
                                Infant Age
                              </label>
                              <input
                                type="number"
                                name={`optionList[${index}].infantAge`}
                                defaultValue={option.infantAge}
                                onChange={(e) => handleOptionChange(e, index)}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                              />
                            </div>
                            <div className='col-span-3'>
                              <label className="block text-gray-700 capitalize mb-1">
                                Option Description
                              </label>
                              <textarea
                                name={`optionList[${index}].optionDescription`}
                                defaultValue={option.optionDescription}
                                onChange={(e) => handleOptionChange(e, index)}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 capitalize mb-1">
                                Min Pax
                              </label>
                              <input
                                type="number"
                                name={`optionList[${index}].minPax`}
                                defaultValue={option.minPax}
                                onChange={(e) => handleOptionChange(e, index)}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 capitalize mb-1">
                                Max Pax
                              </label>
                              <input
                                type="number"
                                name={`optionList[${index}].maxPax`}
                                defaultValue={option.maxPax}
                                onChange={(e) => handleOptionChange(e, index)}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 capitalize mb-1">
                                Duration
                              </label>
                              <input
                                type="text"
                                name={`optionList[${index}].duration`}
                                defaultValue={option.duration}
                                onChange={(e) => handleOptionChange(e, index)}
                                className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                              />
                            </div>
                            <div className='col-span-3'>
                              <label className="block text-gray-700 capitalize mb-1">
                                Operation Days
                              </label>
                              <Select
                                isMulti
                                name={`optionList[${index}].operationDays`}
                                options={daysOfWeek}
                                defaultValue={Object.keys(option.operationDays).map(day => ({ value: day, label: day.charAt(0).toUpperCase() + day.slice(1) }))}
                                onChange={(selectedDays) => handleDaysChange(selectedDays, index)}
                                className="w-full mt-1"
                              />
                            </div>
                            <div className='col-span-3'>
                              <label className="flex justify-center font-semibold text-lg rounded-2xl text-black capitalize w-full bg-[#fdc4ff] mb-2 py-2">
                                <h1>Time Slots</h1>
                              </label>
                              <div className='grid grid-cols-3 gap-4 mt-2'>
                                {option.timeSlots?.map((timeSlot: any, timeSlotIndex: any) => (
                                  Object.keys(timeSlot).map((key, i) => (
                                    <div key={i} className='mb-4'>
                                      <label className="block text-gray-700 capitalize mb-1">
                                        {key}
                                      </label>
                                      <input
                                        type="text"
                                        name={`optionList[${index}].timeSlots[${timeSlotIndex}].${key}`}
                                        defaultValue={timeSlot[key]}
                                        // onChange={handleOptionChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                      />
                                    </div>
                                  ))
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  <button
                    className="mt-4 p-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-200"
                    onClick={addOption}
                    type="button"
                  >
                    Add Option
                  </button>
                </div>

              )
            })}
            <div className="flex justify-center col-span-3">
              <button
                type="submit"
                className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-purple-400 w-96"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

interface Image {
  name: string;
  url: string;
}

export default TourForm;
