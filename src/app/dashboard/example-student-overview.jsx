import { useState } from 'react';
import { StudentOverviewModal } from '../dashboard/classrooms/[id]/page.jsx';
import Image from 'next/image';

export default function StudentOverviewExample() {
  const [showModal, setShowModal] = useState(false);
  
  // Mock student data
  const student = {
    id: 'student21',
    name: 'Student 21',
    email: 'student21@example.com',
    phone: '+1 (555) 123-4567',
    joinedDate: 'April 18, 2025',
    photoURL: '/images/student-profile.jpg',
    // Additional data for the overview
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Student Overview Modal Example</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <Image 
              src={student.photoURL}
              alt={student.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p className="text-gray-600">{student.email}</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View Student Overview
        </button>
      </div>
      
      {/* Render the StudentOverviewModal */}
      <StudentOverviewModal 
        student={student}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      
      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Usage Instructions</h2>
        <p className="mb-2">This example demonstrates how to use the StudentOverviewModal component:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Import the StudentOverviewModal component</li>
          <li>Prepare student data with performance metrics, attendance, and activity</li>
          <li>Create state to control modal visibility</li>
          <li>Render the modal with the appropriate props</li>
        </ol>
      </div>
    </div>
  );
} 