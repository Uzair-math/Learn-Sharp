"use client"
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';
import { GrValidate } from 'react-icons/gr';
import { LuShieldClose } from 'react-icons/lu';

const MyBookings = () => {
	const { user } = useAuth();
	const [tutorBookings, setTutorBookings] = useState([]);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	useEffect(() => {
		const fetchTutorBooking = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/get-booking?tutor_email=${user?.email}`,
					{
						cache: "no-store",
					}
				);
				const data = await res.json();
				// console.log(data);
				setTutorBookings(data);
			}
			catch (error) {
				console.error("Error fetch Student Booking data:", error);
			}
		};

		fetchTutorBooking();
	}, [user?.email]);
	// console.log(tutorBooking);

	const handleAdminBtn = (id, value) => {

		const fetchAdminBtn = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/manageBooking?id=${id}&controlAdminBtn=${value}`, {
					method: "PATCH",
					cache: "no-store"
				});
				if (res.status === 200) {
					toast.success("User action successful!")
				}
				startTransition(() => {
					// console.log({ router })
					router.refresh();
				})
				// const data = await res.json();
			}
			catch (error) {
				console.error('Error in fetching: ', error);
			}
		};
		fetchAdminBtn();
	};
	return (
		<>
			<header>
				<h1 className="text-5xl text-teal-700 font-bold text-center mt-4 lg:mt-8">
					<Fade duration={200} triggerOnce={true} cascade>My Bookings</Fade>
				</h1>
			</header>
			<section className="max-w-7xl mx-auto mt-4 lg:mt-8 p-4 md:px-0">
				<div>
					<h1 className="text-3xl font-bold text-center mb-6">Total Bookings: {tutorBookings?.length}</h1>
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
									Student&apos;s <br /> Name
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Student&apos;s <br /> Email
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Mobile <br /> Number
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Subject <br /> Name
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Class <br /> Name
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Student&apos;s Location
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Salary <br /> (Per Month)
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Tuition <br /> Days
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2"
								>
									Acceptance <br /> Status
								</th>
								<th
									scope="col"
									className="text-center bg-gray-100 px-3 py-4 border-b-2"
								>
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{tutorBookings?.map((booking, index) => (
								<tr
									key={booking?._id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								>
									<td className="px-2 py-2 whitespace-nowrap text-center border-r-2">
										{index + 1}
									</td>
									<td className="px-2 py-2 border-r-2">
										{booking?.student_name}
									</td>
									<td className="px-2 py-2 border-r-2">
										{booking?.student_email}
									</td>
									<td className="px-2 py-2 border-r-2">
										{booking?.student_mobile_number}
									</td>
									<td className="px-2 py-2 border-r-2">{booking?.subject}</td>
									<td className="px-2 py-2 border-r-2">
										{booking?.class_name}
									</td>
									<td className="px-2 py-2 border-r-2">
										{booking?.student_location}
									</td>
									<td className="px-2 py-2 text-center border-r-2">
										{booking?.salary}
									</td>
									<td className="px-2 py-2 border-r-2">
										{booking?.available_days}
									</td>
									<td className="px-2 py-2 text-center border-r-2">
										{booking?.isAccepted === true ? "Accepted" : booking?.isAccepted === false ? "Rejected" : "Pending"}
									</td>
									<td className="px-2 py-2 text-center border-r-2">
										<button
											onClick={() => handleAdminBtn(booking?._id, "approve")}
											type="button"
											className="flex w-40 mx-auto justify-center items-center text-white bg-gradient-to-br from-green-500 to-green-600 transition-all hover:duration-300 hover:from-green-600 hover:to-green-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700"
											disabled={booking?.isAccepted}
										>
											<GrValidate className="gr-icon w-4 h-4 mr-2" />
											Approve
										</button>
										<button
											onClick={() => handleAdminBtn(booking?._id, "deny")}
											type="button"
											className="flex w-40 mx-auto mt-2 justify-center items-center text-white bg-gradient-to-br from-red-500 to-red-600 transition-all hover:duration-300 hover:from-red-600 hover:to-red-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700"
											disabled={booking?.isAccepted ? false : true}
										>
											<LuShieldClose className="gr-icon w-4 h-4 mr-2" />
											Deny
										</button>
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

export default MyBookings;
