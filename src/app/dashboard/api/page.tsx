"use client"

import { GetStripeApi, UpdateRayanaAPi, UpdateStripeApi, getRayanaAPi } from "@/lib/services";
import { useEffect, useState } from "react";

interface RayanaApi {
  id: string,
  apikey: string,
  baseUrl: string
}

interface StripeKey {
  id: string,
  secretapikey: string,
  publishableapikey: string
}

const Apipage = () => {

  const [paymentapi, setPaymentApi] = useState<StripeKey>({
    id: '',
    secretapikey: '',
    publishableapikey: ''
  });
 

 

  const UpdatePaymentApi = async () => {
    let res = await UpdateStripeApi(paymentapi)
    setPaymentApi(res)
  };

  useEffect(() => {
    const getApi = async () => {
     
      setPaymentApi(await GetStripeApi())
    }
    getApi()
  }, [])


  return (
    <div className="flex flex-col space-y-6 items-center h-96 justify-center w-full">
      <div className="space-x-4 w-full">
        <div className="w-full content-center inline">Payment Api Key :</div>
        <div className="flex flex-row gap-4 mt-4">
          <div>
            <label htmlFor="secretapikey">Secret_Api_Key</label>
            <input
              id="secretapikey"
              type="text"
              defaultValue={paymentapi?.secretapikey}
              onChange={(e) => setPaymentApi({ ...paymentapi, secretapikey: e?.target.value })}
              className="border border-gray-300 text-black rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label htmlFor="secretapikey">Publishable_Api_key</label>
            <input
              id="publishableapikey"
              type="text"
              defaultValue={paymentapi?.publishableapikey}
              onChange={(e) => setPaymentApi({ ...paymentapi, publishableapikey: e?.target.value })}
              className="border border-gray-300 text-black rounded px-2 py-1 w-full"
            />
          </div>
        </div>
        <div>
          <button onClick={UpdatePaymentApi} className="bg-blue-500 text-white mt-4 px-3 py-1 rounded">
            Update
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default Apipage