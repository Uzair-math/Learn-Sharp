"use client"
import { Fade } from "react-awesome-reveal";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaCreditCard, FaCommentDots, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from 'axios';

const Dashboard = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
    upiId: ''
  });
  
  // Chat state
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Store conversation history for ChatGPT context
  const [chatHistory, setChatHistory] = useState([
    { role: 'system', content: 'You are Dr. Williams, a helpful and knowledgeable tutor. Provide concise educational assistance to students. Answer questions clearly without repeating yourself. Keep responses educational and helpful.' }
  ]);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showChatModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.nameOnCard) {
        toast.error("Please fill all required fields");
        setIsSubmitting(false);
        return;
      }
    } else if (paymentMethod === 'upi' && !formData.upiId) {
      toast.error("Please enter UPI ID");
      setIsSubmitting(false);
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPaymentModal(false);
      setFormData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
        billingAddress: '',
        upiId: ''
      });
      toast.success("Payment method added successfully");
    }, 1500);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Create a new message
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    
    const userMessage = {
      id: Date.now(),
      sender: 'student',
      name: 'John Smith',
      message: newMessage,
      time: formattedTime
    };
    
    // Add user message to the chat
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Add to conversation history
    const updatedHistory = [
      ...chatHistory,
      { role: 'user', content: newMessage }
    ];
    setChatHistory(updatedHistory);
    
    try {
      // Get response from ChatGPT
      const response = await fetchChatGptResponse(updatedHistory);
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'tutor',
        name: 'Dr. Williams',
        message: response,
        time: formattedTime
      };
      
      // Add to conversation history
      setChatHistory([
        ...updatedHistory,
        { role: 'assistant', content: response }
      ]);
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message to ChatGPT:', error);
      setIsTyping(false);
      toast.error('Failed to get a response. Please try again.');
    }
  };
  
  // Function to fetch response from ChatGPT API
  const fetchChatGptResponse = async (history) => {
    try {
      // Using the email associated with your OpenAI account (comesolutionco902@gmail.com)
      // This is a real API key for demonstration purposes
      const API_KEY = "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";
      
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: history,
          temperature: 0.7,
          max_tokens: 500
        }, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        return response.data.choices[0].message.content;
      } catch (apiError) {
        console.error('OpenAI API error:', apiError);
        // Fall back to simulation if API fails
        return getFallbackResponse(history);
      }
    } catch (error) {
      console.error('Error in ChatGPT API call:', error);
      throw new Error('Failed to get a response from ChatGPT');
    }
  };
  
  // Fallback function for when API is not available
  const getFallbackResponse = (history) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lastUserMessage = history[history.length - 1].content.toLowerCase();
        
        if (lastUserMessage.includes('hello') || lastUserMessage.includes('hi')) {
          resolve("Hello! I'm Dr. Williams. I'm here to help with your academic questions. What subject are you studying?");
        } else if (lastUserMessage.includes('nice to meet you')) {
          resolve("Nice to meet you too! How can I assist with your studies today?");
        } else if (lastUserMessage.includes('calculus')) {
          resolve("Calculus is a fascinating subject! Are you working on limits, derivatives, integrals, or something else?");
        } else if (lastUserMessage.includes('physics')) {
          resolve("Physics problems often require a methodical approach. What specific concept are you studying? Mechanics, electromagnetism, thermodynamics?");
        } else if (lastUserMessage.includes('thank')) {
          resolve("You're welcome! Feel free to ask if you have any other questions.");
        } else if (lastUserMessage.includes('adfasdf') || /^\s*[a-z]{1,8}\s*$/.test(lastUserMessage)) {
          resolve("I'm not sure I understand. Could you please provide a clear question about the subject you're studying?");
        } else {
          resolve("That's an interesting question. Could you provide more details so I can better assist you?");
        }
      }, 1500);
    });
  };
  
  return (
    <div className="min-h-[calc(100dvh-40px)]">
      <header className="mb-8">
        <h1 className="text-4xl text-teal-700 font-bold text-center flex flex-col md:flex-row gap-4 justify-center">
          <Fade duration={100} triggerOnce={true} cascade>Welcome to</Fade>
          <Fade duration={100} triggerOnce={true} cascade>Learn Sharp </Fade>
          <Fade duration={100} triggerOnce={true} cascade>Dashboard</Fade>
        </h1>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 mb-10">
        {/* First row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Quiz Feature Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
          <h2 className="text-2xl font-bold text-teal-700 mb-3">Quiz System</h2>
          <p className="text-gray-600 mb-4 flex-grow">Create timed quizzes for students or take quizzes assigned to you.</p>
          <div className="mt-auto flex gap-3">
              <Link href="/dashboard/tutor/create-quiz" className="w-1/2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-center">
              Create Quiz
            </Link>
              <Link href="/dashboard/quizzes/take" className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center">
              Take Quiz
            </Link>
          </div>
        </div>
        
        {/* Virtual Classroom Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
          <h2 className="text-2xl font-bold text-teal-700 mb-3">Virtual Classroom</h2>
          <p className="text-gray-600 mb-4 flex-grow">Create virtual classrooms and invite students using shareable links.</p>
          <div className="mt-auto flex gap-3">
              <Link href="/dashboard/classrooms/create" className="w-1/2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-center">
              Create Classroom
            </Link>
              <Link href="/dashboard/classrooms/join" className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center">
              Join Classroom
            </Link>
          </div>
        </div>
        
          {/* Payment Method Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">Payment Method</h2>
            <p className="text-gray-600 mb-4 flex-grow">Manage your payment methods for tuition fees and subscriptions.</p>
            <div className="mt-auto flex">
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-center flex items-center justify-center"
              >
                <FaCreditCard className="mr-2" /> Add Payment Method
              </button>
            </div>
          </div>
        </div>

        {/* Second row - Chat card aligned left */}
        <div className="flex justify-start">
          <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">QuickChat</h2>
            <p className="text-gray-600 mb-4 flex-grow">Connect with your tutors or students instantly for real-time discussions.</p>
            <div className="mt-auto flex">
              <button 
                onClick={() => {
                  // Reset chat state when opening the modal
                  setMessages([]);
                  setChatHistory([
                    { role: 'system', content: 'You are Dr. Williams, a helpful and knowledgeable tutor. Provide concise educational assistance to students. Answer questions clearly without repeating yourself. Keep responses educational and helpful.' }
                  ]);
                  setShowChatModal(true);
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
                </svg>
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-teal-700">Add Payment Method</h3>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Payment Type Tabs */}
            <div className="flex mb-6 border-b">
              <button
                className={`py-2 px-4 text-base font-medium ${paymentMethod === 'card' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'}`}
                onClick={() => setPaymentMethod('card')}
              >
                Credit/Debit Card
              </button>
              <button
                className={`py-2 px-4 text-base font-medium ${paymentMethod === 'upi' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'}`}
                onClick={() => setPaymentMethod('upi')}
              >
                UPI/Wallet/Netbanking
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {paymentMethod === 'card' ? (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="cardNumber">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={16}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="expiryDate">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="cvv">
                        CVV *
                      </label>
                      <input
                        type="password"
                        id="cvv"
                        name="cvv"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={4}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="nameOnCard">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      id="nameOnCard"
                      name="nameOnCard"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="John Doe"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="billingAddress">
                      Billing Address <span className="text-gray-500 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="billingAddress"
                      name="billingAddress"
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter your billing address"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="upiId">
                    UPI ID / Wallet / Netbanking ID *
                  </label>
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="yourname@upi"
                    value={formData.upiId}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-white md:bg-black md:bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full md:max-w-3xl h-screen md:h-[80vh] md:rounded-lg flex flex-col">
            {/* Chat Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center">
                <h3 className="font-bold text-gray-800">AI Tutor Chat</h3>
              </div>
              <button 
                onClick={() => {
                  setShowChatModal(false);
                  // Clear messages when closing to prevent duplicate issues
                  setMessages([]);
                  setChatHistory([
                    { role: 'system', content: 'You are Dr. Williams, a helpful and knowledgeable tutor. Provide concise educational assistance to students. Answer questions clearly without repeating yourself. Keep responses educational and helpful.' }
                  ]);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 my-8">
                    <p>Start a conversation with your AI tutor.</p>
                    <p className="text-sm mt-2">You can ask questions about your homework or studies.</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`${msg.sender === 'student' ? 'flex justify-end' : 'flex justify-start'}`}
                    >
                      <div 
                        className={`relative max-w-xl rounded-lg p-4 ${
                          msg.sender === 'student' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium">{msg.name}</span>
                          <span className="text-xs ml-2 opacity-75">{msg.time}</span>
                        </div>
                        <p className="whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </div>
                  ))
                )}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Chat Input */}
            <form 
              onSubmit={sendMessage} 
              className="border-t p-4 flex items-center"
            >
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="ml-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                disabled={!newMessage.trim() || isTyping}
              >
                <FaPaperPlane />
                <span className="ml-2 hidden md:inline">Send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;