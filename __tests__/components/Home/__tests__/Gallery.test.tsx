// import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Gallery from "@/components/Home/Gallery" 

describe('Gallery', () => {
  it('should have "Photo Gallery" heading text', () => {
    render(<Gallery />) // ARRANGE 
    const headingText = screen.getByText('Photo Gallery') // ACT 
    expect(headingText).toBeInTheDocument() // ASSERT
  })
  it('should have "Empowering Minds through Education: Nurturing Growth with Mentorship" sub-heading text', () => {
    render(<Gallery />) // ARRANGE 
    const subHeadingText = screen.getByText('Empowering Minds through Education: Nurturing Growth with Mentorship') // ACT 
    expect(subHeadingText).toBeInTheDocument() // ASSERT
  })
})