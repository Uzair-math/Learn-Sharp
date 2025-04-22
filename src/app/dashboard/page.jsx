"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { FaCheckCircle, FaCreditCard, FaMoneyBill, FaPlusCircle, FaTrashAlt, FaChartBar, FaChartPie, FaChartLine, FaCalendarAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { user, userRole, loading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const section = searchParams.get('section');
  
  const [activeSection, setActiveSection] = useState('overview');
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [savedMethods, setSavedMethods] = useState([]);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
    upiId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update active section whenever the URL parameter changes
  useEffect(() => {
    console.log("Section param:", section);
    if (section) {
      setActiveSection(section);
    } else {
      setActiveSection('overview');
    }
  }, [section, searchParams]);

  // Payment Method functions
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

    // Simulate adding payment method
    setTimeout(() => {
      // Add masked card number or UPI for display
      const newMethod = {
        id: Date.now(),
        type: paymentMethod,
        ...(paymentMethod === 'card' 
          ? {
              cardNumber: `**** **** **** ${formData.cardNumber.slice(-4)}`,
              nameOnCard: formData.nameOnCard,
              expiryDate: formData.expiryDate
            } 
          : { 
              upiId: formData.upiId 
            }
        ),
        isDefault: savedMethods.length === 0
      };

      setSavedMethods([...savedMethods, newMethod]);
      setIsAddingPayment(false);
      setIsSubmitting(false);
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

  const handleDelete = (id) => {
    setSavedMethods(savedMethods.filter(method => method.id !== id));
    toast.success("Payment method removed");
  };

  const setAsDefault = (id) => {
    setSavedMethods(savedMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    toast.success("Default payment method updated");
  };

  // Render payment methods section
  const renderPaymentMethodsSection = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-teal-700 mb-6">Payment Methods</h2>
        
        {/* Saved Payment Methods */}
        {savedMethods.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Saved Payment Methods</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {savedMethods.map((method) => (
                <div key={method.id} className="border rounded-lg p-4 bg-white shadow-sm relative hover:shadow-md transition-shadow">
                  {method.isDefault && (
                    <span className="absolute top-2 right-2 text-teal-600 text-xs flex items-center">
                      <FaCheckCircle className="mr-1" /> Default
                    </span>
                  )}
                  <div className="flex items-center mb-3">
                    {method.type === 'card' ? (
                      <FaCreditCard className="text-teal-600 mr-3 text-xl" />
                    ) : (
                      <FaMoneyBill className="text-teal-600 mr-3 text-xl" />
                    )}
                    <div>
                      <h3 className="font-medium">
                        {method.type === 'card' ? 'Credit/Debit Card' : 'UPI'}
                      </h3>
                      {method.type === 'card' ? (
                        <p className="text-gray-600">{method.cardNumber}</p>
                      ) : (
                        <p className="text-gray-600">{method.upiId}</p>
                      )}
                      {method.type === 'card' && (
                        <p className="text-sm text-gray-500">
                          {method.nameOnCard} | Expires: {method.expiryDate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex mt-2 gap-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => setAsDefault(method.id)}
                        className="text-sm bg-teal-50 hover:bg-teal-100 text-teal-600 py-1 px-3 rounded border border-teal-200"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(method.id)}
                      className="text-sm bg-red-50 hover:bg-red-100 text-red-600 py-1 px-3 rounded border border-red-200"
                    >
                      <FaTrashAlt className="inline mr-1" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isAddingPayment ? (
          <div className="mb-8">
            <button
              onClick={() => setIsAddingPayment(true)}
              className="flex items-center bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition duration-300"
            >
              <FaPlusCircle className="mr-2" /> Add Payment Method
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Payment Method</h3>
            
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
                UPI/Wallet
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-2xl">
              {paymentMethod === 'card' ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="cardNumber">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      className="shadow-sm border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength="16"
                    />
                  </div>
                  
                  <div className="flex flex-wrap mb-4 -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="expiryDate">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        className="shadow-sm border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
                        CVV *
                      </label>
                      <input
                        type="password"
                        id="cvv"
                        name="cvv"
                        className="shadow-sm border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="123"
                        maxLength="4"
                        value={formData.cvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="nameOnCard">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      id="nameOnCard"
                      name="nameOnCard"
                      className="shadow-sm border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="John Doe"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="billingAddress">
                      Billing Address <span className="text-gray-500 font-normal text-sm">(optional)</span>
                    </label>
                    <textarea
                      id="billingAddress"
                      name="billingAddress"
                      className="shadow-sm border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your billing address"
                      rows="3"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </>
              ) : (
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="upiId">
                    UPI ID / Wallet / Netbanking *
                  </label>
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    className="shadow-sm border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="yourname@upi"
                    value={formData.upiId}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-300"
                  onClick={() => setIsAddingPayment(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded transition duration-300 flex items-center"
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
        )}
        
        {/* Security Note */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
          <p className="text-blue-700">
            <strong>Security Note:</strong> Your payment information is securely processed and stored according to PCI DSS standards.
          </p>
        </div>
      </div>
    );
  };

  // Render dashboard content
  const renderDashboardContent = () => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-gray-700 mb-4">Welcome, {user?.displayName || 'User'}!</h2>
        <p className="text-gray-600 mb-4">
          Welcome to your Learn Sharp  dashboard. This is your central hub for managing all your education activities.
        </p>
        
        {/* Analytics Overview */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Analytics Overview</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Courses */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center">
              <div className="p-3 bg-blue-500 text-white rounded-lg mr-4">
                <FaChartBar className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Courses</p>
                <p className="text-xl font-bold text-gray-800">12</p>
              </div>
            </div>
            
            {/* Completed Courses */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-center">
              <div className="p-3 bg-green-500 text-white rounded-lg mr-4">
                <FaCheckCircle className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-xl font-bold text-gray-800">8</p>
              </div>
            </div>
            
            {/* Hours Spent */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex items-center">
              <div className="p-3 bg-purple-500 text-white rounded-lg mr-4">
                <FaChartLine className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Hours Spent</p>
                <p className="text-xl font-bold text-gray-800">47.5</p>
              </div>
            </div>
            
            {/* Upcoming Sessions */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-center">
              <div className="p-3 bg-yellow-500 text-white rounded-lg mr-4">
                <FaCalendarAlt className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-xl font-bold text-gray-800">3</p>
              </div>
            </div>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Progress Chart */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                <FaChartPie className="mr-2 text-teal-600" /> Learning Progress
              </h4>
              <div className="flex items-center justify-center py-4">
                <div className="relative w-32 h-32">
                  {/* Simulated Pie Chart */}
                  <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
                  <div className="absolute inset-0 rounded-full border-8 border-teal-400" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 0, 50% 0)' }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-gray-200" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 100%, 50% 100%)' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">75%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm mt-2">
                <div className="text-blue-500">
                  <p className="font-bold">45%</p>
                  <p>Completed</p>
                </div>
                <div className="text-teal-500">
                  <p className="font-bold">30%</p>
                  <p>In Progress</p>
                </div>
                <div className="text-gray-500">
                  <p className="font-bold">25%</p>
                  <p>Not Started</p>
                </div>
              </div>
            </div>
            
            {/* Weekly Activity */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                <FaChartBar className="mr-2 text-teal-600" /> Weekly Activity
              </h4>
              <div className="h-48 flex items-end justify-between px-2">
                {/* Simulated Bar Chart */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                  const heights = ['30%', '45%', '80%', '60%', '75%', '40%', '20%'];
                  return (
                    <div key={day} className="flex flex-col items-center">
                      <div 
                        className="w-6 bg-teal-400 rounded-t-md transition-all duration-300 hover:bg-teal-600"
                        style={{ height: heights[i] }}
                      ></div>
                      <span className="text-xs mt-1 text-gray-500">{day}</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-center text-sm mt-2 text-gray-500">
                <p>Total: <span className="font-bold text-teal-600">12.5 hours</span> this week</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
            <h3 className="font-medium text-teal-700 mb-2">Quick Actions</h3>
            <ul className="text-gray-600">
              <li className="mb-2">• View your tutors</li>
              <li className="mb-2">• Manage payments</li>
              <li className="mb-2">• Check messages</li>
            </ul>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-700 mb-2">Recent Activity</h3>
            <p className="text-gray-600">No recent activities to display.</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="font-medium text-purple-700 mb-2">Upcoming Sessions</h3>
            <p className="text-gray-600">No upcoming sessions scheduled.</p>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // Main layout
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Dashboard</h1>
      
      <div className="flex flex-col gap-6">
        {/* Conditional rendering based on section */}
        {section === 'payment-methods' ? (
          // Payment Methods section
          <div className="w-full">
            {renderPaymentMethodsSection()}
          </div>
        ) : (
          // Default Dashboard Content
          <div className="w-full">
            {renderDashboardContent()}
          </div>
        )}
      </div>

      {/* For debugging */}
      <div className="mt-4 text-sm text-gray-500 hidden">
        Active Section: {activeSection}, URL Parameter: {section || 'none'}
      </div>
    </div>
  );
};

export default Dashboard; 