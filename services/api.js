import { backend_url } from "@/utils/config";
import axios from "axios"



export const userLogin = async (email, password) => {
    try {
        const response = await axios.post(`${backend_url}/api/login`, { email, password });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during login.';
        throw new Error(errorMessage);
    }
};

export const carDetails = async (userId, formData, pictures) => {
    try {
        const response = await axios.post(`${backend_url}/api/addCar`, { userId, formData, pictures });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during adding Car details.';
        throw new Error(errorMessage);
    }
};