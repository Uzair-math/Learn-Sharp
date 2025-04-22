"use client"
import React, { useState } from "react";
import CommonBanner from "@/components/(shared)/CommonHeader/CommonBanner";
import SectionTitle from "@/components/(shared)/SectionTitle/SectionTitle";
import tutorRequestSave from "@/utils/tutorRequestSave";

const TutorRequest = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [title, setTitle] = useState("");
	const [tuitionType, setTuitionType] = useState("");
	const [salary, setSalary] = useState("");
	const [medium, setMedium] = useState("");
	const [classname, setClassname] = useState("");
	const [district, setDistrict] = useState("");
	const [area, setArea] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log("Form submitted!");
		const tutorInfo = {
			name,
			email,
			phone,
			title,
			tuitionType,
			salary,
			medium,
			classname,
			district,
			area,
		};
		// console.log(tutorInfo);
		tutorRequestSave(tutorInfo);
	};

	return (
		<>
			
			<CommonBanner bannerHeading="Tutor Request" />
			
			<section className="max-w-7xl mx-auto mt-12 lg:mt-20 p-4 md:px-0">

				<SectionTitle heading="Find Your Ideal Home Tutor" subHeading="Request Experienced Tutors for Personalized Learning!"></SectionTitle>

				<form onSubmit={handleSubmit} className="p-8 custom-box-shadow rounded-xl">
					<div className='grid md:grid-cols-2 gap-4 md:gap-6'>
						<div>
							<label htmlFor="name" className="block text-teal-600 text-lg">
								Student&apos;s Name
							</label>
							<input
								required
								type="text"
								id="name"
								placeholder="Enter your name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full border border-teal-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
							/>
						</div>
						<div>
							<label htmlFor="email" className="block text-teal-600 text-lg">
								Email
							</label>
							<input
								required
								type="text"
								id="email"
								placeholder="Enter your email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full border border-teal-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
							/>
						</div>
						<div>
							<label htmlFor="title" className="block text-teal-600 text-lg">
								Tuition Title
							</label>
							<input
								required
								type="text"
								id="title"
								placeholder="Enter the tuition title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="w-full border border-teal-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
							/>
						</div>
						<div>
							<label htmlFor="phone" className="block text-teal-600 text-lg">
								Mobile Number
							</label>
							<input
								required
								type="tel"
								id="phone"
								placeholder="Enter your mobile number"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								className="w-full border border-teal-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
							/>
						</div>
						<div>
							<label htmlFor="salary" className="block text-teal-600 text-lg">
								Salary
							</label>
							<input
								type="text"
								id="salary"
								placeholder="Enter your asking salary"
								value={salary}
								onChange={(e) => setSalary(e.target.value)}
								className="w-full border border-teal-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
							/>
						</div>
						<div>
							<label htmlFor="tuitionType" className="block text-teal-600 text-lg">
								Tuition Type
							</label>
							<select
								value={tuitionType}
								onChange={(e) => setTuitionType(e.target.value)}
								className="w-full border border-teal-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
							>
								<option disabled value="">- Select Tuition Type -</option>
								<option value="Home Tutoring">Home Tutoring</option>
								<option value="Remote Tutoring">Remote Tutoring</option>
							</select>
						</div>
						<div>
							<label htmlFor="medium" className="block text-teal-600 text-lg">
								Medium
							</label>
							<select
								value={medium}
								onChange={(e) => setMedium(e.target.value)}
								className="w-full border border-teal-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
							>
								<option disabled value="">- Select Medium -</option>
								<option value="English">English</option>
								<option value="Bangla">Bangla</option>
							</select>
						</div>
						<div>
							<label htmlFor="classname" className="block text-teal-600 text-lg">
								Class
							</label>
							<select
								value={classname}
								onChange={(e) => setClassname(e.target.value)}
								className="w-full border border-teal-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
							>
								<option disabled value="">- Select Class -</option>
								<option value="1">1st</option>
								<option value="2">2nd</option>
								<option value="3">3rd</option>
								<option value="4">4th</option>
								<option value="5">5th</option>
								<option value="6">6th</option>
								<option value="7">7th</option>
								<option value="8">8th</option>
								<option value="9">9th</option>
								<option value="10">10th</option>
								<option value="11">11th</option>
								<option value="12">12th</option>
							</select>
						</div>
						<div>
							<label htmlFor="district" className="block text-teal-600 text-lg">
								District
							</label>
							<select
								value={district}
								onChange={(e) => setDistrict(e.target.value)}
								className="w-full border border-teal-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
							>
								<option disabled value="">- Select District -</option>
								<option value="Bagerhat">Bagerhat</option>
								<option value="Bandarban">Bandarban</option>
								<option value="Barguna">Barguna</option>
								<option value="Barisal">Barisal</option>
								<option value="Bhola">Bhola</option>
								<option value="Bogra">Bogra</option>
								<option value="Brahmanbaria">Brahmanbaria</option>
								<option value="Chandpur">Chandpur</option>
								<option value="Chapainawabganj">Chapainawabganj</option>
								<option value="Chittagong">Chittagong</option>
								<option value="Chuadanga">Chuadanga</option>
								<option value="Comilla">Comilla</option>
								<option value="Cox&apos;s Bazar">Cox&apos;s Bazar</option>
								<option value="Dhaka">Dhaka</option>
								<option value="Dinajpur">Dinajpur</option>
								<option value="Faridpur">Faridpur</option>
								<option value="Feni">Feni</option>
								<option value="Gaibandha">Gaibandha</option>
								<option value="Gazipur">Gazipur</option>
								<option value="Gopalganj">Gopalganj</option>
								<option value="Habiganj">Habiganj</option>
								<option value="Jamalpur">Jamalpur</option>
								<option value="Jessore">Jessore</option>
								<option value="Jhalokati">Jhalokati</option>
								<option value="Jhenaidah">Jhenaidah</option>
								<option value="Joypurhat">Joypurhat</option>
								<option value="Khagrachari">Khagrachari</option>
								<option value="Khulna">Khulna</option>
								<option value="Kishoreganj">Kishoreganj</option>
								<option value="Kurigram">Kurigram</option>
								<option value="Kushtia">Kushtia</option>
								<option value="Lakshmipur">Lakshmipur</option>
								<option value="Lalmonirhat">Lalmonirhat</option>
								<option value="Madaripur">Madaripur</option>
								<option value="Magura">Magura</option>
								<option value="Manikganj">Manikganj</option>
								<option value="Meherpur">Meherpur</option>
								<option value="Moulvibazar">Moulvibazar</option>
								<option value="Munshiganj">Munshiganj</option>
								<option value="Mymensingh">Mymensingh</option>
								<option value="Naogaon">Naogaon</option>
								<option value="Narail">Narail</option>
								<option value="Narayanganj">Narayanganj</option>
								<option value="Narsingdi">Narsingdi</option>
								<option value="Natore">Natore</option>
								<option value="Nawabganj">Nawabganj</option>
								<option value="Netrokona">Netrokona</option>
								<option value="Nilphamari">Nilphamari</option>
								<option value="Noakhali">Noakhali</option>
								<option value="Pabna">Pabna</option>
								<option value="Panchagarh">Panchagarh</option>
								<option value="Patuakhali">Patuakhali</option>
								<option value="Pirojpur">Pirojpur</option>
								<option value="Rajbari">Rajbari</option>
								<option value="Rajshahi">Rajshahi</option>
								<option value="Rangamati">Rangamati</option>
								<option value="Rangpur">Rangpur</option>
								<option value="Satkhira">Satkhira</option>
								<option value="Shariatpur">Shariatpur</option>
								<option value="Sherpur">Sherpur</option>
								<option value="Sirajganj">Sirajganj</option>
								<option value="Sunamganj">Sunamganj</option>
								<option value="Sylhet">Sylhet</option>
								<option value="Tangail">Tangail</option>
								<option value="Thakurgaon">Thakurgaon</option>
							</select>
						</div>
						<div>
							<label htmlFor="area" className="block text-teal-600 text-lg">
								Area
							</label>
							<input
								type="text"
								id="area"
								placeholder="Enter your area name"
								value={area}
								onChange={(e) => setArea(e.target.value)}
								className="w-full border border-teal-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
							/>
						</div>
					</div>
					<button type="submit" className="w-full mt-4 md:mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-12 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400">
						Submit
					</button>
				</form>
			
			</section>
		</>
	);
};

export default TutorRequest;
