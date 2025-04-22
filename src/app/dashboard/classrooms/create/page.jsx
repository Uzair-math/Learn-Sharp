"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { FaChalkboardTeacher, FaArrowLeft, FaCopy, FaVideo } from 'react-icons/fa';

const CreateClassroom = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subject: '',
    gradeLevel: '',
    meetLink: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Classroom name is required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random class code
      const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      setClassCode(generatedCode);
      
      // Save the meetLink value
      setMeetLink(formData.meetLink);
      
      toast.success('Classroom created successfully!');
      setShowSuccess(true);
    } catch (error) {
      console.error('Error creating classroom:', error);
      toast.error('Failed to create classroom. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(classCode)
      .then(() => {
        toast.success('Class code copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy code');
      });
  };

  const copyMeetLinkToClipboard = () => {
    navigator.clipboard.writeText(meetLink)
      .then(() => {
        toast.success('Google Meet link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };

  const goToClassrooms = () => {
    router.push('/dashboard/classrooms');
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
        {!showSuccess ? (
          <div className="md:flex">
            {/* Left section - Form */}
            <div className="md:w-2/3 p-6 md:p-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Create a New Classroom</h1>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Classroom Name*
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., Web Development 101"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                
                <div className="mb-5">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Briefly describe this classroom"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                
                <div className="md:flex space-y-5 md:space-y-0 md:space-x-4 mb-5">
                  <div className="md:w-1/2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      <option value="">Select a subject</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="science">Science</option>
                      <option value="language">Language Arts</option>
                      <option value="history">History</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="physical-education">Physical Education</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="md:w-1/2">
                    <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 mb-2">
                      Grade Level
                    </label>
                    <select
                      id="gradeLevel"
                      name="gradeLevel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={formData.gradeLevel}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      <option value="">Select a grade level</option>
                      <option value="elementary">Elementary School</option>
                      <option value="middle">Middle School</option>
                      <option value="high">High School</option>
                      <option value="college">College/University</option>
                      <option value="professional">Professional Development</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-5">
                  <label htmlFor="meetLink" className="block text-sm font-medium text-gray-700 mb-2">
                    Google Meet Link (Optional)
                  </label>
                  <input
                    id="meetLink"
                    name="meetLink"
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., https://meet.google.com/abc-defg-hij"
                    value={formData.meetLink}
                    onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                    disabled={isSubmitting}
                  />
                  <p className="mt-1 text-sm text-gray-500">Add a Google Meet link for virtual classroom sessions</p>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Classroom'}
                </button>
              </form>
            </div>
            
            {/* Right section - Info */}
            <div className="md:w-1/3 bg-teal-50 p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="bg-teal-100 rounded-full p-3 mr-4">
                  <FaChalkboardTeacher className="text-teal-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-teal-700">About Classrooms</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Creating a classroom gives you a space to:
                </p>
                
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-teal-200 rounded-full mr-2 mt-1"></span>
                    Share resources with students
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-teal-200 rounded-full mr-2 mt-1"></span>
                    Assign and grade work
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-teal-200 rounded-full mr-2 mt-1"></span>
                    Provide feedback and discussion
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-teal-200 rounded-full mr-2 mt-1"></span>
                    Track student progress
                  </li>
                </ul>
                
                <div className="pt-4 border-t border-teal-100 mt-6">
                  <p className="text-sm text-teal-700">
                    Students can join using the class code that will be generated when you create the classroom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Classroom Created Successfully!
            </h2>
            
            <p className="text-gray-600 mb-8">
              Your new classroom "{formData.name}" has been created.
            </p>
            
            {meetLink && (
              <div className="max-w-md mx-auto bg-gray-50 p-4 rounded-lg mb-8">
                <p className="text-sm text-gray-500 mb-2">
                  <FaVideo className="inline mr-2 text-teal-600" />
                  Google Meet link for virtual sessions:
                </p>
                <div className="flex items-center justify-center">
                  <div className="bg-white px-6 py-3 rounded border border-gray-300 text-sm overflow-hidden text-ellipsis">
                    <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {meetLink}
                    </a>
                  </div>
                  <button 
                    onClick={copyMeetLinkToClipboard}
                    className="ml-2 p-2 text-teal-600 hover:text-teal-700 focus:outline-none"
                    title="Copy to clipboard"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            )}
            
            <div className="max-w-md mx-auto bg-gray-50 p-4 rounded-lg mb-8">
              <p className="text-sm text-gray-500 mb-2">Share this code with your students so they can join:</p>
              <div className="flex items-center justify-center">
                <div className="bg-white px-6 py-3 rounded border border-gray-300 font-mono text-xl tracking-wider">
                  {classCode}
                </div>
                <button 
                  onClick={copyCodeToClipboard}
                  className="ml-2 p-2 text-teal-600 hover:text-teal-700 focus:outline-none"
                  title="Copy to clipboard"
                >
                  <FaCopy />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={goToClassrooms}
                className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Go to My Classrooms
              </button>
              
              <button
                onClick={() => setShowSuccess(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Create Another Classroom
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateClassroom; 