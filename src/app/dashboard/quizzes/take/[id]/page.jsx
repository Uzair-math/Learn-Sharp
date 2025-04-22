"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';

const QuizPage = ({ params }) => {
  const { id } = params;
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [quiz, setQuiz] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizState, setQuizState] = useState('loading'); // loading, ready, in-progress, submitted, timed-out
  const intervalRef = useRef(null);
  
  // Load quiz data
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`/api/quizzes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz');
        }
        
        const data = await response.json();
        setQuiz(data);
        setQuizState('ready');
      } catch (error) {
        toast.error(error.message);
        setQuizState('error');
      }
    };
    
    if (id && !loading && user) {
      fetchQuizData();
    }
  }, [id, loading, user]);
  
  // Start the quiz
  const startQuiz = async () => {
    try {
      const response = await fetch('/api/quiz-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quizId: id,
          action: 'start'
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to start quiz');
      }
      
      const submissionData = await response.json();
      setSubmission(submissionData);
      
      // Initialize empty answers object
      const initialAnswers = {};
      quiz.questions.forEach((_, index) => {
        initialAnswers[index] = '';
      });
      setAnswers(initialAnswers);
      
      // Set timer
      setTimeLeft(quiz.timeLimit * 60); // convert minutes to seconds
      setQuizState('in-progress');
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  // Handle quiz timer
  useEffect(() => {
    if (quizState === 'in-progress' && timeLeft !== null) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            submitQuiz(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(intervalRef.current);
    }
  }, [quizState, timeLeft]);
  
  // Format time remaining
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle answer changes
  const handleAnswerChange = (questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };
  
  // Handle checkbox answers (multiple choices)
  const handleCheckboxChange = (questionIndex, value, checked) => {
    setAnswers(prev => {
      const currentAnswers = Array.isArray(prev[questionIndex]) ? [...prev[questionIndex]] : [];
      
      if (checked) {
        return {
          ...prev,
          [questionIndex]: [...currentAnswers, value]
        };
      } else {
        return {
          ...prev,
          [questionIndex]: currentAnswers.filter(v => v !== value)
        };
      }
    });
  };
  
  // Navigate between questions
  const goToNext = () => {
    if (currentStep < quiz.questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  // Submit the quiz
  const submitQuiz = async (isTimeout = false) => {
    if (isTimeout) {
      setQuizState('timed-out');
    } else {
      setQuizState('submitted');
    }
    
    clearInterval(intervalRef.current);
    
    // Format answers for submission
    const formattedAnswers = Object.keys(answers).map(index => {
      const question = quiz.questions[index];
      return {
        questionId: question._id,
        answer: answers[index]
      };
    });
    
    try {
      const response = await fetch('/api/quiz-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quizId: id,
          action: 'submit',
          answers: formattedAnswers
        })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit quiz');
      }
      
      const result = await response.json();
      
      if (isTimeout) {
        toast.error('Time is up! Your answers have been automatically submitted.');
      } else {
        toast.success('Quiz submitted successfully!');
      }
      
      // Redirect to results page after submission
      router.push(`/dashboard/quizzes/results/${result._id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  if (loading || quizState === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4">Loading quiz...</p>
        </div>
      </div>
    );
  }
  
  if (quizState === 'error' || !quiz) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="mb-6">Unable to load the quiz. It may have been removed or you don't have access.</p>
        <button
          onClick={() => router.push('/dashboard/quizzes')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }
  
  if (quizState === 'ready') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-teal-700 mb-2">{quiz.title}</h1>
          <p className="text-gray-600 mb-4">{quiz.description}</p>
          
          <div className="mb-6">
            <div className="p-4 bg-blue-50 rounded-md">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Quiz Information</h2>
              <ul className="text-blue-700">
                <li className="mb-1">⏱️ Time Limit: {quiz.timeLimit} minutes</li>
                <li className="mb-1">📝 Total Questions: {quiz.questions.length}</li>
                <li>🎯 Maximum Score: {quiz.questions.reduce((total, q) => total + q.points, 0)} points</li>
              </ul>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Important Instructions:</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li className="mb-1">Once you start, the timer will begin and cannot be paused.</li>
              <li className="mb-1">If the time runs out, your quiz will be automatically submitted.</li>
              <li className="mb-1">Do not refresh or close the page during the quiz.</li>
              <li className="mb-1">You can navigate between questions using the Previous and Next buttons.</li>
              <li>Make sure you submit your quiz before the time is up.</li>
            </ul>
          </div>
          
          <button
            onClick={startQuiz}
            className="w-full px-4 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-semibold"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }
  
  if (quizState === 'in-progress') {
    const currentQuestion = quiz.questions[currentStep];
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="sticky top-0 z-10 bg-white p-3 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <div>
            <span className="font-medium">Question {currentStep + 1} of {quiz.questions.length}</span>
          </div>
          
          <div className={`font-bold text-lg ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-blue-600'}`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">
            {currentQuestion.questionText}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({currentQuestion.points} {currentQuestion.points === 1 ? 'point' : 'points'})
            </span>
          </h2>
          
          {currentQuestion.questionType === 'shortAnswer' ? (
            <div className="mb-4">
              <textarea
                value={answers[currentStep] || ''}
                onChange={(e) => handleAnswerChange(currentStep, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Type your answer here..."
              ></textarea>
            </div>
          ) : currentQuestion.questionType === 'multipleChoice' ? (
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentStep}`}
                    value={option}
                    checked={answers[currentStep] === option}
                    onChange={() => handleAnswerChange(currentStep, option)}
                    className="mr-2"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    value={option}
                    checked={Array.isArray(answers[currentStep]) && answers[currentStep].includes(option)}
                    onChange={(e) => handleCheckboxChange(currentStep, option, e.target.checked)}
                    className="mr-2"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={goToPrevious}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-md ${currentStep === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Previous
          </button>
          
          {currentStep < quiz.questions.length - 1 ? (
            <button
              onClick={goToNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => submitQuiz(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit Quiz
            </button>
          )}
        </div>
        
        <div className="mt-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${currentStep === index
                    ? 'bg-blue-600 text-white'
                    : answers[index] || Array.isArray(answers[index]) && answers[index].length > 0
                      ? 'bg-green-100 text-green-800 border-2 border-green-600'
                      : 'bg-gray-100 text-gray-800'
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <button
              onClick={() => submitQuiz(false)}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default QuizPage; 