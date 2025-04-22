// import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Statistics from "@/components/Home/Statistics" 

describe('Statistics', () => {
  it('should have "Statistics" heading text', () => {
    render(<Statistics />) // ARRANGE 
    const headingText = screen.getByText('Statistics') // ACT 
    expect(headingText).toBeInTheDocument() // ASSERT
  })
  it('should have "Statistics Showcase: Learn Sharp \'s Impact and Growth" sub-heading text', () => {
    render(<Statistics />) // ARRANGE 
    const subHeadingText = screen.getByText('Statistics Showcase: Learn Sharp \'s Impact and Growth') // ACT 
    expect(subHeadingText).toBeInTheDocument() // ASSERT
  })
  it('should have "Total Applied" text', () => {
    render(<Statistics />) // ARRANGE 
    const text = screen.getByText('Total Applied') // ACT 
    expect(text).toBeInTheDocument() // ASSERT
  })
  it('should have "Live Tuition Jobs" text', () => {
    render(<Statistics />) // ARRANGE 
    const text = screen.getByText('Live Tuition Jobs') // ACT 
    expect(text).toBeInTheDocument() // ASSERT
  })
  it('should have "Total Tutors" text', () => {
    render(<Statistics />) // ARRANGE 
    const text = screen.getByText('Total Tutors') // ACT 
    expect(text).toBeInTheDocument() // ASSERT
  })
  it('should have "Average Tutor Rating" text', () => {
    render(<Statistics />) // ARRANGE 
    const text = screen.getByText('Average Tutor Rating') // ACT 
    expect(text).toBeInTheDocument() // ASSERT
  })
})