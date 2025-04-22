"use client"

import React, { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';

const TakeQuiz = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Collection of 20 MERN stack interview questions
  const mernQuestions = [
    {
      questionText: "What does the 'M' stand for in MERN stack?",
      options: [
        { id: 'A', text: 'MySQL' },
        { id: 'B', text: 'MongoDB' },
        { id: 'C', text: 'Microsoft' },
        { id: 'D', text: 'Machine Learning' }
      ],
      correctAnswer: 'B'
    },
    {
      questionText: "Which of these is used for server-side scripting in MERN stack?",
      options: [
        { id: 'A', text: 'React' },
        { id: 'B', text: 'Express' },
        { id: 'C', text: 'Node.js' },
        { id: 'D', text: 'MongoDB' }
      ],
      correctAnswer: 'C'
    },
    {
      questionText: "Which of these is a frontend library/framework in MERN stack?",
      options: [
        { id: 'A', text: 'Express' },
        { id: 'B', text: 'Node.js' },
        { id: 'C', text: 'React' },
        { id: 'D', text: 'MongoDB' }
      ],
      correctAnswer: 'C'
    },
    {
      questionText: "What is Express in the MERN stack?",
      options: [
        { id: 'A', text: 'Database' },
        { id: 'B', text: 'Frontend framework' },
        { id: 'C', text: 'Backend framework' },
        { id: 'D', text: 'Testing tool' }
      ],
      correctAnswer: 'C'
    },
    {
      questionText: "In React, what is JSX?",
      options: [
        { id: 'A', text: 'JavaScript XML' },
        { id: 'B', text: 'JSON Extended' },
        { id: 'C', text: 'JavaScript XQuery' },
        { id: 'D', text: 'JSON XML' }
      ],
      correctAnswer: 'A'
    },
    {
      questionText: "Which of these is a React hook used for side effects?",
      options: [
        { id: 'A', text: 'useState' },
        { id: 'B', text: 'useEffect' },
        { id: 'C', text: 'useContext' },
        { id: 'D', text: 'useReducer' }
      ],
      correctAnswer: 'B'
    },
    {
      questionText: "What command is used to create a new React application using Create React App?",
      options: [
        { id: 'A', text: 'npm create-react-app' },
        { id: 'B', text: 'npx create-react-app myapp' },
        { id: 'C', text: 'npm build react' },
        { id: 'D', text: 'npm start react' }
      ],
      correctAnswer: 'B'
    },
    {
      questionText: "Which of these is NOT a feature of MongoDB?",
      options: [
        { id: 'A', text: 'Document-oriented' },
        { id: 'B', text: 'SQL queries' },
        { id: 'C', text: 'Schema-less' },
        { id: 'D', text: 'Horizontal scalability' }
      ],
      correctAnswer: 'B'
    },
    {
      questionText: "In Express.js, which of the following is used to handle HTTP POST requests?",
      options: [
        { id: 'A', text: 'app.get()' },
        { id: 'B', text: 'app.post()' },
        { id: 'C', text: 'app.request()' },
        { id: 'D', text: 'app.response()' }
      ],
      correctAnswer: 'B'
    },
    {
      questionText: "What is Redux used for in a MERN application?",
      options: [
        { id: 'A', text: 'Backend routing' },
        { id: 'B', text: 'Database management' },
        { id: 'C', text: 'State management' },
        { id: 'D', text: 'API testing' }
      ],
      correctAnswer: 'C'
    },
    {
      questionText: "Which of these is a way to pass data from a parent to a child component in React?",
      options: [
        { id: 'A', text: 'Context API' },
        { id: 'B', text: 'Redux' },
        { id: 'C', text: 'Props' },
        { id: 'D', text: 'State hooks' }
      ],
      correctAnswer: 'C'
    },
    {
      questionText: "What is the MongoDB equivalent of a table in relational databases?",
      options: [
        { id: 'A', text: 'Document' },
        { id: 'B', text: 'Collection' },
        { id: 'C', text: 'Field' },
        { id: 'D', text: 'Index' }
      ],
      correctAnswer: 'B'
    },
    {
      questionText: "Which Node.js module is used to create a server in Express.js?",
      options: [
        { id: 'A', text: 'http' },
        { id: 'B', text: 'fs' },
        { id: 'C', text: 'path' },
        { id: 'D', text: 'os' }
      ],
      correctAnswer: 'A'
    },
    {
      questionText: "In React, what is the virtual DOM?",
      options: [
        { id: 'A', text: 'A backup of the real DOM' }, 
        { id: 'B', text: 'A lightweight copy of the actual DOM' }, 
        { id: 'C', text: 'A DOM rendered on a virtual machine' }, 
        { id: 'D', text: 'A DOM that only exists in React Native' }
      ],
      correctAnswer: 'B'
    },
    {
      questionText: "Which of the following is true about JWT in a MERN stack application?",
      options: [
        { id: 'A', text: 'It stores user session data on the server' }, 
        { id: 'B', text: 'It\'s used only for database connections' }, 
        { id: 'C', text: 'It\'s a stateless authentication mechanism' }, 
        { id: 'D', text: 'It requires cookies to work' }
      ],
      correctAnswer: 'C'
    },
    {
      questionText: "What is the purpose of the useCallback hook in React?",
      options: [
        { id: 'A', text: 'To optimize performance by memoizing functions' }, 
        { id: 'B', text: 'To manage component state' }, 
        { id: 'C', text: 'To handle form submissions' }, 
        { id: 'D', text: 'To create side effects in components' }
      ],
      correctAnswer: 'A'
    },
    {
      questionText: "What does the 'populate' method do in Mongoose?",
      options: [
        { id: 'A', text: 'Creates new documents in a collection' }, 
        { id: 'B', text: 'Fills in referenced documents in a query result' }, 
        { id: 'C', text: 'Adds new fields to a schema' }, 
        { id: 'D', text: 'Validates data before saving to MongoDB' }
      ],
      correctAnswer: 'B'
    },
    {
      questionText: "Which of the following is NOT a React lifecycle method?",
      options: [
        { id: 'A', text: 'componentDidMount' }, 
        { id: 'B', text: 'componentWillUpdate' }, 
        { id: 'C', text: 'componentReceiveProps' }, 
        { id: 'D', text: 'componentWillUnmount' }
      ],
      correctAnswer: 'C'
    },
    {
      questionText: "What is the purpose of the 'key' prop when rendering lists in React?",
      options: [
        { id: 'A', text: 'It is required for CSS styling' }, 
        { id: 'B', text: 'It helps React identify which items have changed' }, 
        { id: 'C', text: 'It determines the order of elements' }, 
        { id: 'D', text: 'It is used for data binding with the backend' }
      ],
      correctAnswer: 'B'
    },
    {
      questionText: "What is middleware in Express.js?",
      options: [
        { id: 'A', text: 'A function that has access to the request and response objects' }, 
        { id: 'B', text: 'A database connection layer' }, 
        { id: 'C', text: 'The front-end component of a MERN application' }, 
        { id: 'D', text: 'A testing framework for Node.js applications' }
      ],
      correctAnswer: 'A'
    }
  ];

  // Set up timer and questions when quiz starts
  useEffect(() => {
    if (!quizStarted) return;
    
    // Shuffle the questions
    const shuffled = [...mernQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
    setShuffledQuestions(shuffled);
    
    // Setup timer
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleQuizEnd();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizStarted]);

  // Start the quiz
  const startQuiz = () => {
    setQuizStarted(true);
  };

  // Reset and take another quiz
  const handleStartNewQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(1800);
  };

  // Current question to display
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle selecting an answer
  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  // Handle next question or end quiz
  const handleNextQuestion = () => {
    // Check if answer is correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    
    // Clear selected answer
    setSelectedAnswer(null);
    
    // If there are more questions, go to next, otherwise end quiz
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleQuizEnd();
    }
  };

  // Handle quiz end
  const handleQuizEnd = () => {
    setQuizCompleted(true);
    if (onComplete) {
      onComplete({
        score,
        totalQuestions: shuffledQuestions.length,
        timeTaken: 1800 - timeLeft
      });
    }
  };

  // Show start screen if quiz hasn't started
  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">MERN Stack Quiz</h2>
          <p className="mb-8 text-gray-700">
            Test your knowledge of the MERN stack with this 10-question quiz.
            You will have 30 minutes to complete the quiz.
          </p>
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center bg-blue-50 p-4 rounded-lg">
              <FaClock className="text-blue-600 mr-3 text-xl" />
              <span className="font-medium text-lg">Time: 30 minutes</span>
            </div>
          </div>
          <button 
            onClick={startQuiz}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // If quiz is not loaded yet
  if (shuffledQuestions.length === 0) {
    return <div className="text-center py-10">Loading quiz questions...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {!quizCompleted ? (
        <>
          <div className="bg-gray-100 p-4 flex justify-between items-center">
            <div className="flex items-center text-gray-800">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Question No.{currentQuestionIndex + 1} of {shuffledQuestions.length}
            </div>
            <div className="flex items-center">
              <FaClock className="text-red-600 mr-2" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800">
                Q. {currentQuestion.questionText}
              </h2>
            </div>
            
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option) => (
                <div 
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors
                    ${selectedAnswer === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                >
                  {option.id}. {option.text}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`py-3 px-8 rounded-md font-medium flex items-center transition-colors
                  ${selectedAnswer !== null 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Next <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-6">
            Your score: {score} out of {shuffledQuestions.length}
          </p>
          <button 
            onClick={handleStartNewQuiz}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Take Another Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz; 