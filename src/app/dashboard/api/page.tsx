"use client"

import { UpdateRayanaAPi, getRayanaAPi } from "@/lib/services";
import { useEffect, useState } from "react";

const Apipage = () => {
    
    const [paymentapi, setPaymentApi] = useState({});
    const [ryanaapi, setRyanaApi] = useState({});
  
    const UpdateRayanaApi = async () => {
      let res =  await UpdateRayanaAPi(ryanaapi)
      setRyanaApi(res)
    };

    const UpdatePaymentApi = async () => {
      let res =  await UpdateRayanaAPi(ryanaapi)
      setRyanaApi(res)
    };

    useEffect(()=>{
      const getApi = async () =>{
        setRyanaApi(await getRayanaAPi())
        setPaymentApi('')
      }
      getApi()
    },[])


  return (
    <div className="flex flex-col space-y-6 items-center h-96 justify-center">
    <div className="flex flex-row space-x-4">
    <div className="">Payment Api Key :</div>
    <input
      type="text"
      onChange={(e)=>setPaymentApi({...paymentapi,apikey:e?.target.value})}
      className="border border-gray-300 text-black rounded px-2 py-1"
    />
    <button onClick={UpdatePaymentApi} className="bg-blue-500 text-white px-3 py-1 rounded">
      Update
    </button>
    </div>   
    <div className="flex flex-row space-x-4">
    <div>Ryana Api Key :</div>
    <input
      type="text"
      onChange={(e)=>setRyanaApi({...ryanaapi, apikey:e?.target.value})}
      className="border border-gray-300 text-black rounded px-2 py-1"
    />
    <button onClick={UpdateRayanaApi} className="bg-blue-500 text-white px-3 py-1 rounded">
      Update
    </button>
    </div>    
  </div>
  )
}

export default Apipage