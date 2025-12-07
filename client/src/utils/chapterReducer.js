import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllChapters as fetchChaptersApi } from "../api/chapterApi";

const initialState = {
    chapters: [],
    selectedChapter: null,
    loading: false,
    error: null,
};

export const fetchAllChapters = createAsyncThunk('chapters/fetchAllChapters', async function () {
    try {
        const data = await fetchChaptersApi();
        return data.chapters;
    } catch (error) {
        throw error;
    }
});

const chapterSlice = createSlice({
    name: 'chapters',
    initialState,
    reducers: {
        setSelectedChapter(state, action) {
            state.selectedChapter = action.payload;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllChapters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllChapters.fulfilled, (state, action) => {
                state.loading = false;
                state.chapters = action.payload;
            })
            .addCase(fetchAllChapters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { setSelectedChapter } = chapterSlice.actions;
export default chapterSlice.reducer;