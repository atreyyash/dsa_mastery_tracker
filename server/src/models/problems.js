import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    links: {
        youtube: { type: String },
        leetcode: { type: String },
        article: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;