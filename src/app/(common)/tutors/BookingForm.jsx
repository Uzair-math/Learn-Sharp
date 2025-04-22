"use client";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import studentMessagePost from "@/utils/studentMessagePost";
import { startTransition } from "react";
import { useRouter } from "next/navigation";

const BookingForm = ({ tutorEmail, tutorName, tutorMobileNumber, tutorLocation, tutorGender, tutorQualification }) => {

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue
	} = useForm();

	const { user, userData, userRole } = useAuth();
	const { refresh } = useRouter();

	const onSubmit = async (data) => {
		const { name, email, className, phoneNumber, gender, subject, location, detailsInfo } = data;
		// const toastId = toast.loading("Loading...");
		try {
			// student_message collection save mongodb start
			const studentMessage = {
				tutor_email: tutorEmail,
				tutor_name: tutorName, 
				tutor_mobile_number: tutorMobileNumber,
				tutor_location: tutorLocation,
				tutor_gender: tutorGender,
				tutor_qualification: tutorQualification,
				student_name: name,
				student_email: email,
				student_mobile_no: phoneNumber,
				subject_name: subject,
				student_location: location,
				student_gender: gender,
				class_name: className,
				details: detailsInfo,
				tutor_feedback: ""
			}
			// console.log("Student Message", studentMessage);

			if (studentMessage) {
				studentMessagePost(studentMessage);
				startTransition(() => {
					refresh();
					// toast.dismiss(toastId);
					// toast.success("Message sent successfully!");
				});
			}

		} catch (error) {
			toast.dismiss(toastId);
			toast.error(error.message || "Message sending failed!");
		}
	};

	return (
		<>
			{/* <h3 className="text-3xl text-white p-1 font-bold divide-x-2 divide-neutral-900 mb-4  bg-gradient-to-r from-[#29A2AA] to-[#c0332e]  ">Contact with This tutor</h3> */}
			<header>
				<h1 className="mb-6 md:mb-12 text-5xl text-teal-700 font-bold text-center mt-12 lg:mt-20">
					<span>Contact Me</span>
				</h1>
			</header>
			<form onSubmit={handleSubmit(onSubmit)} className="card-body custom-box-shadow rounded-2xl">
				<div className="grid md:grid-cols-2 gap-y-2 md:gap-x-6">
					<div className="form-control">
						<label htmlFor="name" className="label label-text">Name</label>
						<input type="text" placeholder="Enter your name"  
							id="name" name="name" className="input input-accent focus:outline-green-500 focus:border-green-500" {...register("name", { required: true })} 
						/>
						{errors.name && ( <span className="text-red-500 text-base mt-2">Please enter your name.</span> )}
					</div>
					<div className="form-control">
						<label htmlFor="email" className="label label-text">Email</label>
						<input type="email" placeholder="Enter your email" id="email" name="email"
							className="input input-accent focus:outline-green-500 focus:border-green-500" autoComplete="off"
							{...register("email", { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/ })}
						/>
						{errors.email && ( <span className="text-red-500 text-base mt-2">Please enter your email address.</span>)}
					</div>

					<div className="form-control">
						<label htmlFor="gender" className="label label-text">Gender</label>
						<input 
							type="text" placeholder="Enter your gender" id="gender" name="gender" 
							className="input input-accent focus:outline-green-500 focus:border-green-500" {...register("gender", { required: true })} 
						/>
						{errors.gender && (<span className="text-red-500 text-base mt-2">Please enter your gender.</span>)}
					</div>
					<div className="form-control">
						<label htmlFor="phoneNumber" className="label label-text">Mobile Number</label>
						<input
							type="tel" id="phoneNumber" placeholder="Enter your mobile number"
							{...register("phoneNumber", { required: true, maxLength: 11 })}
							className="input input-accent focus:outline-green-500 focus:border-green-500"
						/>
						{errors.phoneNumber && (<span className="text-red-500 text-base mt-2">Please enter your mobile number.</span>)}
					</div>

					<div className="form-control">
						<label htmlFor="subject" className="label label-text">Subject Name</label>
						<input type="text" id="subject" placeholder="Enter the subject"
							name="subject" className="input input-accent focus:outline-green-500 focus:border-green-500" {...register("subject", { required: true })}
						/>
						{errors.subject && (<span className="text-red-500 text-base mt-2">Please enter the subject name.</span>)}
					</div>
					<div className="form-control">
						<label htmlFor="className" className="label label-text">Class Name</label>
						<input type="text" placeholder="Enter your class" id="className" name="className"
							className="input input-accent focus:outline-green-500 focus:border-green-500" {...register("className", { required: true })}
						/>
						{errors.className && (<span className="text-red-500 text-base mt-2">Please enter the class name.</span>)}
					</div>

					<div className="form-control">
						<label htmlFor="location" className="label label-text">Location</label>
						<input
							type="text" id="location" placeholder="Enter your location" name="location"
							className="input input-accent focus:outline-green-500 focus:border-green-500"
							{...register("location", { required: true })}
						/>
						{errors.location && (<span className="text-red-500 text-base mt-2">Please enter your location.</span>)}
					</div>
					<div className="form-control">
						<label htmlFor="detailsInfo" className="label label-text">Details Information</label>
						<input id="detailsInfo" name="detailsInfo" type="text" placeholder="Enter details information"
							{...register("detailsInfo", { required: true })} className="input input-accent focus:outline-green-500 focus:border-green-500"
						/>
						{errors.detailsInfo && (<span className="text-red-500 text-base mt-1">Please enter details information.</span>)}
					</div>
				</div>
				
				<div className="form-control mt-4">
					<button className={`btn text-gray-300 ${userRole === "tutor" || userRole === "admin" ? "bg-gray-600" : "bg-cyan-700 hover:bg-cyan-800 hover:text-white"}`}
						disabled={(userRole === "tutor" || userRole === "admin") ? true : false}
					>
						{/* {(userRole === "tutor" || userRole === "admin") ? "Only for Students" : "Send Message"} */}
						{!user ? "You Must Login to Send Message" : (userRole === "tutor" || userRole === "admin") ? "Only for Students" : "Send Message"}
					</button>
				</div>
			</form>
		</>
	);
};

export default BookingForm;