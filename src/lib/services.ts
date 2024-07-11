import axiosInstance from "./loader.interceptor"

export async function getAllUsers(){
    try {
        let res = await axiosInstance.get('/users')
        return res?.data
    } catch (error) {
        throw error
    }
}

export async function deleteUser(id:number) {
    try {
        let res = await axiosInstance.post('/deleteuser',id)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function getAllTours() {
    try {
        let res = await axiosInstance.get('/tours')
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function getTourDetails(id:any) {
    try {
        let res = await axiosInstance.get(`/tourdetails?id=${id}`)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function getAboutUsDetails() {
    try {
        let res = await axiosInstance.get(`/Aboutus`)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function updateAboutUsDetails(data:any) {
    try {
        let res = await axiosInstance.post(`/updateaboutdata`, data)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function getHomePageData() {
    try {
        let res = await axiosInstance.get(`/homepage`)
    
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function getBackgroundImage() {
    try {
        let res = await axiosInstance.get(`/library`)
        return res?.data
    } catch (error) {
        throw error
    }   
}
export async function deleteBackgroundImage(path: string) {
    try {
        const res = await axiosInstance.delete(`/deletelibraryimage`, {
            data: { url: path } // Assuming the API expects the ID in the request body
        });
        return res?.data;
    } catch (error) {
        throw error;
    }   
}


// export async function UploadTourImage(image:any) {
//     try {
//         let res = await axiosInstance.post(`/upload`,image)
//         return res?.data
//     } catch (error) {
//         throw error
//     }   
// }

export async function UploadBackgroundImage(image:any) {
    try {
        let res = await axiosInstance.post(`/upload`,image)
        return res?.data
    } catch (error) {
        console.log(error)
        throw error
    }   
}

export async function getRayanaAPi() {
    try {
        let res = await axiosInstance.get(`/apikey`)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function UpdateRayanaAPi(newKey:any) {
    try {
        let res = await axiosInstance.put(`/updateapikey`,newKey)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function GetStripeApi() {
    try {
        let res = await axiosInstance.get(`/stripekey`)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function UpdateStripeApi(newKey:any) {
    try {
        let res = await axiosInstance.put(`/updatestripekey`,newKey)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function getEmail() {
    try {
        let res = await axiosInstance.get(`/email`)
        return res?.data
    } catch (error) {
        throw error
    }   
}
export async function updateEmail(dataToPost:any) {
    try {
        let res = await axiosInstance.patch(`/update-email`,dataToPost)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function getAllVendors() {
    try {
        let res = await axiosInstance.get(`/allvendors`)
        return res?.data.data
    } catch (error) {
        throw error
    }   
}

export async function SignUpVendor( data:any ) {
    try {
        let res = await axiosInstance.post(`/signupvendor`,data)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function getVendorDetail( data:any ) {
    try {
        let res = await axiosInstance.post(`/vendor`,{uid:data})
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function GetAllCities() {
    try {
        let res = await axiosInstance.get(`/cities`)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function GetAllTourTypes() {
    try {
        let res = await axiosInstance.get(`/tourtypes`)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function AddTourTypes(data:any) {
    try {
        let res = await axiosInstance.post(`/addtourtypes`, data)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function AddCity(data:any) {
    try {
        let res = await axiosInstance.post(`/addcity`, data)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function GetAllImages() {
    try {
        let res = await axiosInstance.get(`/library`)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function UpdateHomePageData(data:any) {
    try {
        let res = await axiosInstance.patch(`/updatedata`,data)
        return res?.data
    } catch (error) {
        throw error
    }   
}
export async function UpdateContactUsPageData(data:any) {
    try {
        let res = await axiosInstance.patch(`/updatecontactusdata`,data)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function getContactUsPageData() {
    try {
        let res = await axiosInstance.get(`/contactusdata`)
    
        return res?.data
    } catch (error) {
        throw error
    }   
}
export async function getForms() {
    try {
        let res = await axiosInstance.get(`/forms`)
    
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function AddTour(tourData:any) {
    try {
        console.log("hello api")
      const response = await axiosInstance.post('/addtour', tourData);
      console.log(response.data)
      return response.data;
    } catch (error) {
        console.log(error);
      throw error;
    }
  }

export async function GetAllBookings() {
    try {
      const response = await axiosInstance.get('/allbookings');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export async function GetVendorBookings(vendorId:any) { 
    try {
      const response = await axiosInstance.post('/userbookings',vendorId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function GetEvents() { 
    try {
      const response = await axiosInstance.get('/events');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function GetEventByID(Id:any) { 
    try {
      const response = await axiosInstance.post('/event', Id);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function GetEventTypes() { 
    try {
      const response = await axiosInstance.get('/eventtypes');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function addEvent(dataToPost:any) { 
    try {
      const response = await axiosInstance.post('/addevent', dataToPost);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  export async function GetBookingDetail(id:number) { 
    console.log(id);
    try {
      const response = await axiosInstance.post('/bookingdetail', { id });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  export async function CheckIsVendor(id:String) { 
    try {
      const response = await axiosInstance.post('/vendor', {uid:id});
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
   
  export async function GetCoupons() { 
    try {
      const response = await axiosInstance.get('/coupons');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  export async function createCoupons(data:any) { 
    try {
      const response = await axiosInstance.post('/createcoupons',data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  export async function deleteCoupon(data:any) { 
    try {
      const response = await axiosInstance.delete('/deletecoupon',{data:
        {id:data}
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }