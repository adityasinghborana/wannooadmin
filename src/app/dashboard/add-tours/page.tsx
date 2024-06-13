'use client'
import { AddCity, AddTourTypes, GetAllCities, GetAllTourTypes } from '@/lib/services';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

// Define types for the form data
interface FormData {
  cityId: string;
  cityName: string;
  tourName: string;
  reviewCount: string;
  rating: string;
  duration: string;
  departurePoint: string;
  reportingTime: string;
  tourLanguage: string;
  imagePath: string;
  imageCaptionName: string;
  cityTourTypeId: string;
  cityTourType: string;
  tourDescription: string;
  tourInclusion: string;
  tourShortDescription: string;
  raynaToursAdvantage: string;
  whatsInThisTour: string;
  importantInformation: string;
  itenararyDescription: string;
  usefulInformation: string;
  faqDetails: string;
  termsAndConditions: string;
  cancellationPolicyName: string;
  cancellationPolicyDescription: string;
  childCancellationPolicyName: string;
  childCancellationPolicyDescription: string;
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
  videoUrl: string;
  googleMapUrl: string;
  tourExclusion: string;
  howToRedeem: string;
  cutOffhrs: string;
}

const TourForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    cityId: '',
    cityName: '',
    tourName: '',
    reviewCount: '',
    rating: '',
    duration: '',
    departurePoint: '',
    reportingTime: '',
    tourLanguage: '',
    imagePath: '',
    imageCaptionName: '',
    cityTourTypeId: '',
    cityTourType: '',
    tourDescription: '',
    tourInclusion: '',
    tourShortDescription: '',
    raynaToursAdvantage: '',
    whatsInThisTour: '',
    importantInformation: '',
    itenararyDescription: '',
    usefulInformation: '',
    faqDetails: '',
    termsAndConditions: '',
    cancellationPolicyName: '',
    cancellationPolicyDescription: '',
    childCancellationPolicyName: '',
    childCancellationPolicyDescription: '',
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
    videoUrl: '',
    googleMapUrl: '',
    tourExclusion: '',
    howToRedeem: '',
    cutOffhrs: '',
  });

  const [customCity, setCustomCity] = useState<string>('');
  const [customTourType, setCustomTourType] = useState<string>('');

  const [cities, setCities] = useState([
    { CityId: '1', CityName: 'New York' },
    { CityId: '2', CityName: 'Los Angeles' },
    { CityId: '3', CityName: 'Chicago' },
  ])

  const [tourTypes, settTourTypes] = useState([
    { cityTourType: 'Sightseeing' },
    { cityTourType: 'Adventure' },
    { cityTourType: 'Cultural' },
  ])

  useEffect(()=>{
    const getCitiesAndTourTypes = async () => {
      let cities = await GetAllCities();
      let tourTypes = await GetAllTourTypes();
      setCities(cities)
      settTourTypes(tourTypes)
    }

    getCitiesAndTourTypes()
  },[])

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
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h2 className="text-2xl text-black font-bold mb-6 text-center">Create Tour</h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-4'>
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
                <option key={i} value={city.CityId}>
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


          {/* Other form fields */}
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

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourForm;
