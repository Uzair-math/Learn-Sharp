import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        unique: false
    },
    location: {
        type: String,
    },
    gender: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    qualification: {
        type: String,
        
    },
    email: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        unique: false
    },
    role: {
        type: String,
        required: true,
        unique: false
    },
    students: {
        type: Number,
        default: 0,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    isVerified: {
        type: Boolean,
        default: false, // Set the default value to false
      },

},
    { timestamps: true }
)

export const Users = mongoose.models.users || mongoose.model('users', userSchema);