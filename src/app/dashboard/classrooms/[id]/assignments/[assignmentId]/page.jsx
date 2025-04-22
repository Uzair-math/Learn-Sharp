"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { 
  FaArrowLeft, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaUserGraduate, 
  FaEye, 
  FaDownload,
  FaEdit,
  FaTrash,
  FaPlus,
  FaExclamationTriangle
} from 'react-icons/fa';

const AssignmentDetails = ({ params }) => {
  const { id: classroomId, assignmentId } = params;
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('details');
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching assignment data
    const fetchAssignmentData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock assignment data
        const mockAssignment = {
          id: assignmentId,
          title: 'HTML Basics',
          description: 'Create a simple webpage using HTML5 semantic elements. Your page should include:\n- Proper DOCTYPE and HTML structure\n- At least 5 different semantic elements\n- A navigation bar\n- A main content area with at least 2 sections\n- A footer with contact information',
          dueDate: '2023-10-01T23:59:59Z',
          createdAt: '2023-09-18T15:00:00Z',
          status: 'active',
          points: 100,
          resources: [
            {
              id: 'r1',
              name: 'HTML5 Guide.pdf',
              type: 'pdf',
              url: '#',
              size: '2.4 MB'
            },
            {
              id: 'r2',
              name: 'Example Project',
              type: 'link',
              url: 'https://example.com/project',
            }
          ],
          classroomId,
          classroom: {
            name: 'Web Development 101',
            studentsCount: 24
          }
        };

        // Mock submissions data
        const mockSubmissions = [
          {
            id: 's1',
            studentId: 'student1',
            studentName: 'Alice Johnson',
            submittedAt: '2023-09-25T14:32:00Z',
            status: 'submitted',
            grade: 92,
            files: [
              { name: 'index.html', size: '4.2 KB', url: '#' }
            ],
            feedback: 'Great work! Your HTML structure is excellent and you used semantic elements correctly.'
          },
          {
            id: 's2',
            studentId: 'student2',
            studentName: 'Bob Williams',
            submittedAt: '2023-09-23T10:15:00Z',
            status: 'graded',
            grade: 88,
            files: [
              { name: 'index.html', size: '3.8 KB', url: '#' }
            ],
            feedback: 'Good job overall. You could improve your navigation implementation.'
          },
          {
            id: 's3',
            studentId: 'student3',
            studentName: 'Charlie Davis',
            status: 'late',
            submittedAt: '2023-10-02T09:45:00Z',
            grade: 75,
            files: [
              { name: 'index.html', size: '2.9 KB', url: '#' }
            ],
            feedback: 'Submission was late. Content is good but some semantic elements are misused.'
          },
          {
            id: 's4',
            studentId: 'student4',
            studentName: 'Diana Martinez',
            status: 'not_submitted',
          }
        ];
        
        setAssignment(mockAssignment);
        setSubmissions(mockSubmissions);
      } catch (error) {
        console.error('Error fetching assignment data:', error);
        toast.error('Failed to load assignment data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAssignmentData();
  }, [assignmentId, classroomId]);
  
  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4">Loading assignment details...</p>
        </div>
      </div>
    );
  }
  
  if (!assignment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Assignment Not Found</h1>
        <p className="text-gray-600 mb-6">The assignment you're looking for doesn't exist or you don't have access to it.</p>
        <Link 
          href={`/dashboard/classrooms/${classroomId}`}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Return to Classroom
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getSubmissionStatusBadge = (status) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center">
            <FaCheckCircle className="mr-1" />
            Submitted
          </span>
        );
      case 'graded':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex items-center">
            <FaCheckCircle className="mr-1" />
            Graded
          </span>
        );
      case 'late':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center">
            <FaExclamationTriangle className="mr-1" />
            Late
          </span>
        );
      case 'not_submitted':
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center">
            <FaTimesCircle className="mr-1" />
            Not Submitted
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href={`/dashboard/classrooms/${classroomId}`}
          className="inline-flex items-center text-teal-600 hover:text-teal-700"
        >
          <FaArrowLeft className="mr-2" />
          Back to {assignment.classroom.name}
        </Link>
      </div>
      
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{assignment.title}</h1>
            <p className="text-gray-600 mt-1">
              Due: {formatDate(assignment.dueDate)} • {assignment.points} points
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 space-x-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 inline-flex items-center">
              <FaEdit className="mr-2" />
              Edit
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 inline-flex items-center">
              <FaTrash className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      </header>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                activeTab === 'details'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-teal-600'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                activeTab === 'submissions'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-teal-600'
              }`}
            >
              Submissions ({submissions.length})
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'details' && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Assignment Description</h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="whitespace-pre-line">{assignment.description}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Resources</h2>
                {assignment.resources.length > 0 ? (
                  <div className="space-y-4">
                    {assignment.resources.map(resource => (
                      <div key={resource.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {resource.type === 'pdf' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            )}
                          </svg>
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{resource.name}</h3>
                          {resource.size && <p className="text-sm text-gray-500">{resource.size}</p>}
                        </div>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 flex-shrink-0 p-2 text-teal-600 hover:text-teal-700 rounded-full hover:bg-teal-50"
                        >
                          {resource.type === 'pdf' ? <FaDownload /> : <FaEye />}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No resources attached to this assignment</p>
                  </div>
                )}
                
                <div className="mt-4">
                  <button className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm">
                    <FaPlus className="mr-2" />
                    Add Resource
                  </button>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Submission Status</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-gray-700">
                        <span className="font-medium">Students:</span> {assignment.classroom.studentsCount}
                      </p>
                      <p className="text-gray-700 mt-1">
                        <span className="font-medium">Submitted:</span> {submissions.filter(s => s.status !== 'not_submitted').length} / {assignment.classroom.studentsCount}
                      </p>
                    </div>
                    
                    <div className="mt-4 sm:mt-0">
                      <button 
                        onClick={() => setActiveTab('submissions')}
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 inline-flex items-center"
                      >
                        <FaUserGraduate className="mr-2" />
                        View All Submissions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'submissions' && (
            <div>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Student Submissions</h2>
                {/* Filter or search could go here */}
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map(submission => (
                      <tr key={submission.id || submission.studentId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                              <span className="text-teal-800 font-medium text-sm">
                                {submission.studentName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getSubmissionStatusBadge(submission.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {submission.submittedAt ? formatDate(submission.submittedAt) : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {submission.grade !== undefined ? (
                            <div className="text-sm text-gray-900">
                              {submission.grade} / {assignment.points}
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-teal-600 h-2 rounded-full" 
                                  style={{ width: `${(submission.grade / assignment.points) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {submission.status !== 'not_submitted' ? (
                            <Link
                              href={`/dashboard/classrooms/${classroomId}/assignments/${assignmentId}/submissions/${submission.id}`}
                              className="text-teal-600 hover:text-teal-900"
                            >
                              {submission.status === 'graded' ? 'Review' : 'Grade'}
                            </Link>
                          ) : (
                            <button className="text-gray-400 cursor-not-allowed">
                              No Submission
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails; 