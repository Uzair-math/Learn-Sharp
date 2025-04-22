"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { FaVideo } from 'react-icons/fa';

const CreateClassroom = () => {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();
  
  const [classroomData, setClassroomData] = useState({
    name: '',
    description: '',
    endDate: '',
    meetLink: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  
  // If not a tutor, redirect to dashboard
  if (!loading && userRole !== 'tutor' && userRole !== 'admin') {
    router.push('/dashboard');
    return null;
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassroomData({
      ...classroomData,
      [name]: value
    });
  };
  
  const createClassroom = async () => {
    // Validate classroom
    if (!classroomData.name.trim()) {
      toast.error('Classroom name cannot be empty');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/classrooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(classroomData)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create classroom');
      }
      
      const classroom = await response.json();
      toast.success('Classroom created successfully!');
      router.push('/dashboard/tutor/classrooms');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Create New Virtual Classroom</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Classroom Name</label>
          <input
            type="text"
            name="name"
            value={classroomData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter classroom name"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={classroomData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="3"
            placeholder="Enter classroom description"
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">End Date (optional)</label>
          <input
            type="date"
            name="endDate"
            value={classroomData.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <p className="text-sm text-gray-500 mt-1">
            After this date, the classroom will be archived.
          </p>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            <FaVideo className="inline mr-2" />
            Google Meet Link (optional)
          </label>
          <input
            type="url"
            name="meetLink"
            value={classroomData.meetLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., https://meet.google.com/abc-defg-hij"
          />
          <p className="text-sm text-gray-500 mt-1">
            Add a Google Meet link for virtual classroom sessions
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium text-blue-700 mb-2">How invitation works:</h3>
          <ul className="list-disc pl-5 text-blue-800">
            <li className="mb-1">
              After creating the classroom, you'll receive a unique invitation code
            </li>
            <li className="mb-1">
              Share this code or the direct link with your students
            </li>
            <li className="mb-1">
              Students can join your classroom using the code or link
            </li>
            <li>
              You can regenerate a new code anytime if needed
            </li>
          </ul>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 border border-gray-300 rounded-md mr-2 hover:bg-gray-50"
        >
          Cancel
        </button>
        
        <button
          type="button"
          onClick={createClassroom}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          disabled={submitting}
        >
          {submitting ? 'Creating...' : 'Create Classroom'}
        </button>
      </div>
    </div>
  );
};

export default CreateClassroom; 