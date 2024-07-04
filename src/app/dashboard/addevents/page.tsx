"use client";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  useForm,
  SubmitHandler,
  Controller,
  Control,
  FieldValues,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import CustomImageUpload from "../../ui/dashboard/ImageModal/ImageUpload";
import ImageUploadModal from "../../ui/dashboard/SingleImageModal/CustomSingleImageUpload";
import {
  AddTour,
  GetAllCities,
  GetAllImages,
  GetAllTourTypes,
  UploadBackgroundImage,
} from "@/lib/services";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const tourSchema = yup.object().shape({
  countryname: yup.string().required(),
  cityname: yup.string().required(),
  citytourtype: yup.string().required(),
  isslot: yup.boolean().required(),
  isrecommended: yup.boolean().required(),
  isprivate: yup.boolean().required(),
  isonlychild: yup.boolean().required(),
  imagepath: yup.string().required(),
  optionlist: yup.array().of(
    yup
      .object()
      .shape({
        optionname: yup.string().required(),
        childage: yup.string().required(),
        infantage: yup.string().required(),
        minpax: yup.number().required(),
        maxpax: yup.number().required(),
        duration: yup.string().required(),
        optiondescription: yup.string().required(),
        operationDays: yup
          .object()
          .shape({
            monday: yup.number().required(),
            tuesday: yup.number().required(),
            wednesday: yup.number().required(),
            thursday: yup.number().required(),
            friday: yup.number().required(),
            saturday: yup.number().required(),
            sunday: yup.number().required(),
          })
          .required(),
      })
      .required()
  ),
});

type TourSchemaType = yup.InferType<typeof tourSchema>;
type City = {
  CityId: number;
  CityName: string;
};
type ImageUploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  imagePreview: string | ArrayBuffer | null;
};
// type Option = {
//   optionname: string;
//   childage: string;
//   infantage: string;
//   minpax: number;
//   maxpax: number;
//   duration: string;
//   optiondescription: string;
//   operationDays: OperationDays;
// // };
// type OperationDays = {
//   monday: number;
//   tuesday: number;
//   wednesday: number;
//   thursday: number;
//   friday: number;
//   saturday: number;
//   sunday: number;
// };

type SelectFieldProps = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  options: { key: string | number; value: string | number; label: string }[];
  onValueChange?: (value: any) => void;
};
type CheckboxFieldProps = {
  name: string;
  label: string;
  control: Control<any>;
};

