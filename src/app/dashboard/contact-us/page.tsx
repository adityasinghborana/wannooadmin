"use client";
import Container from "@/app/ui/dashboard/container/Container";
import {
  UpdateHomePageData,
  getContactUsPageData,
  getHomePageData,
} from "@/lib/services";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const ContactUsPage = () => {
  const [contactpagedata, setContactPageData] = useState({});

  const getData = async () => {
    setContactPageData(await getContactUsPageData());
  };

  useEffect(() => {
    const data = getData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactPageData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // const { id, ...rest } = homepagedata as Record<string, any>;
    // setHomePageData(rest);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await UpdateHomePageData(contactpagedata);
  };

  return (
    <Container>
      <div
        className="bg-white p-8 shadow-md w-full rounded-2xl mt-28"
        style={{ height: "calc(100vh - 30rem)" }}
      >
        <h2 className="text-2xl text-black font-bold mb-6 text-center">
          Contact page data
        </h2>
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "90%", scrollbarWidth: "none" }}
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 ">
            {/* Other form fields */}
            {Object.keys(contactpagedata).map((key) => {
              if (key === "id") return null;
              return (
                <div className="mb-4 " key={key}>
                  <label className="block text-gray-500 capitalize">
                    {key.toUpperCase()}
                  </label>
                  <input
                    type="text"
                    name={key}
                    defaultValue={
                      contactpagedata[key as keyof typeof contactpagedata]
                    }
                    onChange={handleChange}
                    className="text-field"
                  />
                </div>
              );
            })}
            <div className="flex justify-end col-span-3">
              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded-full hover:bg-purple-400 w-56"
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

export default ContactUsPage;
