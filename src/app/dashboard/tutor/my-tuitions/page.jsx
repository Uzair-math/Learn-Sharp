"use client"
import useAuth from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

const MyTuitions = () => {
	const { user } = useAuth();
	const [myTuitions, setMyTuitions] = useState([]);
	useEffect(() => {
		const fetchMyTuitions = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/get-tuitions?email=${user?.email}`,
					{
						cache: "no-store",
					}
				);
				const data = await res.json();
				// console.log(data);
				setMyTuitions(data);
			} catch (error) {
				console.error("Error fetchStudentBooking data:", error);
			}
		};

		fetchMyTuitions();
	}, [user?.email]);
	// console.log(myTuitions)
	return (

		<>
			<header>
				<h1 className="text-5xl text-teal-700 font-bold text-center mt-4 lg:mt-8">
					<Fade duration={200} triggerOnce={true} cascade>My Tuitions</Fade>
				</h1>
			</header>
			<section className="max-w-7xl mx-auto mt-4 lg:mt-8 p-4 md:px-0">

				<div>
					<h1 className="text-3xl font-bold text-center mb-6">Total Registered Tuitions: {myTuitions?.length}</h1>
				</div>

				<div className="relative overflow-x-auto">
					<table className="border-2 border-slate-200 w-full text-sm text-left text-gray-1000 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									#
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
									Salary<br /> (Per Month)
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Available <br /> Days
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Acceptance <br /> Status
								</th>
							</tr>
						</thead>
						<tbody>
							{
								myTuitions?.map((tuition, index) => (
									<tr
										key={tuition?._id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<td className="px-2 py-2 whitespace-nowrap text-center border-r-2">
											{index + 1}
										</td>
										<td className="px-2 py-2 border-r-2">
											{tuition?.subject}
										</td>
										<td className="px-2 py-2 border-r-2">
											{tuition?.class_name}
										</td>
										<td className="px-2 py-2 border-r-2">
											{tuition?.service_location}
										</td>
										<td className="px-2 py-2 border-r-2 text-center">
											{tuition?.salary}
										</td>
										<td className="px-2 py-2 border-r-2">
											{tuition?.available_days}
										</td>
										<td className="px-2 py-2 border-r-2 text-center">
											{tuition?.isVerified === true ? "Accepted" : tuition?.isVerified === false ? "Rejected" : "Pending"}
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

export default MyTuitions;