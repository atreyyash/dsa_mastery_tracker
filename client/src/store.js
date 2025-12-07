import { configureStore } from '@reduxjs/toolkit';
import chapterReducer from './utils/chapterReducer.js';

const store = configureStore({
    reducer: {
        chapters: chapterReducer,
    }
});

export default store;