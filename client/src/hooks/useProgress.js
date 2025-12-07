import { useState } from "react";
import { getUserProgress } from "../api/userApi";
import { useAuth } from "../context/AuthContext";

export const useProgress = () => {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState([]);

    const fetchProgress = async () => {
        try {
            setLoading(true);
            const data = await getUserProgress();
            setProgress(data);
        } catch (error) {
            if (error?.response?.status === 401) {
                logout();
                return;
            }
            throw new Error(error.message || "Failed to fetch progress!");
        } finally {
            setLoading(false);
        }
    };

    return { progress, loading, fetchProgress };
};