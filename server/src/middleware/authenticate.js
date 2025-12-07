import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.id }; // store only what's needed
        next();

    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
