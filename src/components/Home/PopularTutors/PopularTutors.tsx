'use client'
import React, { useEffect, useState } from 'react';
import SectionTitle from "@/components/(shared)/SectionTitle/SectionTitle";
import PopularTutorCard from './PopularTutorCard';
import { User } from '@/typeScript/userType';

const PopularTutors = () => {

	const [mentorData, setMentorData] = useState<User[]>([]);

	useEffect(() => {
		const fetchMentorData = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutors/sort-tutors`, {
					cache: 'no-store'
				});
				const data = await res.json();
				setMentorData(data);
			} catch (error) {
				console.error('Error fetching mentor data:', error);
			}
		};

		fetchMentorData();
	}, []);



	return (
		<section className="max-w-7xl mx-auto mt-12 lg:mt-32 p-4 md:px-0">
			<SectionTitle heading="Popular Tutors" subHeading="Discover Our Trusted and Popular Tutors!"></SectionTitle>

			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-8">
				{
					mentorData?.map((data: User) => (<PopularTutorCard key={data._id} data={data}></PopularTutorCard>))
				}
			</div>

		</section>
	);
};

export default PopularTutors;