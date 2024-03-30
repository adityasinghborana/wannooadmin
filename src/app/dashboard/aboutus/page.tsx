"use client"
import { getAboutUsDetails } from "@/lib/services"
import { useEffect, useState } from "react"

const Aboutus = () => {
    const [aboutus,setAboutUs] = useState([])
    useEffect(()=>{
        const getData= async ()=>{
            setAboutUs(await getAboutUsDetails())
        }
        getData()
    },[])

    return (
    <div>
        {
          Object.keys(aboutus).map((about)=>(
            <div key={about} className="mb-4">
                    <label
                      htmlFor={about}
                      className="block text-sm font-medium text-gray-700 uppercase"
                    >
                      {about}
                    </label>
                    <input
                      type="text"
                      id={about}
                      name={about}
                      value={about || ""}
                    //   onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
                    />
                  </div>
            ))
        }
    </div>
  )
}

export default Aboutus