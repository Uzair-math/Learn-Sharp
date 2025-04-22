import mongoose from 'mongoose';
const { Schema } = mongoose;

const tutorRequestSchema = new mongoose.Schema(
	{
		// Define your schema fields here
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		title: {
			type: String,
		},
		tuitionType: {
			type: String,
		},
		salary: {
			type: Number,
		},
		medium: {
			type: String,
		},
		classname: {
			type: String,
		},
		district: {
			type: String,
		},
		area: {
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

const Tutor_request = mongoose.models.Tutor_request || mongoose.model('Tutor_request', tutorRequestSchema);

export default Tutor_request;