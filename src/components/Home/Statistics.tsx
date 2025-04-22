"use client"
import { GiOpenBook, GiTeacher } from "react-icons/gi";
import { FaUserAlt } from 'react-icons/fa';
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import SectionTitle from "@/components/(shared)/SectionTitle/SectionTitle";
import Counter from "../(shared)/Counter/Counter";

// using react component
import React, { useEffect } from 'react';
import AOS from 'aos';

const Statistics: React.FC = () => {

	// using use effect hook for aos 
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);

	return (
		<section className="max-w-7xl mx-auto mt-12 lg:mt-32 p-4 md:px-0">

			<SectionTitle heading="Statistics" subHeading="Statistics Showcase: Learn Sharp 's Impact and Growth"></SectionTitle>

			<div className="max-w-[240px] md:max-w-6xl grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-8 mx-auto">

				<div className="card card-compact w-full bg-base-100 custom-box-shadow justify-center p-4" data-aos="flip-left">
					<div className='px-2 pt-6 pb-2 flex justify-center'>
						<FaUserAlt className='h-14 w-14 text-slate-600 aspect-square' />
					</div>
					<div className="p-2 gap-2 flex flex-col justify-center items-center h-full">
						<h2 className="card-title justify-center text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800">
							<Counter number={258} />
						</h2>
						<p className="card-title justify-center text-lg lg:text-xl font-medium text-slate-600">Total Applied</p>
					</div>
				</div>

				<div className="card card-compact w-full bg-base-100 custom-box-shadow justify-center p-4" data-aos="flip-left">
					<div className='px-2 pt-6 pb-2 flex justify-center'>
						<GiOpenBook className='h-14 w-14 text-slate-600 aspect-square' />
					</div>
					<div className="p-2 gap-2 flex flex-col justify-center items-center h-100">
						<h2 className="card-title justify-center text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800">
							<Counter number={12} />
						</h2>
						<p className="card-title justify-center text-lg lg:text-xl font-medium text-slate-600">Live Tuition Jobs</p>
					</div>
				</div>

				<div className="card card-compact w-full bg-base-100 custom-box-shadow justify-center p-4" data-aos="flip-left">
					<div className='px-2 pt-6 pb-2 flex justify-center'>
						<GiTeacher className='h-14 w-14 text-slate-600 aspect-square' />
					</div>
					<div className="p-2 gap-2 flex flex-col justify-center items-center h-100">
						<h2 className="card-title justify-center text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800">
							<Counter number={16} />
						</h2>
						<p className="card-title justify-center text-lg lg:text-xl font-medium text-slate-600">Total Tutors</p>
					</div>
				</div>

				<div className="card card-compact w-full bg-base-100 custom-box-shadow justify-center p-4" data-aos="flip-left">
					<div className='px-2 pt-6 pb-2 flex justify-center'>
						<HiOutlineBuildingOffice2 className='h-14 w-14 text-slate-600 aspect-square' />
					</div>
					<div className="p-2 gap-2 flex flex-col justify-center items-center h-100">
						<h2 className="card-title justify-center text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800">
							<Counter number={4.7} />
						</h2>
						<p className="card-title justify-center text-lg lg:text-xl font-medium text-slate-600">Average Tutor Rating</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Statistics;