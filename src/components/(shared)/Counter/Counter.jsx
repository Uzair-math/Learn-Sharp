"use client"
import React, { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const Counter = ({ number }) => {
	const [counterOn, setCounterOn] = useState(false);

	const handleEnter = () => {
		setCounterOn(true);
	};

	const handleExit = () => {
		setCounterOn(false);
	};

	return (
		<div>
			<ScrollTrigger onEnter={handleEnter} onExit={handleExit}>
				<div>
					{counterOn && (
						<CountUp start={0} decimals={Number.isInteger(number) ? 0 : 1} end={number} duration={2} delay={0} />
					)}
				</div>
			</ScrollTrigger>
		</div>
	);
};

export default Counter;
