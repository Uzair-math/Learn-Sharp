"use client"

import { useState, useEffect } from 'react';
import { FaPlayCircle, FaClock, FaCheck, FaTimes, FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';

export default function QuizInterface() {
  const [quizSetup, setQuizSetup] = useState({
    category: 'MERN Stack',
    numQuestions: 5,
    difficulty: 'Easy',
    questionType: 'Any Type',
    minutes: 2,
    seconds: 0
  });

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  // Dropdown state
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [numQuestionsOpen, setNumQuestionsOpen] = useState(false);
  const [difficultyOpen, setDifficultyOpen] = useState(false);
  const [questionTypeOpen, setQuestionTypeOpen] = useState(false);
  const [minutesOpen, setMinutesOpen] = useState(false);
  const [secondsOpen, setSecondsOpen] = useState(false);

  // MERN Stack questions database
  const mernQuestions = [
    {
      id: 1,
      question: "What does the 'M' stand for in MERN stack?",
      options: [
        { id: 'A', text: 'MySQL' },
        { id: 'B', text: 'MongoDB' },
        { id: 'C', text: 'Microsoft' },
        { id: 'D', text: 'Machine Learning' }
      ],
      correctAnswer: "MongoDB",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "Which of these is used for server-side scripting in MERN stack?",
      options: [
        { id: 'A', text: 'React' },
        { id: 'B', text: 'Express' },
        { id: 'C', text: 'Node.js' },
        { id: 'D', text: 'MongoDB' }
      ],
      correctAnswer: "Node.js",
      difficulty: "Easy"
    },
    {
      id: 3,
      question: "Which of these is a frontend library/framework in MERN stack?",
      options: [
        { id: 'A', text: 'Express' },
        { id: 'B', text: 'Node.js' },
        { id: 'C', text: 'React' },
        { id: 'D', text: 'MongoDB' }
      ],
      correctAnswer: "React",
      difficulty: "Easy"
    },
    {
      id: 4,
      question: "What is Express in the MERN stack?",
      options: [
        { id: 'A', text: 'Database' },
        { id: 'B', text: 'Frontend framework' },
        { id: 'C', text: 'Backend framework' },
        { id: 'D', text: 'Testing tool' }
      ],
      correctAnswer: "Backend framework",
      difficulty: "Easy"
    },
    {
      id: 5,
      question: "In React, what is JSX?",
      options: [
        { id: 'A', text: 'JavaScript XML' },
        { id: 'B', text: 'JSON Extended' },
        { id: 'C', text: 'JavaScript XQuery' },
        { id: 'D', text: 'JSON XML' }
      ],
      correctAnswer: "JavaScript XML",
      difficulty: "Easy"
    },
    {
      id: 6,
      question: "Which of these is a React hook used for side effects?",
      options: [
        { id: 'A', text: 'useState' },
        { id: 'B', text: 'useEffect' },
        { id: 'C', text: 'useContext' },
        { id: 'D', text: 'useReducer' }
      ],
      correctAnswer: "useEffect",
      difficulty: "Medium"
    },
    {
      id: 7,
      question: "What command is used to create a new React application using Create React App?",
      options: [
        { id: 'A', text: 'npm create-react-app' },
        { id: 'B', text: 'npx create-react-app myapp' },
        { id: 'C', text: 'npm build react' },
        { id: 'D', text: 'npm start react' }
      ],
      correctAnswer: "npx create-react-app myapp",
      difficulty: "Medium"
    },
    {
      id: 8,
      question: "Which of these is NOT a feature of MongoDB?",
      options: [
        { id: 'A', text: 'Document-oriented' },
        { id: 'B', text: 'SQL queries' },
        { id: 'C', text: 'Schema-less' },
        { id: 'D', text: 'Horizontal scalability' }
      ],
      correctAnswer: "SQL queries",
      difficulty: "Medium"
    },
    {
      id: 9,
      question: "In Express.js, which of the following is used to handle HTTP POST requests?",
      options: [
        { id: 'A', text: 'app.get()' },
        { id: 'B', text: 'app.post()' },
        { id: 'C', text: 'app.request()' },
        { id: 'D', text: 'app.response()' }
      ],
      correctAnswer: "app.post()",
      difficulty: "Medium"
    },
    {
      id: 10,
      question: "What is Redux used for in a MERN application?",
      options: [
        { id: 'A', text: 'Backend routing' },
        { id: 'B', text: 'Database management' },
        { id: 'C', text: 'State management' },
        { id: 'D', text: 'API testing' }
      ],
      correctAnswer: "State management",
      difficulty: "Medium"
    },
    {
      id: 11,
      question: "Which of these is a way to pass data from a parent to a child component in React?",
      options: [
        { id: 'A', text: 'Context API' },
        { id: 'B', text: 'Redux' },
        { id: 'C', text: 'Props' },
        { id: 'D', text: 'State hooks' }
      ],
      correctAnswer: "Props",
      difficulty: "Hard"
    },
    {
      id: 12,
      question: "What is the MongoDB equivalent of a table in relational databases?",
      options: [
        { id: 'A', text: 'Document' },
        { id: 'B', text: 'Collection' },
        { id: 'C', text: 'Field' },
        { id: 'D', text: 'Index' }
      ],
      correctAnswer: "Collection",
      difficulty: "Hard"
    },
    {
      id: 13,
      question: "Which Node.js module is used to create a server in Express.js?",
      options: [
        { id: 'A', text: 'http' },
        { id: 'B', text: 'fs' },
        { id: 'C', text: 'path' },
        { id: 'D', text: 'os' }
      ],
      correctAnswer: "http",
      difficulty: "Hard"
    },
    {
      id: 14,
      question: "In React, what is the virtual DOM?",
      options: [
        { id: 'A', text: 'A backup of the real DOM' }, 
        { id: 'B', text: 'A lightweight copy of the actual DOM' }, 
        { id: 'C', text: 'A DOM rendered on a virtual machine' }, 
        { id: 'D', text: 'A DOM that only exists in React Native' }
      ],
      correctAnswer: "A lightweight copy of the actual DOM",
      difficulty: "Hard"
    },
    {
      id: 15,
      question: "Which of the following is true about JWT in a MERN stack application?",
      options: [
        { id: 'A', text: 'It stores user session data on the server' }, 
        { id: 'B', text: 'It\'s used only for database connections' }, 
        { id: 'C', text: 'It\'s a stateless authentication mechanism' }, 
        { id: 'D', text: 'It requires cookies to work' }
      ],
      correctAnswer: "It's a stateless authentication mechanism",
      difficulty: "Hard"
    },
    {
      id: 16,
      question: "What is the purpose of the useCallback hook in React?",
      options: [
        { id: 'A', text: 'To optimize performance by memoizing functions' }, 
        { id: 'B', text: 'To manage component state' }, 
        { id: 'C', text: 'To handle form submissions' }, 
        { id: 'D', text: 'To create side effects in components' }
      ],
      correctAnswer: "To optimize performance by memoizing functions",
      difficulty: "Medium"
    },
    {
      id: 17,
      question: "What does the 'populate' method do in Mongoose?",
      options: [
        { id: 'A', text: 'Creates new documents in a collection' }, 
        { id: 'B', text: 'Fills in referenced documents in a query result' }, 
        { id: 'C', text: 'Adds new fields to a schema' }, 
        { id: 'D', text: 'Validates data before saving to MongoDB' }
      ],
      correctAnswer: "Fills in referenced documents in a query result",
      difficulty: "Medium"
    },
    {
      id: 18,
      question: "Which of the following is NOT a React lifecycle method?",
      options: [
        { id: 'A', text: 'componentDidMount' }, 
        { id: 'B', text: 'componentWillUpdate' }, 
        { id: 'C', text: 'componentReceiveProps' }, 
        { id: 'D', text: 'componentWillUnmount' }
      ],
      correctAnswer: "componentReceiveProps",
      difficulty: "Medium"
    },
    {
      id: 19,
      question: "What is the purpose of the 'key' prop when rendering lists in React?",
      options: [
        { id: 'A', text: 'It is required for CSS styling' }, 
        { id: 'B', text: 'It helps React identify which items have changed' }, 
        { id: 'C', text: 'It determines the order of elements' }, 
        { id: 'D', text: 'It is used for data binding with the backend' }
      ],
      correctAnswer: "It helps React identify which items have changed",
      difficulty: "Easy"
    },
    {
      id: 20,
      question: "What is middleware in Express.js?",
      options: [
        { id: 'A', text: 'A function that has access to the request and response objects' }, 
        { id: 'B', text: 'A database connection layer' }, 
        { id: 'C', text: 'The front-end component of a MERN application' }, 
        { id: 'D', text: 'A testing framework for Node.js applications' }
      ],
      correctAnswer: "A function that has access to the request and response objects",
      difficulty: "Easy"
    }
  ];

  // Get questions based on difficulty
  const getQuestions = () => {
    let filteredQuestions = mernQuestions;
    
    if (quizSetup.difficulty !== 'Any') {
      filteredQuestions = mernQuestions.filter(q => q.difficulty.toLowerCase() === quizSetup.difficulty.toLowerCase());
    }
    
    // Shuffle and take only the required number of questions
    return filteredQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, quizSetup.numQuestions);
  };

  const [questions, setQuestions] = useState([]);

  // Start the quiz
  const startQuiz = () => {
    const selectedQuestions = getQuestions();
    setQuestions(selectedQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizStarted(true);
    setQuizFinished(false);

    // Set timer
    const totalSeconds = (quizSetup.minutes * 60) + quizSetup.seconds;
    setTimeLeft(totalSeconds);
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  // Handle next question
  const handleNextQuestion = () => {
    // Check if answer is correct
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Instead of going sequentially, select a random question
    // that hasn't been shown yet
    const remainingQuestions = mernQuestions.filter(q => 
      !questions.slice(0, currentQuestion + 1).find(shownQ => shownQ.id === q.id)
    );
    
    if (remainingQuestions.length > 0 && currentQuestion < quizSetup.numQuestions - 1) {
      // Get a random question from remaining ones
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const nextRandomQuestion = remainingQuestions[randomIndex];
      
      // Add it to the questions array
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestion + 1] = nextRandomQuestion;
      setQuestions(updatedQuestions);
      
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      finishQuiz();
    }
  };

  // Finish quiz
  const finishQuiz = () => {
    setQuizFinished(true);
    setQuizStarted(false);
    setTimeLeft(null);
    
    // Prepare results
    setQuizResults({
      totalQuestions: questions.length,
      correctAnswers: score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0),
      timeTaken: (quizSetup.minutes * 60 + quizSetup.seconds) - (timeLeft || 0)
    });
  };

  // Timer effect
  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (quizStarted && timeLeft === 0) {
      finishQuiz();
    }
  }, [quizStarted, timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Custom dropdown component
  const CustomDropdown = ({ label, value, options, isOpen, setIsOpen, onChange }) => {
    return (
      <div className="relative mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div 
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value}</span>
          <FaChevronDown className={`transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {options.map((option, index) => (
              <div 
                key={index}
                className="py-2 px-3 hover:bg-blue-50 cursor-pointer"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!quizStarted && !quizFinished && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center">
              <div className="absolute left-0 w-3 h-12 bg-blue-300 -ml-4"></div>
              <div className="absolute right-0 w-3 h-12 bg-blue-300 -mr-4"></div>
              <div className="absolute bottom-0 w-12 h-3 bg-blue-300 -mb-8"></div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">The Ultimate Trivia Quiz</h1>
          
          <CustomDropdown 
            label="In which category do you want to play the quiz?"
            value={quizSetup.category}
            options={['MERN Stack', 'JavaScript', 'React', 'Node.js']}
            isOpen={categoryOpen}
            setIsOpen={setCategoryOpen}
            onChange={(value) => setQuizSetup({...quizSetup, category: value})}
          />
          
          <CustomDropdown 
            label="How many questions do you want in your quiz?"
            value={quizSetup.numQuestions}
            options={[5, 10, 15]}
            isOpen={numQuestionsOpen}
            setIsOpen={setNumQuestionsOpen}
            onChange={(value) => setQuizSetup({...quizSetup, numQuestions: parseInt(value)})}
          />
          
          <CustomDropdown 
            label="How difficult do you want your quiz to be?"
            value={quizSetup.difficulty}
            options={['Easy', 'Medium', 'Hard', 'Any']}
            isOpen={difficultyOpen}
            setIsOpen={setDifficultyOpen}
            onChange={(value) => setQuizSetup({...quizSetup, difficulty: value})}
          />
          
          <CustomDropdown 
            label="Which type of questions do you want in your quiz?"
            value={quizSetup.questionType}
            options={['Any Type', 'Multiple Choice']}
            isOpen={questionTypeOpen}
            setIsOpen={setQuestionTypeOpen}
            onChange={(value) => setQuizSetup({...quizSetup, questionType: value})}
          />
          
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Please select the countdown time for your quiz.
            </label>
            <div className="flex space-x-4">
              <div className="w-1/3 relative">
                <div 
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white flex justify-between items-center cursor-pointer"
                  onClick={() => setMinutesOpen(!minutesOpen)}
                >
                  <span>{quizSetup.minutes}</span>
                  <FaChevronDown className={`transition-transform ${minutesOpen ? 'transform rotate-180' : ''}`} />
                </div>
                {minutesOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <div 
                        key={num}
                        className="py-2 px-3 hover:bg-blue-50 cursor-pointer"
                        onClick={() => {
                          setQuizSetup({...quizSetup, minutes: num});
                          setMinutesOpen(false);
                        }}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="w-1/3 relative">
                <div 
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white flex justify-between items-center cursor-pointer"
                  onClick={() => setSecondsOpen(!secondsOpen)}
                >
                  <span>{quizSetup.seconds}</span>
                  <FaChevronDown className={`transition-transform ${secondsOpen ? 'transform rotate-180' : ''}`} />
                </div>
                {secondsOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {[0, 15, 30, 45].map((num) => (
                      <div 
                        key={num}
                        className="py-2 px-3 hover:bg-blue-50 cursor-pointer"
                        onClick={() => {
                          setQuizSetup({...quizSetup, seconds: num});
                          setSecondsOpen(false);
                        }}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button 
            onClick={startQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition duration-200"
          >
            <FaPlayCircle className="mr-2" /> Play Now
          </button>
        </div>
      )}

      {quizStarted && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-100 p-4 flex justify-between items-center">
            <div className="font-bold text-lg">
              Question No.{currentQuestion + 1} of {questions.length}
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2 text-red-600" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Q. {questions[currentQuestion].question}</h2>
            
            <p className="mb-4">Please choose one of the following answers:</p>
            
            <div className="space-y-3 mb-8">
              {questions[currentQuestion].options.map((option) => (
                <div 
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.text)}
                  className={`p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition
                    ${selectedAnswer === option.text ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                >
                  {option.id}. {option.text}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`py-3 px-8 rounded-md font-bold transition duration-200
                  ${selectedAnswer !== null 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                Next <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {quizFinished && quizResults && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Quiz Results</h1>
          
          <div className="p-6 bg-blue-50 rounded-lg mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">
                {Math.round((quizResults.correctAnswers / quizResults.totalQuestions) * 100)}%
              </div>
              <p className="text-xl">
                You got <span className="font-bold text-blue-600">{quizResults.correctAnswers}</span> out 
                of <span className="font-bold">{quizResults.totalQuestions}</span> questions correct
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Time Taken</h3>
              <p className="text-2xl font-mono">{formatTime(quizResults.timeTaken)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Difficulty</h3>
              <p className="text-2xl">{quizSetup.difficulty}</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => setQuizFinished(false)}
              className="flex-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-4 rounded-md transition duration-200"
            >
              New Quiz
            </button>
            <button 
              onClick={startQuiz}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
            >
              Retry Same Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 