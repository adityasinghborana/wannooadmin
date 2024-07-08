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
  GetAllCities,
  GetAllImages,
  GetAllTourTypes,
  UploadBackgroundImage,
} from "@/lib/services"; //Todo make Upload Tour Image function in backend
import CustomImageUpload from "../../ui/dashboard/ImageModal/ImageUpload";
import ImageUploadModal from "../../ui/dashboard/SingleImageModal/CustomSingleImageUpload";
import { Button } from "@/components/ui/button";

// Define the schema for validation
const tourSchema = yup.object().shape({
  countryname: yup.string().required(),
  cityname: yup.string().required(),
  tourname: yup.string().required(),
  duration: yup.string().required(),
  imagepath: yup.string().required(),
  citytourtype: yup.string().required(),
  contractid: yup.number().required(),
  isrecommended: yup.boolean().required(),
  isprivate: yup.boolean().required(),
  isslot: yup.boolean().required(),
  tourdescription: yup.string().required(),
  tourinclusion: yup.string().required(),
  shortdescription: yup.string().required(),
  importantinformation: yup.string().required(),
  itenararydescription: yup.string().required(),
  usefulinformation: yup.string().required(),
  childage: yup.string().required(),
  infantage: yup.string().required(),
  infantcount: yup.number().required(),
  isonlychild: yup.boolean().required(),
  starttime: yup.string().required(),
  meal: yup.string(),
  googlemapurl: yup.string().url(),
  tourexclusion: yup.string(),
  adultprice: yup.number().required(),
  childprice: yup.number().required(),
  infantprice: yup.number().required(),
  amount: yup.number().required(),
  imagepaths: yup.array().of(yup.string()).required(),
  optionlist: yup.array().of(
    yup.object().shape({
      optionname: yup.string().required(),
      childage: yup.string().required(),
      infantage: yup.string().required(),
      minpax: yup.number().required(),
      maxpax: yup.number().required(),
      duration: yup.string().required(),
      optiondescription: yup.string().required(),
      operationDays: yup.object().shape({
        monday: yup.number().required(),
        tuesday: yup.number().required(),
        wednesday: yup.number().required(),
        thursday: yup.number().required(),
        friday: yup.number().required(),
        saturday: yup.number().required(),
        sunday: yup.number().required(),
      }),
      timeSlots: yup.array().of(
        yup.object().shape({
          timeSlot: yup.string().required(),
          available: yup.number().required(),
          adultPrice: yup.number().required(),
          childPrice: yup.number().required(),
        })
      ),
    })
  ),
});

