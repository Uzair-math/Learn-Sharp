/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const blogCommentGet = async (postData) => {
	const [comments, setComments] = useState([])
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const fetchCommentData = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/blog-comments`, {
					cache: 'no-store'
				});
				const data = await res.json();
				setComments(data);
			} catch (error) {
				console.error('Error fetching mentor data:', error);
			}
		};

		fetchCommentData();
	}, []);
	
};

export default blogCommentGet;