"use client"
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { FiDelete } from 'react-icons/fi';
import { VscFeedback } from 'react-icons/vsc';
import FeedbackModal from "./FeedbackModal";
import Swal from 'sweetalert2';
import { Fade } from 'react-awesome-reveal';

const MyInbox = () => {
	const { user } = useAuth();
	const [tutorMessages, setTutorMessages] = useState([]);
	const [isPending, startTransition] = useTransition()
	const router = useRouter();

	useEffect(() => {
		const fetchTutorMessages = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/get-messages?tutor_email=${user?.email}`,
					{
						cache: "no-store",
					}
				);
				const data = await res.json();
				// console.log(data);
				setTutorMessages(data);
			} catch (error) {
				toast.error("Error fetching data: ", error);
			}
		};

		fetchTutorMessages();
	}, [user?.email]);
	// console.log(tutorMessages)

	const handleDelete = async (id) => {

		Swal.fire({
			title: 'Are you sure?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
				const deleteMessage = async () => {
					try {
						const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/deleteMessage?id=${id}`, {
							method: "DELETE",
							cache: "no-store"
						})
						if (res.status === 400) {
							toast.error("Error deleting message!")
						}
						if (res.status === 200) {
							toast.success("Deletion successful!")
							startTransition(() => {
								router.refresh();
							})
						}
					} catch (error) {
						toast.error("Error deleting message!");
					}
				}

				deleteMessage();
			}
		})

	}

	// Feedback Modal Open/Close State
	const [isOpen, setIsOpen] = useState(false);

	// Feedback Loading/Processing State
	const [processing, setProcessing] = useState(false);

	// Setting Class ID for Feedback
	const [feedbackID, setFeedbackID] = useState("");

	// Opening Feedback Modal
	const openModal = () => {
		setIsOpen(true);
	};

	// Closing Feedback Modal
	const closeModal = () => {
		setIsOpen(false);
	};

	const handleFeedback = (messageID) => {
		openModal();
		// console.log("Feedback ID: ", messageID);
		setFeedbackID(messageID);
	};

	return (
		<>
			<header>
				<h1 className="text-5xl text-teal-700 font-bold text-center mt-4 lg:mt-8">
					<Fade duration={200} triggerOnce={true} cascade>My Inbox</Fade>
				</h1>
			</header>
			<section className="max-w-7xl mx-auto mt-4 lg:mt-8 p-4 md:px-0">

			<div>
					<h1 className="text-3xl font-bold text-center mb-6">Total Messages: {tutorMessages?.length}</h1>
			</div>

				<div className="relative overflow-x-auto">
					<table className="border-2 border-slate-200 w-full text-sm text-left text-gray-1000 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									#
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Student&apos;s Name
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Email
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Mobile Number
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Gender
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Location
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Subject
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Class
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Details
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									My Feedback
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{
								tutorMessages?.map((message, index) => (
									<tr
										key={message?._id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<td className="px-2 py-2 whitespace-nowrap text-center border-r-2">
											{index + 1}
										</td>
										<td className="px-2 py-2 border-r-2">
											{message?.student_name}
										</td>
										<td className="px-2 py-2 border-r-2">
											{message?.student_email}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{message?.student_mobile_no}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{message?.student_gender}
										</td>
										<td className="px-2 py-2 border-r-2">
											{message?.student_location}
										</td>
										<td className="px-2 py-2 border-r-2">
											{message?.subject_name}
										</td>
										<td className="px-2 py-2 border-r-2">
											{message?.class_name}
										</td>
										<td className="px-2 py-2 border-r-2">
											{message?.details}
										</td>
										<td className="px-2 py-2 border-r-2">
											{message?.tutor_feedback}
										</td>
										<td className="px-2 py-2 border-r-2">
											<button onClick={() => handleDelete(message?._id)} type="button" className="flex w-44 mx-auto justify-center items-center text-white bg-gradient-to-br from-red-500 to-red-600 transition-all hover:duration-300 hover:from-red-600 hover:to-red-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700" disabled={false}>
												<FiDelete className='gr-icon w-4 h-4 mr-2' />
												Delete
											</button>
											{
												message?.tutor_feedback ?
													<button onClick={() => handleFeedback(message?._id)} type="button" className="flex w-44 mx-auto mt-2 justify-center items-center text-white bg-gradient-to-br from-teal-500 to-teal-600 transition-all hover:duration-300 hover:from-teal-600 hover:to-teal-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-teal-200 dark:focus:ring-teal-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700">
														<VscFeedback className='gr-icon w-4 h-4 mr-2' />
														Update Feedback
													</button>
													:
													<button onClick={() => handleFeedback(message?._id)} type="button" className="flex w-44 mx-auto mt-2 justify-center items-center text-white bg-gradient-to-br from-blue-500 to-blue-600 transition-all hover:duration-300 hover:from-blue-600 hover:to-blue-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700">
														<VscFeedback className='gr-icon w-4 h-4 mr-2' />
														Send Feedback
													</button>
											}
										</td>
									</tr>
								))
							}

						</tbody>
					</table>
				</div>

			</section>

			{/* FeedbackModal */}
			<FeedbackModal isOpen={isOpen} openModal={openModal} closeModal={closeModal} feedbackID={feedbackID} processing={processing} setProcessing={setProcessing}></FeedbackModal>
		</>
	);
};

export default MyInbox;