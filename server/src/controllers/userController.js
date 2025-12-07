import bcrypt from 'bcryptjs';
import User from '../models/user.js';

export const updateUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                success: false,
            });
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(parseInt(process.env.saltRounds));
            user.password = await bcrypt.hash(password, salt);
        }
        await user.save();
        res.status(200).json({
            message: 'User updated successfully',
            success: true,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({
            error: `Update failed - ${error.message}`,
            success: false,
        });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.query;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                success: false,
            });
        }
        res.status(200).json({
            user,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            error: `Fetch failed - ${error.message}`,
            success: false,
        });
    }
};

export const getUserProgress = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).populate('progress.problemId');
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
                success: false,
            });
        }
        res.status(200).json({
            progress: user.progress,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            error: `Fetch failed - ${error.message}`,
            success: false,
        });
    }
};