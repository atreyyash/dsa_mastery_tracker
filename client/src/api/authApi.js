import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import CreateApi from "./axios";

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (userInfo) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userInfo);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMe = async () => {
    try {
        const response = await CreateApi.get("/auth/me");
        return response.data;
    } catch (error) {
        throw error;
    }
}