const daysOfWeekOptions = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const AddEvents = () => {
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
  const [countries, setCountries] = useState([
    { CountryId: 13368, CountryName: "Dubai" },
  ]);
  const [cities, setCities] = useState<City[]>([]);
  const [tourType, setTourType] = useState<{ cityTourType: string }[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(
    null
  );
  const [cityToureTypeId, setCityTourTypeId] = useState();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const form = useForm<TourSchemaType>({
    resolver: yupResolver(tourSchema),
  });

  const {
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "optionlist",
  });

  const handleValueChange = (value: string) => {
    const selectedCity = cities.find((city) => city.CityName === value);
    if (selectedCity) {
      setSelectedCityId(selectedCity.CityId);
    }
    const selectedCountry = countries.find(
      (country) => country.CountryName === value
    );
    if (selectedCountry) {
      setSelectedCountryId(selectedCountry.CountryId);
    }
  };
  const onSubmit: SubmitHandler<TourSchemaType> = (data) => {
    let user: string = JSON.parse(localStorage.getItem("user") ?? "");

    console.log(user);
    console.log(selectedCityId);
    console.log(selectedCountryId);
    console.log(data);
  };

  const handleImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSelectedImage(file);
        setIsModalOpen(true);
        field.onChange(e); // Update the field value in react-hook-form
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAddOption = () => {
    append({
      optionname: "",
      childage: "",
      infantage: "",
      minpax: 0,
      maxpax: 0,
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
    });
  };

  const handleConfirm = async () => {
    if (!selectedImage) return;

    let formData = new FormData();
    formData.append("image", selectedImage);

    // Assuming UploadBackgroundImage is a function that uploads the image and returns its URL
    let imgData = await UploadBackgroundImage(formData);

    if (imgData?.image?.url) {
      form.setValue("imagepath", imgData.image.url);
    }
    setIsModalOpen(false);
  };

  return (
    <div
      className="overflow-y-auto"
      style={{ height: "calc(100vh - 10rem)", scrollbarWidth: "none" }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <SelectField
              control={form.control}
              name="countryname"
              label="Country Name"
              placeholder="Select Country"
              onValueChange={handleValueChange}
              options={countries.map((country) => ({
                key: country.CountryId,
                value: country.CountryName,
                label: country.CountryName,
              }))}
            />
            <SelectField
              control={form.control}
              name="cityname"
              label="City Name"
              placeholder="Select City"
              onValueChange={handleValueChange}
              options={cities.map((city) => ({
                key: city.CityId,
                value: city.CityName,
                label: city.CityName,
              }))}
            />
            <SelectField
              control={form.control}
              name="citytourtype"
              label="Tour Type"
              placeholder="Select Tour Type"
              onValueChange={handleValueChange}
              options={tourType.map((type) => ({
                key: type.cityTourType,
                value: type.cityTourType,
                label: type.cityTourType,
              }))}
            />
            <div className="flex flex-row w-full ">
              <CheckboxField
                name="isonlychild"
                label="Is Only Child"
                control={form.control}
              />
              <CheckboxField
                name="isrecommended"
                label="Is Recommended"
                control={form.control}
              />
              <CheckboxField
                name="isprivate"
                label="Is Private"
                control={form.control}
              />
              <CheckboxField
                name="isslot"
                label="Is Slot"
                control={form.control}
              />
            </div>

            <div>
              <Controller
                name="imagepath"
                control={form.control}
                render={({ field }) => (
                  <div>
                    <input
                      type="file"
                      id="image-upload"
                      style={{ display: "none" }}
                      onChange={(e) => handleImageSelect(e, field)}
                    />

                    <Button
                      variant="outline"
                      className="bg-primary text-white py-2 px-4 rounded"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                    >
                      Upload Thumbnail
                    </Button>
                  </div>
                )}
              />

              <ImageUploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                imagePreview={imagePreview}
              />
            </div>
          </div>

          <div>
            {fields.map((item, index) => (
              <div key={item.id} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Option {index + 1}
                </label>
                <Controller
                  name={`optionlist.${index}.optionname`}
                  control={control}
                  render={({ field }) => (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Option Name
                      </label>
                      <input
                        {...field}
                        placeholder="Option Name"
                        className="text-fieldutilities"
                      />
                      {errors.optionlist?.[index]?.optionname && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.optionlist[index].optionname?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name={`optionlist.${index}.childage`}
                  control={control}
                  render={({ field }) => (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Child Age
                      </label>
                      <input
                        {...field}
                        placeholder="Child Age"
                        className="text-fieldutilities"
                      />
                      {errors.optionlist?.[index]?.childage && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.optionlist[index].childage?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name={`optionlist.${index}.infantage`}
                  control={control}
                  render={({ field }) => (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Infant Age
                      </label>
                      <input
                        {...field}
                        placeholder="Infant Age"
                        className="text-fieldutilities"
                      />
                      {errors.optionlist?.[index]?.infantage && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.optionlist[index].infantage?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name={`optionlist.${index}.minpax`}
                  control={control}
                  render={({ field }) => (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Min Pax
                      </label>
                      <input
                        {...field}
                        placeholder="Min Pax"
                        type="number"
                        className="text-fieldutilities"
                      />
                      {errors.optionlist?.[index]?.minpax && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.optionlist[index].minpax?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name={`optionlist.${index}.maxpax`}
                  control={control}
                  render={({ field }) => (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Max Pax
                      </label>
                      <input
                        {...field}
                        placeholder="Max Pax"
                        type="number"
                        className="text-fieldutilities"
                      />
                      {errors.optionlist?.[index]?.maxpax && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.optionlist[index].maxpax?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name={`optionlist.${index}.duration`}
                  control={control}
                  render={({ field }) => (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Duration
                      </label>
                      <input
                        {...field}
                        placeholder="Duration"
                        className="text-fieldutilities"
                      />
                      {errors.optionlist?.[index]?.duration && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.optionlist[index].duration?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name={`optionlist.${index}.optiondescription`}
                  control={form.control}
                  render={({ field }) => (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Option Description
                      </label>
                      <input
                        {...field}
                        placeholder="Option Description"
                        className="text-fieldutilities"
                      />
                      {errors.optionlist?.[index]?.optiondescription && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.optionlist[index].optiondescription?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Operation Days
                  </label>
                  {daysOfWeekOptions.map((day) => (
                    <CheckboxField2
                      key={day.value}
                      name={`optionlist[${index}].operationDays.${day.value}`}
                      label={day.label}
                      control={form.control}
                    />
                  ))}
                </div>
                <button type="button" onClick={() => remove(index)}>
                  Remove Option
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                append({
                  optionname: "",
                  childage: "",
                  infantage: "",
                  minpax: 0,
                  maxpax: 0,
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
                })
              }
            >
              Add Option
            </button>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  control,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <div className="flex flex-row items-center">
        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              defaultValue="false"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
          </div>
        </FormItem>
        <FormMessage />
      </div>
    )}
  />
);

const SelectField: React.FC<SelectFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  options,
  onValueChange,
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Select
            onValueChange={(value) => {
              if (onValueChange) onValueChange(value);

              field.onChange(value);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-primary-bodytext">
              {options.map((option) => (
                <SelectItem key={option.key} value={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
const CheckboxField2: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  control,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <div>
        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
          <FormControl>
            <Checkbox
              checked={field.value === 1} // Check if field value is 1
              onCheckedChange={(isChecked) => {
                field.onChange(isChecked ? 1 : 0); // Update to 1 if checked, otherwise 0
              }}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
          </div>
        </FormItem>
        {/* <label>
          <input
            type="checkbox"
            {...field}
            onChange={(e) => {
              const isChecked = e.target.checked;
              field.onChange(isChecked ? 1 : 0); // Update to 1 if checked, otherwise 0
            }}
          />
          {label}
        </label> */}
      </div>
    )}
  />
);
export default AddEvents;
