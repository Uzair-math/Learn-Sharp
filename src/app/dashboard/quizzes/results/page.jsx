"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import dynamic from 'next/dynamic';

// Import the Loader component with SSR disabled
const Loader = dynamic(() => import('@/components/(shared)/Loader/Loader'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-screen">Loading...</div>
});

const QuizResultsPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  // Mock results
  const [quizResults, setQuizResults] = useState({
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    timeTaken: '2:15',
    correctAnswers: 8,
    incorrectAnswers: 2,
    passedQuiz: true
  });
  
  if (loading) {
    return <Loader />;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Quiz Results</h1>
          <p className="text-gray-600">Congratulations on completing the quiz!</p>
      </div>
      
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-6 md:mb-0 flex flex-col items-center">
              <div className="text-6xl font-bold text-blue-500">{quizResults.percentage}%</div>
              <div className="text-gray-500 mt-2">Your Score</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-gray-800">{quizResults.correctAnswers}/{quizResults.totalQuestions}</div>
              <div className="text-gray-500 mt-2">Questions Answered Correctly</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-gray-800">{quizResults.timeTaken}</div>
              <div className="text-gray-500 mt-2">Time Taken</div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Results Breakdown</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Correct Answers</div>
                    <div className="text-xl font-semibold">{quizResults.correctAnswers}</div>
                  </div>
                </div>
            </div>
            
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <div className="flex items-center">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Incorrect Answers</div>
                    <div className="text-xl font-semibold">{quizResults.incorrectAnswers}</div>
                  </div>
                </div>
            </div>
            
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <div className="flex items-center">
                  <div className={`${quizResults.passedQuiz ? 'bg-green-100' : 'bg-red-100'} p-2 rounded-full mr-3`}>
                    {quizResults.passedQuiz ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Pass Status</div>
                    <div className="text-xl font-semibold">{quizResults.passedQuiz ? 'Passed' : 'Failed'}</div>
                  </div>
                </div>
            </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard" className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
            Back to Dashboard
          </Link>
            <Link href="/dashboard/quizzes/take" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Take Another Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsPage; 