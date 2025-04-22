const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
	tuitionId: String,
	subject: String,
	class_name: String,
	service_location: String,
	available_days: String,
	salary: Number,
	mobile: String,
	tutor_name: String,
	tutor_email: String,
	student_name: String,
	student_location: String,
	student_gender: String,
	student_mobile_number: String,
	student_qualification: String,
	student_email: String,
	student_photoURL: String,
	isAccepted: {
		type: Boolean,
		default: null, // Set the default value to null
	}
},
	{ timestamps: true },
);
export const Bookings = mongoose.models.Bookings || mongoose.model('Bookings', bookingSchema);