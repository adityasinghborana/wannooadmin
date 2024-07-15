"use client";
import Container from "@/app/ui/dashboard/container/Container";
import { Button } from "@/components/ui/button";
import {
  GetAllCities,
  GetAllImages,
  GetEventTypes,
  UploadBackgroundImage,
  addEvent,
} from "@/lib/services"; //Todo make Upload Tour Image function in backend
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { MdAdd, MdDelete, MdExpandLess, MdExpandMore } from "react-icons/md";
import Select from "react-select";
import { toast } from "react-toastify";
import * as yup from "yup";
import CustomImageUpload from "../../ui/dashboard/ImageModal/ImageUpload";
import ImageUploadModal from "../../ui/dashboard/SingleImageModal/CustomSingleImageUpload";

// Define the schema for validation
const eventSchema = yup.object().shape({
  isVisible: yup.boolean().required(),
  isVisibleHome: yup.boolean().required(),
  cityId: yup.number().required(),
  eventName: yup.string().required(),
  duration: yup.string().required(),
  imagePath: yup.string().required(),
  eventType: yup.string().required(),
  isSlot: yup.boolean().required(),
  vendorUid: yup.string().uuid().required(),
  onlyChild: yup.boolean().required(),
  recommended: yup.boolean().required(),
  eventDetail: yup
    .object()
    .shape({
      eventName: yup.string().required(),
      description: yup.string().required(),
      date: yup.date().required(),
      location: yup.string().required(),
      googlemapurl: yup.string().url().required(),
      minage: yup.number().required(),
      moreinfo: yup.string().required(),
      ticketinfo: yup.string().required(),
      artistname: yup.string().required(),
      artistimage: yup.string().required(),
      lastbookingtime: yup.date().required(),
      eventSelling: yup.boolean().required(),
      ischildallowed: yup.boolean().required(),
      isadultallowed: yup.boolean().required(),
      isinfantallowed: yup.boolean().required(),
      duration: yup.string().required(),
      eventoptions: yup
        .array()
        .of(
          yup.object().shape({
            optionname: yup.string().required(),
            adultprice: yup.number().required(),
            childprice: yup.number().required(),
            infantprice: yup.number().required(),
            optiondescription: yup.string().required(),
            available: yup.number().required(),
            timeslots: yup
              .array()
              .of(
                yup.object().shape({
                  timeSlot: yup.string().required(),
                  available: yup.number().required(),
                  adultPrice: yup.number().required(),
                  childPrice: yup.number().required(),
                })
              )
              .required(),
          })
        )
        .required(),
      images: yup
        .array()
        .of(
          yup.object().shape({
            imagePath: yup.string().required(),
          })
        )
        .required(),
    })
    .required(),
});

