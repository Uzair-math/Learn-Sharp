"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { 
  FaArrowLeft, 
  FaDownload, 
  FaCheckCircle,
  FaSave,
  FaExclamationTriangle,
  FaComments,
  FaPaperclip
} from 'react-icons/fa';

const SubmissionView = ({ params }) => {
  const { id: classroomId, assignmentId, submissionId } = params;
  const router = useRouter();
  const { user, loading } = useAuth();
  const [submission, setSubmission] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simulate fetching submission data
    const fetchSubmissionData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock assignment data
        const mockAssignment = {
          id: assignmentId,
          title: 'HTML Basics',
          description: 'Create a simple webpage using HTML5 semantic elements.',
          dueDate: '2023-10-01T23:59:59Z',
          points: 100
        };
        
        // Mock submission data
        const mockSubmission = {
          id: submissionId,
          studentId: 'student1',
          studentName: 'Alice Johnson',
          submittedAt: '2023-09-25T14:32:00Z',
          status: 'submitted',
          grade: 0, // No grade yet
          files: [
            { 
              id: 'f1',
              name: 'index.html', 
              size: '4.2 KB', 
              url: '#',
              content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First HTML5 Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      color: #333;
    }
    header {
      background-color: #4CAF50;
      color: white;
      padding: 1rem;
      text-align: center;
    }
    nav {
      background-color: #333;
      color: white;
      display: flex;
      justify-content: space-around;
      padding: 0.5rem;
    }
    nav a {
      color: white;
      text-decoration: none;
    }
    main {
      padding: 1rem;
    }
    section {
      margin-bottom: 2rem;
    }
    footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 1rem;
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  </style>
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <p>A simple demonstration of HTML5 semantic elements</p>
  </header>

  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
  </nav>

  <main>
    <section id="about">
      <h2>About Us</h2>
      <p>We are a company dedicated to creating amazing web experiences.</p>
    </section>

    <section id="services">
      <h2>Our Services</h2>
      <ul>
        <li>Web Design</li>
        <li>Web Development</li>
        <li>SEO</li>
      </ul>
    </section>
  </main>

  <footer>
    <p>Contact us at: info@example.com | Phone: (123) 456-7890</p>
    <p>&copy; 2023 My Company. All rights reserved.</p>
  </footer>
</body>
</html>`
            }
          ],
          feedback: '',
          comments: [
            {
              id: 'c1',
              author: 'David Lee',
              authorRole: 'teacher',
              createdAt: '2023-09-25T15:30:00Z',
              content: 'I like how you structured your HTML. Good use of semantic elements!'
            }
          ]
        };
        
        setAssignment(mockAssignment);
        setSubmission(mockSubmission);
        setFeedback(mockSubmission.feedback || '');
      } catch (error) {
        console.error('Error fetching submission data:', error);
        toast.error('Failed to load submission data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubmissionData();
  }, [assignmentId, submissionId, classroomId]);

  const handleSaveGrade = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const gradeValue = parseInt(grade);
      if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > assignment.points) {
        toast.error(`Please enter a valid grade between 0 and ${assignment.points}`);
        return;
      }
      
      // Update submission with new grade and feedback
      setSubmission(prev => ({
        ...prev,
        grade: gradeValue,
        feedback,
        status: 'graded'
      }));
      
      toast.success('Grade saved successfully');
    } catch (error) {
      console.error('Error saving grade:', error);
      toast.error('Failed to save grade');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddComment = async (comment) => {
    if (!comment.trim()) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newComment = {
        id: `c${submission.comments.length + 1}`,
        author: 'David Lee', // Use the actual teacher name
        authorRole: 'teacher',
        createdAt: new Date().toISOString(),
        content: comment
      };
      
      setSubmission(prev => ({
        ...prev,
        comments: [...prev.comments, newComment]
      }));
      
      // Clear the comment input field
      document.getElementById('commentInput').value = '';
      
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4">Loading submission details...</p>
        </div>
      </div>
    );
  }
  
  if (!submission || !assignment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Submission Not Found</h1>
        <p className="text-gray-600 mb-6">The submission you're looking for doesn't exist or you don't have access to it.</p>
        <Link 
          href={`/dashboard/classrooms/${classroomId}/assignments/${assignmentId}`}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Return to Assignment
        </Link>
      </div>
    );
  }

  // Check if submission was late
  const isLate = new Date(submission.submittedAt) > new Date(assignment.dueDate);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href={`/dashboard/classrooms/${classroomId}/assignments/${assignmentId}`}
          className="inline-flex items-center text-teal-600 hover:text-teal-700"
        >
          <FaArrowLeft className="mr-2" />
          Back to Assignment
        </Link>
      </div>
      
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{assignment.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-800 font-medium text-sm">
                  {submission.studentName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-medium text-gray-900">{submission.studentName}'s Submission</h2>
                <p className="text-sm text-gray-500 flex items-center">
                  Submitted: {formatDate(submission.submittedAt)}
                  {isLate && (
                    <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center">
                      <FaExclamationTriangle className="mr-1" />
                      Late
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="bg-white border border-gray-300 rounded-md p-4 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Grading</h3>
              <div className="mb-4">
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                  Score (out of {assignment.points})
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="grade"
                    min="0"
                    max={assignment.points}
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="Enter grade"
                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  <span className="ml-2 text-gray-500">/ {assignment.points}</span>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  rows="3"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide feedback for the student"
                  className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <button
                onClick={handleSaveGrade}
                disabled={isSaving}
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 inline-flex items-center justify-center"
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Save Grade
                  </>
                )}
              </button>
              {submission.status === 'graded' && submission.grade !== undefined && (
                <div className="mt-3 text-center text-sm text-green-600 flex items-center justify-center">
                  <FaCheckCircle className="mr-1" />
                  Grade saved: {submission.grade} / {assignment.points}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Submission Files</h2>
            </div>
            
            <div className="p-6">
              {submission.files && submission.files.length > 0 ? (
                <div className="space-y-4">
                  {submission.files.map(file => (
                    <div key={file.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center">
                          <FaPaperclip className="text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{file.name}</span>
                          {file.size && (
                            <span className="ml-2 text-xs text-gray-500">({file.size})</span>
                          )}
                        </div>
                        <a
                          href={file.url}
                          className="text-teal-600 hover:text-teal-900 text-sm font-medium flex items-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaDownload className="mr-1" />
                          Download
                        </a>
                      </div>
                      
                      {/* File content preview for HTML files */}
                      {file.content && file.name.endsWith('.html') && (
                        <div className="px-4 py-3">
                          <div className="mb-2 flex justify-between items-center">
                            <h3 className="text-sm font-medium text-gray-700">File Preview:</h3>
                          </div>
                          <div className="rounded-lg border border-gray-300 overflow-hidden">
                            <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center">
                              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                              <span className="text-xs text-gray-600 ml-2">{file.name}</span>
                            </div>
                            <pre className="text-xs p-4 overflow-x-auto bg-gray-800 text-gray-100">{file.content}</pre>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No files were submitted</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900">Comments</h2>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label htmlFor="commentInput" className="sr-only">Add a comment</label>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center">
                      <span className="text-white font-medium text-xs">
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'T'}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="relative">
                      <textarea
                        id="commentInput"
                        rows="3"
                        placeholder="Add a comment..."
                        className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => handleAddComment(document.getElementById('commentInput').value)}
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 inline-flex items-center text-sm"
                      >
                        <FaComments className="mr-2" />
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 mt-6">
                {submission.comments && submission.comments.length > 0 ? (
                  submission.comments.map(comment => (
                    <div key={comment.id} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          comment.authorRole === 'teacher' ? 'bg-teal-600' : 'bg-blue-600'
                        }`}>
                          <span className="text-white font-medium text-xs">
                            {comment.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          <span className="text-gray-500 ml-2">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-700 whitespace-pre-line">
                          {comment.content}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No comments yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionView; 