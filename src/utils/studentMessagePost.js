import toast from 'react-hot-toast';

const studentMessagePost = async (data) => {
	// console.log("studentMessagePost",data)
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutors/student-message`, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(data)
		})
		if (res.ok) {
			// console.log(res);
			toast.success("Message sent successfully!");
		} else if (res.status === 404) {
			toast.error("Message sending failed!");
		}
		else {
			toast.error("Fetch error!")
		}
	} catch (error) {
		toast.error("An error occurred: ", error)
	}
};

export default studentMessagePost;