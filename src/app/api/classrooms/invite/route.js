import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Classroom from '@/models/Classroom';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET classroom by invite code (for students to join)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const inviteCode = searchParams.get('code');
    
    if (!inviteCode) {
      return NextResponse.json({ error: 'Invite code is required' }, { status: 400 });
    }

    await dbConnect();

    // Find classroom by invite code
    const classroom = await Classroom.findOne({ 
      inviteCode,
      isActive: true
    });
    
    if (!classroom) {
      return NextResponse.json({ error: 'Invalid or expired invite code' }, { status: 404 });
    }
    
    return NextResponse.json({
      id: classroom._id,
      name: classroom.name,
      description: classroom.description
    });
  } catch (error) {
    console.error('Error fetching classroom by invite code:', error);
    return NextResponse.json({ error: 'Failed to fetch classroom' }, { status: 500 });
  }
}

// POST join a classroom with invite code
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const data = await request.json();
    const { inviteCode } = data;
    
    if (!inviteCode) {
      return NextResponse.json({ error: 'Invite code is required' }, { status: 400 });
    }

    await dbConnect();

    // Find classroom by invite code
    const classroom = await Classroom.findOne({ 
      inviteCode,
      isActive: true
    });
    
    if (!classroom) {
      return NextResponse.json({ error: 'Invalid or expired invite code' }, { status: 404 });
    }
    
    // Check if user is already in the classroom
    if (classroom.students.includes(userId)) {
      return NextResponse.json({ error: 'You are already a member of this classroom' }, { status: 400 });
    }
    
    // Add student to classroom
    classroom.students.push(userId);
    await classroom.save();
    
    return NextResponse.json({ message: 'Successfully joined classroom', classroomId: classroom._id });
  } catch (error) {
    console.error('Error joining classroom:', error);
    return NextResponse.json({ error: 'Failed to join classroom' }, { status: 500 });
  }
}

// PUT generate a new invite code (for tutors)
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const userRole = session.user.role || 'student';
    
    if (userRole !== 'tutor' && userRole !== 'admin') {
      return NextResponse.json({ error: 'Only tutors and admins can refresh invite codes' }, { status: 403 });
    }

    const data = await request.json();
    const { classroomId } = data;
    
    if (!classroomId) {
      return NextResponse.json({ error: 'Classroom ID is required' }, { status: 400 });
    }

    await dbConnect();

    // Find classroom and validate ownership
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return NextResponse.json({ error: 'Classroom not found' }, { status: 404 });
    }
    
    const isCreator = classroom.createdBy.toString() === userId;
    const isTutor = classroom.tutors.some(tutor => tutor.toString() === userId);
    
    if (!isCreator && !isTutor && userRole !== 'admin') {
      return NextResponse.json({ error: 'You do not have permission to update this classroom' }, { status: 403 });
    }
    
    // Generate new invite code
    await classroom.refreshInviteCode();
    
    return NextResponse.json({ 
      inviteCode: classroom.inviteCode,
      message: 'Invite code refreshed successfully'
    });
  } catch (error) {
    console.error('Error refreshing invite code:', error);
    return NextResponse.json({ error: 'Failed to refresh invite code' }, { status: 500 });
  }
} 