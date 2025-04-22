const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
	{
		transactionID: { type: String, required: true },
		tuitionId: { type: String, required: true },
		tutor_name: { type: String, required: true },
		tutor_email: { type: String, required: true },
		subject_name: { type: String },
		class_name: { type: String },
		student_name: { type: String, required: true },
		student_email: { type: String, required: true },
		payment_amount: { type: Number, required: true },
		student_mobile_number: { type: String, required: true },
		student_location: { type: String, required: true },
		payment_status: { type: Boolean, default: false },
		payment_month: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Payments = mongoose.models.payments || mongoose.model('payments', paymentSchema);

