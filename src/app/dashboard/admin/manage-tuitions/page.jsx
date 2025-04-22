"use client"
import { Fade } from "react-awesome-reveal";
import Image from "next/image";
import { GrValidate } from "react-icons/gr";
import { LuShieldClose } from "react-icons/lu";
import { VscFeedback } from "react-icons/vsc";
import { useEffect, useState, useTransition } from "react";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FeedbackModal from "./FeedbackModal";

const ManageTutors = () => {
	const [allTuitions, setAllTuitions] = useState([]);
	const { user, loading, userRole } = useAuth();
	const [isPending, startTransition] = useTransition()
	const router = useRouter();

	useEffect(() => {
		const fetchAllTuitions = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/get-tuitions`,
					{
						cache: 'no-store'
					});
				const data = await res.json();
				setAllTuitions(data);
			} 
			catch (error) {
				console.error('Error fetching mentor data:', error);
			}
		};

		fetchAllTuitions();
	}, []);

	
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

	const handleFeedback = (tuitionID) => {
		openModal();
		setFeedbackID(tuitionID);
	};

	const handleAdminBtn = (tuition, value) => {
		// console.log(tuition?._id, value);
		const fetchAdminBtn = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/tuitionStatus?id=${tuition?._id}&controlAdminBtn=${value}`, {
					method: "PATCH",
				},
					{
						cache: 'no-store'
					});
				if (res.status === 200) {
					// Successful response, handle data accordingly
					// setAllUsers(data);
					Swal.fire({
						position: 'top-center',
						icon: 'success',
						title: "Action successful!",
						showConfirmButton: false,
						timer: 1500
					})
					startTransition(() => {
						router.refresh();
					})
					console.log("Tuition verification successful!")

				}
				const data = await res.json();
				// console.log(data)

			} catch (error) {
				console.error('Error in tuition verification! ', error);
			}
		};

		fetchAdminBtn();

	}

	return (
		<>
			<header>
				<h1 className="text-5xl text-teal-700 font-bold text-center mt-4 lg:mt-8">
					<Fade duration={200} triggerOnce={true} cascade>Manage Tuitions</Fade>
				</h1>
			</header>
			<section className="max-w-full mx-auto mt-6 lg:mt-12 p-4 md:px-0">

				<div>
					<h1 className="text-3xl font-bold text-center mb-6">Total Tuitions: {allTuitions?.length}</h1>
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
									Mobile No.
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Gender
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Qualification
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Service <br /> Location
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Subject
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Class
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Salary <br /> (Monthly)
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Verification <br /> Status
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Feedback
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{
								allTuitions.map((tuition, index) => (
									<tr
										key={tuition?._id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<td className="px-2 py-2 whitespace-nowrap text-center border-r-2">
											{index + 1}
										</td>
										<td className="px-2 py-2 whitespace-nowrap border-r-2">
											{tuition?.tutor_name}
										</td>
										<td className="px-2 py-2 whitespace-nowrap text-center border-r-2">
											{tuition?.tutor_email}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{tuition?.mobile}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{tuition?.gender}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{tuition?.qualification}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{tuition?.service_location}
										</td>
										<td className="px-2 py-2 text-center uppercase border-r-2">
											{tuition?.subject}
										</td>
										<td className="px-2 py-2 text-center uppercase border-r-2">
											{tuition?.class_name}
										</td>
										<td className="px-2 py-2 text-center uppercase border-r-2">
											{tuition?.salary}
										</td>
										<td className="px-2 py-2 text-center uppercase border-r-2">
											{(tuition?.isVerified == true) ? <span className="text-green-700">true</span> : <span className="text-red-700"> false</span>}
										</td>
										<td className="px-2 py-2 border-r-2">
											{tuition?.admin_feedback}
										</td>
										<td className="px-2 py-2 text-center">
											<button onClick={() => handleAdminBtn(tuition, 'approve')} type="button" className="flex w-44 mx-auto justify-center items-center text-white bg-gradient-to-br from-green-500 to-green-600 transition-all hover:duration-300 hover:from-green-600 hover:to-green-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700" disabled={(tuition?.isVerified == true) ? true : false} >
												<GrValidate className='gr-icon w-4 h-4 mr-2' />
												Approve
											</button>
											<button onClick={() => handleAdminBtn(tuition, 'deny')} type="button" className="flex w-44 mx-auto mt-2 justify-center items-center text-white bg-gradient-to-br from-red-500 to-red-600 transition-all hover:duration-300 hover:from-red-600 hover:to-red-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700" disabled={(tuition?.isVerified == true) ? false : true}>
												<LuShieldClose className='gr-icon w-4 h-4 mr-2' />
												Deny
											</button>
											{
												tuition?.admin_feedback ?
													<button onClick={() => handleFeedback(tuition?._id)} type="button" className="flex w-44 mx-auto mt-2 justify-center items-center text-white bg-gradient-to-br from-teal-500 to-teal-600 transition-all hover:duration-300 hover:from-teal-600 hover:to-teal-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-teal-200 dark:focus:ring-teal-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700">
														<VscFeedback className='gr-icon w-4 h-4 mr-2' />
														Update Feedback
													</button>
													:
													<button onClick={() => handleFeedback(tuition?._id)} type="button" className="flex w-44 mx-auto mt-2 justify-center items-center text-white bg-gradient-to-br from-blue-500 to-blue-600 transition-all hover:duration-300 hover:from-blue-600 hover:to-blue-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700">
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

export default ManageTutors;