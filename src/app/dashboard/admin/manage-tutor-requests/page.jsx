"use client"
import { Fade } from "react-awesome-reveal";
import { GrValidate } from "react-icons/gr";
import { LuShieldClose } from "react-icons/lu";
import { VscFeedback } from "react-icons/vsc";
import { useEffect, useState, useTransition } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FeedbackModal from "./FeedbackModal";

const ManageStudents = () => {

	const [allRequests, setAllRequests] = useState([]);
	const { user, loading, userRole } = useAuth();
	const [isPending, startTransition] = useTransition();
	const { refresh } = useRouter();

	useEffect(() => {
		const fetchAllTutorRequest = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/manageTutorRequest`,
					{
						cache: 'no-store'
					});

				if (!res.ok) {
					throw new Error('Something went wrong!');
				}
				const data = await res.json();
				setAllRequests(data);
			}
			catch (error) {
				console.error('Error fetching tutor data: ', error);
			}
		};

		fetchAllTutorRequest();
	}, []);
	// console.log(allRequests);


	const handleAdminBtn = (request, value) => {
		// console.log(request?._id, value);
		const fetchAdminBtn = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/manageTutors?id=${request?._id}&controlAdminBtn=${value}`, {
					method: "PATCH",
					cache: 'no-store'
				});
				if (res.ok) {
					toast.success("Action successful!")
					startTransition(() => {
						refresh();
					})
				}
				else {
					// Handle unsuccessful response
					console.error('Error fetching all manage request: ', res.statusText);
				}

			}
			catch (error) {
				console.error('Error fetching all manage request: ', error);
			}
		};
		fetchAdminBtn();
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

	const handleFeedback = (tutorRequestID) => {
		openModal();
		// console.log("Feedback ID: ", tutorRequestID);
		setFeedbackID(tutorRequestID);
	};

	return (
		<>
			<header>
				<h1 className="text-5xl text-teal-700 font-bold text-center mt-4 lg:mt-8">
					<Fade duration={200} triggerOnce={true} cascade>Manage Tutor Requests</Fade>
				</h1>
			</header>

			<section className="max-w-full mx-auto mt-6 lg:mt-12 p-4 md:px-0">

				<div>
					<h1 className="text-3xl font-bold text-center mb-6">Total Tutor Requests: {allRequests?.length}</h1>
				</div>

				<div className="relative overflow-x-auto">
					<table className="border-2 border-slate-200 w-full text-sm text-left text-gray-1000 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									#
								</th>
								{/* <th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
                  Student&apos;s <br /> Image
                </th> */}
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									User<br /> Name
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									User<br /> Email
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Tuition <br /> Title
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Mobile No.
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Salary <br /> (Monthly)
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Tuition <br /> Type
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Medium
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Subject
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Class
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									District
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Area
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
								allRequests?.map((request, index) => (
									<tr
										key={request._id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<td className="px-2 py-2 whitespace-nowrap text-center border-r-2">
											{index + 1}
										</td>
										{/* <td className="px-2 py-2 text-center border-r-2">
                    <div className="avatar flex items-center justify-center ">
                      <div className="w-24 rounded-xl">
                        <Image src="" alt={`Image of Tutor`} />
                      </div>
                    </div>
                  </td> */}
										<td className="px-2 py-2 whitespace-nowrap border-r-2">
											{request?.name}
										</td>
										<td className="px-2 py-2 whitespace-nowrap text-center border-r-2">
											{request?.email}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{request?.title}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{request?.mobileNumber}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{request?.salary}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{request?.tuitionType}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{request?.medium}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{request?.subject}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{request?.classname}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{request?.district}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{request?.area}
										</td>
										<td className="px-2 py-2 text-center uppercase border-r-2">
											{(request?.isVerified == true) ? <span className="text-green-700">true</span> : <span className="text-red-700"> false</span>}
										</td>
										<td className="px-2 py-2 border-r-2">
											{request?.admin_feedback}
										</td>
										<td className="px-2 py-2 text-center">
											<button onClick={() => handleAdminBtn(request, 'approve')} type="button" className="flex w-44 mx-auto justify-center items-center text-white bg-gradient-to-br from-green-500 to-green-600 transition-all hover:duration-300 hover:from-green-600 hover:to-green-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700" disabled={(request?.isVerified == true) ? true : false} >
												<GrValidate className='gr-icon w-4 h-4 mr-2' />
												Approve
											</button>
											<button onClick={() => handleAdminBtn(request, 'deny')} type="button" className="flex w-44 mx-auto mt-2 justify-center items-center text-white bg-gradient-to-br from-red-500 to-red-600 transition-all hover:duration-300 hover:from-red-600 hover:to-red-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700" disabled={(request?.isVerified == true) ? false : true}>
												<LuShieldClose className='gr-icon w-4 h-4 mr-2' />
												Deny
											</button>
											{
												request?.admin_feedback ?
													<button onClick={() => handleFeedback(request?._id)} type="button" className="flex w-44 mx-auto mt-2 justify-center items-center text-white bg-gradient-to-br from-teal-500 to-teal-600 transition-all hover:duration-300 hover:from-teal-600 hover:to-teal-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-teal-200 dark:focus:ring-teal-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700">
														<VscFeedback className='gr-icon w-4 h-4 mr-2' />
														Update Feedback
													</button>
													:
													<button onClick={() => handleFeedback(request?._id)} type="button" className="flex w-44 mx-auto mt-2 justify-center items-center text-white bg-gradient-to-br from-blue-500 to-blue-600 transition-all hover:duration-300 hover:from-blue-600 hover:to-blue-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700">
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

export default ManageStudents;