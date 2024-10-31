import axios from 'axios';

const API_URL = 'http://localhost:3010/api/product';

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        console.log(response.data);
        return response.data[0];
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}; 