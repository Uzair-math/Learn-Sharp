"use client";
// import { Select } from 'flowbite-react';
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Aos from "aos";
import BlogCard from "./BlogCard";
// import { toast } from 'react-hot-toast';
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import { useTitle } from "@/hooks/useTitle";

const people = [
	{ name: "users" },
	{ name: "admin" },
	{ name: "tutor" },
	{ name: "student" },
];

const Blogs = () => {
	useTitle("Blogs");
	const { user } = useAuth();
	const blogsPerPage = 3;
	const [currentPage, setCurrentPage] = useState(1);

	const [selected, setSelected] = useState(people[0]);
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		Aos.init({ duration: 1000 });
		const fetchData = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`,
					{
						cache: "no-store",
					}
				);

				if (!res.ok) {
					throw new Error("Failed to fetch data");
				}

				const data = await res.json();

				data.sort((a, b) => {
					// Change 'publishedAt' to the actual field name you want to use for sorting
					return new Date(b.postDate) - new Date(a.postDate);
				});

				const startIndex = (currentPage - 1) * blogsPerPage;
				const endIndex = startIndex + blogsPerPage;

				// Filter the data based on the selected role
				let filteredData;

				if (selected.name === "users") {
					// If 'all' is selected, show all data
					filteredData = data;
				} else {
					// Filter data for the selected role
					filteredData = data.filter((item) => item.role === selected.name);
				}
				const paginatedData = filteredData.slice(startIndex, endIndex);
				console.log(paginatedData);

				setBlogs(paginatedData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [selected, currentPage]);

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const previousPage = () => {
		setCurrentPage(currentPage - 1);
	};

	return (
		<div className="text-sm max-w-7xl mx-auto mt-12 lg:mt-4 lg:p-4 p-2 text-slate-700 text-justify">
			<div className="lg:w-[90%] w-full mx-auto">
				<div className=" mb-2">
					<div className=" rounded-md flex justify-between">
						<Link
							className="btn bg-gradient-to-br from-teal-500 to-teal-700 ring-2 ring-offset-1 ring-teal-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-semibold rounded-lg mx-2 text-white"
							href={` ${user === null ? "/login" : "/blogs/post-blog"}`}
						>
							Add Blog Post
						</Link>

						<div className="lg:mr-[2%] rounded-md w-44 text-center">
							<Listbox value={selected} onChange={setSelected}>
								<div className="relative mt-1">
									<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
										<span className="block truncate">{selected.name}</span>
										<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
											<ChevronUpDownIcon
												className="h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
											{people.map((person, personIdx) => (
												<Listbox.Option
													key={personIdx}
													className={({ active }) =>
														`relative cursor-default select-none py-2 pl-10 pr-4 ${
															active
																? "bg-amber-100 text-amber-900"
																: "text-gray-900"
														}`
													}
													value={person}
												>
													{({ selected }) => (
														<>
															<span
																className={`block truncate ${
																	selected ? "font-medium" : "font-normal"
																}`}
															>
																{person.name}
															</span>
															{selected ? (
																<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																	<CheckIcon
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>
					</div>
				</div>

				{blogs.map((blog, index) => (
					<BlogCard
						key={index}
						blog={blog}
						selected={selected}
						setSelected={setSelected}
					>
						{" "}
					</BlogCard>
				))}

				{/* extra */}
				{/* <div className="mx-[15%]">
										<div className={`bg-slate-600 text-white rounded-xl shadow-2xl shadow-slate-400 `}>
												<div className=" h-52">
														<Image className='object-cover h-52 rounded-md' src={currying} alt='' placeholder='blur' />
												</div>
												<div className=" my-2 ">
														<div className=" lg:mx-10 text-center flex ">
																<div className="">
																		<Image className='object-cover h-[50px] max-sm:mx-auto max-md:mx-auto mx-2 my-4 rounded-full' src={manImage1} alt='' placeholder='blur' width={"50"} />
																</div>
																<div className="grid grid-cols-3 max-sm:grid-cols-2 gap-2 py-[3%] text-white">
																		<p className='p-2 sm:text-sm mx-2  rounded-md '>Rebold</p>
																		<p className='p-2 sm:text-sm rounded-md '>Admin</p>
																		<p className='max-sm:col-span-2 mx-1'>date: 28-8-22023</p>
																</div>
														</div>
														<p className='my-2 p-2'>A JavaScript curry funcFtion is a powerful tool for function composition and partial application. It allows you to transform a function that takes multiple arguments into a series of functions that each take one argument. This enables you to create reusable and more modular code. <br /> <span><a className='text-blue-500' href="">Read more...</a></span>
														</p>
												</div>
										</div>
								</div>*/}

				{/* extra */}
			</div>
			<div className=" lg:w-[50%] w-[80%] text-center mx-auto mt-10">
				<div className="join">
					{currentPage !== 1 || 0 ? (
						<>
							<button className="join-item btn pointer-events-none">
								{currentPage - 1}
							</button>
							<button onClick={previousPage} className="join-item btn">
								<FiChevronsLeft></FiChevronsLeft>
							</button>
						</>
					) : (
						""
					)}
					<button className="join-item btn btn-disabled max-sm:hidden">
						...
					</button>

					{Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }).map(
						(_, index) => (
							<button
								key={index}
								className={`join-item btn ${
									currentPage === index + 1 ? "btn-active" : ""
								}`}
								onClick={() => setCurrentPage(index + 1)}
							>
								{currentPage}
							</button>
						)
					)}
					<span className="join-item btn btn-disabled max-sm:hidden">...</span>
					{blogs.length == 2 || 0 ? (
						""
					) : (
						<button onClick={nextPage} className="join-item btn">
							<FiChevronsRight></FiChevronsRight>
						</button>
					)}
					{blogs.length == 2 || 0 ? (
						""
					) : (
						<span className="join-item btn pointer-events-none">
							{currentPage + 1}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Blogs;
