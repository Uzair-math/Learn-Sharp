"use client"
import React from 'react';
import useAuth from '@/hooks/useAuth';
import bookingPost from '@/utils/bookingPost';

const TuitionsCard = ({ data }) => {
	const { _id, tutor_name, tutor_email, subject, class_name, service_location, available_days, salary, mobile, gender, qualification, location } = data

	// console.log(data)
	// console.log(data.subject)
	const { userData, userRole } = useAuth();
	// console.log("userDAta",userData)
	const bookingData = {
		tuitionId: _id,
		subject,
		class_name,
		service_location,
		available_days,
		salary,
		mobile,
		tutor_name,
		tutor_email,
		student_name: userData?.displayName,
		student_location: userData?.location,
		student_gender: userData?.gender,
		student_mobile_number: userData?.mobileNumber,
		student_qualification: userData?.qualification,
		student_email: userData?.email,
		student_photoURL: userData?.photoURL,
	}
	// console.log("34",bookingData)
	const onHandlebooking = () => {
		console.log("hellobtn")
		bookingPost(bookingData)
	}
	return (
		<div
			className="flex card card-compact w-full bg-base-100 custom-box-shadow group p-4">
			{/* <figure className='rounded-xl'>
							<Image height={288} width={374} priority={true} className='overflow-hidden h-72 w-full object-cover object-center rounded-t-xl transition duration-300 group-hover:scale-110' src={photoURL} alt={`Image of ${displayName}`} />
						</figure> */}
			{/* <div className='border-t border-slate-300 mt-4 mb-1'></div> */}
			<div className="flex-1 p-4 pt-4 pb-4">
				<h3 className='text-center text-2xl text-slate-700 font-bold'>Subject: {subject}</h3>
				<p className='font-medium text-sm text-center mt-3 mb-3 text-slate-600'>
					Class: {class_name}
				</p>
				<p className='font-medium text-sm text-center mt-3 mb-3 text-slate-600'>
					Service Location: {service_location}
				</p>
				<p className='font-medium text-sm text-center mt-3 mb-3 text-slate-600'>
					Available Days: {available_days}
				</p>
				<p className='font-medium text-base text-center mt-2 mb-2 text-slate-600'>Expected Salary: {salary}</p>
			</div>
			<div className='border-t border-slate-300 mb-4'></div>
			<div className=" w-full">
				{/* <Link href={`/tutor/${_id}`}> */}
				<button onClick={() => onHandlebooking()} className={`btn w-full text-gray-300  ${userRole === "tutor" || userRole === "admin" ? "bg-gray-600" : "bg-cyan-700 hover:bg-cyan-800 hover:text-white"}`}
					disabled={(userRole === "tutor" || userRole === "admin") ? true : false}
				>
					{(userRole === "tutor" || userRole === "admin") ? "Only for Students" : "Book Now"}
				</button>
				{/* </Link> */}
			</div>
		</div>
	);
};

export default TuitionsCard;