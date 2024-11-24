'use client'

import { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GetAllImages, GetEventByID } from '@/lib/services';
import CustomImageUpload from '@/app/ui/dashboard/ImageModal/ImageUpload';

const formatDate = (date) => new Date(date).toISOString().substring(0, 16);

const EventForm = ({ params: { id } }) => {
  const [initialValues, setInitialValues] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetEventByID({ id: parseInt(id) });
        setInitialValues({
          ...res,
          date: formatDate(res.date).substring(0, 10),
          lastbookingtime: formatDate(res.lastbookingtime)
        });
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  const editEvent = async (values) => {
    try {
      console.log('Form submitted with values:', values);
      // Add your API call to update the event here
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderField = (key, value, index) => {
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    
    if (["id", "eventdetailid", "vendorUid", "eventoptions"].includes(key)) {
      return null;
    }

    if (["eventSelling", "ischildallowed", "isadultallowed", "isinfantallowed"].includes(key)) {
      return (
        <div key={index} className="mb-4">
          <label htmlFor={key} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
          <Field as="select" id={key} name={key} className="text-fieldutilities">
            <option value="true">True</option>
            <option value="false">False</option>
          </Field>
        </div>
      );
    }

    if (key === "date") {
      return (
        <div key={index} className="mb-4">
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Event Date</label>
          <Field type="date" id="date" name="date" className="text-fieldutilities" />
          <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
        </div>
      );
    }

    if (key === "lastbookingtime") {
      return (
        <div key={index} className="mb-4">
          <label htmlFor="lastbookingtime" className="block text-gray-700 text-sm font-bold mb-2">Last Booking Time</label>
          <Field type="datetime-local" id="lastbookingtime" name="lastbookingtime" className="text-fieldutilities" />
          <ErrorMessage name="lastbookingtime" component="div" className="text-red-500 text-sm" />
        </div>
      );
    }

    if (key === "images") {
      return (
        <div key={index} className="mb-4">
          <label htmlFor="images" className="block text-gray-700 text-sm font-bold mb-2">Upload Images</label>
          <CustomImageUpload
            onImageSelect={(imagePaths) => console.log("Selected images:", imagePaths)}
            Images={GetAllImages}
          />
        </div>
      );
    }

    return (
      <div key={index} className="mb-4">
        <label htmlFor={key} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
        <Field type="text" id={key} name={key} className="text-fieldutilities" />
        <ErrorMessage name={key} component="div" className="text-red-500 text-sm" />
      </div>
    );
  };

  const renderEventOptions = (values, push, remove) => (
    <div className="space-y-4">
      {values.eventoptions.map((option, optIndex) => (
        <div key={optIndex} className="rounded-2xl p-4 my-4">
          <h3 className="flex items-center justify-between bg-primary text-primary-bodytext py-2 px-4 rounded-2xl">
            Option {optIndex + 1}
            <button
              type="button"
              className="text-primary-bodytext hover:text-primary-bodytext"
              onClick={() => remove(optIndex)}
            >
              Remove
            </button>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Object.keys(option).map((optKey, fieldIndex) => (
              <div key={fieldIndex} className="mb-4">
                <label htmlFor={`eventoptions.${optIndex}.${optKey}`} className="block text-gray-700 text-sm font-bold mb-2">
                  {optKey.charAt(0).toUpperCase() + optKey.slice(1)}
                </label>
                <Field type="text" id={`eventoptions.${optIndex}.${optKey}`} name={`eventoptions.${optIndex}.${optKey}`} className="text-fieldutilities" />
                <ErrorMessage name={`eventoptions.${optIndex}.${optKey}`} component="div" className="text-red-500 text-sm" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="button" className="bg-primary text-white py-2 px-4 rounded" onClick={() => push({ id: 0, optionname: '', adultprice: '', childprice: '', infantprice: '', optiondescription: '', available: '' })}>
        Add Option
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-8 bg-white rounded-2xl mt-8">
      <div className="overflow-y-auto" style={{ height: "calc(100vh - 10rem)", scrollbarWidth: "none" }}>
        <Formik
          initialValues={initialValues}
          onSubmit={editEvent}
        >
          {({ values, handleSubmit, isSubmitting }) => (
            <Form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(values).map(([key, value], index) => 
                  key === "eventoptions" ? (
                    <FieldArray key={index} name="eventoptions">
                      {({ push, remove }) => renderEventOptions(values, push, remove)}
                    </FieldArray>
                  ) : renderField(key, value, index)
                )}
              </div>
              <div className="flex justify-center">
                <button type="submit" className="bg-primary text-white py-2 px-4 rounded" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EventForm;

