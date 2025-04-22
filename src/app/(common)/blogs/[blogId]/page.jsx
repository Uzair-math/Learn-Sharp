/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import SectionTitle from "@/components/(shared)/SectionTitle/SectionTitle";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
// import { error } from 'console';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserTimes } from "react-icons/fa";
import CommonBanner from "@/components/(shared)/CommonHeader/CommonBanner";
// import useGetUser from "@/hooks/useGetUser";
import SingleBlogCommentCard from "./SingleBlogCommentCard";
import getUser from "@/utils/getUser";

const page = async ({ params }) => {
	const { user } = useAuth();
	const searchId = params.blogId;
	const [blog, setBlog] = useState([]);
	const [comments, setComments] = useState([]);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);

				if (!res.ok) {
					throw new Error("Failed to fetch data");
				}

				const data = await res.json();

				let filteredData;
				filteredData = data.filter((item) => item._id === searchId);
				// console.log(filteredData);
				setBlog(filteredData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [searchId]);

	useEffect(() => {
		const fetchCommentData = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/blog-comments-get`,
					{
						cache: "no-store",
					}
				);

				if (!res.ok) {
					throw new Error("Failed to fetch data");
				}

				const data = await res.json();
				// console.log("58", data);

				let filteredData;
				filteredData = data.filter((item) => item.searchId === searchId);

				setComments(filteredData);
				// console.log("comments", filteredData);
			} catch (error) {
				console.error("Error fetching mentor data:", error);
			}
		};

		fetchCommentData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toDay = () => {
		const today = new Date();
		const day = String(today.getDate()).padStart(2, "0");
		const month = String(today.getMonth() + 1).padStart(2, "0");
		const year = today.getFullYear();
		const formattedDate = `${day}-${month}-${year}`;
		return formattedDate;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const bloggerName = user.displayName;
		const comment = data.blogComment;
		const date = toDay();
		const currentTime = new Date();
		const hours = currentTime.getHours();
		const minutes = currentTime.getMinutes();
		const seconds = currentTime.getSeconds();
		const time = `${hours}:${minutes}:${seconds}`;

		const userData = await getUser(user?.email);
		const userImgUrl = userData.photoURL;

		const postCommentData = {
			searchId,
			comment,
			date,
			bloggerName,
			time,
			userImgUrl,
		};

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/blog-comments`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(postCommentData),
				}
			);
			// console.log(response);

			if (response.ok) {
				// console.log(response.status);
			} else {
				const responseData = await response.json();
				console.error(responseData);
				toast.error("Fetch error");
			}
		} catch (error) {
			console.error(error);
			toast.error("129An error occurred:", error);
		}
		// console.log(postCommentData)
	};

	return (
		<div className="text-sm max-w-7xl mx-auto mt-12 lg:mt-4 lg:p-4 p-2 text-slate-700 text-justify">
			<CommonBanner bannerHeading="Post Details"></CommonBanner>
			{blog.map((item, index) => (
				<div key={index}>
					{/* <SectionTitle heading={item.userName} subHeading=""></SectionTitle> */}
					<div className=" lg:w-[80%] w-[95%] mx-auto shadow-lg lg:p-8 p-4 rounded-md bg-slate-100 shadow-slate-500 items-center">
						<div className=" grid lg:grid-cols-4 grid-cols-2 items-center my-2">
							<Image
								className="object-cover max-sm:mx-auto max-md:mx-auto mx-2 my-4 rounded-full"
								src={item.userImgUrl}
								alt=""
								width={60}
								height={60}
							/>
							<p>{item.userName}</p>
							<p>{item.role}</p>
							<p>{item.postDate}</p>
						</div>
						<div className="my-4">
							<Image
								className="object-cover max-sm:mx-auto max-md:mx-auto mx-2 my-4 rounded-md"
								src={item.postImgUrl}
								alt=""
								width={800}
								height={400}
							/>
							<p>{item.postDescription}</p>
						</div>
						<p>
							Total Comment:{" "}
							<span className="font-bold text-lg">{comments.length}</span>
						</p>
					</div>
				</div>
			))}
			<div className=" border border-5 mt-4 border-slate-600 lg:w-[80%] w-[95%] mx-auto shadow-lg lg:p-8 p-4 rounded-md bg-slate-100 shadow-slate-500 ">
				<div className="lg:flex md:flex ">
					<div className="mx-1 ">
						{user ? (
							<Image
								className="object-cover m-1 rounded-full"
								src={user?.photoURL}
								alt=""
								width={40}
								height={40}
							/>
						) : (
							<FaUserTimes className="w-10 h-10 rounded-full p-1"></FaUserTimes>
						)}
					</div>
					<form className="w-[95%] " onSubmit={handleSubmit(onSubmit)}>
						<textarea
							className="w-[100%] h-[100px] rounded-md"
							placeholder="Comment"
							{...register("blogComment", {})}
						/>
						{user == null ? (
							<Link href={"/login"}>
								<button className="bg-slate-600 p-2  ml-1 rounded-md my-2 text-white hover:bg-slate-700">
									Submit
								</button>
							</Link>
						) : (
							<button
								className="bg-slate-600 p-2  ml-1 rounded-md my-2 text-white hover:bg-slate-700"
								type="submit"
							>
								Submit
							</button>
						)}
					</form>
				</div>
				<div className=" overflow-y-auto h-64 ">
					{comments.map((item, index) => (
						<SingleBlogCommentCard
							key={index}
							item={item}
						></SingleBlogCommentCard>
					))}
				</div>
			</div>
		</div>
	);
};

export default page;
