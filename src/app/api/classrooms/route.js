import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Classroom from '@/models/Classroom';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// GET all classrooms (filtered by user role)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const userRole = session.user.role || 'student';

    await dbConnect();

    let classrooms;
    
    if (userRole === 'admin') {
      // Admins can see all classrooms
      classrooms = await Classroom.find().sort({ createdAt: -1 });
    } else if (userRole === 'tutor') {
      // Tutors can see classrooms they created or are part of
      classrooms = await Classroom.find({
        $or: [
          { createdBy: userId },
          { tutors: userId }
        ]
      }).sort({ createdAt: -1 });
    } else {
      // Students can only see classrooms they are enrolled in
      classrooms = await Classroom.find({
        students: userId,
        isActive: true
      }).sort({ createdAt: -1 });
    }
    
    return NextResponse.json(classrooms);
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    return NextResponse.json({ error: 'Failed to fetch classrooms' }, { status: 500 });
  }
}

// POST create a new classroom
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = session.user.role || 'student';
    if (userRole !== 'tutor' && userRole !== 'admin') {
      return NextResponse.json({ error: 'Only tutors and admins can create classrooms' }, { status: 403 });
    }

    const userId = session.user.id;
    const data = await request.json();

    await dbConnect();

    const classroom = new Classroom({
      ...data,
      createdBy: userId,
      tutors: [userId] // Add creator as a tutor
    });

    await classroom.save();
    return NextResponse.json(classroom, { status: 201 });
  } catch (error) {
    console.error('Error creating classroom:', error);
    return NextResponse.json({ error: 'Failed to create classroom' }, { status: 500 });
  }
}

// PUT update a classroom
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const data = await request.json();
    const { classroomId, ...updateData } = data;

    await dbConnect();
    
    // Find the classroom and validate ownership
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return NextResponse.json({ error: 'Classroom not found' }, { status: 404 });
    }
    
    // Only creator, tutors, or admins can update
    const userRole = session.user.role || 'student';
    const isTutor = classroom.tutors.some(tutor => tutor.toString() === userId);
    const isCreator = classroom.createdBy.toString() === userId;
    
    if (!isCreator && !isTutor && userRole !== 'admin') {
      return NextResponse.json({ error: 'You do not have permission to update this classroom' }, { status: 403 });
    }

    // Apply updates
    Object.keys(updateData).forEach(key => {
      classroom[key] = updateData[key];
    });

    await classroom.save();
    return NextResponse.json(classroom);
  } catch (error) {
    console.error('Error updating classroom:', error);
    return NextResponse.json({ error: 'Failed to update classroom' }, { status: 500 });
  }
} 