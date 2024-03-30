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
        let res = await axiosInstance.get(`/bgimage`)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function uploadBackgroundImage(bgimage:any) {
    try {
        let res = await axiosInstance.post(`/uploadimage`,bgimage)
        return res?.data
    } catch (error) {
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
        let res = await axiosInstance.post(`/updateapikey`,newKey)
        return res?.data
    } catch (error) {
        throw error
    }   
}
