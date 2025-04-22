"use client";
import React from "react";
import "./Header.css";
import Link from "next/link";
import { MdDashboard, MdLogin, MdLogout } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie'

const Header = () => {
	// const { replace } = useRouter();
	const router = useRouter();
	const pathname = usePathname();
	// const [allowedPath, setAllowedPath] = useState(true);
	const allowedPath = true;

	// useEffect(() => {
	//   pathname.includes('/dashboard') ? setAllowedPath(false) : setAllowedPath(true);
	// }, [pathname]);

	const { user, logOut, userRole, setLoading } = useAuth();
	// console.log("logged user", user);
	const currentUserName = user?.displayName;
	const currentUserEmail = user?.email;
	const currentUserPhotoURL = user?.photoURL;

	const handleLogOut = async () => {
		const toastId = toast.loading("Logging out...");
		// console.log("log out");
		try {
			await logOut();
			Cookies.set('token', '')
			toast.dismiss(toastId);
			toast.success("Logout successful!");
			setLoading(false);
			router.push('/login');
		} catch (error) {
			// console.log(error.message);
			toast.error(`Error: ${error.message}`);
			toast.dismiss(toastId);
			setLoading(false);
		}
	};

	return (
		<>
			{ allowedPath && (<div className="bg-teal-700 py-2">
					<nav
						className={`navbar gap-4 ${user ? "justify-between" : ""
							} max-w-7xl mx-auto`}
					>
						<div className="navbar-start w-auto">
							<div className="dropdown">
								<label
									tabIndex={0}
									className="btn btn-ghost text-slate-100 lg:hidden"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h8m-8 6h16"
										/>
									</svg>
								</label>

								<ul
									tabIndex={0}
									className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52 z-10"
								>
									<li>
										<Link className={`${pathname === "/" ? "bg-teal-200" : ""}`} href="/">Home</Link>
									</li>
									<li className="hover:cursor-pointer">
										<Link className={`${pathname === "/tutors" ? "bg-teal-200" : ""}`} href="/tutors">Tutors</Link>
									</li>
									<li className="hover:cursor-pointer">
										<Link className={`${pathname === "/tutor-request" ? "bg-teal-200" : ""}`} href="/tutor-request">Tutor Request</Link>
									</li>
									<li className="hover:cursor-pointer">
										<Link className={`${pathname === "/tutor-jobs" ? "bg-teal-200" : ""}`} href="/tutor-jobs">Tutor Jobs</Link>
									</li>
									<li className="hover:cursor-pointer">
										<Link className={`${pathname === "/contact" ? "bg-teal-200" : ""}`} href="/contact">Contact</Link>
									</li>
									<li className="hover:cursor-pointer">
										<Link className={`${pathname === "/about" ? "bg-teal-200" : ""}`} href="/about">About</Link>
									</li>
									<li className="hover:cursor-pointer">
										<Link className={`${pathname === "/blogs" ? "bg-teal-200" : ""}`} href="/blogs">Blogs</Link>
									</li>
									{!user && (
										<>
											<div className="divider my-0"></div>
											<li>
												<Link aria-label="Login Button" href="/login" className="p-0 flex gap-2 mx-auto md:mx-0 w-full items-center justify-center text-white bg-gradient-to-br from-teal-500 to-teal-700 ring-2 ring-teal-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-teal-800 font-semibold rounded-lg text-sm px-8 py-2 text-center hover:!text-white focus:!text-white">
													<MdLogin className="text-xl"></MdLogin>
													Login
												</Link>
											</li>
										</>
									)}
								</ul>
							</div>
							<Link
								href="/"
								className="flex gap-3 md:gap-3 items-center btn px-0 btn-ghost normal-case font-extrabold text-2xl lg:text-3xl text-slate-700 hover:bg-inherit"
							>
								<Image className="h-10 w-10" height={40} width={40} src={Logo} alt="Learn Sharp  Logo" />
								<span className="flex items-center banner-highlighted-text text-xl md:text-3xl">
									Learn Sharp 
								</span>
							</Link>
						</div>

						{/* User Profile */}
						{user && (
							<div className="navbar-end w-auto mr-1 md:hidden">
								<div className="dropdown dropdown-end mt-1">
									<label
										tabIndex={0}
										className="btn btn-ghost btn-circle avatar tooltip tooltip-left"
										data-tip={currentUserName}
									>
										<div className="w-10 rounded-full ring-2 ring-offset-2 ring-teal-400">
											{
												currentUserPhotoURL &&
												<Image
													className="object-top"
													width={40}
													height={40}
													src={currentUserPhotoURL}
													alt={currentUserName}
												/>
											}
										</div>
									</label>
									<ul
										tabIndex={0}
										className="mt-1 p-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-10"
									>
										<div className="w-full flex justify-center">
											<div className="mt-2 mb-3 h-16 w-16 rounded-full ring-2 ring-offset-2 ring-slate-400">
												{currentUserPhotoURL &&
													<Image
														className="h-16 w-full rounded-full object-cover object-center"
														width={64}
														height={64}
														src={currentUserPhotoURL}
														alt={currentUserName}
													/>}
											</div>
										</div>
										<li className="mt-1 text-center font-bold">
											{currentUserName}
										</li>
										<p className="text-slate-600 text-sm mt-1 mb-2 font-normal text-center whitespace-nowrap">
											{currentUserEmail}
										</p>
										{userRole && (
											<p className="uppercase px-5 py-0.5 text-sm bg-teal-300 w-fit mx-auto rounded-xl">
												{userRole}
											</p>
										)}
										<div className="divider mt-1 mb-2"></div>
										<li>
											<Link href="/profile" className="flex p-0 mb-2 gap-2 mx-auto md:mx-0 w-full items-center justify-center text-white bg-gradient-to-br from-teal-600 to-teal-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-semibold rounded-lg text-sm px-8 py-2 text-center hover:!text-white focus:!text-white">
												<ImProfile className="text-xl"></ImProfile>
													Profile
											</Link>
										</li>
										<li>
											<Link href="/dashboard" className="flex p-0 mb-2 gap-2 mx-auto md:mx-0 w-full items-center justify-center text-white bg-gradient-to-br from-blue-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold rounded-lg text-sm px-8 py-2 text-center hover:!text-white focus:!text-white">
												<MdDashboard className="text-xl text-white"></MdDashboard>
												Dashboard
											</Link>
										</li>

										<li className="flex p-0">
											<button
												onClick={handleLogOut}
												type="button"
												className="flex gap-2 mx-auto md:mx-0 w-full items-center justify-center text-white bg-gradient-to-br from-red-600 to-orange-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-lg text-sm px-8 py-2 text-center"
											>
												<MdLogout className="text-xl"></MdLogout>
												Logout
											</button>
										</li>
									</ul>
								</div>
							</div>
						)}

						<div className="navbar-center mx-auto hidden lg:flex">
							<ul className="flex gap-6 text-xl font-semibold menu-horizontal px-1 z-10">
								<li className="nav-item hover:cursor-pointer">
									<Link className={`${pathname === "/" ? "active" : ""}`} href="/">Home</Link>
								</li>
								<li className="nav-item hover:cursor-pointer">
									<Link className={`${pathname === "/tutors" ? "active" : ""}`} href="/tutors">Tutors</Link>
								</li>
								<li className="nav-item hover:cursor-pointer">
									<Link className={`${pathname === "/tutor-request" ? "active" : ""}`} href="/tutor-request">Tutor Request</Link>
								</li>
								<li className="nav-item hover:cursor-pointer">
									<Link className={`${pathname === "/tutor-jobs" ? "active" : ""}`} href="/tutor-jobs">Tutor Jobs</Link>
								</li>
								<li className="nav-item hover:cursor-pointer">
									<Link className={`${pathname === "/contact" ? "active" : ""}`} href="/contact">Contact</Link>
								</li>
								<li className="nav-item hover:cursor-pointer">
									<Link className={`${pathname === "/about" ? "active" : ""}`} href="/about">About</Link>
								</li>
								<li className="nav-item hover:cursor-pointer">
									<Link className={`${pathname === "/blogs" ? "active" : ""}`} href="/blogs">Blogs</Link>
								</li>
							</ul>
						</div>

						<div className="navbar-end w-auto hidden lg:flex">
							<ul className="flex items-center gap-10 text-xl font-semibold menu-horizontal px-1">
								{!user && (
									<li>
										<Link aria-label="Login Button" href="/login" className="flex gap-2 mx-auto md:mx-0 items-center justify-center text-white bg-gradient-to-br from-teal-500 to-teal-700 hover:bg-gradient-to-bl ring-2 ring-teal-400 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-teal-800 font-semibold rounded-lg text-lg px-8 py-2 text-center hover:!text-white focus:!text-white">
											<MdLogin className="text-2xl"></MdLogin>
											Login
										</Link>
									</li>
								)}
							</ul>

							{/* User Profile */}
							{user && (
								<div className="dropdown dropdown-end mt-1 ml-6">
									<label
										tabIndex={0}
										className="btn btn-ghost btn-circle avatar tooltip tooltip-left"
										data-tip={currentUserName}
									>
										<div className="w-10 rounded-full ring-2 ring-offset-2 ring-teal-400">
											{currentUserPhotoURL &&
												<Image
													className="object-top"
													width={40}
													height={40}
													src={currentUserPhotoURL}
													alt={currentUserName}
												/>}
										</div>
									</label>
									<ul
										tabIndex={0}
										className="mt-3 p-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box z-10"
									>
										<div className="w-full flex justify-center">
											<div className="mt-2 mb-3 h-16 w-16 rounded-full ring-2 ring-offset-2 ring-slate-400">
												{currentUserPhotoURL &&
													<Image
														className="h-16 w-full rounded-full object-cover object-center"
														width={64}
														height={64}
														src={currentUserPhotoURL}
														alt={currentUserName}
													/>
												}
											</div>
										</div>
										<li className="mt-1 text-center font-bold">
											{currentUserName}
										</li>
										<p className="text-slate-600 text-sm mt-1 mb-2 font-normal text-center whitespace-nowrap">
											{currentUserEmail}
										</p>
										{userRole && (
											<p className="uppercase px-5 py-0.5 text-sm bg-teal-300 w-fit mx-auto rounded-xl">
												{userRole}
											</p>
										)}
										<div className="divider mt-1 mb-2"></div>
										<li>
										<Link href="/profile" className="flex p-0 mb-2 gap-2 mx-auto md:mx-0 w-full items-center justify-center text-white bg-gradient-to-br from-teal-400 to-teal-600 ring-2 ring-teal-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold rounded-lg text-sm px-8 py-2 text-center hover:!text-white focus:!text-white">
											<ImProfile className="text-xl"></ImProfile>
											Profile
										</Link>
										</li>
										<li>
										<Link href="/dashboard" className="flex p-0 mb-2 gap-2 mx-auto md:mx-0 w-full items-center justify-center text-white bg-gradient-to-br from-blue-400 to-blue-600 ring-2 ring-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold rounded-lg text-sm px-8 py-2 text-center hover:!text-white focus:!text-white">
											<MdDashboard className="text-xl text-white"></MdDashboard>
												Dashboard
											</Link>
										</li>
										<li>
											<button
												onClick={handleLogOut}
												type="button"
												className="flex gap-2 mx-auto md:mx-0 w-full items-center justify-center !text-white bg-gradient-to-br from-red-600 to-orange-500 ring-2 ring-orange-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-lg text-sm px-8 py-2 text-center hover:!text-white"
											>
												<MdLogout className="text-xl"></MdLogout>
												Logout
											</button>
										</li>
									</ul>
								</div>
							)}
						</div>
					</nav>
				</div>)
			}
		</>
	);
};

export default Header;