const EventForm = () => {
  const defaultEventValues = {
    isVisible: false,
    isVisibleHome: false,
    cityId: 0,
    eventName: "",
    duration: "",
    imagePath: "",
    eventType: "",
    isSlot: false,
    vendorUid: "",
    onlyChild: false,
    recommended: false,
    eventDetail: {
      description: "",
      date: "",
      location: "",
      googlemapurl: "",
      minage: 0,
      moreinfo: "",
      ticketinfo: "",
      artistname: "",
      artistimage: "",
      lastbookingtime: "",
      eventSelling: false,
      ischildallowed: false,
      isadultallowed: true,
      isinfantallowed: false,
      duration: "",
      eventoptions: [
        {
          optionname: "",
          adultprice: 0.0,
          childprice: 0.0,
          infantprice: 0.0,
          optiondescription: "",
          available: 0,
          timeslots: [
            {
              timeSlot: "",
              available: 0,
              adultPrice: 0.0,
              childPrice: 0.0,
            },
          ],
        },
      ],
      images: [
        {
          imagePath: "",
        },
      ],
    },
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: defaultEventValues,
  });

  const {
    fields: eventoptions,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "eventoptions",
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
  const [eventType, setEventType] = useState([]);
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
      const eventTypesPromise = GetEventTypes();
      const [cities, eventTypes] = await Promise.all([
        citiesPromise,
        eventTypesPromise,
      ]);
      setCities(cities);
      setEventType(eventTypes);
    };
    fetchData();
  }, []);

  const handleAddOption = () => {
    append({
      optionname: "",
      adultprice: 0.0,
      childprice: 0.0,
      infantprice: 0.0,
      optiondescription: "",
      available: 0,
      timeslots: [
        {
          timeSlot: "",
          available: 0,
          adultPrice: 0.0,
          childPrice: 0.0,
        },
      ],
    });
  };

  const handleRemoveOption = (index) => {
    remove(index);
  };

  const handleAddTimeSlot = (optionIndex) => {
    const option = eventoptions[optionIndex];
    update(optionIndex, {
      ...option,
      timeslots: [
        ...option.timeslots,
        {
          timeSlot: "",
          available: 0,
          adultPrice: 0,
          childPrice: 0,
        },
      ],
    });
  };

  const handleRemoveTimeSlot = (optionIndex, timeSlotIndex) => {
    const option = eventoptions[optionIndex];
    update(optionIndex, {
      ...option,
      timeslots: option.timeslots.filter((_, idx) => idx !== timeSlotIndex),
    });
  };

  const onSubmit = async (data) => {
    let user = JSON.parse(localStorage.getItem("user"));
    const formattedData = {
      vendoruid: user?.uid,
      isVisible: data?.isVisible === "true" ? true : false,
      isVisibleHome: data?.isVisibleHome === "true" ? true : false,
      cityId: parseInt(data?.cityId),
      eventName: data?.eventName,
      duration: data?.duration,
      imagePath: data?.imagePath,
      eventType: data?.eventType,
      isSlot: data?.isSlot === "true" ? true : false,
      onlyChild: data?.onlyChild === "true" ? true : false,
      recommended: data?.recommended === "true" ? true : false,
      eventDetail: {
        eventName: data?.eventDetail?.eventName,
        description: data?.eventDetail?.description,
        date: new Date(data?.eventDetail?.date),
        location: data?.eventDetail?.location,
        googlemapurl: data?.eventDetail?.googlemapurl,
        minage: data?.eventDetail?.minage,
        moreinfo: data?.eventDetail?.moreinfo,
        ticketinfo: data?.eventDetail?.ticketinfo,
        artistname: data?.eventDetail?.artistname,
        artistimage: data?.eventDetail?.artistimage,
        lastbookingtime: data?.eventDetail?.lastbookingtime,
        eventSelling: data?.eventSelling === "true" ? true : false,
        ischildallowed: data?.ischildallowed === "true" ? true : false,
        isadultallowed: data?.isadultallowed === "true" ? true : false,
        isinfantallowed: data?.isinfantallowed === "true" ? true : false,
        duration: data?.eventDetail?.duration,
        images: data?.eventDetail?.images?.map((image) => ({
          imagePath: image,
        })),
        eventoptions: data?.optionlist?.map((option) => ({
          optionname: option.optionname,
          adultprice: option.adultprice,
          childprice: option.childprice,
          infantprice: option.infantprice,
          optiondescription: option.optiondescription,
          available: option.available,
          timeslots: option.timeslots.map((timeSlot) => ({
            timeSlot: timeSlot.timeSlot,
            available: timeSlot.available,
            adultPrice: timeSlot.adultPrice,
            childPrice: timeSlot.childPrice,
          })),
        })),
      },
    };
    console.log(data);
    console.log(formattedData);
    try {
      await addEvent(formattedData);
      toast.success("Event added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
    setValue("imagePath", imgData?.path);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setValue("eventDetail.images", [...imagepaths]);
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
              {Object.keys(eventSchema?.fields)
                .filter((key) => !["vendorUid"].includes(key))
                .map((key, index) => {
                  if (
                    [
                      "onlyChild",
                      "recommended",
                      "isSlot",
                      "isVisible",
                      "isVisibleHome",
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
                  } else if (["cityId", "eventType"].includes(key)) {
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
                                if (key === "cityId") {
                                  setCityId(e?.target?.selectedOptions[0]?.id);
                                }
                              }}
                              id={key}
                              className=" text-fieldutilities "
                              {...field}
                            >
                              <option>Select</option>
                              {key === "cityId" &&
                                cities?.map((city) => (
                                  <option
                                    key={city.CityId}
                                    value={city.CityId}
                                    id={city.CityId}
                                  >
                                    {city.CityName}
                                  </option>
                                ))}
                              {key === "eventType" &&
                                eventType?.map((event) => (
                                  <option
                                    key={event.id}
                                    value={event.eventtype}
                                  >
                                    {event.eventtype}
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
                  } else if (["imagePath"].includes(key)) {
                    if (key === "imagePath") {
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
                  } else if (key === "eventDetail") {
                    return (
                      <>
                        {/* Render eventDetail fields */}
                        {Object.keys(eventSchema.fields.eventDetail.fields).map(
                          (detailKey, detailIndex) => {
                            if (detailKey === "eventoptions") return null;
                            if (detailKey === "images") {
                              return (
                                <div key={index} className="mb-4">
                                  <label
                                    htmlFor={detailKey}
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                  >
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                  </label>
                                  {
                                    <Controller
                                      name={detailKey}
                                      control={control}
                                      render={({ field }) => (
                                        <CustomImageUpload
                                          onImageSelect={setImagePaths}
                                          Images={GetAllImages}
                                        />
                                      )}
                                    />
                                  }
                                  {errors[detailKey]?.message && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {errors[detailKey].message}
                                    </p>
                                  )}
                                </div>
                              );
                            } else if (
                              [
                                "eventSelling",
                                "ischildallowed",
                                "isadultallowed",
                                "isinfantallowed",
                              ].includes(detailKey)
                            ) {
                              {
                                return (
                                  <div key={index} className="mb-4">
                                    <label
                                      htmlFor={detailKey}
                                      className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                      {detailKey.charAt(0).toUpperCase() +
                                        detailKey.slice(1)}
                                    </label>
                                    <Controller
                                      name={detailKey}
                                      control={control}
                                      render={({ field }) => (
                                        <select
                                          id={detailKey}
                                          className="text-fieldutilities"
                                          {...field}
                                        >
                                          <option>Select</option>
                                          <option value="true">True</option>
                                          <option value="false">False</option>
                                        </select>
                                      )}
                                    />
                                    {errors[detailKey]?.message && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {errors[detailKey].message}
                                      </p>
                                    )}
                                  </div>
                                );
                              }
                            } else {
                              return (
                                <div key={detailIndex} className="mb-4">
                                  <label
                                    htmlFor={`eventDetail.${detailKey}`}
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                  >
                                    {detailKey.charAt(0).toUpperCase() +
                                      detailKey.slice(1)}
                                  </label>
                                  <Controller
                                    name={`eventDetail.${detailKey}`}
                                    control={control}
                                    render={({ field }) => (
                                      <input
                                        type="text"
                                        {...field}
                                        className="text-fieldutilities"
                                      />
                                    )}
                                  />
                                  {errors.eventDetail?.[detailKey]?.message && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {errors.eventDetail[detailKey].message}
                                    </p>
                                  )}
                                </div>
                              );
                            }
                          }
                        )}
                      </>
                    );
                  } else {
                    const field = eventSchema.fields[key];
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
              {eventoptions.map((option, index) => (
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
                      {eventoptions.length > 1 && (
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
                          if (optionKey === "timeslots") return null; // Skip rendering timeslots here
                          if (optionKey === "id") return null; // Skip rendering timeslots here
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
                          {option?.timeslots?.map((timeSlot, timeSlotIndex) => (
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
                                  {option.timeslots.length > 1 && (
                                    <button
                                      type="button"
                                      className="bg-red-500 hover:bg-red-700 text-white rounded px-2 py-1"
                                      onClick={() =>
                                        handleRemoveTimeSlot(
                                          index,
                                          timeSlotIndex
                                        )
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
                                        htmlFor={`optionlist[${index}].timeslots[${timeSlotIndex}].${field}`}
                                        className="text-sm font-medium text-gray-700"
                                      >
                                        {field.charAt(0).toUpperCase() +
                                          field.slice(1)}
                                      </label>
                                      <Controller
                                        name={`optionlist[${index}].timeslots[${timeSlotIndex}].${field}`}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                          <input
                                            value={field.value || ""}
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
                type="button"
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

export default EventForm;
