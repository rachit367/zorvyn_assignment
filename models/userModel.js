const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['admin', 'viewer', 'analyst'],
        default: 'viewer'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

userSchema.index({ isDeleted: 1, isActive: 1 })
userSchema.index({ role:1 })

module.exports = mongoose.model('User', userSchema)