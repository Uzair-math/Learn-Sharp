import React from 'react';
import Swal from "sweetalert2";
const adminBtn = (dataValue, value) => {
	
	const fetchAdminBtn = async () => {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/admin?id=${dataValue?._id}&controlAdminBtn=${value}`, {
				method: "PATCH",
				cache: "no-store"
			});
			if (res.status === 200) {
				// Successful response, handle data accordingly
				// setAllUsers(data);
				Swal.fire({
					position: 'top-center',
					icon: 'success',
					title: "User Action successfully",
					showConfirmButton: false,
					timer: 1500
				})
			}
			const data = await res.json();
		} 
		catch (error) {
			console.error('Error fetching all User Data:', error);
		}
	};
	fetchAdminBtn();
};

export default adminBtn;