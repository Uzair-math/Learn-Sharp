import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SuccessStory from '@/components/Home/SuccessStory';

describe('SuccessStory Component', () => {
  it('renders the component', () => {
    render(<SuccessStory />);
    expect(screen.getByText("Success Story: Learn Sharp 's Impact and Growth")).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Image of John Smith' })).toBeInTheDocument();
  });

  it('checks for specific content', () => {
    render(<SuccessStory />);
    expect(screen.getByText('John\'s Remarkable Progress')).toBeInTheDocument();
    expect(screen.getByText('Susan\'s Language Mastery')).toBeInTheDocument();
    expect(screen.getByText('James\' Academic Resilience')).toBeInTheDocument();
  });

    it('renders images with correct alt text', () => {
    render(<SuccessStory />);
    expect(screen.getByAltText('Image of John Smith')).toBeInTheDocument();
    expect(screen.getByAltText('Image of Susan Gray')).toBeInTheDocument();
    expect(screen.getByAltText('Image of James Patterson')).toBeInTheDocument();
  });

});