const TourForm = () => {
  const defaultValues = {
    countryname: "",
    cityname: "",
    tourname: "",
    duration: "",
    imagepath: "",
    citytourtype: "",
    contractid: 0,
    isrecommended: false,
    isprivate: false,
    isslot: false,
    tourdescription: "",
    tourinclusion: "",
    shortdescription: "",
    importantinformation: "",
    itenararydescription: "",
    usefulinformation: "",
    childage: "",
    infantage: "",
    infantcount: 0,
    isonlychild: false,
    starttime: "",
    meal: "",
    googlemapurl: "",
    tourexclusion: "",
    adultprice: 0,
    childprice: 0,
    infantprice: 0,
    amount: 0,
    imagepaths: "",
    optionlist: [
      {
        optionname: "",
        childage: "",
        infantage: "",
        minpax: 0,
        maxpax: 0,
        duration: "",
        optiondescription: "",
        operationDays: {
          monday: 1,
          tuesday: 0,
          wednesday: 0,
          thursday: 0,
          friday: 0,
          saturday: 0,
          sunday: 0,
        },
        timeSlots: [
          {
            timeSlot: "",
            available: 0,
            adultPrice: 0,
            childPrice: 0,
          },
        ],
      },
    ],
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(tourSchema),
    defaultValues,
  });

  const {
    fields: optionFields,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "optionlist",
  });

  const daysOfWeekOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [cities, setCities] = useState([]);
  const [tourType, setTourType] = useState([]);
  const [cityId, setCityId] = useState();
  const [countryId, setCountryId] = useState();
  const [cityToureTypeId, setCityTourTypeId] = useState();
  const [imagepaths, setImagePaths] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [option, setOption] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const citiesPromise = GetAllCities();
      const tourTypesPromise = GetAllTourTypes();
      const [cities, tourTypes] = await Promise.all([
        citiesPromise,
        tourTypesPromise,
      ]);
      setCities(cities);
      setTourType(tourTypes);
    };
    fetchData();
  }, []);

  const handleAddOption = () => {
    append({
      optionname: "",
      childage: "",
      infantage: "",
      minpax: "",
      maxpax: "",
      duration: "",
      optiondescription: "",
      operationDays: {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },
      timeSlots: [
        {
          timeSlot: "",
          available: 0,
          adultPrice: 0,
          childPrice: 0,
        },
      ],
    });
  };
  const handleRemoveOption = (index) => {
    remove(index);
  };

  const handleAddTimeSlot = (index) => {
    let newData = optionFields[index];
    newData?.timeSlots.push({
      timeSlot: "",
      available: 0,
      adultPrice: 0,
      childPrice: 0,
    });
    update(index, newData);
  };
  const handleRemoveTimeSlot = (index) => {
    let newData = optionFields[index];
    newData.timeSlots.splice(index, 1);
    update(index, newData);
  };
  const excludedFields = ["bookingResult", "adultRate", "childRate"];
  const onSubmit = async (data) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let datatopost = {
      ...data,
      vendoruid: user?.uid,
      cityid: parseInt(cityId),
      countryid: 13063,
      citytourtypeid: cityToureTypeId,
    };
    await AddTour(datatopost);
    // Send data to the API
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
                      "optionlist",
                      "vendoruid",
                      "countryid",
                      "cityid",
                      "citytourtypeid",
                    ].includes(key)
                )
                .map((key, index) => {
                  if (
                    [
                      "isprivate",
                      "isrecommended",
                      "isslot",
                      "isvendortour",
                      "isonlychild",
                    ].includes(key)
                  ) {
                    return (
                      <div key={index} className="mb-4">
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
                            <select
                              id={key}
                              className="text-fieldutilities"
                              {...field}
                            >
                              <option>Select</option>
                              <option value="true">True</option>
                              <option value="false">False</option>
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
                    ["countryname", "cityname", "citytourtype"].includes(key)
                  ) {
                    return (
                      <div key={index} className="mb-4 rounded ">
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
                            <select
                              onClick={(e) => {
                                if (key === "cityname") {
                                  setCityId(e?.target?.selectedOptions[0]?.id);
                                } else if (key === "countryname") {
                                  setCountryId(e.target.value);
                                } else if (key === "citytourtype") {
                                  setCityTourTypeId(e.target.value);
                                }
                              }}
                              id={key}
                              className=" text-fieldutilities "
                              {...field}
                            >
                              <option>Select</option>
                              {key === "cityname" &&
                                cities?.map((city) => (
                                  <option
                                    key={city.CityId}
                                    value={city.CityName}
                                    id={city.CityId}
                                  >
                                    {city.CityName}
                                  </option>
                                ))}
                              {key === "countryname" && <option>Dubai</option>}
                              {key === "citytourtype" &&
                                tourType?.map((tour) => (
                                  <option
                                    key={tour.cityTourType}
                                    value={tour.cityTourType}
                                  >
                                    {tour.cityTourType}
                                  </option>
                                ))}
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
                            htmlFor="image-upload"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Upload Image
                          </label>
                          <Controller
                            name="image-upload"
                            control={control}
                            render={({ field }) => (
                              <div>
                                <input
                                  type="file"
                                  id="image-upload"
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
                                      .getElementById("image-upload")
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
                          {errors["image-upload"] && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors["image-upload"].message}
                            </p>
                          )}
                        </div>
                      );
                    }
                  } else {
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

            {/* Option List */}
            <div className="space-y-4">
              {optionFields.map((option, index) => (
                <div key={option.id} className={` rounded-2xl p-4 my-4 mt-4`}>
                  <div className="flex items-center w-full rounded-2xl px-3 mb-4 bg-primary text-primary-bodytext">
                    <h3
                      className={`text-lg text-center text-primary-bodytext font-medium ${
                        index !== openIndex && "text-primary-bodytext"
                      } p-2`}
                      style={{ width: "100%" }}
                    >
                      Option {index + 1} {option.optionname}
                    </h3>
                    <div className="w-[20%] flex justify-items-end text-primary-text ">
                      <button
                        type="button"
                        className="text-primary-bodytext hover:text-primary-bodytext"
                        onClick={() =>
                          setOpenIndex(index === openIndex ? null : index)
                        }
                      >
                        {index === openIndex ? (
                          <MdExpandLess />
                        ) : (
                          <MdExpandMore />
                        )}
                      </button>
                      {optionFields.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveOption(index)}
                        >
                          <MdDelete />
                        </button>
                      )}
                    </div>
                  </div>
                  {index === openIndex && (
                    <div className="space-y-4 mx-auto" style={{ width: "90%" }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.keys(option).map((optionKey, optionIndex) => {
                          if (optionKey === "timeSlots") return null; // Skip rendering timeSlots here
                          if (optionKey === "id") return null; // Skip rendering timeSlots here
                          if (optionKey === "operationDays") {
                            return (
                              <div
                                key={optionIndex}
                                className={`flex space-x-2 ${
                                  optionKey === "operationDays" && "col-span-3 "
                                }`}
                              >
                                <label
                                  htmlFor={`optionlist[${index}].${optionKey}`}
                                  className="text-sm font-medium text-gray-700 mr-2 content-center "
                                >
                                  {optionKey.charAt(0).toUpperCase() +
                                    optionKey.slice(1)}
                                </label>
                                <Controller
                                  name={`optionlist[${index}].${optionKey}`}
                                  control={control}
                                  // rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      className="react-select w-full"
                                      classNamePrefix="react-select"
                                      options={daysOfWeekOptions}
                                      onChange={(selected) => {
                                        const operationDays =
                                          daysOfWeekOptions.reduce(
                                            (acc, day) => {
                                              acc[day.value] = selected.some(
                                                (sel) => sel.value === day.value
                                              )
                                                ? 1
                                                : 0;
                                              return acc;
                                            },
                                            {}
                                          );
                                        field.onChange(operationDays);
                                      }}
                                      value={daysOfWeekOptions.filter(
                                        (option) => field.value[option.value]
                                      )}
                                      isMulti
                                    />
                                  )}
                                />
                                {errors.optionlist?.[index]?.operationDays && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {
                                      errors.optionlist[index].operationDays
                                        .message
                                    }
                                  </p>
                                )}
                              </div>
                            );
                          }
                          return (
                            <div key={optionIndex} className="flex space-x-2">
                              <label
                                htmlFor={`optionlist[${index}].${optionKey}`}
                                className="text-sm content-center font-medium text-gray-700 mr-2"
                              >
                                {optionKey.charAt(0).toUpperCase() +
                                  optionKey.slice(1) +
                                  ":"}
                              </label>
                              <Controller
                                name={`optionlist[${index}].${optionKey}`}
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <input
                                    type="text"
                                    {...field}
                                    className="text-fieldutilities"
                                  />
                                )}
                              />
                            </div>
                          );
                        })}
                      </div>

                      <div className="grid gap-2 border px-2 py-2 mt-2">
                        <h4 className="text-base font-medium mb-2">
                          Time Slots
                        </h4>
                        <div className="px-2 py-2">
                          {option?.timeSlots?.map((timeSlot, timeSlotIndex) => (
                            <div
                              key={timeSlotIndex}
                              className="my-2 border p-2"
                            >
                              <div className="flex justify-between">
                                <h4>Time Slot {timeSlotIndex + 1}</h4>
                                <div className="justify-items-end">
                                  <button
                                    type="button"
                                    className="bg-green-500 text-green-600 rounded px-2 py-1"
                                    onClick={() => handleAddTimeSlot(index)}
                                  >
                                    <MdAdd />
                                  </button>
                                  {option.timeSlots.length > 1 && (
                                    <button
                                      type="button"
                                      className="bg-red-500 hover:bg-red-700 text-white rounded px-2 py-1"
                                      onClick={() =>
                                        handleRemoveTimeSlot(index)
                                      }
                                    >
                                      <MdDelete />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div
                                key={timeSlotIndex}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 py-2"
                              >
                                {Object.keys(timeSlot)?.map((field, i) => {
                                  return (
                                    <div key={i}>
                                      <label
                                        htmlFor={`optionlist[${index}].timeSlots[${timeSlotIndex}].${field}`}
                                        className="text-sm font-medium text-gray-700"
                                      >
                                        {field.charAt(0).toUpperCase() +
                                          field.slice(1)}
                                      </label>
                                      <Controller
                                        name={`optionlist[${index}].timeSlots[${timeSlotIndex}].${field}`}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                          <input
                                            type="text"
                                            {...field}
                                            className="text-fieldutilities"
                                          />
                                        )}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Button
                variant="secondary"
                className="bg-primary"
                onClick={() => handleAddOption()}
              >
                Add Option
              </Button>
            </div>
            {/* Submit Button */}
            <div className="flex justify-center w-full">
              <Button
                variant="secondary"
                className="bg-primary w-1/2 text-primary-bodytext"
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
