import React from 'react';
import toast from 'react-hot-toast';

const bookingPost = async (bookingData) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking`, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(bookingData)
		})
		if (res.ok) {
			// console.log(res);
			toast.success("Booking data stored successfully");
		} else if (res.status === 404) {

			toast.error("Booking already exists!")
		}
		else {
			toast.error("Error fetch!");
		}
	} catch (error) {
		toast.error("An error occurred: ", error)
	}
};

export default bookingPost;