"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Container from "@/app/ui/dashboard/container/Container";
import { MdAdd, MdDelete, MdExpandLess, MdExpandMore } from "react-icons/md";
import Select from "react-select";
import {
  AddTour,
  createCity,
  createCountry,
  fetchCities,
  fetchContinent,
  fetchCountries,
  GetAllCities,
  GetAllImages,
  GetAllTourTypes,
  UploadBackgroundImage,
} from "@/lib/services"; //Todo make Upload Tour Image function in backend
import CustomImageUpload from "../../ui/dashboard/ImageModal/ImageUpload";
import ImageUploadModal from "../../ui/dashboard/SingleImageModal/CustomSingleImageUpload";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Cookie from 'js-cookie';
import axiosInstance from "@/lib/loader.interceptor";
import { set } from "date-fns";

// Define the schema for validation
const tourSchema = yup.object().shape({
  continentname: yup.string().required(),
  countryname: yup.string().required(),
  cityname: yup.string().required(),
  tourname: yup.string().required(),
  duration: yup.string().required(),
  imagepath: yup.string().required(),
  citytourtype: yup.string().required(),
  contractid: yup.number().required(),
  isrecommended: yup.boolean().required(),
  isprivate: yup.boolean().required(),
  Bookable: yup.boolean().required(),
  tourdescription: yup.string().required(),
  tourinclusion: yup.string().required(),
  shortdescription: yup.string().required(),
  importantinformation: yup.string().required(),
  itenararydescription: yup.string().required(),
  usefulinformation: yup.string().required(),
  starttime: yup.string().required(),
  googlemapurl: yup.string().url(),
  tourexclusion: yup.string(),
  isvendortour: yup.boolean().required(),
  amount: yup.number().required(),
  imagepaths: yup.array().of(yup.string()).required(),
  faqs: yup.array().of(
    yup.object().shape({
      question: yup.string().required(),
      answer: yup.string().required(),
    })
  ),
  
});

