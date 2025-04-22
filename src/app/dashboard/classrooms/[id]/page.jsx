"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { 
  FaArrowLeft, 
  FaUserGraduate, 
  FaBook, 
  FaClipboardList, 
  FaPlus, 
  FaEllipsisH,
  FaUserPlus,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaIdBadge
} from 'react-icons/fa';

// Helper function for formatting dates
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Add DashboardOverview component to show when clicking View Overview
const DashboardOverview = ({ isOpen, onClose, classroom }) => {
  if (!isOpen || !classroom) return null;
  
  // Mock data for the dashboard overview
  const dashboardData = {
    activities: [
      { id: 1, title: 'Completed HTML Basics Assignment', date: '2023-10-15', type: 'assignment' },
      { id: 2, title: 'Submitted CSS Quiz', date: '2023-10-10', type: 'quiz' },
      { id: 3, title: 'Attended JavaScript Lecture', date: '2023-10-05', type: 'lecture' }
    ],
    upcomingEvents: [
      { id: 1, title: 'Responsive Design Workshop', date: '2023-10-25', time: '2:00 PM - 4:00 PM' },
      { id: 2, title: 'JavaScript Functions Quiz', date: '2023-10-22', time: '10:00 AM' },
      { id: 3, title: 'Group Project Deadline', date: '2023-11-05', time: '11:59 PM' }
    ],
    performanceMetrics: {
      assignments: { completed: 8, total: 10, grade: 87 },
      quizzes: { completed: 4, total: 5, grade: 92 },
      attendance: { present: 12, total: 15, percentage: 80 }
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="flex-shrink-0 w-full">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900" id="modal-title">
                      Dashboard Overview
                    </h3>
                    <p className="text-gray-500 mt-1">
                      View your activities, upcoming events, and performance metrics.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activities */}
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                      <h4 className="text-lg font-semibold text-blue-800">Recent Activities</h4>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {dashboardData.activities.map(activity => (
                          <div key={activity.id} className="flex items-start">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 
                              ${activity.type === 'assignment' ? 'bg-green-100 text-green-600' :
                               activity.type === 'quiz' ? 'bg-purple-100 text-purple-600' :
                               'bg-blue-100 text-blue-600'}`}>
                              {activity.type === 'assignment' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              ) : activity.type === 'quiz' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">{activity.title}</h5>
                              <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Upcoming Events */}
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
                      <h4 className="text-lg font-semibold text-green-800">Upcoming Events</h4>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {dashboardData.upcomingEvents.map(event => (
                          <div key={event.id} className="flex items-start">
                            <div className="flex-shrink-0 bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">{event.title}</h5>
                              <p className="text-sm text-gray-500">{formatDate(event.date)} • {event.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Performance Metrics */}
                <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="bg-purple-50 px-6 py-4 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-purple-800">Performance Metrics</h4>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Assignments */}
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-700">Assignments</h5>
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            {dashboardData.performanceMetrics.assignments.grade}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: `${(dashboardData.performanceMetrics.assignments.completed / dashboardData.performanceMetrics.assignments.total) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {dashboardData.performanceMetrics.assignments.completed} of {dashboardData.performanceMetrics.assignments.total} completed
                        </p>
                      </div>
                      
                      {/* Quizzes */}
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-700">Quizzes</h5>
                          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            {dashboardData.performanceMetrics.quizzes.grade}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div 
                            className="bg-purple-600 h-2.5 rounded-full" 
                            style={{ width: `${(dashboardData.performanceMetrics.quizzes.completed / dashboardData.performanceMetrics.quizzes.total) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {dashboardData.performanceMetrics.quizzes.completed} of {dashboardData.performanceMetrics.quizzes.total} completed
                        </p>
                      </div>
                      
                      {/* Attendance */}
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-700">Attendance</h5>
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            {dashboardData.performanceMetrics.attendance.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${(dashboardData.performanceMetrics.attendance.present / dashboardData.performanceMetrics.attendance.total) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {dashboardData.performanceMetrics.attendance.present} of {dashboardData.performanceMetrics.attendance.total} classes attended
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add StudentOverviewModal component
const StudentOverviewModal = ({ student, isOpen, onClose }) => {
  if (!isOpen || !student) return null;
  
  // Mock data for student overview
  const studentData = {
    performance: {
      gradeAverage: '87%',
      assignmentsCompleted: '15/18',
      quizzesCompleted: '7/8'
    },
    attendance: {
      present: 24,
      absent: 2,
      late: 4
    },
    recentActivity: [
      { date: '2023-10-15', action: 'Submitted HTML Basics assignment', grade: '92%' },
      { date: '2023-10-10', action: 'Completed CSS Quiz', grade: '85%' },
      { date: '2023-10-05', action: 'Viewed JavaScript lecture', grade: null }
    ]
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="flex-shrink-0 w-full">
                <div className="flex items-center mb-6">
                  <Image 
                    src={student.photoURL}
                    alt={student.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900" id="modal-title">
                      {student.name}
                    </h3>
                    <p className="text-gray-500">{student.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Summary */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3">Performance Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Grade Average:</span>
                        <span className="font-medium">{studentData.performance.gradeAverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Assignments Completed:</span>
                        <span className="font-medium">{studentData.performance.assignmentsCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quizzes Completed:</span>
                        <span className="font-medium">{studentData.performance.quizzesCompleted}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Attendance Statistics */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">Attendance Statistics</h4>
                    <div className="flex items-center mb-3">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-600 h-2.5 rounded-full" 
                          style={{ width: `${(studentData.attendance.present / (studentData.attendance.present + studentData.attendance.absent + studentData.attendance.late) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white p-2 rounded shadow-sm">
                        <div className="text-green-600 font-bold">{studentData.attendance.present}</div>
                        <div className="text-xs text-gray-500">Present</div>
                      </div>
                      <div className="bg-white p-2 rounded shadow-sm">
                        <div className="text-yellow-600 font-bold">{studentData.attendance.late}</div>
                        <div className="text-xs text-gray-500">Late</div>
                      </div>
                      <div className="bg-white p-2 rounded shadow-sm">
                        <div className="text-red-600 font-bold">{studentData.attendance.absent}</div>
                        <div className="text-xs text-gray-500">Absent</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activity Timeline */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Recent Activity</h4>
                  <div className="border-l-2 border-gray-200 pl-4 ml-3 space-y-4">
                    {studentData.recentActivity.map((activity, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-6 mt-1.5 w-4 h-4 rounded-full bg-teal-500"></div>
                        <div className="mb-1 text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</div>
                        <div className="flex justify-between items-center">
                          <p className="text-gray-700">{activity.action}</p>
                          {activity.grade && <span className="text-sm font-medium bg-green-100 text-green-800 py-0.5 px-2 rounded">{activity.grade}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update the StudentDetailModal to include the View Overview button 
const StudentDetailModal = ({ student, isOpen, onClose, onViewOverview }) => {
  if (!isOpen) return null;
  
  // Default avatar if no image URL is available
  const avatarUrl = student?.photoURL || "/images/default-avatar.png";
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex flex-col items-center">
              <div className="mb-4 w-32 h-32 rounded-full overflow-hidden bg-teal-100 flex items-center justify-center">
                <Image 
                  src={avatarUrl} 
                  alt={student?.name || "Student Profile"} 
                  width={128} 
                  height={128} 
                  className="object-cover w-full h-full"
                />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2" id="modal-title">
                {student?.name || "Student 21"}
              </h3>
              
              <div className="w-full space-y-3">
                <div className="flex items-center py-2 border-b border-gray-200">
                  <FaIdBadge className="text-teal-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="font-medium">{student?.id || "S2"}</p>
                  </div>
                </div>
                
                <div className="flex items-center py-2 border-b border-gray-200">
                  <FaEnvelope className="text-teal-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{student?.email || "student21@example.com"}</p>
                  </div>
                </div>
                
                <div className="flex items-center py-2 border-b border-gray-200">
                  <FaCalendarAlt className="text-teal-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Joined On</p>
                    <p className="font-medium">{student?.joinedDate || "April 18, 2025"}</p>
                  </div>
                </div>
                
                <div className="flex items-center py-2 border-b border-gray-200">
                  <FaPhone className="text-teal-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{student?.phone || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
            <button 
              type="button" 
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => toast.success("Message sent to student!")}
            >
              Send Message
            </button>
            <button 
              type="button" 
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-500 text-white text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onViewOverview}
            >
              View Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update the ConnectedStudentsPanel to match exactly what's seen in the image
const ConnectedStudentsPanel = ({ students, onSimulateJoin, onViewStudent, onViewDashboard }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <h3 className="text-blue-400 flex items-center font-medium">
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Connected Students
        </h3>
      </div>
      <div className="p-2">
        {students.length > 0 ? (
          <>
            <div className="space-y-2">
              {students.map(student => (
                <div 
                  key={student.id} 
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-700 cursor-pointer"
                  onClick={() => onViewStudent(student)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{student.initials || 'S2'}</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-white text-sm font-medium">{student.name || 'Student 21'}</p>
                      <p className="text-gray-400 text-xs">Joined: {student.joinedDate || '4/18/2025, 1:59:50 PM'}</p>
                      <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-sm inline-block mt-1">Online</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success(`Message sent to ${student.name || 'Student 21'}`);
                    }}
                    className="text-orange-500 bg-orange-500 bg-opacity-20 hover:bg-opacity-30 p-2 rounded-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-400 mb-4">No students connected</p>
          </div>
        )}
        <div className="mt-2">
          <button 
            onClick={onSimulateJoin}
            className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Simulate Student Join
          </button>
        </div>
      </div>
    </div>
  );
};

const ClassroomDetails = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [classroom, setClassroom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // State for modals
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showStudentOverview, setShowStudentOverview] = useState(false);
  const [showDashboardOverview, setShowDashboardOverview] = useState(false);
  const [connectedStudents, setConnectedStudents] = useState([]);

  useEffect(() => {
    // Simulate fetching classroom data
    const fetchClassroom = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock classroom data
        const mockClassroom = {
          id,
          name: 'Web Development 101',
          description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
          subject: 'Computer Science',
          gradeLevel: 'College/University',
          code: 'ABC123',
          createdAt: '2023-09-15T12:00:00Z',
          teacher: {
            id: 'teacher1',
            name: 'Professor Smith',
            email: 'prof.smith@example.edu'
          },
          students: [
            { id: 's1', name: 'Alice Johnson', email: 'alice@example.com', joinedAt: '2023-09-16T10:30:00Z', photoURL: '/images/avatar1.jpg' },
            { id: 's2', name: 'Bob Williams', email: 'bob@example.com', joinedAt: '2023-09-16T11:45:00Z', photoURL: '/images/avatar2.jpg' },
            { id: 's3', name: 'Charlie Davis', email: 'charlie@example.com', joinedAt: '2023-09-17T09:15:00Z', photoURL: '/images/avatar3.jpg' },
            { id: 's4', name: 'Diana Martinez', email: 'diana@example.com', joinedAt: '2023-09-18T14:20:00Z', photoURL: '/images/avatar4.jpg' }
          ],
          assignments: [
            { 
              id: 'a1', 
              title: 'HTML Basics', 
              description: 'Create a simple webpage using HTML5 semantic elements',
              dueDate: '2023-10-01T23:59:59Z',
              createdAt: '2023-09-18T15:00:00Z',
              status: 'active'
            },
            { 
              id: 'a2', 
              title: 'CSS Styling', 
              description: 'Style the HTML page created in the previous assignment using CSS',
              dueDate: '2023-10-08T23:59:59Z',
              createdAt: '2023-09-25T15:00:00Z',
              status: 'scheduled'
            }
          ],
          announcements: [
            {
              id: 'ann1',
              title: 'Welcome to Web Development 101',
              content: 'Welcome to the course! Please make sure to review the syllabus and introduce yourself in the discussion forum.',
              createdAt: '2023-09-15T14:30:00Z'
            },
            {
              id: 'ann2',
              title: 'Office Hours Schedule',
              content: 'Weekly office hours will be held on Tuesdays and Thursdays from 3-5pm in Room 302.',
              createdAt: '2023-09-16T09:15:00Z'
            }
          ]
        };
        
        setClassroom(mockClassroom);
        
        // Initialize with one simulated connected student
        const initialConnectedStudent = {
          id: 'student21',
          name: 'Student 21',
          email: 'student21@example.com',
          joinedAt: '2023-04-18T13:50:00Z',
          isOnline: true,
          initials: 'S2'
        };
        
        setConnectedStudents([initialConnectedStudent]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching classroom data:', error);
        toast.error('Failed to load classroom data');
        setIsLoading(false);
      }
    };

    fetchClassroom();
  }, [id]);
  
  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4">Loading classroom...</p>
        </div>
      </div>
    );
  }
  
  if (!classroom) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Classroom Not Found</h1>
        <p className="text-gray-600 mb-6">The classroom you're looking for doesn't exist or you don't have access to it.</p>
        <Link 
          href="/dashboard/classrooms"
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Return to My Classrooms
        </Link>
      </div>
    );
  }

  // Function to handle viewing a student
  const handleViewStudent = (student) => {
    // Make sure we display the initials for connected students
    const enhancedStudent = {
      ...student,
      // If the student doesn't have a photoURL, create one using their initials
      photoURL: student.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=0D8ABC&color=fff&size=128`,
      // Add a phone number if missing (just for display purposes)
      phone: student.phone || `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    
    setSelectedStudent(enhancedStudent);
    setShowStudentModal(true);
  };

  // Function to simulate a student joining
  const handleSimulateJoin = () => {
    // Create a random student number between 22-50
    const studentNum = Math.floor(Math.random() * 28) + 22;
    
    const newStudent = {
      id: `student${studentNum}`,
      name: `Student ${studentNum}`,
      email: `student${studentNum}@example.com`,
      joinedAt: new Date().toISOString(),
      isOnline: true,
      initials: 'S' + studentNum
    };
    
    setConnectedStudents(prev => [...prev, newStudent]);
    toast.success(`${newStudent.name} has joined the classroom!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/dashboard/classrooms"
          className="inline-flex items-center text-teal-600 hover:text-teal-700"
        >
          <FaArrowLeft className="mr-2" />
          Back to Classrooms
        </Link>
      </div>
      
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{classroom.name}</h1>
            <p className="text-gray-600 mt-1">{classroom.subject} · {classroom.gradeLevel}</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="relative inline-block">
              <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 inline-flex items-center">
                <FaEllipsisH className="mr-2" />
                Actions
              </button>
              {/* Dropdown menu could be added here */}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap space-x-4">
          <div className="bg-teal-50 text-teal-700 px-4 py-2 rounded-md inline-flex items-center">
            <span className="font-medium mr-2">Class Code:</span>
            <span className="font-mono">{classroom.code}</span>
          </div>
          
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-md inline-flex items-center">
            <FaUserGraduate className="mr-2" />
            <span>{classroom.students.length} Students</span>
          </div>
        </div>
      </header>
      
      <div className="md:flex md:space-x-8">
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                    activeTab === 'overview'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-500 hover:text-teal-600'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('students')}
                  className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                    activeTab === 'students'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-500 hover:text-teal-600'
                  }`}
                >
                  Students
                </button>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className={`px-6 py-4 font-medium text-sm focus:outline-none ${
                    activeTab === 'assignments'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-500 hover:text-teal-600'
                  }`}
                >
                  Assignments
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">About This Classroom</h2>
                    <p className="text-gray-700 mb-4">{classroom.description}</p>
                    <div className="text-sm text-gray-500">Created on {formatDate(classroom.createdAt)}</div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Recent Announcements</h2>
                      <button className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center">
                        <FaPlus className="mr-1" />
                        New Announcement
                      </button>
                    </div>
                    
                    {classroom.announcements.length > 0 ? (
                      <div className="space-y-4">
                        {classroom.announcements.map(announcement => (
                          <div key={announcement.id} className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-2">{announcement.title}</h3>
                            <p className="text-gray-700 text-sm mb-2">{announcement.content}</p>
                            <div className="text-xs text-gray-500">Posted on {formatDate(announcement.createdAt)}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No announcements yet</p>
                        <button className="mt-3 px-4 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700">
                          Create First Announcement
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Upcoming Assignments</h2>
                      <Link 
                        href={`/dashboard/classrooms/${id}/assignments`} 
                        className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                      >
                        View All
                      </Link>
                    </div>
                    
                    {classroom.assignments.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Assignment
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Due Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {classroom.assignments.map(assignment => (
                              <tr key={assignment.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                                  <div className="text-sm text-gray-500">{assignment.description.substring(0, 60)}...</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDate(assignment.dueDate)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${assignment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {assignment.status === 'active' ? 'Active' : 'Scheduled'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No assignments yet</p>
                        <button className="mt-3 px-4 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700">
                          Create First Assignment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'students' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Students ({classroom.students.length})</h2>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 inline-flex items-center text-sm">
                      <FaUserPlus className="mr-2" />
                      Invite Students
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Joined
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {classroom.students.map(student => (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                                  <span className="text-teal-800 font-medium text-sm">
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(student.joinedAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button 
                                onClick={() => handleViewStudent(student)} 
                                className="text-teal-600 hover:text-teal-900"
                              >
                                View
                              </button>
                              <span className="mx-2 text-gray-300">|</span>
                              <button className="text-red-600 hover:text-red-900">Remove</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'assignments' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Assignments</h2>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 inline-flex items-center text-sm">
                      <FaPlus className="mr-2" />
                      Create Assignment
                    </button>
                  </div>
                  
                  {classroom.assignments.length > 0 ? (
                    <div className="space-y-6">
                      {classroom.assignments.map(assignment => (
                        <div key={assignment.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{assignment.title}</h3>
                                <p className="text-gray-600 mb-4">{assignment.description}</p>
                                <div className="flex items-center text-sm text-gray-500">
                                  <span className="mr-4">Due: {formatDate(assignment.dueDate)}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                                    ${assignment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {assignment.status === 'active' ? 'Active' : 'Scheduled'}
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button className="p-2 text-gray-500 hover:text-teal-600 focus:outline-none">
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                </button>
                                <button className="p-2 text-gray-500 hover:text-red-600 focus:outline-none">
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              Created on {formatDate(assignment.createdAt)}
                            </div>
                            <Link
                              href={`/dashboard/classrooms/${id}/assignments/${assignment.id}`}
                              className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <FaBook className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No Assignments Yet</h3>
                      <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Create your first assignment to start engaging your students with learning materials and activities.
                      </p>
                      <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                        Create First Assignment
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="md:w-1/4 space-y-6">
          <ConnectedStudentsPanel 
            students={connectedStudents}
            onSimulateJoin={handleSimulateJoin}
            onViewStudent={handleViewStudent}
            onViewDashboard={() => {
              setShowStudentModal(false);
              setShowDashboardOverview(true);
            }}
          />
          
          {/* Additional sidebar components can go here */}
        </div>
      </div>
      
      {/* Student detail modal */}
      <StudentDetailModal 
        student={selectedStudent} 
        isOpen={showStudentModal} 
        onClose={() => setShowStudentModal(false)}
        onViewOverview={() => {
          setShowStudentModal(false);
          setShowStudentOverview(true);
        }}
      />
      
      {/* Student overview modal */}
      <StudentOverviewModal
        student={selectedStudent}
        isOpen={showStudentOverview}
        onClose={() => setShowStudentOverview(false)}
      />
      
      {/* Dashboard overview modal */}
      <DashboardOverview
        isOpen={showDashboardOverview}
        onClose={() => setShowDashboardOverview(false)}
        classroom={classroom}
      />
    </div>
  );
};

export default ClassroomDetails; 