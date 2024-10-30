import axios from 'axios';

const API_URL = 'http://localhost:3010/api/';

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}product/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}product/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}; 