import axios from "axios"

export async function getAllUsers(){
    try {
        let res = await axios.get('http://69.48.163.45:3000/users')
        return res?.data
    } catch (error) {
        throw error
    }
}

export async function deleteUser(id:number) {
    try {
        let res = await axios.post('http://69.48.163.45:3000/deleteuser',id)
        return res?.data
    } catch (error) {
        throw error
    }   
}

export async function getAllTours() {
    try {
        let res = await axios.get('http://69.48.163.45:3000/tours')
        return res?.data
    } catch (error) {
        throw error
    }   
}