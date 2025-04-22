"use client";
import SectionTitle from "@/components/(shared)/SectionTitle/SectionTitle";
import { User } from "@/typeScript/userType";
import TutorCard from "./TutorCard";
import CommonBanner from "@/components/(shared)/CommonHeader/CommonBanner";
import { useEffect, useState } from "react";

type tutors = {
	_id: string; // Replace with the actual type of _id
	gender: string; // Replace with the actual type of gender
	isVerified: string;
};

const TutorsPage = () => {
	const [allData, setAllData] = useState<User[]>([]);
	const [searchCriteria, setSearchCriteria] = useState<{
		isVerified: string;
		gender: string;
	}>({
		isVerified: "",
		gender: "",
	}); // Initialize with an empty string.

	const { isVerified, gender } = searchCriteria;
	console.log(isVerified, gender);
	useEffect(() => {
		const fetchAllData = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/tutors?gender=${gender}`,
					{
						cache: "no-store",
					}
				);
				const data = await res.json();
				setAllData(data);
			} catch (error) {
				console.error("Error fetching mentor data:", error);
			}
		};

		fetchAllData();
	}, [isVerified, gender]);

	// Function to handle radio button changes.
	//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	//     const selectedOption = event.target.value;
	//     setSortingOption(selectedOption);
	//   };
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e.target;
		setSearchCriteria((prevCriteria) => ({
			...prevCriteria,
			[name]: checked ? value : "",
		}));
	};

	return (
		<>
			<CommonBanner bannerHeading="Tutors"></CommonBanner>

			<section className="max-w-7xl mx-auto mt-12 lg:mt-32 p-4 md:px-0">
				<SectionTitle
					heading="All Tutors"
					subHeading="Discover Our Trusted and All Tutors!"
				></SectionTitle>

				<div className="flex flex-col md:flex-row gap-4">
					{/* Add checkbox for sorting options */}
					<div className="basis-1/3">
						<h3 className="mx-4 text-2xl">Advance Filter</h3>
						<hr className="mx-4 mt-4 border-1 border-slate-900" />
						{/* <div className="p-4">
							<h3 className="pb-4">Tutor Type</h3>
							<label>
								<input
									type="checkbox"
									name="isVerified"
									value="all"
									checked={searchCriteria.isVerified === 'all'}
									onChange={handleInputChange}
								/> All
							</label>
							<br />
							<label>
								<input
									type="checkbox"
									name="isVerified"
									value="true"
									checked={searchCriteria.isVerified === 'true'}
									onChange={handleInputChange}
									className="focus:outline-none"

								/> Verified
							</label>
						</div> */}
						<div className="p-4">
							{/* <hr className="mt-4 border-1 border-slate-900" /> */}
							<h3 className="pb-4 pt-4">Gender</h3>
							<label>
								<input
									type="checkbox"
									name="gender"
									value="allGender"
									checked={searchCriteria.gender === "allGender"}
									onChange={handleInputChange}
								/>{" "}
								All
							</label>
							<br />
							<label>
								<input
									type="checkbox"
									name="gender"
									value="male"
									checked={searchCriteria.gender === "male"}
									onChange={handleInputChange}
									className="focus:outline-none"
								/>{" "}
								Male
							</label>
							<br />
							<label>
								<input
									type="checkbox"
									name="gender"
									value="female"
									checked={searchCriteria.gender === "female"}
									onChange={handleInputChange}
									className="focus:outline-none"
								/>{" "}
								Female
							</label>
						</div>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
						{allData?.map((tutorData: User) => (
							<TutorCard key={tutorData._id} tutorData={tutorData}></TutorCard>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default TutorsPage;
