'use client'
import { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GetAllImages, GetEventByID } from '@/lib/services'; // Assuming you have an API function for fetching event by ID
import CustomImageUpload from '@/app/ui/dashboard/ImageModal/ImageUpload'; // Adjust path as per your project structure

const eventDetailSchema = Yup.object().shape({
  eventName: Yup.string().required('Event Name is required'),
  description: Yup.string(),
  date: Yup.date().required('Event Date is required'),
  location: Yup.string().required('Event Location is required'),
  googlemapurl: Yup.string().url('Invalid Google Map URL'),
  minage: Yup.string().required('Minimum Age is required'),
  moreinfo: Yup.string(),
  ticketinfo: Yup.string(),
  artistname: Yup.string(),
  artistimage: Yup.string().url('Invalid Artist Image URL'),
  lastbookingtime: Yup.date().required('Last Booking Time is required'),
  eventSelling: Yup.boolean(),
  ischildallowed: Yup.boolean(),
  isadultallowed: Yup.boolean(),
  isinfantallowed: Yup.boolean(),
  duration: Yup.string(),
  eventoptions: Yup.array().of(
    Yup.object().shape({
      optionname: Yup.string().required('Option Name is required'),
      adultprice: Yup.string().required('Adult Price is required'),
      childprice: Yup.string().required('Child Price is required'),
      infantprice: Yup.string().required('Infant Price is required'),
      optiondescription: Yup.string(),
      available: Yup.string(),
    })
  ),
  images: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      imagePath: Yup.string().url('Invalid Image URL').required('Image Path is required'),
      eventDetailId: Yup.number().required(),
    })
  ),
});

const EventForm = ({ params: { id } }) => {
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetEventByID({ id: parseInt(id) });
        setInitialValues({...res, date: new Date(res.date).toISOString().substring(0, 10) , lastbookingtime: new Date(res.lastbookingtime).toISOString().substring(0, 16)});
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-white rounded-2xl mt-8">
      <div className="overflow-y-auto" style={{ height: "calc(100vh - 10rem)", scrollbarWidth: "none" }}>
        <Formik
          initialValues={initialValues} 
          validationSchema={eventDetailSchema}
          onSubmit={(values) => {
            // Handle form submission here
            console.log('Form submitted with values:', values);
          }}
        >
          {({ values, handleSubmit, isSubmitting }) => (
            <Form className="space-y-6">
              {/* Basic event data fields */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.keys(values).map((key, index) => {
                  if (["id", "eventdetailid", "vendorUid", "eventoptions"].includes(key)) {
                    return null;
                  } else if (["eventSelling", "ischildallowed", "isadultallowed", "isinfantallowed"].includes(key)) {
                    return (
                      <div key={index} className="mb-4">
                        <label htmlFor={key} className="block text-gray-700 text-sm font-bold mb-2">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <Field as="select" id={key} name={key} className="text-fieldutilities">
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Field>
                      </div>
                    );
                  } else if (key === "date") {
                    return (
                      <div key={index} className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Event Date</label>
                        <Field type="date" id="date" name="date" className="text-fieldutilities" />
                        <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                      </div>
                    );
                  } else if (key === "lastbookingtime") {
                    return (
                      <div key={index} className="mb-4">
                        <label htmlFor="lastbookingtime" className="block text-gray-700 text-sm font-bold mb-2">Last Booking Time</label>
                        <Field type="datetime-local" id="lastbookingtime" name="lastbookingtime" className="text-fieldutilities" />
                        <ErrorMessage name="lastbookingtime" component="div" className="text-red-500 text-sm" />
                      </div>
                    );
                  } else if (key === "images") {
                    return (
                      <div key={index} className="mb-4">
                        <label htmlFor="images" className="block text-gray-700 text-sm font-bold mb-2">Upload Images</label>
                        <CustomImageUpload
                          onImageSelect={(imagePaths) => console.log("Selected images:", imagePaths)}
                          Images={GetAllImages} // Pass images data to CustomImageUpload component
                        />
                      </div>
                    );
                  } else if (key === "eventoptions") {
                    return (
                      <FieldArray key={index} name="eventoptions">
                        {({ push, remove }) => (
                          <div className="space-y-4">
                            {values[key].map((option, optIndex) => (
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
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <button type="button" className="bg-primary text-white py-2 px-4 rounded" onClick={() => push({ id: 0, optionname: '', adultprice: '', childprice: '', infantprice: '', optiondescription: '', available: '' })}>
                              Add Option
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    );
                  } else {
                    return (
                      <div key={index} className="mb-4">
                        <label htmlFor={key} className="block text-gray-700 text-sm font-bold mb-2">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <Field type="text" id={key} name={key} className="text-fieldutilities" />
                      </div>
                    );
                  }
                })}
              </div>

              {/* Submit Button */}
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
