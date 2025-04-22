"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const CreateQuiz = () => {
  const router = useRouter();
  
  const [quizData, setQuizData] = useState({
    category: 'Entertainment: Books',
    questionCount: 5,
    difficulty: 'Easy',
    questionType: 'Any Type',
    hours: 0,
    minutes: 2,
    seconds: 0
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Quiz created successfully!');
    // Navigate to the quiz or show a confirmation
    router.push('/dashboard/quizzes/take');
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/4 flex justify-center">
          <div className="w-32 h-32 text-blue-400">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path fill="currentColor" d="M47.7,86.7c0-28.3,23-51.3,51.3-51.3s51.3,23,51.3,51.3c0,28.3-23,51.3-51.3,51.3S47.7,115,47.7,86.7z M76.3,146.7 v20h-10v-20H76.3z M99,146.7v20H89v-20H99z M121.7,146.7v20h-10v-20H121.7z M33.3,86.7h10v25h-10V86.7z M33.3,61.7h10v25h-10 V61.7z M53.3,116.7v-20h10v20H53.3z M153.3,86.7h10v25h-10V86.7z M153.3,61.7h10v25h-10V61.7z M133.3,116.7v-20h10v20H133.3z"/>
            </svg>
          </div>
        </div>
        
        <div className="md:w-3/4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">The Ultimate Trivia Quiz</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="block text-gray-700 mb-2">In which category do you want to play the quiz?</label>
              <select 
                name="category"
                value={quizData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Entertainment: Books">Entertainment: Books</option>
                <option value="Science: Computers">Science: Computers</option>
                <option value="Science: Mathematics">Science: Mathematics</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="block text-gray-700 mb-2">How many questions do you want in your quiz?</label>
              <select 
                name="questionCount"
                value={quizData.questionCount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="block text-gray-700 mb-2">How difficult do you want your quiz to be?</label>
              <select 
                name="difficulty"
                value={quizData.difficulty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="block text-gray-700 mb-2">Which type of questions do you want in your quiz?</label>
              <select 
                name="questionType"
                value={quizData.questionType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Any Type">Any Type</option>
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True/False">True/False</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="block text-gray-700 mb-2">Please select the countdown time for your quiz.</label>
              <div className="flex gap-2">
                <select 
                  name="hours"
                  value={quizData.hours}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(24).keys()].map(num => (
                    <option key={`h-${num}`} value={num}>{num}</option>
                  ))}
                </select>
                
                <select 
                  name="minutes"
                  value={quizData.minutes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(60).keys()].map(num => (
                    <option key={`m-${num}`} value={num}>{num}</option>
                  ))}
                </select>
                
                <select 
                  name="seconds"
                  value={quizData.seconds}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(60).keys()].map(num => (
                    <option key={`s-${num}`} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-control">
              <button 
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center"
              >
                <span className="mr-2">▶</span>
                Play Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz; 