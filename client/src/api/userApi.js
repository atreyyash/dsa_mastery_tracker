import CreateApi from "./axios";

export const getUserProgress = async () => {
    try {
        const response = await CreateApi.get(`/user/progress`);
        return response.data.progress;
    } catch (error) {
        throw error;
    }
};