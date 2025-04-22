"use client"
import { toast } from "react-hot-toast";

const tutorRequestSave = async (TutorInfo) => {
	//  console.log('api Call',TutorInfo)
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutor-request/post-request`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(TutorInfo),
		});

		if (response.ok) {
			// console.log(response);
			toast.success("Tutor request sent successfully!");
		} 
		else if (response.status === 400) {
			toast.error("Tutor request sending failed!")
		}
		else {
			toast.error("Fetch error!")
		}
	} catch (error) {
		toast.error("An error occurred: ", error);
	}
};

export default tutorRequestSave;