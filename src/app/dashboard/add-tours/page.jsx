'use client'
import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Container from '@/app/ui/dashboard/container/Container';
import { MdAdd, MdDelete, MdExpandLess, MdExpandMore } from 'react-icons/md';
import Select from 'react-select';

// Define the schema for validation
const tourSchema = yup.object().shape({
  countryid: yup.number().required(),
  countryname: yup.string().required(),
  cityid: yup.number().required(),
  cityname: yup.string().required(),
  tourname: yup.string().required(),
  duration: yup.string().required(),
  imagepath: yup.string().required(),
  citytourtypeid: yup.string().required(),
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
  isvendortour: yup.boolean().required(),
  vendoruid: yup.string().required(),
  googlemapurl: yup.string().url(),
  tourexclusion: yup.string(),
  adultprice: yup.number().required(),
  childprice: yup.number().required(),
  infantprice: yup.number().required(),
  amount: yup.number().required(),
  imagepaths: yup.array().of(yup.string().required()).required(),
  optionlist: yup.array().of(
    yup.object().shape({
      optionname: yup.string().required(),
      childage: yup.string().required(),
      infantage: yup.string().required(),
      minpax: yup.number().required(),
      maxpax: yup.number().required(),
      duration: yup.string().required(),
      optiondescription: yup.string().required(),
      operationDays: yup.array().of(
        yup.object().shape({
          day: yup.string().required(),
          value: yup.number().required(),
        })
      ),
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
  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: yupResolver(tourSchema),
  });

  const { fields: optionFields, append, remove, update } = useFieldArray({
    control,
    name: 'optionlist',
  });

  const daysOfWeekOptions = [
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
    { value: 7, label: 'Sunday' },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleAddOption = () => {
    append({
      optionname: '',
      childage: '',
      infantage: '',
      minpax: '',
      maxpax: '',
      duration: '',
      optiondescription: '',
      operationDays: {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },
      timeSlots: [{
        timeSlot: '',
        available: 0,
        adultPrice: 0,
        childPrice: 0,
      }]
    });
  };
  const handleRemoveOption = (index) => {
    remove(index);
  };

  const handleAddTimeSlot = (index) => {
    let newData = optionFields[index]
    newData?.timeSlots.push({
      timeSlot: '',
      available: 0,
      adultPrice: 0,
      childPrice: 0,
    })
    update(index, newData)
  };
  const handleRemoveTimeSlot = (index) => {
    let newData = optionFields[index]
    newData.timeSlots.splice(index, 1)
    update(index, newData)
  };

  const onSubmit = (data) => {
    console.log(data);
    // Send data to the API
  };

  return (
    <Container>
      <div className="p-8 bg-white rounded-lg">
        <div className="overflow-y-auto" style={{ height: 'calc(100vh - 10rem)', scrollbarWidth: 'none' }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic tour data fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.keys(tourSchema.fields).filter((key) => key !== 'optionlist').map((key, index) => {
                if (['isprivate', 'isrecommended', 'isslot', 'isvendortour', 'isonlychild'].includes(key)) {
                  return (
                    <div key={index} className="mb-4">
                      <label htmlFor={key} className="block text-gray-700 text-sm font-bold mb-2">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      <Controller
                        name={key}
                        control={control}
                        render={({ field }) => (
                          <select
                            id={key}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                            {...field}
                            >
                            <option>Select</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        )}
                      />
                      {errors[key]?.message && <p className="text-red-500 text-xs mt-1">{errors[key].message}</p>}
                    </div>
                  );
                } else {
                  const field = tourSchema.fields[key];
                  return (
                    <div key={index} className="mb-4">
                      <label htmlFor={key} className="block text-gray-700 text-sm font-bold mb-2">
                        {field._exclusive?.required ? `${key.charAt(0).toUpperCase() + key.slice(1)} *` : key.charAt(0).toUpperCase() + key.slice(1)}
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
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                            />
                          )}
                        />
                      }
                      {errors[key]?.message && <p className="text-red-500 text-xs mt-1">{errors[key].message}</p>}
                    </div>
                  );
                }
              })}
            </div>

            {/* Option List */}
            <div className="space-y-4">
              {optionFields.map((option, index) => (
                <div key={option.id} className="border rounded p-4 my-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Option {index + 1}: {option.optionname}</h3>
                    <div className='flex justify-items-end'>
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setOpenIndex(index === openIndex ? null : index)}
                      >
                        {index === openIndex ? (<MdExpandLess />) : (<MdExpandMore />)}
                      </button>
                      {
                        optionFields.length > 1 &&
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveOption(index)}
                        >
                          <MdDelete />
                        </button>
                      }
                    </div>
                  </div>
                  {index === openIndex && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.keys(option).map((optionKey, optionIndex) => {
                          if (optionKey === 'timeSlots') return null; // Skip rendering timeSlots here
                          if (optionKey === 'id') return null; // Skip rendering timeSlots here
                          if (optionKey === 'operationDays') {
                            return (
                              <div key={optionIndex} className={`flex space-x-2 ${optionKey === 'operationDays' && 'col-span-3'}`}>
                                <label htmlFor={`optionlist[${index}].${optionKey}`} className="text-sm font-medium text-gray-700">
                                  {optionKey.charAt(0).toUpperCase() + optionKey.slice(1)}
                                </label>
                                <Controller
                                  name={`optionlist[${index}].${optionKey}`}
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      className="react-select w-full"
                                      classNamePrefix="react-select"
                                      options={daysOfWeekOptions}
                                      isMulti
                                      isClearable
                                    />
                                  )}
                                />
                              </div>
                            );
                          }
                          return (
                            <div key={optionIndex} className="flex space-x-2">
                              <label htmlFor={`optionlist[${index}].${optionKey}`} className="text-sm font-medium text-gray-700">
                                {optionKey.charAt(0).toUpperCase() + optionKey.slice(1)}
                              </label>
                              <Controller
                                name={`optionlist[${index}].${optionKey}`}
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <input
                                    type="text"
                                    {...field}
                                    className="border border-gray-300 rounded p-2 w-full"
                                  />
                                )}
                              />
                            </div>
                          );
                        })}
                      </div>

                      <div className="grid gap-2 border px-2 py-2 mt-2">
                        <h4 className="text-base font-medium mb-2">Time Slots</h4>
                        <div className="px-2 py-2">
                          {option?.timeSlots?.map((timeSlot, timeSlotIndex) => (
                            <div className='my-2 border p-2'>
                              <div className='flex justify-between'>
                                <h4>Time Slot {timeSlotIndex + 1}</h4>
                                <div className='justify-items-end'>
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
                                      onClick={() => handleRemoveTimeSlot(index)}
                                    >
                                      <MdDelete />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div key={timeSlotIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 py-2">
                                {Object.keys(timeSlot)?.map((field, i) => {
                                  return (
                                    <div key={i}>
                                      <label htmlFor={`optionlist[${index}].timeSlots[${timeSlotIndex}].${field}`} className="text-sm font-medium text-gray-700">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                      </label>
                                      <Controller
                                        name={`optionlist[${index}].timeSlots[${timeSlotIndex}].${field}`}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                          <input
                                            type="text"
                                            {...field}
                                            className="border border-gray-300 rounded p-2 w-full"
                                          />
                                        )}
                                      />
                                    </div>
                                  )
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
              <button
                type="button"
                className="bg-green-500 text-green-800 border rounded px-2 py-1 flex mt-4"
                onClick={() => handleAddOption()}
              >
                Add Option <MdAdd />
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center bg-blue-400 border rounded-xl" style={{backgroundColor: 	'#89CFF0'}}>
              <button
                type="submit"
                className="border-black text-green-900 flex font-bold py-2 px-4 rounded"
              >
                Add Tour<MdAdd />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default TourForm;
