"use client"
import useAuth from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

const HiredTutors = () => {

	const { user } = useAuth();
	const [studentHiredBooking, setStudentHiredBooking] = useState([]);
	useEffect(() => {
		const fetchHiredBooking = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/get-booking?student_email=${user?.email}&is_accepted=true`,
					{
						cache: "no-store",
					}
				);
				const data = await res.json();
				// console.log(data);
				setStudentHiredBooking(data);
			} catch (error) {
				console.error("Error fetchHiredBooking data:", error);
			}
		};

		fetchHiredBooking();
	}, [user?.email]);
	//   console.log(studentHiredBooking);  

	return (
		<>
			<header>
				<h1 className="text-5xl text-teal-700 font-bold text-center mt-4 lg:mt-8">
					<Fade duration={200} triggerOnce={true} cascade>Hired Tutors</Fade>
				</h1>
			</header>
			<section className="max-w-7xl mx-auto mt-4 lg:mt-8 p-4 md:px-0">

				<div>
					<h1 className="text-3xl font-bold text-center mb-6">Total Hired Tutors: {studentHiredBooking?.length}</h1>
				</div>

				<div className="relative overflow-x-auto">
					<table className="border-2 border-slate-200 w-full text-sm text-left text-gray-1000 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									#
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Name
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Email
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Mobile Number
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Subject <br /> Name
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Class <br /> Name
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Location
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Salary <br /> (Per Month)
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Tuition <br /> Days
								</th>
							</tr>
						</thead>
						<tbody>
							{
								studentHiredBooking?.map((hire, index) => (
									<tr
										key={hire?._id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<td className="px-2 py-2 whitespace-nowrap text-center border-r-2">
											{index + 1}
										</td>
										<td className="px-2 py-2 border-r-2">
											{hire?.tutor_name}
										</td>
										<td className="px-2 py-2 border-r-2">
											{hire?.tutor_email}
										</td>
										<td className="px-2 py-2 border-r-2">
											{hire?.mobile}
										</td>
										<td className="px-2 py-2 border-r-2">
											{hire?.subject}
										</td>
										<td className="px-2 py-2 border-r-2">
											{hire?.class_name}
										</td>
										<td className="px-2 py-2 border-r-2">
											{hire?.service_location}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{hire?.salary}
										</td>
										<td className="px-2 py-2 border-r-2">
											{hire?.available_days}
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>

			</section>
		</>
	);
};

export default HiredTutors;