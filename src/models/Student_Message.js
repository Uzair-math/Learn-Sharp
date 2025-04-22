const mongoose = require('mongoose');

const studentMessageSchema = new mongoose.Schema({
  tutor_email: { type: String, required: true },
  tutor_name: { type: String, required: true },
  tutor_mobile_number: { type: String, required: true },
  tutor_location: { type: String, required: true },
  tutor_gender: { type: String, required: true },
  tutor_qualification: { type: String, required: true },
  student_name: { type: String, required: true },
  student_email: { type: String, required: true },
  student_mobile_no: { type: String, required: true },
  subject_name: { type: String, required: true },
  student_location: { type: String, required: true },
  student_gender: { type: String, required: true },
  class_name: { type: String },
  details: { type: String },
  tutor_feedback: { type: String },
});

export const Student_Message = mongoose.models.Student_Message || mongoose.model('Student_Message', studentMessageSchema);

