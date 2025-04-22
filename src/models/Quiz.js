import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    enum: ['multipleChoice', 'checkbox', 'shortAnswer'],
    default: 'multipleChoice'
  },
  options: [String],
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed, // Can be String or Array for multiple answers
    required: function() {
      return this.questionType !== 'shortAnswer';
    }
  },
  points: {
    type: Number,
    default: 1
  }
});

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timeLimit: {
    type: Number,
    default: 30, // minutes
    min: 1
  },
  questions: [QuestionSchema],
  isPublished: {
    type: Boolean,
    default: false
  },
  availableFrom: {
    type: Date,
    default: Date.now
  },
  availableUntil: {
    type: Date
  },
  classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: false
  }
}, { timestamps: true });

// Check if model is already defined to avoid overwriting in Next.js development
const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);

export default Quiz; 