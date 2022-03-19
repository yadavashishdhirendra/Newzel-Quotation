const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Please Login First",
            })
        }

        const decodeData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decodeData.id);
        console.log(req.user);
        next()
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}