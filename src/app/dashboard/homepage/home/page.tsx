"use client";
import Container from "@/app/ui/dashboard/container/Container";
import Modal from "@/components/model";
import { GetAllImages, UpdateHomePageData, getHomePageData } from "@/lib/services";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SCustomImageUpload from '../../../ui/dashboard/SingleImageLibrary/SCustomImageUpload'
// Define interface for home page data
interface HomePageData {
  id: string; // Assuming 'id' is a string, adjust as per your actual data type
  // Define other fields here
  [key: string]: any; // Allow any other keys with any value type
}

const Home: React.FC = () => {
  const [homepagedata, setHomePageData] = useState<HomePageData>({
    id: "" /* Initialize other fields here */,
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isSuccess, setIsSuccess] = useState(false); // State to manage modal visibility
  const [imagepath, setImagePath] = useState('');
  const [imagepath2, setImagePath2] = useState('');
  const [imagepath3, setImagePath3] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomePageData();
      setHomePageData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setHomePageData((prevData) => ({
      ...prevData,
      imagepath: imagepath,
      imagepath2: imagepath2,
      imagepath3: imagepath3,
    }));
  }, [imagepath, imagepath2, imagepath3]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHomePageData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Perform form submission logic
      await UpdateHomePageData(homepagedata);
      setIsSuccess(true); // Set isSuccess to true on successful submission
    } catch (error) {
      setIsSuccess(false); // Set isSuccess to false if there's an error
    } finally {
      openModal(); // Always open the modal after the submission attempt
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  return (
    <Container>
      <div
        className="bg-white p-8 shadow-md w-full rounded-3xl mt-12 "
        style={{ height: "calc(100vh - 10rem)" }}
      >
        <h2 className="text-2xl text-black font-bold mb-6 text-center">
          Home page data
        </h2>
        <div
          className="overflow-y-auto "
          style={{ maxHeight: "90%", scrollbarWidth: "none" }}
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            {/* Render form inputs based on homepagedata */}
            {Object.keys(homepagedata).map((key) => {
              if (key === "id") return null; // Skip rendering 'id'
              if(['imagepath', 'imagepath2', 'imagepath3'].includes(key)){
                return<>
                {key === 'imagepath' && <SCustomImageUpload onImageSelect={setImagePath} Images={GetAllImages}/> || 
                key === 'imagepath2' && <SCustomImageUpload onImageSelect={setImagePath2} Images={GetAllImages}/> ||
                key === 'imagepath3' && <SCustomImageUpload onImageSelect={setImagePath3} Images={GetAllImages}/>
                }</>                 
              }
              return (
                <div className="mb-4" key={key}>
                  <label className="block text-gray-700 capitalize">
                    {key.toUpperCase()}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={homepagedata[key as keyof HomePageData]}
                    onChange={handleChange}
                    className="w-full text-field"
                  />
                </div>
              );
            })}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded-full hover:bg-purple-400"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for success message */}
      {/* Conditional rendering of Modal based on isSuccess */}
      {isModalOpen && isSuccess && (
        <Modal
          isOpen={true} // Set to true to ensure the modal is visible
          title="Home Page Data"
          message="Submitted successfully!"
          onClose={closeModal} // Pass closeModal function to handle modal closure
        />
      )}

      {isModalOpen && !isSuccess && (
        <Modal
          isOpen={true} // Set to true to ensure the modal is visible
          title="Error"
          message="Data did not go through."
          onClose={closeModal} // Pass closeModal function to handle modal closure
        />
      )}
    </Container>
  );
};

export default Home;
