const User = require('../models/userModel');
const cron = require('node-cron');
const sendEmail = require('../utils/SendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;

// ROUTE 1 => REGISTER USER
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }

        user = await User.create({
            name, email, password, avatar: {
                public_id: "Sample_Img",
                url: "https://cdn1.vectorstock.com/i/thumb-large/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg",
            }
        })

        // generating token
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Register Success",
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 2 => LOGIN USER
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            })
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email id or password"
            })
        }

        // generating token
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Login Success",
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 3 => LOGOUT USER
exports.logoutUser = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            "message": "Logged Out Successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 4 => GET USER OWN DETAILS
exports.getUserDetails = async (req, res) => {
    try {
        // console.log(req);
        const user = await User.findById(req.user.id)
        console.log(user)
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 5 => UPDATE USER PASSWORD
exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("+password")
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(404).json({
                success: false,
                message: "please provide old & new password"
            })
        }
        const isPasswordMatched = await user.matchPassword(oldPassword);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Old Password is Incorrect"
            })
        }
        user.password = newPassword;
        res.status(200).json({
            success: true,
            user
        })
        await user.save();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// const job = schedule.scheduleJob('0 0 0 1 */1 *', function () {
//     console.log('heeeeey')
// });

cron.schedule('* * * * * *', () => {
    // console.log('Hey Ashish 😍 How are You!');
    // console.log('**************END**************');
});


// ROUTE 6 => FORGOT PASSWORD SEND MAIL
exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        const resetToken = user.getResetPasswordToken();
        await user.save({
            validateBeforeSave: false
        })

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`
        const message = `Your Reset Password Token is up:- \n\n ${resetPasswordUrl} \n\n If you have not requested this email, please Ignore it!`
        try {
            await sendEmail({
                email: user.email,
                subject: `Newzel - Invoice Generator App`,
                message,
            })
            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} Success`
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({
                validateBeforeSave: false
            });
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 7 => RESET PASSWORD OR CHANGE PASSWORD
exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const user = await User.findOne({
            resetPasswordToken
        })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Session Expired!"
            })
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(404).json({
                success: false,
                message: "Password does not matched!"
            })
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save()
        res.status(200).json({
            success: true,
            message: `Password Update Success`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 8 => UPDATE USER PROFILE
exports.updateUserProfile = async (req, res) => {
    try {
        const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
            quality: "auto"
        })
        const avatarDatas = {
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }
        const userId = await User.findById(req.user.id)
        const update = await User.findByIdAndUpdate(userId, avatarDatas)
        res.status(200).json({
            success: true,
            update
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 9 => GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// ROUTE 10 => GET SINGLE USER DETAILS
exports.getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("invoices");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Doesn't Exist"
            })
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}