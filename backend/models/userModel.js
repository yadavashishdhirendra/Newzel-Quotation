const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String
        }
    },
    created_At: {
        type: Date,
        default: Date.now()
    },
    userrole: {
        type: String,
        default: "User"
    },
    invoices:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

// BCRYPTING PASSWORD
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// GENERATING JSONWEBTOKEN
userSchema.methods.generateToken = function () {
    return jwt.sign({
            id: this._id
        },
        process.env.JWT_SECRET
    )
}

// COMPARE PASSWORD WHEN LOGIN
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// RESET PASSWORD TOKEN
userSchema.methods.getResetPasswordToken = function () {
    // GENERATING TOKEN
    const resetToken = crypto.randomBytes(20).toString("hex");
    // HASHING PASSWORD & ADDING TO USER SCHEMA
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports = mongoose.model("User", userSchema)