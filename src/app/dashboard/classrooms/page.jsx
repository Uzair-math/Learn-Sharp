"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { FaChalkboardTeacher, FaPlus, FaUserGraduate, FaLink } from 'react-icons/fa';

const ClassroomDashboard = () => {
  const { user, loading } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [loadingClassrooms, setLoadingClassrooms] = useState(true);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockClassrooms = [
          {
            id: '1',
            name: 'Advanced Mathematics',
            description: 'Calculus and advanced algebra concepts',
            subject: 'mathematics',
            createdAt: new Date('2023-05-15'),
            totalStudents: 28,
            code: 'MATH456',
            role: 'teacher'
          },
          {
            id: '2',
            name: 'Introduction to Biology',
            description: 'Fundamentals of cellular biology and genetics',
            subject: 'science',
            createdAt: new Date('2023-04-10'),
            totalStudents: 32,
            code: 'BIO101',
            role: 'student'
          },
          {
            id: '3',
            name: 'World History',
            description: 'Ancient civilizations through modern era',
            subject: 'history',
            createdAt: new Date('2023-06-01'),
            totalStudents: 25,
            code: 'HIST202',
            role: 'student'
          }
        ];
        
        setClassrooms(mockClassrooms);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      } finally {
        setLoadingClassrooms(false);
      }
    };

    if (!loading) {
      fetchClassrooms();
    }
  }, [loading]);

  if (loading || loadingClassrooms) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4">Loading classrooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-teal-700">My Classrooms</h1>
          <p className="text-gray-600 mt-2">Manage your virtual learning spaces</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard/classrooms/create"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center justify-center"
          >
            <FaPlus className="mr-2" />
            Create Classroom
          </Link>
          
          <Link
            href="/dashboard/classrooms/join"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
          >
            <FaLink className="mr-2" />
            Join Classroom
          </Link>
        </div>
      </header>
      
      {classrooms.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaChalkboardTeacher className="text-4xl text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Classrooms Yet</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            You haven't created or joined any classrooms yet. Get started by creating a new classroom or joining one with a code.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard/classrooms/create"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center"
            >
              <FaPlus className="mr-2" />
              Create Classroom
            </Link>
            <Link
              href="/dashboard/classrooms/join"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
            >
              <FaLink className="mr-2" />
              Join with Code
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map(classroom => (
            <div key={classroom.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className={`h-3 ${classroom.role === 'teacher' ? 'bg-teal-500' : 'bg-blue-500'}`}></div>
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">{classroom.name}</h2>
                  <span 
                    className={`px-2 py-1 text-xs rounded-full ${
                      classroom.role === 'teacher' 
                        ? 'bg-teal-100 text-teal-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {classroom.role === 'teacher' ? 'Teacher' : 'Student'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{classroom.description}</p>
                
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <FaUserGraduate className="mr-2" />
                  <span>{classroom.totalStudents} student{classroom.totalStudents !== 1 ? 's' : ''}</span>
                </div>
                
                {classroom.role === 'teacher' && (
                  <div className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
                    <span className="font-medium">Class Code:</span> {classroom.code}
                  </div>
                )}
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <Link 
                  href={`/dashboard/classrooms/${classroom.id}`}
                  className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 inline-block text-center"
                >
                  Enter Classroom
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassroomDashboard; 