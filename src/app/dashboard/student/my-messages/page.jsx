"use client";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Fade } from "react-awesome-reveal";

const MyMessages = () => {
	
	const { user } = useAuth();
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const fetchAllTuitions = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/get-messages?student_email=${user?.email}`,
					{
						cache: "no-store",
					}
				);
				const data = await res.json();
				// console.log(data);
				setMessages(data);
			} catch (error) {
				console.error("Error fetching mentor data: ", error);
			}
		};

		fetchAllTuitions();
	}, [user?.email]);
	// console.log(messages);
	return (
		<>
			<header>
				<h1 className="text-5xl text-teal-700 font-bold text-center mt-4 lg:mt-8">
					<Fade duration={200} triggerOnce={true} cascade>My Messages</Fade>
				</h1>
			</header>
			<section className="max-w-7xl mx-auto mt-4 lg:mt-8 p-4 md:px-0">

				<div>
					<h1 className="text-3xl font-bold text-center mb-6">Total Messages: {messages?.length}</h1>
				</div>

				<div className="relative overflow-x-auto">
					<table className="border-2 border-slate-200 w-full text-sm text-left text-gray-1000 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									#
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Tutor&apos;s Name
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Email
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Mobile No.
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Gender
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Location
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Qualification
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Subject Name
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Class Name
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Details
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Tutor&apos;s Feedback
								</th>
							</tr>
						</thead>
						<tbody>
							{messages?.map((message, index) => (
								<tr
									key={message?._id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								>
									<td className="px-2 py-2 whitespace-nowrap text-center border-r-2">
										{index + 1}
									</td>
									<td className="px-2 py-2 border-r-2">{message?.tutor_name}</td>
									<td className="px-2 py-2 border-r-2">{message?.tutor_email}</td>
									<td className="px-2 py-2 text-center border-r-2">
										{message?.tutor_mobile_number}
									</td>
									<td className="px-2 py-2 text-center border-r-2">{message?.tutor_gender}</td>
									<td className="px-2 py-2 border-r-2">
										{message?.tutor_location}
									</td>
									<td className="px-2 py-2 border-r-2">
										{message?.tutor_qualification}
									</td>
									<td className="px-2 py-2 border-r-2">{message?.subject_name}</td>
									<td className="px-2 py-2 border-r-2">{message?.class_name}</td>
									<td className="px-2 py-2 border-r-2">
										{message?.details}
									</td>
									<td className="px-2 py-2 border-r-2">
										{message?.tutor_feedback}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</>
	);
};

export default MyMessages;
