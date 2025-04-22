"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';

// Import the Loader component with SSR disabled
const Loader = dynamic(() => import('@/components/(shared)/Loader/Loader'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center min-h-screen">Loading...</div>
});

const TakeQuiz = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(40);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // Mock questions array with multiple questions
  const questions = [
    {
    questionText: "What is the name of the process that sends one qubit of information using two bits of classical information?",
    options: [
      { id: 'A', text: 'Super Dense Coding' },
      { id: 'B', text: 'Quantum Programming' },
      { id: 'C', text: 'Quantum Teleportation' },
      { id: 'D', text: 'Quantum Entanglement' }
    ]
    },
    {
      questionText: "Which quantum algorithm is primarily used for integer factorization?",
      options: [
        { id: 'A', text: "Grover's Algorithm" },
        { id: 'B', text: "Shor's Algorithm" },
        { id: 'C', text: 'Quantum Fourier Transform' },
        { id: 'D', text: 'Deutsch-Jozsa Algorithm' }
      ]
    },
    {
      questionText: "What is the minimum number of qubits needed to create a GHZ state?",
      options: [
        { id: 'A', text: '1' },
        { id: 'B', text: '2' },
        { id: 'C', text: '3' },
        { id: 'D', text: '4' }
      ]
    },
    {
      questionText: "Which of the following is NOT a quantum computing gate?",
      options: [
        { id: 'A', text: 'Hadamard Gate' },
        { id: 'B', text: 'CNOT Gate' },
        { id: 'C', text: 'Switch Gate' },
        { id: 'D', text: 'Pauli-X Gate' }
      ]
    },
    {
      questionText: "What does the CNOT gate do?",
      options: [
        { id: 'A', text: 'Flips both qubits simultaneously' },
        { id: 'B', text: 'Flips the target qubit if the control qubit is |1>' },
        { id: 'C', text: 'Creates superposition of all possible states' },
        { id: 'D', text: 'Entangles two qubits regardless of their state' }
      ]
    },
    {
      questionText: "What is quantum decoherence?",
      options: [
        { id: 'A', text: 'The process of measuring a quantum state' },
        { id: 'B', text: 'Loss of quantum information due to interaction with the environment' },
        { id: 'C', text: 'The creation of quantum entanglement' },
        { id: 'D', text: 'The process of initializing qubits to a known state' }
      ]
    },
    {
      questionText: "Which company launched the first commercially available quantum computer?",
      options: [
        { id: 'A', text: 'IBM' },
        { id: 'B', text: 'Google' },
        { id: 'C', text: 'D-Wave Systems' },
        { id: 'D', text: 'Microsoft' }
      ]
    },
    {
      questionText: "What is a quantum advantage?",
      options: [
        { id: 'A', text: 'When quantum computers can solve problems classical computers cannot' },
        { id: 'B', text: 'When quantum computers solve problems faster than classical computers' },
        { id: 'C', text: 'The financial benefit of investing in quantum technologies' },
        { id: 'D', text: 'The ability to run quantum algorithms on classical hardware' }
      ]
    },
    {
      questionText: "Which of these is NOT a method for implementing quantum error correction?",
      options: [
        { id: 'A', text: 'Surface codes' },
        { id: 'B', text: 'Frequency stabilization' },
        { id: 'C', text: 'Shor code' },
        { id: 'D', text: 'Steane code' }
      ]
    },
    {
      questionText: "What is the expected impact of Grover's algorithm on searching an unsorted database?",
      options: [
        { id: 'A', text: 'Exponential speedup' },
        { id: 'B', text: 'Quadratic speedup' },
        { id: 'C', text: 'Linear speedup' },
        { id: 'D', text: 'No speedup' }
      ]
    }
  ];
  
  // Timer functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        // Time's up, handle submission
        clearInterval(timer);
        handleNextQuestion();
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [minutes, seconds]);
  
  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };
  
  const handleNextQuestion = () => {
    // Save the answer (in a real app, you would store this)
    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      // Reset timer for next question
      setMinutes(0);
      setSeconds(40);
    } else {
      // End of quiz - redirect to results page
      toast.success('Quiz completed!');
      router.push('/dashboard/quizzes/results');
    }
  };
  
  if (loading) {
    return <Loader />;
  }
  
  // Get current question from the array
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-100 border-b flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-800">Question No.{currentQuestionIndex + 1} of {questions.length}</h2>
          </div>
          
          <div className="text-right">
            <div className="bg-gray-100 px-4 py-2 rounded-md text-gray-800">
              <span className="text-2xl font-medium">{String(minutes).padStart(2, '0')}</span>
              <span className="mx-1">:</span>
              <span className="text-2xl font-medium">{String(seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-b">
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="text-lg text-gray-800">Q. {currentQuestion.questionText}</h3>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-700 mb-4">Please choose one of the following answers:</p>
            
            <div className="space-y-2">
              {currentQuestion.options.map((option) => (
                <div 
                  key={option.id}
                  className={`p-4 border rounded-md cursor-pointer transition-colors ${
                    selectedAnswer === option.id ? 'bg-gray-100 border-gray-400' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerSelect(option.id)}
                >
                  <label className="flex items-center cursor-pointer w-full">
                    <span className="mr-2 font-medium">{option.id}.</span>
                    <span>{option.text}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 flex justify-end">
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz; 