import axios from "axios"

export const axiosInstance = axios.create({
    baseURL :  "https://canteen-web-1.onrender.com" ,
    withCredentials : true
})
