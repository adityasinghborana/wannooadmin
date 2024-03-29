"use client"

import { useState } from "react";

const Apipage = () => {
    
    const [paymentapi, setPaymentApi] = useState("");
    const [ryanaapi, setRyanaApi] = useState("");
  
    const handleUpdateClick = () => {};

  return (
    <div className="flex flex-col space-y-6 items-center h-96 justify-center">
    <div className="flex flex-row space-x-4">
    <div className="">Payment Api Key :</div>
    <input
      type="text"
      onChange={(e)=>setPaymentApi(e?.target.value)}
      className="border border-gray-300 text-black rounded px-2 py-1"
    />
    <button onClick={handleUpdateClick} className="bg-blue-500 text-white px-3 py-1 rounded">
      Update
    </button>
    </div>   
    <div className="flex flex-row space-x-4">
    <div>Ryana Api Key :</div>
    <input
      type="text"
      onChange={(e)=>setRyanaApi(e?.target.value)}
      className="border border-gray-300 text-black rounded px-2 py-1"
    />
    <button onClick={handleUpdateClick} className="bg-blue-500 text-white px-3 py-1 rounded">
      Update
    </button>
    </div>    
  </div>
  )
}

export default Apipage