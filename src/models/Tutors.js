const mongoose = require('mongoose');

const educationQualificationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year_completed: Number,
  subjects: [String],
});

const tuitionInfoSchema = new mongoose.Schema({
  expected_salary: String,
  current_status: String,
  days_per_week: [String],
  preferred_tuition_style: [String],
  place_of_learning: String,
  extra_facilities: [String],
  preferred_medium_of_instruction: String,
  preferred_class: [String],
  preferred_subjects: [String],
  preferred_time: [String],
  preferred_areas_to_teach: [String],
});

const contactSchema = new mongoose.Schema({
  email: String,
  phone: String,
});

const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  address: String,
});

const tutorSchema = new mongoose.Schema({
  id: String,
  name: String,
  premium: Boolean,
  gender: String,
  age: Number,
  students: Number,
  ratings: Number,
  education: String,
  image_url: String,
  education_qualification: [educationQualificationSchema],
  tuition_info: tuitionInfoSchema,
  contact: contactSchema,
  experience: String,
  languages_spoken: [String],
  additional_info: String,
  area_covered: [String],
  location: locationSchema,
  subjects: [String],
  updatedAt: Date,
  isVerified: {
    type: Boolean,
    default: false, // Set the default value to false
  },
});

// Export the Tutors model
export const Tutors = mongoose.models.Tutors || mongoose.model('Tutors', tutorSchema);
