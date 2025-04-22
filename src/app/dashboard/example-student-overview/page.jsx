"use client"

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function DashboardOverviewExample() {
  const [showModal, setShowModal] = useState(false);
  
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

  // Helper function for formatting dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview Example</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            <p className="text-gray-500 mt-1">
              View your activities, upcoming events, and performance metrics.
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View Overview
        </button>
      </div>
      
      {/* Dashboard overview modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
              <div className="absolute right-4 top-4">
                <button
                  onClick={() => setShowModal(false)}
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
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">About This Example</h2>
        <p className="mb-4">
          This example demonstrates a dashboard overview modal that displays:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Recent activities showing completed assignments, quizzes, and lectures</li>
          <li>Upcoming events with dates and times</li>
          <li>Performance metrics with visual indicators for assignments, quizzes, and attendance</li>
        </ul>
        <p>
          Click the "View Overview" button above to see the modal in action.
        </p>
      </div>
    </div>
  );
} 