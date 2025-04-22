const mongoose = require('mongoose');
const { uid } = require('uid');

const ClassroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  meetLink: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tutors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  inviteCode: {
    type: String,
    unique: true,
    default: () => uid(8) // Generate a unique 8-character code
  },
  isActive: {
    type: Boolean,
    default: true
  },
  endDate: {
    type: Date
  },
  quizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }],
  announcements: [{
    text: {
      type: String,
      required: true
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

// Method to generate a new invite code
ClassroomSchema.methods.refreshInviteCode = function() {
  this.inviteCode = uid(8);
  return this.save();
};

// Check if model is already defined to avoid overwriting in Next.js development
const Classroom = mongoose.models.Classroom || mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom; 