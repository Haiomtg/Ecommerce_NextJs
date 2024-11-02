import axios from 'axios';

const API_URL = 'http://localhost:3010/api/user';

export const registerUser = async (username, password, email) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }),
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to log in');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};