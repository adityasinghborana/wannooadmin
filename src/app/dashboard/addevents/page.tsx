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
export default AddEvents;
