import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
});

const Chapter = mongoose.model("Chapter", chapterSchema);

export default Chapter;