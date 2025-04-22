import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Create a new quiz - without requiring actual MongoDB connection
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Instead of saving to MongoDB, we'll mock a successful response
    console.log("Creating quiz with data:", body);
    
    // Create a mock quiz object with an ID
    const mockQuiz = {
      _id: new mongoose.Types.ObjectId().toString(),
      title: body.category || "General Quiz",
      description: `${body.difficulty} difficulty quiz with ${body.questionCount} questions`,
      createdBy: "mock-user-id",
      timeLimit: (body.hours * 60) + (body.minutes) + (body.seconds / 60),
      questions: Array(Number(body.questionCount)).fill().map((_, i) => ({
        questionText: `Sample Question ${i + 1}`,
        questionType: 'multipleChoice',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        points: 1
      })),
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json({ 
      success: true, 
      message: "Quiz created successfully", 
      data: mockQuiz 
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create quiz", error: error.message },
      { status: 500 }
    );
  }
}

// Get all quizzes - without requiring MongoDB connection
export async function GET() {
  try {
    // Return mock quizzes instead of querying MongoDB
    const mockQuizzes = [
      {
        _id: new mongoose.Types.ObjectId().toString(),
        title: "Science: Computers",
        description: "Medium difficulty quiz with 10 questions",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: new mongoose.Types.ObjectId().toString(),
        title: "Entertainment: Books",
        description: "Easy difficulty quiz with 5 questions",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    return NextResponse.json({ 
      success: true, 
      data: mockQuizzes 
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch quizzes" },
      { status: 500 }
    );
  }
} 