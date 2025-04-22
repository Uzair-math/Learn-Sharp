'use client'
import { useState, useEffect } from "react";
import CommonBanner from "@/components/(shared)/CommonHeader/CommonBanner";
import SectionTitle from "@/components/(shared)/SectionTitle/SectionTitle";
import { TutorData } from '@/typeScript/tutorJobsType';
import useAuth from "@/hooks/useAuth";
import toast from 'react-hot-toast';

const TutorRequest = () => {
	const [allData, setAllData] = useState<TutorData[]>([]);
	const [filteredData, setFilteredData] = useState<TutorData[]>([]);
	const [filterOptions, setFilterOptions] = useState({
		tuitionType: '',
		medium: ''
	});

	const [loading, setLoading] = useState(false);
	const { user, userData, userRole }: any = useAuth();

	console.log(userData);
	
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutor-request`, {
          cache: 'no-store'
        });
        const data: TutorData[] = await res.json();
        setAllData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching tutor data:', error);
      }
    };
    fetchAllData();
  }, []);

	useEffect(() => {
		// Apply filters based on user selections
		const filtered = allData.filter(item => {
			return (
				(filterOptions.tuitionType === '' || item.tuitionType === filterOptions.tuitionType) &&
				(filterOptions.medium === '' || item.medium === filterOptions.medium)
			);
		});
		setFilteredData(filtered);
	}, [filterOptions, allData]);

	const handleFilterChange = (event: any) => {
		const { name, value } = event.target;
		setFilterOptions((prevOptions) => ({
			...prevOptions,
			[name]: value
		}));
	};

	const sendEmail = async (toEmail: string, jobTitle: string) => {
		// console.log(toEmail);
		setLoading(true);
		
		const emailData = {
			to: toEmail,
			name: userData?.displayName,
			subject: `Message From Learn Sharp  Tutor - ${userData?.displayName}`,
			message: `I am interested in the tutor job titled as "${jobTitle}" that you posted in Learn Sharp  website. Please contact me at my email address ${userData?.email} or call me directly at ${userData?.mobileNumber} for a detailed discussion.`,
		};

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutorJobEmailConfirmation`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(emailData),
			});

			if (response.ok) {
				// console.log("Email sent successfully");
				toast.success("Email sent successfully!");
				setLoading(false);
			} else {
				// console.error("Email sending failed");
				toast.error("Email sending failed!");
				setLoading(false);
			}
		} catch (error) {
			toast.error(`Error sending email: ${error}`);
			setLoading(false);
			// console.error("Error sending email:", error);
		}
	};

	return (
		<>

			<CommonBanner bannerHeading="Tutor Jobs" />
			
			<section className="max-w-7xl mx-auto mt-12 lg:mt-20 p-4 md:px-0">
				
				<SectionTitle heading="Unlock Exciting Tutoring Opportunities" subHeading="Choose Your Path as a Tutor and Shape Futures Your Way!"></SectionTitle>

				<div className="flex space-x-4">
					<div>
						<label htmlFor="tuitionType">Tuition Type: </label>
						<select
							id="tuitionType" name="tuitionType" value={filterOptions.tuitionType}
							onChange={handleFilterChange} className="border border-gray-400 rounded px-2 py-1"
						>
							<option value="">All</option>
							<option value="Remote Tutoring">Remote Tutoring</option>
							<option value="Home Tutoring">Home Tutoring</option>
						</select>
					</div>
					<div>
						<label htmlFor="medium">Medium: </label>
						<select
							id="medium" name="medium" value={filterOptions.medium} onChange={handleFilterChange}
							className="border border-gray-400 rounded px-2 py-1"
						>
							<option value="">All</option>
							<option value="Bangla">Bangla</option>
							<option value="English">English</option>
						</select>
					</div>
				</div>
				{!loading ?
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-12'>
					{ filteredData.map((item) => (
						<div key={item._id} className="flex card card-compact w-full bg-base-100 custom-box-shadow group p-4">
							<div className="flex-1 p-4 pt-4 pb-4">
								<h3 className='flex justify-center items-center text-center min-h-[100px] text-2xl text-slate-700 font-bold'>{item.title}</h3>
								<div className='border-t border-slate-300 my-4'></div>
								<p className='font-medium text-sm md:text-lg text-center mt-3 mb-3 text-slate-600'>
									<span className="font-bold">Job Posted By:</span> {item.name}
								</p>
								<p className='font-medium text-sm md:text-lg text-center mt-3 mb-3 text-slate-600'>
									<span className="font-bold">Email:</span> {item.email ? item.email : "Not provided!"}
								</p>
								<p className='font-medium text-sm md:text-lg text-center mt-3 mb-3 text-slate-600'>
									<span className="font-bold">Contact No.:</span> {item.phone}
								</p>
								<p className='font-medium text-sm md:text-lg text-center mt-3 mb-3 text-slate-600'>
									<span className="font-bold">Category:</span> {item.tuitionType}
								</p>
								<p className='font-medium text-sm md:text-lg text-center mt-3 mb-3 text-slate-600'>
									<span className="font-bold">Study Medium:</span> {item.medium}
								</p>
								<p className='font-medium text-sm md:text-lg text-center mt-3 mb-3 text-slate-600'>
									<span className="font-bold">Class/Grade:</span> {item.classname}
								</p>
								<p className='font-medium text-sm md:text-lg text-center mt-3 mb-3 text-slate-600'>
									<span className="font-bold">District:</span> {item.district}
								</p>
								<p className='font-medium text-sm md:text-lg text-center mt-3 mb-3 text-slate-600'>
									<span className="font-bold">Area:</span> {item.area !== null ? item.area : 'Area was not provided'}
								</p>
								<p className='font-bold text-lg md:text-xl text-center mt-2 mb-2 text-teal-600'>
									Salary: {item.salary ? item.salary : 'Discussion Needed!'} {item.salary ? "TK" : ""}
								</p>
							</div>
							<div className='border-t border-slate-300 mb-4'></div>
							<div className=" w-full">
								<button onClick={() => sendEmail(item?.email, item?.title)} className={`btn w-full text-gray-300  ${userRole === "student" || userRole === "admin" ? "bg-gray-600" : "bg-cyan-700 hover:bg-cyan-800 hover:text-white"}`}
									disabled={(userRole === "student" || userRole === "admin" || !user) ? true : false}
								>
									{/* {(userRole === "student" || userRole === "admin") ? "Only for Tutors" : "Send Message"} */}
									{!user ? "You Must Login to Send Message" : (userRole === "student" || userRole === "admin") ? "Only for Tutors" : "Send Email Confirmation"}
								</button>
							</div>
						</div>
					))}
				</div> :
					<span className="flex mt-32 text-5xl text-teal-500 items-center justify-center w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
						<span className="loading loading-bars loading-lg mr-2 self-center"></span>
						<span className="animate-pulse">Sending Email...</span>
					</span>
				}
			</section>

		</>
	);
};

export default TutorRequest;
