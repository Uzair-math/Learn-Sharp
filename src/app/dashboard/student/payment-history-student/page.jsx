"use client"
import useAuth from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

const PaymentHistoryStudent = () => {

	const { user } = useAuth();

	const [payments, setPayments] = useState([]);

	useEffect(() => {
		const fetchPayments = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/get-payments?student_email=${user?.email}&payment_status=true`,
					{ cache: "no-store" }
				);
				const data = await res.json();
				// console.log(data);
				setPayments(data);
			}
			catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchPayments();
	}, [user?.email]);
	
	return (
		<>
			<header>
				<h1 className="text-5xl text-teal-700 font-bold text-center mt-4 lg:mt-8">
					<Fade duration={200} triggerOnce={true} cascade>Payment History</Fade>
				</h1>
			</header>
			<section className="max-w-7xl mx-auto mt-4 lg:mt-8 p-4 md:px-0">

			<div>
				<h1 className="text-3xl font-bold text-center mb-6">Total Number of Payments: {payments?.length}</h1>
			</div>

			<div className="relative overflow-x-auto">
				<table className="border-2 border-slate-200 w-full text-sm text-left text-gray-1000 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
								#
							</th>
							<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
								Tutor&apos;s <br /> Name
							</th>
							<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
								Tutor&apos;s <br /> Email
							</th>
							<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
								Subject <br /> Name
							</th>
							<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
								Class <br /> Name
							</th>
							<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
								Month <br /> Name
							</th>
							<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
								Paid <br /> Amount
							</th>
							<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
								Payment <br /> Status
							</th>
						</tr>
					</thead>
					<tbody>
							{
								payments?.map((payment, index) => (
									<tr key={payment?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<td className="px-2 py-2 whitespace-nowrap text-center border-r-2">
											{index + 1}
										</td>
										<td className="px-2 py-2 border-r-2">
											{payment?.tutor_name}
										</td>
										<td className="px-2 py-2 border-r-2">
											{payment?.tutor_email}
										</td>
										<td className="px-2 py-2 border-r-2">
											{payment?.subject_name}
										</td>
										<td className="px-2 py-2 border-r-2">
											{payment?.class_name}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{payment?.payment_month}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{payment?.payment_amount}
										</td>
										<td className="px-2 py-2 text-center uppercase border-r-2">
											{payment?.payment_status === true && "Paid"}
										</td>
									</tr>)
								)
							}
					</tbody>
				</table>
			</div>

			</section>
		</>
	);
};

export default PaymentHistoryStudent;