'use client'
import { User } from '@/typeScript/userType';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface PopularCardProps {
	data: User
}

const TestForButton = (id: (number | string)) => {
	// console.log('test for button')
}

const PopularTutorCard: React.FC<PopularCardProps> = ({ data }) => {
	// console.log(data)
	const {_id, displayName, mobileNumber, location, gender, qualification, isVerified, students, ratings, email, photoURL, role } = data;

	return (
		<div className="flex card card-compact w-full bg-base-100 custom-box-shadow group p-4">
			<figure className='rounded-xl'>
				<Image height={288} width={373} priority={true} className='overflow-hidden h-auto w-auto object-cover object-center rounded-t-xl transition duration-300 group-hover:scale-110' src={photoURL} alt={`Image of ${displayName}`} />
			</figure>
			<div className='border-t border-slate-300 mt-4 mb-1'></div>
			<div className="flex-1 p-4 pt-4 pb-4">
				<h3 className='text-center text-2xl text-slate-700 font-bold'>{displayName}</h3>
				<p className='font-medium text-sm text-center mt-3 mb-3 text-slate-600'>
				{qualification}
				</p>
				<p className='font-bold text-base text-center mt-2 mb-2 text-slate-600'>{location}</p>
			</div>
			<div className='border-t border-slate-300 mb-4'></div>
			<div className=" w-full">
				<Link href={`/tutor/${_id}`}>
					<button onClick={() => TestForButton(_id)} className="btn w-full text-gray-100 bg-teal-700 hover:bg-teal-800 hover:text-white">Details</button>
				</Link>
			</div>
		</div>
	);
};

export default PopularTutorCard;