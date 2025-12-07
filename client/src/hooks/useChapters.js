import { useState } from "react";
import { getAllChapters } from "../api/chapterApi";
import { useAuth } from "../context/AuthContext";

export const useChapters = () => {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [chapters, setChapters] = useState([]);

    const getChapters = async () => {
        try {
            setLoading(true);
            const data = await getAllChapters();
            setChapters(data?.chapters);
        } catch (error) {
            if (error?.response?.status === 401) {
                logout();
                return;
            }
            throw new Error(error?.response?.data?.message || "Failed to fetch chapters!");
        } finally {
            setLoading(false);
        }
    }

    return { chapters, loading, getChapters };
};