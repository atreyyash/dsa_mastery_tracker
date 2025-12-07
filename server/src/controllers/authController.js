import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signup = async (req, res) => {
    const { name, email, password, } = req.body;
    const saltRounds = parseInt(process.env.saltRounds, 10);
    console.log('req: ', name, email, password);
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                error: 'User already exists',
                success: false,
            });
        } else {
            bcrypt.genSalt(saltRounds, async (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    const newUser = new User({
                        name,
                        email,
                        password: hash,
                    });
                    await newUser.save();
                    res.status(201).json({
                        message: 'User created successfully',
                        success: true,
                    });
                });
            });
        }
    } catch (error) {
        res.status(500).json({
            error: `Signup failed - ${error.message}`,
            success: false,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: 'User does not exist',
                success: false,
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: 'Invalid credentials',
                success: false,
            });
        }

        const payload = { id: user._id, name: user.name, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({
            error: `Login failed - ${error.message}`,
            success: false,
        });
    }
}