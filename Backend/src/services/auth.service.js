const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
//for registration
const registerUser = async ({ fullName, email, password }) => {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
    });


    const token = generateToken(user._id);

    return {
        success: true,
        message: "User registered successfully",
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    };
};

//for login
const loginUser = async ({ email, password }) => {

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Return response
    return {
        success: true,
        message: "Login successful",
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
    };
};


module.exports = {
    registerUser,
    loginUser
};