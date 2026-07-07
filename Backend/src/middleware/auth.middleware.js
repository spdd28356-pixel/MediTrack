const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;
    console.log("Middleware started");

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) 
    {
        token = req.headers.authorization.split(" ")[1];
        console.log("Token extracted");
    }

    if (!token) {
    return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
    });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//since the token is vulnerable, exceptional handling is done
        console.log("Token verified");
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }
        
        console.log("User found");
        req.user = user;
        console.log("Calling next()");
        next();


    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
}
    module.exports = {
    protect,
    
    };