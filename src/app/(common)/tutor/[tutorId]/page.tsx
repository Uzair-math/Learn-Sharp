import React from 'react';
import { Tuition } from '@/typeScript/tuitionsType';
import Image from "next/image";
import BookingForm from "@/app/(common)/tutors/BookingForm"
import getTuitions from "@/utils/getTuitions"
import TuitionsCard from '@/app/(common)/tutors/TuitionsCard';

const singlePage: React.FC<{ params: { tutorId: string } }> = async ({ params: { tutorId } }) => {

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutors/${tutorId}`, {
		cache: 'no-store'
	})
	const singleTutor = await res.json();
	const { _id, displayName, mobileNumber, location, gender, qualification, isVerified, students, ratings, email, photoURL, role, createdAt } = singleTutor || {};

	const date = new Date(createdAt);
	// Formatting for "dd/mm/yyyy"
	const dd = String(date.getDate()).padStart(2, '0');
	const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
	const yyyy = date.getFullYear();

	const allTuitions = await getTuitions(email);

	return (
		<>
			<div className="bg-teal-50">
				<div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto py-4 lg:py-12">
					<div className="p-4 basis-1/2">
						<Image
							width={592} height={400}
							className="h-[400px] border-4 border-teal-400 w-full object-cover object-top image-full rounded-xl shadow-lg"
							src={photoURL}
							alt={`Image of ${displayName}`}
						/>
					</div>
					<div className="p-4 basis-1/2 self-center">
						<header>
							<h3 className="text-4xl font-bold underline underline-offset-8">{displayName}</h3>
						</header>
						<p className="text-lg mt-4">
							<span className="font-bold text-slate-600">
								Email:
							</span>
							<span> {email}</span>
						</p>
						<p className="text-lg mt-2">
							<span className="font-bold text-slate-600">
								Mobile Number:
							</span>
							<span> {mobileNumber}</span>
						</p>
						<p className="text-lg mt-2">
							<span className="font-bold text-slate-600">
								Location:
							</span>
							<span> {location}</span>
						</p>
						<p className="text-lg mt-2">
							<span className="font-bold text-slate-600">
								Gender:
							</span>
							<span> {gender}</span>
						</p>
						<p className="text-lg mt-2">
							<span className="font-bold text-slate-600">
								Qualification:
							</span>
							<span> {qualification}</span>
						</p>
						<p className="text-lg mt-2">
							<span className="font-bold text-slate-600">
								Registration Date:
							</span>
							<span> {`${dd}/${mm}/${yyyy}`}</span>
						</p>
					</div>
				</div>
			</div>

			<section className="max-w-7xl mx-auto mt-12 lg:mt-20 p-4 md:px-0">
				{
					allTuitions.length > 0 &&
					<header>
						<h1 className="mb-6 md:mb-12 text-5xl text-teal-700 font-bold text-center mt-4 lg:mt-8">
							<span>Tuitions Details</span>
						</h1>
					</header>
				}
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
					{ allTuitions?.map((tuition: Tuition) => <TuitionsCard key={tuition?._id} data={tuition} /> )}
				</div>

				{/* Contact Form */}
				<BookingForm tutorEmail={email} tutorName={displayName} tutorMobileNumber={mobileNumber} tutorLocation={location} tutorGender={gender} tutorQualification={qualification} />
			</section>
		</>
	);
};

export default singlePage;