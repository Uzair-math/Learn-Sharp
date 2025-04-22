// import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TuitionTypes from "@/components/Home/TuitionTypes" 

describe('TuitionTypes', () => {
  it('should have "Tuition Types" heading text', () => {
    render(<TuitionTypes />) // ARRANGE 
    const headingText = screen.getByText('Tuition Types') // ACT 
    expect(headingText).toBeInTheDocument() // ASSERT
  })
  it('should have "Find the Best Tuition Type which suit you most." sub-heading text', () => {
    render(<TuitionTypes />) // ARRANGE 
    const subHeadingText = screen.getByText('Find the Best Tuition Type which suit you most.') // ACT 
    expect(subHeadingText).toBeInTheDocument() // ASSERT
  })
  it('should have "Home Tutoring" text', () => {
    render(<TuitionTypes />) // ARRANGE 
    const text = screen.getByText('Home Tutoring') // ACT 
    expect(text).toBeInTheDocument() // ASSERT
  })
  it('should have "Online Tutoring" text', () => {
    render(<TuitionTypes />) // ARRANGE 
    const text = screen.getByText('Online Tutoring') // ACT 
    expect(text).toBeInTheDocument() // ASSERT
  })
  it('should have "Group Tutoring" text', () => {
    render(<TuitionTypes />) // ARRANGE 
    const text = screen.getByText('Group Tutoring') // ACT 
    expect(text).toBeInTheDocument() // ASSERT
  })
})