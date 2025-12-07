import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const useSignup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const signup = async (values) => {
        try {
            setLoading(true);
            await registerUser(values);
            message.success("Signup successful!");
            navigate("/login");
        } catch (error) {
            throw new Error(error.response?.data?.message || "Signup failed!");
        } finally {
            setLoading(false);
        }

    }

    return { signup, loading };
}
