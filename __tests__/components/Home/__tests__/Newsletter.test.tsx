// import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Newsletter from "@/components/Home/Newsletter" 

describe('Newsletter', () => {
  it('should have Subscribe text', () => {
    render(<Newsletter />) // ARRANGE 
    const myElem = screen.getByText('Subscribe') // ACT 
    expect(myElem).toBeInTheDocument() // ASSERT
  })
  it('should have a input with placeholder text "Enter your email address"', () => {
    render(<Newsletter />) // ARRANGE 
    const input = screen.getByPlaceholderText('Enter your email address')  // ACT 
    expect(input).toBeInTheDocument() // ASSERT
  })
  it('should have a button with text "Subscribe"', () => {
    render(<Newsletter />) // ARRANGE 
    const button = screen.getByRole('button')  // ACT 
    expect(button).toBeInTheDocument() // ASSERT
  })
})