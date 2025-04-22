const getTuitions = async (email) => {
	// console.log("utils", email)
	if (email) {
		// console.log("utils, block", email)
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/get-tuitions?email=${email}&isVerified=true`,
				{
					cache: 'no-store'
				});
			const data = await res.json();
			return data;
		} catch (error) {
			console.error('Error fetching mentor data:', error);
			return [];
		}
	}
};

export default getTuitions;