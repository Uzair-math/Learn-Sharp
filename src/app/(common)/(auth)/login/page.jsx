"use client"
import { useState } from 'react';
import { FaGoogle, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import Loader from '@/components/(shared)/Loader/Loader';
import Link from 'next/link';
import useAuth from "@/hooks/useAuth.js"
import { useRouter } from 'next/navigation';
import saveUser from '@/utils/saveUser';
import getUser from '@/utils/getUser';
// import Profile from '../profile/page'
import setJWT from "@/utils/setJWT.js"


const Login = () => {
	const { loading, setLoading, logIn, signInWithGoogle, setUser, user } = useAuth();
	const { register, handleSubmit, formState: { errors } } = useForm();
	const router = useRouter();

	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const fetchUserData = async (email) => {
		const userData = await getUser(email);
		return userData
	};

	const componentProps = {
		user: user,
		// Add more props as needed
	};

	// Show Loader when Page is Loading
	if (loading) {
		return <Loader></Loader>;
	}

	const onSubmit = (userInformation) => {
		// console.log(userInformation);
		setLoading(true);
		setError("");

		logIn(userInformation.email, userInformation.password)
			.then(result => {
				const loggedUser = result.user;
				console.log(loggedUser);
				setUser(loggedUser);
				const tokenData = {
					email : loggedUser?.email
				}
				setJWT(tokenData);
				toast.success("Login successful!");
				setLoading(false);
				router.push('/profile')
			})
			.catch(error => {
				setError(error.message);
				toast.error("Incorrect email and/or password!");
				setLoading(false);
			})
	};

	// // Google Login
	const handleGoogleLogin = () => {
		signInWithGoogle()
			.then(result => {
				const currentUser = result.user;
				setUser(currentUser);
				const userData = fetchUserData(currentUser?.email)

				const userInfo = {
					email: currentUser.email,
					displayName: currentUser.displayName,
					photoURL: currentUser.photoURL,
					gender: userData?.gender || "",
					location: userData?.location || "",
					mobileNumber: userData?.mobileNumber || "",
					qualification: userData?.qualification || "",
					role: userData?.role || "student"
				}
				saveUser(userInfo);
				const tokenData = {
					email : userInfo?.email
				}
				setJWT(tokenData)

				toast.success("Login successful!");
				setLoading(false);
				router.push('/profile')
			})
			.catch(error => {
				setError(error.message);
				setLoading(false);
			})
	};

	// Show/Hide Password
	const handleShowPassword = (event) => {
		event.preventDefault();
		setShowPassword(!showPassword);
	};

	return (
		<section className="max-w-lg mx-auto mt-4 lg:mt-20 p-4">
			<div className="flex card card-compact w-full bg-base-100 shadow-xl border-2 border-teal-400">

				<div className="flex-1 p-6 md:p-8 pt-5 pb-1 md:pb-2">
					<h3 className='text-slate-700 text-2xl my-2 font-bold text-center'>Login to your Account</h3>
				</div>

				<div className='border-t border-slate-300 my-4 mx-6 md:mx-8'></div>

				{/* <p className="!px-6 md:!px-8 text-red-500 mt-2 text-center">{error}</p> */}

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="!px-6 md:!px-8 !pt-2 card-body">
						<div className="form-control">
							<label className="label pl-0" htmlFor="email">
								<span className="label-text text-lg">Email</span>
							</label>
							<input type="email" {...register("email", { required: true })} id="email" name="email" placeholder="Enter your email address" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" required />
							{/* <p className="text-red-500 mt-2"></p> */}
							{errors?.email && <p className="text-red-500 mt-2">Email is required!</p>} {/* Error Message */}
						</div>

						<div className="relative form-control">
							<label className="label pl-0" htmlFor="password">
								<span className="label-text text-lg">Password</span>
							</label>
							<input type={showPassword ? "text" : "password"} {...register("password", { required: true })} id="password" name="password" placeholder="Enter your password" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" autoComplete='true' required />
							<button onClick={handleShowPassword} className="btn btn-ghost absolute bottom-0 right-0 rounded-l-none">
								{
									showPassword ? <FaRegEyeSlash className='text-lg md:text-xl font-bold' /> : <FaRegEye className='text-lg md:text-xl font-bold' />
								}
							</button>
						</div>
						{/* <p className="text-red-500 mt-2"></p> */}
						{errors?.password && <p className="text-red-500 mt-2">Password is required!</p>} {/* Error Message */}

						<div className="text-md">
							Forgot your password? &nbsp;
							<Link href="/password-reset" className='link link-error font-semibold transition-all hover:duration-200 text-red-600 hover:text-red-700'>Reset Password</Link>
						</div>

						<div className="form-control mt-6">
							{/* <button className="btn btn-primary text-lg" type="submit">Login</button> */}
							<button type="submit" className="flex gap-3 mx-auto md:mx-0 w-full items-center justify-center text-white bg-gradient-to-br from-teal-500 to-teal-700 ring-2 ring-offset-1 ring-teal-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-semibold rounded-lg text-lg px-8 py-2 text-center">Login</button>
						</div>
					</div>
				</form>
				<div className="p-6 md:p-8 !pb-1 pt-1 md:pt-2 text-center">
					Don&apos;t have an account? &nbsp;
					<Link href="/register" className='link link-primary font-semibold transition-all hover:duration-200 text-blue-600 hover:text-blue-700'>Register</Link>
				</div>

				{/* <div className='border-t border-slate-300 my-4 mx-6 md:mx-8'></div> */}
				<div className="divider">OR</div>

				{/* <div className="flex-1 p-4 md:pb-2">
					<h4 className='mb-2 text-slate-500 text-xl font-bold text-center'> ----------- OR ----------- </h4>
					<h4 className='text-slate-700 text-xl font-bold text-center'>Login with</h4>
				</div> */}

				<div className="grid md:grid-cols-1 gap-2 !px-6 md:!px-8 !pt-3 card-body">
					<div className="form-control mb-5">
						{/* <button onClick={handleGoogleLogin} className="btn btn-outline btn-accent text-lg">
							<FaGoogle className="mr-2" /> Login with Google
						</button> */}

						<button onClick={handleGoogleLogin} className="relative flex w-100 items-center justify-center p-0.5 overflow-hidden text-lg font-semibold text-blue-700 rounded-lg group bg-gradient-to-br from-blue-600 to-blue-500 group-hover:from-blue-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
							<span className="flex items-center justify-center w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
								<FaGoogle className="mr-2 self-center" /> Login with Google
							</span>
						</button>
					</div>
				</div>

			</div>
		</section>
				
	);
};

export default Login;