import axios from "axios";
import { baseURL } from "./apiURL";
 export const axiosInstance=axios.create({
    baseURL,
    headers:{
        Authorization: localStorage.getItem('token')
    }
})