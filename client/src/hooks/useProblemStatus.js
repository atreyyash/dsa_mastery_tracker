import { useState } from "react";
import { updateProblemStatus } from "../api/chapterApi";
import { useAuth } from "../context/AuthContext";

export const useProblemStatus = () => {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const updateStatus = async (problemId, status) => {
        try {
            setLoading(true);
            await updateProblemStatus(problemId, status);
        } catch (error) {
            if (error?.response?.status) {
                logout();
                return;
            }
            throw new Error(error?.response?.data?.message || "Failed to update problem status!");
        } finally {
            setLoading(false);
        }
    }

    return { updateStatus, loading };
};