const TourForm = () => {
  const defaultValues = {
    continentname: "",
    countryname: "",
    cityname: "",
    tourname: "",
    duration: "",
    imagepath: "",
    citytourtype: "",
    contractid: 0,
    isrecommended: false,
    isprivate: false,
   Bookable:true,
    isvendortour: true,
    tourdescription: "",
    tourinclusion: "",
    shortdescription: "",
    importantinformation: "",
    itenararydescription: "",
    usefulinformation: "",
    starttime: "",
    googlemapurl: "",
    tourexclusion: "",
    amount: 0,
    imagepaths: "",
    faqs: [{ question: "", answer: "" }],
    
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(tourSchema),
    defaultValues,
  });
  

  const { fields: faqs, append: appendFaqs, remove: removeFaqs } = useFieldArray({
    control,
    name: "faqs",
  });

  


  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();

  const [countries, setCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState();

  const [continents, setContinents] = useState();
  const [selectedContinent, setSelectedContinent] = useState();

  const [tourType, setTourType] = useState([]);
  const [selectedTourType, setSelectedCityTourType] = useState();


  const [imagepaths, setImagePaths] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [customValue, setCustomValue] = useState({});
  const [isCustom, setIsCustom] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const continentPromise = fetchContinent();
      const tourTypesPromise = GetAllTourTypes();
      const [tourTypes, continent] = await Promise.all([
        tourTypesPromise,
        continentPromise
      ]);
      setContinents(continent);
      setTourType(tourTypes);
    };
    fetchData();
  }, []);

  const getCountries = async () => {
    const countriesPromise = fetchCountries(selectedContinent?.name);
    const [countries] = await Promise.all([countriesPromise]);
    setCountries(countries);
  };

  const getCities = async () => {
    const citiesPromise = fetchCities(selectedCountry?.name);
    const [cities] = await Promise.all([citiesPromise]);
    setCities(cities);
  };

  
  const onSubmit = async (data) => {
    let user = JSON.parse(Cookie.get('user'));
    let datatopost = {
      ...data,
      vendoruid: user?.uid,
      countryid: selectedCountry?.CountryId,
      countryname: selectedCountry?.name,
      continent: selectedContinent?.name,
      cityid: parseInt(selectedCity?.id),
      cityname: selectedCity?.CityName,
      countryid: selectedCountry?.CountryId,
      citytourtypeid: selectedTourType.id,
      citytourtype: customValue['citytourtype'] || selectedTourType.cityTourType,
      contractid: 0,
      isrecommended: false,
      isprivate: false,
      
    };
    let res = await AddTour(datatopost);
    res?.result?.status === 200 && toast.success("Tour added successfully");
    // // Send data to the API
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSelectedImage(file);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async () => {
    let formData = new FormData();
    formData.append("image", selectedImage);
    let imgData = await UploadBackgroundImage(formData);
    // Assuming you're storing image paths in a field named "imagepaths"
    setValue("imagepath", imgData?.path);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setValue("imagepaths", [...imagepaths]);
  }, [imagepaths]);

  useEffect(() => {
    if (selectedContinent) {
      getCountries();
    }
  }, [selectedContinent]);

  useEffect(() => {
    if (selectedCountry) {
      getCities();
    }
  }, [selectedCountry]);


  const handleSelectChange = (e) => {
    const { value } = e.target;
    const fieldKey = e.target.id;

    if (value === 'custom') {
      setIsCustom(prev => ({ ...prev, [fieldKey]: true }));
    } else {
      setIsCustom(prev => ({ ...prev, [fieldKey]: false }));
      setCustomValue(prev => ({ ...prev, [fieldKey]: null }))
      if (fieldKey === 'cityname') {
        setSelectedCity(cities.filter(item => item.id == value)[0]);
      } else if (fieldKey === 'countryname') {
        console.log(countries)
        setSelectedCountry(countries.filter(item => item.CountryId == value)[0]);
      } else if (fieldKey === 'citytourtype') {
        setSelectedCityTourType(tourType.filter(item => item.id == value)[0]);
      } else if (fieldKey === 'continentname') {
        setSelectedContinent(continents.filter(item => item.id == value)[0])
      }
    }
  };

  const handleCustomValueChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value)
    setCustomValue(prev => ({ ...prev, [id]: value }));
  };

  const createNewOption = async (type) => {
    switch (type) {
      case "countryname":
        const newOption = await createCountry({ ContinentName: selectedContinent?.name, countryName: customValue['countryname'], image: "https://example.com/image-path.jpg" });
        setCountries((prev) => [...prev, newOption]);
        setSelectedCountry(newOption);
        setIsCustom((prev) => ({ ...prev, [type]: false }));
        setCustomValue((prev) => ({ ...prev, [type]: "" }));
        setValue("countryname", newOption.CountryId);
        break;
      case "cityname":
        const newCity = await createCity({ id: selectedCountry?.CountryId, name: customValue['cityname'] });
        console.log(newCity?.result)
        setCities((prev) => [...prev, newCity?.result]);
        setSelectedCity(newCity?.result?.id);
        setIsCustom((prev) => ({ ...prev, [type]: false }));
        setCustomValue((prev) => ({ ...prev, [type]: "" }));
        setValue("cityname", newCity?.result?.id);
        break;
      case "tourtype":
        try {
          const tourTypeResponse = await axiosInstance.post('/addtourtypes', { name: customValue['citytourtype'] });
          if (tourTypeResponse) {
            setSelectedCityTourType(tourTypeResponse?.data?.result?.id);
            setTourType((prev) => [...prev, tourTypeResponse?.data?.result]);
            setIsCustom((prev) => ({ ...prev, [type]: false }));
            setCustomValue((prev) => ({ ...prev, [type]: "" }));
            setValue("citytourtypeid", tourTypeResponse?.data?.result?.id);
          } else {
            throw new Error(`Failed to add tour type: ${tourTypeResponse.statusText}`);
          }
        } catch (error) {
          console.error("Error adding custom tour type:", error);
          toast.error("Failed to add custom tour type");
        }
        break;
    }
  }



  return (
    <Container>
      <div className="p-8 bg-white rounded-2xl mt-8">
        <div
          className="overflow-y-auto"
          style={{ height: "calc(100vh - 10rem)", scrollbarWidth: "none" }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic tour data fields */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.keys(tourSchema.fields)
                .filter(
                  (key) =>
                    ![
                  
                      "vendoruid",
                      "countryid",
                      "cityid",
                      "citytourtypeid",
                      "isvendortour",
                      "contractid",
                      "isrecommended",
                      "isprivate",
                     
                    ].includes(key)
                )
                .map((key, index) => {
                  if (
                    [
                      "isprivate",
                      "isrecommended",
                    "Bookable"
                      
                    ].includes(key)
                  ) {
                    return (
                      <div key={index} className="mb-4">
                        <label
                          htmlFor={key}
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          {key === "Bookable" ? "Booking From our Site " : key === "isonlychild" ? "Is it for only children?" : key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <Controller
                          name={key}
                          control={control}
                          render={({ field }) => (
                            <select
                              id={key}
                              className="text-fieldutilities"
                              {...field}
                            >
                              <option>Select</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          )}
                        />
                        {errors[key]?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[key].message}
                          </p>
                        )}
                      </div>
                    );
                  } else if (
                    ["continentname", "countryname", "cityname", "citytourtype"].includes(key)
                  ) {
                    return (
                      <div key={index} className="mb-4 rounded">
                        <label
                          htmlFor={key}
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <Controller
                          name={key}
                          control={control}
                          render={({ field }) => (
                            <>
                              <select
                                id={key}
                                className="text-fieldutilities"
                                {...field}
                                onChange={(e) => {
                                  handleSelectChange(e);
                                  field.onChange(e);
                                }}
                                value={isCustom[key] ? 'custom' : field.value}
                              >
                                <option value="" disabled>Select</option>
                                {key === 'cityname' &&
                                  cities?.map((city) => (
                                    <option
                                      key={city.id}
                                      value={city.id}
                                      id={city.id}
                                    >
                                      {city.CityName}
                                    </option>
                                  ))}
                                {key === 'continentname' && continents?.map((conti) => (
                                  <option
                                    key={conti.id}
                                    value={conti.id}
                                  >
                                    {conti.name}
                                  </option>
                                ))}
                                {key === 'countryname' && countries?.map((country) => (
                                  <option
                                    key={country.CountryId}
                                    value={country.CountryId}
                                  >
                                    {country.name}
                                  </option>
                                ))}
                                {key === 'citytourtype' &&
                                  tourType?.map((tour) => (
                                    <option
                                      key={tour.id}
                                      value={tour.id}
                                    >
                                      {tour.cityTourType}
                                    </option>
                                  ))}
                                {key === 'countryname' && selectedContinent && <option value="custom">Custom</option>}
                                {key === 'cityname' && selectedCountry && <option value="custom">Custom</option>}
                             
                              </select>
                              {isCustom[key] && (
                                <div className="space-x-2">
                                  <input
                                    type="text"
                                    id={key}
                                    placeholder="Enter custom value"
                                    className="mt-2 p-2 border border-gray-300 rounded"
                                    value={customValue[key] || ''}
                                    onChange={handleCustomValueChange}
                                  />
                                  <button
                                    type="button"
                                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                                    onClick={() => createNewOption(key)}
                                  >
                                    Submit
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        />
                        {errors[key]?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[key].message}
                          </p>
                        )}
                      </div>
                    );
                  } else if (["imagepaths", "imagepath"].includes(key)) {
                    if (key === "imagepaths") {
                      return (
                        <div key={index} className="mb-4">
                          <label
                            htmlFor={key}
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </label>
                          {
                            <Controller
                              name={key}
                              control={control}
                              render={({ field }) => (
                                <CustomImageUpload
                                  onImageSelect={setImagePaths}
                                  Images={GetAllImages}
                                />
                              )}
                            />
                          }
                          {errors[key]?.message && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors[key].message}
                            </p>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div key={index}>
                          <label
                            htmlFor="imagepath"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Upload Image
                          </label>
                          <Controller
                            name="imagepath"
                            control={control}
                            render={({ field }) => (
                              <div>
                                <input
                                  type="file"
                                  id="imagepath"
                                  value={""}
                                  style={{ display: "none" }}
                                  onChange={(e) => {
                                    handleImageSelect(e);
                                    field.onChange(e); // Update the field value
                                  }}
                                />

                                <Button
                                  variant={"outline"}
                                  type="button"
                                  className="bg-primary text-white py-2 px-4 rounded"
                                  onClick={() =>
                                    document
                                      .getElementById("imagepath")
                                      .click()
                                  }
                                >
                                  {" "}
                                  Upload Thumbnail
                                </Button>
                                <ImageUploadModal
                                  isOpen={isModalOpen}
                                  onClose={() => setIsModalOpen(false)}
                                  onConfirm={handleConfirm}
                                  imagePreview={imagePreview}
                                />
                              </div>
                            )}
                          />
                          {errors["imagepath"] && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors["imagepath"].message}
                            </p>
                          )}
                        </div>
                      );
                    }
                  } else if (key === "faqs") { return null;} else {
                    const field = tourSchema.fields[key];
                    return (
                      <div key={index} className="mb-4">
                        <label
                          htmlFor={key}
                          className="block text-gray-700 text-sm font-bold mb-2"
                        >
                          {field._exclusive?.required
                            ? `${key.charAt(0).toUpperCase() + key.slice(1)} *`
                            : key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        {
                          <Controller
                            name={key}
                            control={control}
                            render={({ field }) => (
                              <input
                                type="text"
                                id={key}
                                {...field}
                                className="text-fieldutilities"
                              />
                            )}
                          />
                        }
                        {errors[key]?.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[key].message}
                          </p>
                        )}
                      </div>
                    );
                  }
                })}
            </div>

            <h2>FAQs</h2>
            {faqs.map((item, index) => (
              <div key={item.id} className="mb-4">
                <label htmlFor={`faqs.${index}.question`} className="block mb-2">Question</label>
                <Controller
                  name={`faqs.${index}.question`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      placeholder="Enter question"
                      className="p-2 border border-gray-300 rounded mb-2 w-full"
                    />
                  )}
                />

                <label htmlFor={`faqs.${index}.answer`} className="block mb-2">Answer</label>
                <Controller
                  name={`faqs.${index}.answer`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      placeholder="Enter answer"
                      className="p-2 border border-gray-300 rounded mb-2 w-full"
                    />
                  )}
                />

                {/* Button to remove an FAQ */}
                <div className="flex gap-4">
                  <button type="button" onClick={() => removeFaqs(index)} className={`${faqs.length === 1 && "hidden"} text-red-500 mt-2`}>
                    Remove FAQ
                  </button>
                  <button
                    type="button"
                    onClick={() => appendFaqs({ question: "", answer: "" })}
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                  >
                    Add FAQ
                  </button>
                </div>
              </div>
            ))}

            {/* Option List */}
            
            {/* Submit Button */}
            <div className="flex justify-center w-full">
              <Button
                variant="Primary"
                className="bg-primary w-1/2 text-primary-bodytext hover:bg-green-700" 
                type="submit"
              >
                Submit
                <MdAdd />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default TourForm;
