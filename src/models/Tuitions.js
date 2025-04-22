import mongoose from "mongoose";

const { Schema } = mongoose;

const tuitionSchema = new Schema(
	{
		tutor_name: {
			type: String,
		},
		tutor_email: {
			type: String,
		},
		subject: {
			type: String,
		},
		class_name: {
			type: String,
		},
		mobile: {
			type: Number,
		},
		salary: {
			type: Number,
		},
		gender: {
			type: String,
		},
		qualification: {
			type: String,
		},
		location: {
			type: String,
		},
		available_days: {
			type: String,
		},
		service_location: {
			type: String,
		},
		admin_feedback: {
			type: String,
		},
		isVerified: {
			type: Boolean,
			default: false, // Set the default value to false
		},
	},
	{ timestamps: true }
);

export const Tuitions = mongoose.models.Tuitions || mongoose.model('Tuitions', tuitionSchema);