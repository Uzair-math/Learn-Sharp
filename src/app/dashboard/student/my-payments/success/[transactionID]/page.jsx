"use client"
import Lottie from "lottie-react";
import { Fade } from 'react-awesome-reveal';
import PaymentSuccessAnimation from '@/assets/lottie/payment-success.json';

const PaymentSuccess = ({ params: { transactionID } }) => {

	return (
		<>
			<div className="min-h-[calc(100dvh-40px)] grid place-content-center">
				<header>
					<h1 className="mt-2 md:mt-4 text-4xl text-teal-700 font-bold text-center">
						<Fade duration={100} triggerOnce={true} cascade>Payment Status</Fade>
					</h1>
					<h2 className="mt-4 md:mt-6 text-2xl font-bold text-center mb-6 text-green-500">Payment Successful with Transaction ID: {transactionID}</h2>
				</header>
				<Lottie className="max-w-2xl mx-auto w-full" animationData={PaymentSuccessAnimation} loop={true} />
			</div>
		</>
	);
};

export default PaymentSuccess;