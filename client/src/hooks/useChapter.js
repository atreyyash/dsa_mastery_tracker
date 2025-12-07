import { useState } from "react";
import { getChapter } from "../api/chapterApi";
import { useAuth } from "../context/AuthContext";

export const useChapter = () => {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [chapter, setChapter] = useState(null);

    const fetchChapter = async (chapterId) => {
        try {
            setLoading(true);
            const data = await getChapter(chapterId);
            setChapter(data.chapter);
        } catch (error) {
            if (error?.response?.status === 401) {
                logout();
                return;
            }
            throw new Error(error?.response?.data?.message || "Failed to fetch chapter!");
        } finally {
            setLoading(false);
        }
    }

    return { chapter, loading, fetchChapter };
}