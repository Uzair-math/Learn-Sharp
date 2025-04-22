// import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Testimonial from "@/components/Home/Testimonial"

// Mock the @smastrom/react-rating library
jest.mock("@smastrom/react-rating", () => {
  const React = require("react");
  return {
    Rating: jest.fn().mockImplementation(() => <div data-testid="mock-rating" />),
  };
});

describe('Testimonial', () => {
  it('should have figure with test id "testimonial-figure-element1"', () => {
    render(<Testimonial />) // ARRANGE 
    const figure1 = screen.getByTestId('testimonial-figure-element1') // ACT 
    expect(figure1).toBeInTheDocument() // ASSERT
  })
  it('should have figure with test id "testimonial-figure-element2"', () => {
    render(<Testimonial />) // ARRANGE 
    const figure2 = screen.getByTestId('testimonial-figure-element2') // ACT 
    expect(figure2).toBeInTheDocument() // ASSERT
  })
  it('should have "Jese Leos" text', () => {
    render(<Testimonial />) // ARRANGE 
    const myElem = screen.getByText('Jese Leos') // ACT 
    expect(myElem).toBeInTheDocument() // ASSERT
  })
})