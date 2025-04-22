import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    enrolledDate: {
        type: Date,
        required: true
    },
    tuitionType: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        required: true
    },
    
    ranking: {
        type: Number,
        required: true
    },
    class: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

export const Students = mongoose.models.Students || mongoose.model('Students', studentSchema);
