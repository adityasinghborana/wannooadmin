"use client"
import Container from "@/app/ui/dashboard/container/Container"
import { UpdateHomePageData, getHomePageData } from "@/lib/services"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

const Home = () => {
    const [homepagedata,setHomePageData] = useState({})
    
    const getData = async () =>{
        setHomePageData(await getHomePageData())
    }

    useEffect(()=>{
        const data = getData();
     
    },[])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setHomePageData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      // const { id, ...rest } = homepagedata as Record<string, any>;
      // setHomePageData(rest);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await UpdateHomePageData(homepagedata)
      };

    return (
        <Container>
        <div className="bg-white p-8 shadow-md w-full rounded-3xl" style={{ height: 'calc(100vh - 6rem)' }}>
          <h2 className="text-2xl text-black font-bold mb-6 text-center">Home page data</h2>
          <div className="overflow-y-auto" style={{ maxHeight: '90%', scrollbarWidth: 'none' }}>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">              
              {/* Other form fields */}
              {Object.keys(homepagedata).map((key) => {
                if (key === 'id') return null;
                return (
                  <div className="mb-4" key={key}>
                    <label className="block text-gray-700 capitalize">
                      {key.toUpperCase()}
                    </label>
                    <input
                      type="text"
                      name={key}
                      defaultValue={homepagedata[key as keyof typeof homepagedata]}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                    />
                  </div>
                );
              })}
              <div className="flex justify-center col-span-3">
                <button
                  type="submit"
                  className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-purple-400 w-96"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
  )
}

export default Home