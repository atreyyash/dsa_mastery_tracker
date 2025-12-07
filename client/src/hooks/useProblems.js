import { useState } from "react";
import { getChapterProblems } from "../api/chapterApi";
import { useAuth } from "../context/AuthContext";

export const useProblems = () => {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [problems, setProblems] = useState([]);
    
    const fetchProblems = async (chapterId) => {
        try {
            setLoading(true);
            const res = await getChapterProblems(chapterId);
            setProblems(res);
        } catch (error) {
            if (error?.response?.status === 401) {
                logout();
                return;
            }
            throw new Error(error?.response?.data?.message || "Failed to fetch problems!");
        } finally {
            setLoading(false);
        }
    }
    return { problems, loading, fetchProblems };
}