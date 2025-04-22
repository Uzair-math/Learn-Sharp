"use client"
import useAuth from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Fade } from 'react-awesome-reveal';
import sendPaymentNotificationEmail from '@/utils/sslPaymentEmailNotification/sendPaymentNotificationEmail'
import Loader from '@/components/(shared)/Loader/Loader';

const MyPayments = () => {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);

	const [studentPaymentBooking, setStudentPaymentBooking] = useState([]);
	const [month, setMonth] = useState("");

	useEffect(() => {
		const fetchPaymentBooking = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/get-booking?student_email=${user?.email}&is_accepted=true`,
					{ cache: "no-store" }
				);
				const data = await res.json();
				// console.log(data);
				setStudentPaymentBooking(data);
			}
			catch (error) {
				console.error("Error fetching data: ", error);
			}
		};

		fetchPaymentBooking();
	}, [user?.email]);
	//   console.log(studentPaymentBooking);

	const handlePayment = async (payment) => {

		const paymentInformation = {
			tuitionId: payment.tuitionId,
			tutor_name: payment.tutor_name,
			tutor_email: payment.tutor_email,
			subject_name: payment.subject,
			class_name: payment.class_name,
			student_name: payment.student_name,
			student_email: payment.student_email,
			payment_amount: payment.salary,
			student_mobile_number: payment.student_mobile_number,
			student_location: payment.student_location,
			payment_status: false,
			payment_month: month
		}

		// console.log("Payment Information: ", paymentInformation);

		Swal.fire({
			title: 'Are you sure?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, pay now!'
		}).then((result) => {
			if (result.isConfirmed) {
				setLoading(true);
				const paymentProcess = async () => {
					try {
						const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ssl-payment`, {
							method: "POST",
							headers: {
								"content-type": "application/json"
							},
							body: JSON.stringify(paymentInformation)
						});
						// console.log("Response: ", res);
						if (res.status === 200) {
							const result = await res.json();
							const emailConfirmation = await sendPaymentNotificationEmail(result.payment);
							// result.savedPaymentInformation
							// console.log("Confirmation Email: ", emailConfirmation);
							// console.log("Confirmation Data: ", result.payment);
							if (emailConfirmation) {
								toast.success("Authentication successful!")
								setLoading(false);
								// window.location.replace(result.url);
								window.open(result.url, '_blank');
							}
						}
						else {
							toast.error("Authentication failed!")
						}

					}
					catch (error) {
						toast.error("Error fetching: ", error.message);
					}
				}

				paymentProcess();
			}
		})

	}

	// Show Loader when Page is Loading
	if (loading) {
		return <Loader></Loader>;
	}

	return (
		<>
			<header>
				<h1 className="text-5xl text-teal-700 font-bold text-center mt-4 lg:mt-8">
					<Fade duration={200} triggerOnce={true} cascade>My Payments</Fade>
				</h1>
			</header>
			<section className="max-w-7xl mx-auto mt-4 lg:mt-8 p-4 md:px-0">

				<div>
					<h1 className="text-3xl font-bold text-center mb-6">Total Number of Payments: {studentPaymentBooking?.length}</h1>
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
									Salary <br /> (Per Month)
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Month <br /> Name
								</th>
								<th scope="col" className="text-center bg-gray-100 px-3 py-4 border-b-2 border-r-2">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{
								studentPaymentBooking?.map((payment, index) => (
									<tr
										key={payment?._id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
											{payment?.subject}
										</td>
										<td className="px-2 py-2 border-r-2">
											{payment?.class_name}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											{payment?.salary}
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											<select className="select select-sm !h-9 py-0 leading-none select-accent w-full min-w-[192px] max-w-[280px]"
												onInput={(e) => setMonth(e.target.value)}
											>
												<option value="">Select Month</option>
												<option value="January">January</option>
												<option value="February">February</option>
												<option value="March">March</option>
												<option value="April">April</option>
												<option value="May">May</option>
												<option value="June">June</option>
												<option value="July">July</option>
												<option value="August">August</option>
												<option value="September">September</option>
												<option value="October">October</option>
												<option value="November">November</option>
												<option value="December">December</option>
											</select>
										</td>
										<td className="px-2 py-2 text-center border-r-2">
											<button onClick={() => handlePayment(payment)} type="button" className="flex w-28 mx-auto justify-center items-center text-white bg-gradient-to-br from-green-500 to-green-600 transition-all hover:duration-300 hover:from-green-600 hover:to-green-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-normal rounded-md text-md px-3 py-2 text-center disabled:from-slate-600 disabled:to-slate-700" disabled={false} >
												<FaMoneyBill className='gr-icon w-4 h-4 mr-2' />
												Pay Now
											</button>
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

export default MyPayments;