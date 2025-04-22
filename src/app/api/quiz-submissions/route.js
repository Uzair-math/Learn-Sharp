import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import QuizSubmission from '@/models/QuizSubmission';
import Quiz from '@/models/Quiz';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// GET all submissions (filtered by user or quiz)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get('quizId');
    const studentId = searchParams.get('studentId');
    const userId = session.user.id;
    const userRole = session.user.role || 'student';

    await dbConnect();

    let query = {};
    
    // If student, only show their submissions
    if (userRole === 'student') {
      query.studentId = userId;
    } 
    // If tutor/admin, they can see all quiz submissions they created
    else if (userRole === 'tutor' || userRole === 'admin') {
      if (quizId) {
        // Verify tutor owns this quiz
        const quiz = await Quiz.findById(quizId);
        if (!quiz || quiz.createdBy.toString() !== userId) {
          return NextResponse.json({ error: 'You do not have access to this quiz' }, { status: 403 });
        }
        query.quizId = quizId;
      } else if (studentId) {
        query.studentId = studentId;
      } else {
        // Get all quizzes created by this tutor
        const tutorQuizzes = await Quiz.find({ createdBy: userId }).select('_id');
        query.quizId = { $in: tutorQuizzes.map(quiz => quiz._id) };
      }
    }

    const submissions = await QuizSubmission.find(query)
      .populate('quizId', 'title timeLimit')
      .populate('studentId', 'name email')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching quiz submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch quiz submissions' }, { status: 500 });
  }
}

// POST start a quiz or submit answers
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const data = await request.json();
    const { quizId, answers, action } = data;

    await dbConnect();

    // Fetch the quiz to check availability and calculate max score
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    // Check if quiz is available for students
    if (session.user.role === 'student') {
      if (!quiz.isPublished) {
        return NextResponse.json({ error: 'This quiz is not available' }, { status: 403 });
      }
      
      const now = new Date();
      if (quiz.availableFrom && now < new Date(quiz.availableFrom)) {
        return NextResponse.json({ error: 'This quiz is not yet available' }, { status: 403 });
      }
      
      if (quiz.availableUntil && now > new Date(quiz.availableUntil)) {
        return NextResponse.json({ error: 'This quiz is no longer available' }, { status: 403 });
      }
    }

    // If starting a quiz
    if (action === 'start') {
      // Check if student already has an active submission
      const existingSubmission = await QuizSubmission.findOne({
        quizId,
        studentId: userId,
        status: { $in: ['started', 'submitted'] }
      });

      if (existingSubmission) {
        return NextResponse.json(existingSubmission);
      }

      // Calculate max possible score
      const maxPossibleScore = quiz.questions.reduce((total, q) => total + q.points, 0);

      // Create new submission
      const submission = new QuizSubmission({
        quizId,
        studentId: userId,
        startedAt: new Date(),
        maxPossibleScore,
        status: 'started',
        answers: [] // Empty answers array to start
      });

      await submission.save();
      return NextResponse.json(submission, { status: 201 });
    }
    // If submitting a quiz
    else if (action === 'submit') {
      // Find active submission
      const submission = await QuizSubmission.findOne({
        quizId,
        studentId: userId,
        status: 'started'
      });

      if (!submission) {
        return NextResponse.json({ error: 'No active quiz submission found' }, { status: 404 });
      }

      // Check if time limit exceeded
      const now = new Date();
      const startTime = new Date(submission.startedAt);
      const timeLimitMs = quiz.timeLimit * 60 * 1000; // Convert minutes to ms
      const timeLimitExceeded = (now - startTime) > timeLimitMs;

      // Process answers and auto-grade objective questions
      let totalScore = 0;
      const processedAnswers = answers.map(answer => {
        const question = quiz.questions.id(answer.questionId);
        if (!question) return answer;

        let isCorrect = false;
        if (question.questionType !== 'shortAnswer') {
          if (Array.isArray(question.correctAnswer)) {
            // For checkbox questions (multiple correct answers)
            const answerArray = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
            isCorrect = question.correctAnswer.length === answerArray.length &&
                        question.correctAnswer.every(a => answerArray.includes(a));
          } else {
            // For single-answer questions
            isCorrect = answer.answer === question.correctAnswer;
          }
          
          answer.isCorrect = isCorrect;
          answer.points = isCorrect ? question.points : 0;
          totalScore += answer.points;
        }
        
        return answer;
      });

      // Update submission
      submission.answers = processedAnswers;
      submission.submittedAt = now;
      submission.timeSpent = Math.floor((now - startTime) / 1000); // in seconds
      submission.totalScore = totalScore;
      submission.status = timeLimitExceeded ? 'timed_out' : 'submitted';

      await submission.save();
      return NextResponse.json(submission);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error with quiz submission:', error);
    return NextResponse.json({ error: 'Failed to process quiz submission' }, { status: 500 });
  }
}

// PUT to update a submission (grade short answers, provide feedback)
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only tutors and admins can grade
    const userRole = session.user.role || 'student';
    if (userRole !== 'tutor' && userRole !== 'admin') {
      return NextResponse.json({ error: 'Only tutors and admins can grade quizzes' }, { status: 403 });
    }

    const userId = session.user.id;
    const data = await request.json();
    const { submissionId, gradedAnswers } = data;

    await dbConnect();
    
    const submission = await QuizSubmission.findById(submissionId);
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    // Verify tutor owns this quiz
    const quiz = await Quiz.findById(submission.quizId);
    if (!quiz || quiz.createdBy.toString() !== userId) {
      return NextResponse.json({ error: 'You do not have permission to grade this quiz' }, { status: 403 });
    }

    // Update each graded answer
    let totalScore = 0;
    submission.answers = submission.answers.map(answer => {
      const gradedAnswer = gradedAnswers.find(ga => ga.questionId.toString() === answer.questionId.toString());
      
      if (gradedAnswer) {
        answer.isCorrect = gradedAnswer.isCorrect;
        answer.points = gradedAnswer.points;
        answer.feedback = gradedAnswer.feedback;
        answer.gradedBy = userId;
      }
      
      totalScore += answer.points;
      return answer;
    });

    submission.totalScore = totalScore;
    submission.status = 'graded';
    submission.gradedAt = new Date();

    await submission.save();
    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error grading quiz:', error);
    return NextResponse.json({ error: 'Failed to grade quiz' }, { status: 500 });
  }
} 