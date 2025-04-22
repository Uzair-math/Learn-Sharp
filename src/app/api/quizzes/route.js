import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Quiz from '@/models/Quiz';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// GET all quizzes (with filters)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const classroomId = searchParams.get('classroomId');
    const userId = session.user.id;
    const userRole = session.user.role || 'student';

    await dbConnect();

    let query = {};
    
    // Filter by classroom if provided
    if (classroomId) {
      query.classroomId = classroomId;
    }
    
    // If student, only show published quizzes
    if (userRole === 'student') {
      query.isPublished = true;
      query.availableFrom = { $lte: new Date() };
      query.$or = [
        { availableUntil: { $gte: new Date() } },
        { availableUntil: null }
      ];
    } 
    // If tutor or admin, show their created quizzes
    else if (userRole === 'tutor' || userRole === 'admin') {
      query.createdBy = userId;
    }

    const quizzes = await Quiz.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json({ error: 'Failed to fetch quizzes' }, { status: 500 });
  }
}

// POST create a new quiz
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = session.user.role || 'student';
    if (userRole !== 'tutor' && userRole !== 'admin') {
      return NextResponse.json({ error: 'Only tutors and admins can create quizzes' }, { status: 403 });
    }

    const userId = session.user.id;
    const quizData = await request.json();

    await dbConnect();

    const quiz = new Quiz({
      ...quizData,
      createdBy: userId
    });

    await quiz.save();
    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 });
  }
} 