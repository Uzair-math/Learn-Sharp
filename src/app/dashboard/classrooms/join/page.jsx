"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { FaChalkboardTeacher, FaArrowLeft } from 'react-icons/fa';

const JoinClassroom = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [classCode, setClassCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!classCode.trim()) {
      toast.error('Please enter a class code');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll accept any code format and simulate success
      toast.success('Successfully joined the classroom!');
      
      // Redirect to classrooms page
      setTimeout(() => {
        router.push('/dashboard/classrooms');
      }, 1000);
    } catch (error) {
      console.error('Error joining classroom:', error);
      toast.error('Failed to join classroom. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link 
        href="/dashboard/classrooms"
        className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to Classrooms
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Left section - Form */}
          <div className="md:w-1/2 p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Join a Classroom</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="classCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Class Code
                </label>
                <input
                  id="classCode"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Example: ABC123"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Class codes are typically 6-8 characters and are case-sensitive
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join Classroom'}
              </button>
            </form>
          </div>
          
          {/* Right section - Info */}
          <div className="md:w-1/2 bg-teal-50 p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="bg-teal-100 rounded-full p-3 mr-4">
                <FaChalkboardTeacher className="text-teal-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold text-teal-700">How to Join</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Get the Code</h3>
                <p className="text-gray-600">
                  Ask your teacher for the class code. This is a unique identifier for your classroom.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Enter it Above</h3>
                <p className="text-gray-600">
                  Type the code exactly as provided by your teacher. Codes are case-sensitive.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Start Learning</h3>
                <p className="text-gray-600">
                  Once joined, you'll have access to all classroom materials and activities.
                </p>
              </div>
              
              <div className="pt-4 border-t border-teal-100 mt-6">
                <p className="text-sm text-teal-700">
                  If you're having trouble joining a classroom, make sure you've typed the code correctly and contact your teacher for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinClassroom; 