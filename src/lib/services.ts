import axios from "axios"

export async function getAllUsers(){
    try {
        let res = await axios.get('http://69.48.163.45:3000/users')
        return res?.data
    } catch (error) {
        throw error
    }
}