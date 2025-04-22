// FAQAccordion.js
import React, { useState } from 'react';

const FAQAccordion = () => {
  const faqData = [
    {
      question: "Q1: How do I request a tutor?",
      answer: "To request a tutor, simply fill out the form on the left side of this page.",
    },
    {
      question: "Q2: What subjects do you offer tutoring for?",
      answer: "We offer tutoring for a wide range of subjects, including English, Bangla, Hindi, Math, Science, and History.",
    },
    {
      question: "Q3: How long does it take for a representative to contact me?",
      answer: "Our representative will contact you within 24 hours of submitting the form.",
    },
    {
      question: "Q4: Are the tutors qualified?",
      answer: "Yes, all our tutors are highly qualified and experienced in their respective subjects.",
    },
    {
      question: "Q5: Is there a fee for requesting a tutor?",
      answer: "No, there is no fee for requesting a tutor. Our service is free of charge.",
    },
    {
      question: "Q6: Can I choose the specific tutor I want?",
      answer: "Yes, you can specify your preference for a tutor, and we will do our best to match you with the right tutor.",
    },
  ];

  // State to track which FAQ item is open
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="w-10/12 mx-auto">
      <h2 className="text-4xl  text-teal-500 font-bold">FAQ</h2>
      <div className="mt-4">
        {faqData.map((item, index) => (
          <div key={index} className="mb-4">
            <div
              className="cursor-pointer flex justify-between items-center"
              onClick={() => toggleItem(index)}
            >
              <h3 className="text-xl text-teal-600 font-semibold">{item.question}</h3>
              <span className={`transition-transform transform ${openItem === index ? 'rotate-180' : ''}`}>▼</span>
            </div>
            {openItem === index && (
              <p className="text-lg mt-2">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
