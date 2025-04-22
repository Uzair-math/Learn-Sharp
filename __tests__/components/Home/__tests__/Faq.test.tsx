// FAQAccordion.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQAccordion from '@/components/TutorRequest/FAQ';

describe('FAQAccordion', () => {
    it('renders FAQ questions', () => {
        render(<FAQAccordion />);

        const questions = screen.getAllByText(/Q\d:/);
        expect(questions).toHaveLength(6);
    });

    it('renders FAQ questions', () => {
        render(<FAQAccordion />);

        const questions = screen.getAllByText((content, element) => {
            return element.tagName.toLowerCase() === 'h3' && /Q\d:/.test(content);
        });
        expect(questions).toHaveLength(6);
    });
    it('toggles FAQ answers when clicking on questions', () => {
        render(<FAQAccordion />);
        
        const firstQuestion = screen.getByText(/Q1:/);
        fireEvent.click(firstQuestion);
        
        // Find the corresponding answer based on the question text
        const firstAnswer = screen.getByText("To request a tutor, simply fill out the form on the left side of this page.");
        expect(firstAnswer).toBeInTheDocument();
      
        fireEvent.click(firstQuestion);
        expect(firstAnswer).not.toBeInTheDocument();
      });

});
