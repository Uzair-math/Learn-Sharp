const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  answer: {
    type: mongoose.Schema.Types.Mixed, // Can be String or Array for multiple answers
    required: true
  },
  isCorrect: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 0
  },
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  feedback: {
    type: String
  }
});

const QuizSubmissionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  submittedAt: {
    type: Date
  },
  timeSpent: {
    type: Number // in seconds
  },
  answers: [AnswerSchema],
  totalScore: {
    type: Number,
    default: 0
  },
  maxPossibleScore: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['started', 'submitted', 'graded', 'timed_out'],
    default: 'started'
  },
  gradedAt: {
    type: Date
  }
}, { timestamps: true });

// Check if model is already defined to avoid overwriting in Next.js development
const QuizSubmission = mongoose.models.QuizSubmission || mongoose.model('QuizSubmission', QuizSubmissionSchema);

module.exports = QuizSubmission; 