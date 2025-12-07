import mongoose from 'mongoose';
import User from '../models/user.js';
import Chapters from '../models/chapters.js';
import Problem from '../models/problems.js';

export const getChapters = async (req, res) => {
    try {
        const chapters = await Chapters.find();
        res.status(200).json({
            chapters,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            error: `Fetch failed - ${error.message}`,
            success: false,
        });
    }
};

export const getChapterById = async (req, res) => {
    const { chapterId } = req.params;
    try {
        const chapter = await Chapters.findById(chapterId);
        if (!chapter) {
            return res.status(404).json({
                error: 'Chapter not found',
                success: false,
            });
        }
        res.status(200).json({
            chapter,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            error: `Fetch failed - ${error.message}`,
            success: false,
        });
    }
};

export const getChapterProblems = async (req, res) => {
    const { chapterId } = req.params;
    try {
        const problems = await Problem.find({ chapterId }).lean();

        if (!problems) {
            return res.status(404).json({
                error: 'No problems found for this chapter',
                success: false,
            });
        }
        res.status(200).json({
            problems: problems,
            success: true,
            count: problems.length,
        });
    } catch (error) {
        res.status(500).json({
            error: `Fetch failed - ${error.message}`,
            success: false,
        });
    }
};

export const markProblemComplete = async (req, res) => {
    try {
        const userId = req.user.id;
        const { problemId } = req.params;
        const { completed } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(problemId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid problem ID",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const alreadyCompleted = user.progress.some(
            (p) => p.problemId.toString() === problemId
        );

        if (completed === true) {
            if (!alreadyCompleted) {
                user.progress.push({
                    problemId: problemId,
                    completedAt: new Date(),
                });
            }
        } else {
            user.progress = user.progress.filter(
                (p) => p.problemId.toString() !== problemId
            );
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Progress updated",
            progress: user.progress,
        });
    } catch (error) {
        res.status(500).json({
            error: `Update failed - ${error.message}`,
            success: false,
        });
    }
};