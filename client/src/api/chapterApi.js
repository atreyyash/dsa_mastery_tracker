import CreateApi from "./axios";

export const getAllChapters = async () => {
    try {
        const response = await CreateApi.get("/chapters");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getChapter = async (chapterId) => {
    try {
        const response = await CreateApi.get(`/chapters/${chapterId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getChapterProblems = async (chapterId) => {
    try {
        const response = await CreateApi.get(`/chapters/${chapterId}/problems`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProblemStatus = async (problemId, status) => {
    try {
        const response = await CreateApi.patch(`/problems/${problemId}/complete`, { completed: status });
        return response.data;
    } catch (error) {
        throw error;
    }
};