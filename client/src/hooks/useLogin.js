import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const useLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { login: authLogin } = useAuth();
    
    const login = async (values) => {
        let data;
        try {
            setLoading(true);
            data = await loginUser(values);
            authLogin(data.user, data.token);
            message.success("Login successful!");
            navigate("/");
        } catch (error) {
            throw new Error(error.response?.data?.message || "Login failed!");
        } finally {
            setLoading(false);
        }

    }

    return { login, loading };
}
