"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

const QuizResultDetails = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('stats');
  
  // Mock quiz result data that matches the image
  const quizResults = {
    id,
    title: "Gaming and Science Trivia",
    grade: 'F',
    totalQuestions: 5,
    correctAnswers: 0,
    score: 0,
    passingScore: 60,
    timeTaken: {
      hours: 0,
      minutes: 0,
      seconds: 13
    },
    questions: [
      {
        id: 1,
        text: "Which game did \"Sonic The Hedgehog\" make his first appearance in?",
        userAnswer: "Sonic The Hedgehog",
        correctAnswer: "Rad Mobile",
        points: 0
      },
      {
        id: 2,
        text: "In the game Dark Souls, what is the name of the region you're in for the majority of the game?",
        userAnswer: "Oolacile",
        correctAnswer: "Lordran",
        points: 0
      },
      {
        id: 3,
        text: "In the game \"Hearthstone\", what is the best rank possible?",
        userAnswer: "Rank 1 Elite",
        correctAnswer: "Rank 1 Legend",
        points: 0
      },
      {
        id: 4,
        text: "Dry ice is the solid form of what substance?",
        userAnswer: "Ammonia",
        correctAnswer: "Carbon dioxide",
        points: 0
      },
      {
        id: 5,
        text: "In what year was the game \"FTL: Faster Than Light\" released?",
        userAnswer: "2011",
        correctAnswer: "2012",
        points: 0
      }
    ]
  };
  
  const formatTime = () => {
    const { hours, minutes, seconds } = quizResults.timeTaken;
    return `${hours}h ${minutes}m ${seconds}s`;
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4">Loading results...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Tab Navigation */}
      <div className="bg-gray-100 rounded-t-lg overflow-hidden mb-1">
        <div className="flex">
          <button
            onClick={() => setActiveTab('stats')}
            className={`py-3 px-8 font-medium ${
              activeTab === 'stats' 
                ? 'bg-white text-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab('qna')}
            className={`py-3 px-8 font-medium ${
              activeTab === 'qna' 
                ? 'bg-white text-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            QNA
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="bg-white rounded-b-lg shadow-md p-6">
        {activeTab === 'stats' ? (
          <div className="space-y-4">
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold text-gray-800">Learning is a journey. Keep going, and you'll get there.</h2>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-gray-800">Grade: {quizResults.grade}</h3>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium text-gray-800">Total Questions: {quizResults.totalQuestions}</h3>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium text-gray-800">Correct Answers: {quizResults.correctAnswers}</h3>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium text-gray-800">Your Score: {quizResults.score}%</h3>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium text-gray-800">Passing Score: {quizResults.passingScore}%</h3>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium text-gray-800">
                Time Taken: {formatTime()}
              </h3>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Questions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Your Answers
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correct Answers
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quizResults.questions.map((question) => (
                  <tr key={question.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {question.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {question.text}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {question.userAnswer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {question.correctAnswer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {question.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-8 flex justify-center">
          <Link 
            href="/dashboard"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizResultDetails; 