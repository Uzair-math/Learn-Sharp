"use client"
import { useState } from 'react';
import { FaGoogle, FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Terms from '@/app/(common)/(auth)/register/Terms';
import useAuth from "@/hooks/useAuth.js"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import saveUser from "@/utils/saveUser"
import getUser from '@/utils/getUser';
import setJWT from '@/utils/setJWT';

const Registration = () => {

	const { createUser, logOut, signInWithGoogle } = useAuth();
	const { register, getValues, handleSubmit, formState: { errors } } = useForm();
	const router = useRouter();

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);

	const fetchUserData = async (email) => {
		const userData = await getUser(email);
		return userData;
	};

	const onSubmit = (userInformation, event) => {
		delete userInformation.confirmPassword;
		delete userInformation.passwordConfirmation;

		createUser(userInformation.email, userInformation.password)
			.then(result => {
				const currentUser = result.user;
				// console.log("currentUser", currentUser);
				if (userInformation.name || userInformation.photoURL) {
					// console.log("inside update condition");
					updateUserData(currentUser, userInformation.name, userInformation.photoURL);
				}

				const userInfo = {
					displayName: userInformation.name,
					email: currentUser.email,
					photoURL: userInformation.photoURL,
					gender: userInformation.gender,
					mobileNumber: userInformation.mobileNumber,
					qualification: userInformation.qualification,
					location: userInformation.location,
					role: "student"
				}
				// console.log(userInfo);

				try {
					saveUser(userInfo);
					const tokenData = { email: currentUser.email };
					setJWT(tokenData);
				} catch (error) {
					console.error("Error saving user:", error);
				}

				setSuccess("Registration successful!");
				toast.success("Registration successful!");
				handleLogOut();
				event.target.reset();
				router.push('/login')
			})
			.catch(error => {
				setError(error.message);
				toast.error(error.message)
			})
	};

	// Logout 
	const handleLogOut = () => {
		logOut()
			.then(() => {
				console.log("Logout successful!");
				const tokenData = {
					email : null
				}
				setJWT(tokenData)
				router.push('/login')
			})
			.catch((error) => {
				console.log(error.message);
			})
	};

	// Update User Information
	const updateUserData = (currentUser, name, photoURL) => {
		const { updateUserProfile } = useAuth();
		updateUserProfile({
			displayName: name,
			photoURL: photoURL
		}).then(() => {
			// console.log("Profile updated!");
		}).catch((error) => {
			setError(error.message);
		});
	};

	// Google Login
	const handleGoogleRegistration = () => {
		signInWithGoogle()
			.then(result => {
				const currentUser = result.user;
				
				// Generate user info from the result
				const userInfo = {
					email: currentUser.email,
					displayName: currentUser.displayName,
					photoURL: currentUser.photoURL,
					gender: "",
					location: "",
					mobileNumber: "",
					qualification: "",
					role: "student"
				}
				
				try {
					saveUser(userInfo);
					const tokenData = { email: currentUser.email };
					setJWT(tokenData);
				} catch (error) {
					console.error("Error saving Google user:", error);
				}
				
				toast.success("Registration successful!");
				router.push('/')
			})
			.catch(error => {
				setError(error.message);
				toast.error(error.message);
			})
	};

	// Show/Hide Password
	const handleShowPassword = (event) => {
		event.preventDefault();
		setShowPassword(!showPassword);
	};

	// Show/Hide Confirm Password
	const handleShowConfirmPassword = (event) => {
		event.preventDefault();
		setShowConfirmPassword(!showConfirmPassword);
	};

	// Accept Terms 
	const handleAcceptTerms = (event) => {
		setAcceptTerms(event.target.checked);
	}

	return (
		<section className="max-w-4xl mx-auto mt-4 lg:mt-20 p-4">
			<div className="flex card card-compact w-full bg-base-100 shadow-xl border-2 border-teal-400">

				<div className="flex-1 p-6 md:p-8 pt-5 pb-1 md:pb-2">
					<h3 className='text-slate-700 text-2xl my-2 font-bold text-center'>Register your Account</h3>
				</div>

				<div className='border-t border-slate-300 my-4 mx-6 md:mx-8'></div>

				<p className="!px-6 md:!px-8 text-red-500 mt-2 text-center">{error}</p>
				<p className="!px-6 md:!px-8 text-green-600 mt-2 text-center">{success}</p>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="!px-6 md:!px-8 !pt-2 card-body">

						<div className="grid md:grid-cols-2 md:gap-6">
							<div className="form-control">
								<label className="label pl-0" htmlFor="name">
									<span className="label-text text-lg">Name</span>
								</label>
								<input type="text" {...register("name", { required: true })} id="name" name="name" placeholder="Enter your name" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
								{errors?.name && <p className="text-red-500 mt-2">Name is required!</p>} {/* Error Message */}
							</div>
							<div className="form-control">
								<label className="label pl-0" htmlFor="email">
									<span className="label-text text-lg">Email</span>
								</label>
								<input type="email" {...register("email", { required: true })} id="email" name="email" placeholder="Enter your email address" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
								{errors?.email && <p className="text-red-500 mt-2">Email is required!</p>} {/* Error Message */}
							</div>
						</div>

						<div className="grid md:grid-cols-2 md:gap-6">
							<div className="relative form-control">
								<label className="label pl-0" htmlFor="password">
									<span className="label-text text-lg">Password</span>
								</label>
								<input type={showPassword ? "text" : "password"}
									{...register("password", {
										required: true,
										minLength: 6,
										pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])/
									})}
									id="password" name="password" placeholder="Enter your password" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" autoComplete='true'
								/>
								<button onClick={handleShowPassword} className="btn btn-ghost absolute top-11 right-0 rounded-l-none">
									{
										showPassword ? <FaRegEyeSlash className='text-lg md:text-xl font-bold' /> : <FaRegEye className='text-lg md:text-xl font-bold' />
									}
								</button>
								{errors?.password?.type === 'required' && <p className="text-red-500 mt-2">Password is required!</p>}
								{errors?.password?.type === 'minLength' && <p className="text-red-500 mt-2">Password must be at least 6 characters!</p>}
								{errors?.password?.type === 'pattern' && <p className="text-red-500 mt-2">Password must have one uppercase and one special characters.</p>}
							</div>
							<div className="relative form-control">
								<label className="label pl-0" htmlFor="confirmPassword">
									<span className="label-text text-lg">Confirm Password</span>
								</label>
								<input type={showConfirmPassword ? "text" : "password"}
									{...register("confirmPassword", {
										required: "Please confirm password!",
										validate: {
											matchesPreviousPassword: (value) => {
												const { password } = getValues();
												return password === value || "Passwords should match!";
											}
										}
									})}
									id="confirmPassword" name="confirmPassword" placeholder="Please confirm your password" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" autoComplete='true'
								/>
								<button onClick={handleShowConfirmPassword} className="btn btn-ghost absolute top-11 right-0 rounded-l-none">
									{
										showConfirmPassword ? <FaRegEyeSlash className='text-lg md:text-xl font-bold' /> : <FaRegEye className='text-lg md:text-xl font-bold' />
									}
								</button>

								{errors?.confirmPassword?.required === 'required' && <p className="text-red-500 mt-2">Passwords should match!</p>}
								<p className="text-red-500 mt-2">{errors?.confirmPassword?.message}</p>
							</div>
						</div>

						<div className="grid md:grid-cols-2 md:gap-6">
							<div className="form-control">
								<label className="label pl-0" htmlFor="mobileNumber">
									<span className="label-text text-lg">Mobile Number</span>
								</label>
								<input type="text" {...register("mobileNumber")} id="mobileNumber" name="mobileNumber" placeholder="Enter your mobileNumber" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
							</div>
							<div className="form-control">
								<label className="label pl-0" htmlFor="gender">
									<span className="label-text text-lg">Gender</span>
								</label>
								<input type="text" {...register("gender")} id="gender" name="gender" placeholder="Enter your gender" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
							</div>

						</div>

						<div className="grid md:grid-cols-2 md:gap-6">
							<div className="form-control">
								<label className="label pl-0" htmlFor="location">
									<span className="label-text text-lg">Location</span>
								</label>
								<input type="text" {...register("location")} id="location" name="location" placeholder="Enter your location" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
							</div>
							<div className="form-control">
								<label className="label pl-0" htmlFor="qualification">
									<span className="label-text text-lg">Qualification</span>
								</label>
								<input type="text" {...register("qualification")} id="qualification" name="qualification" placeholder="Enter your qualification" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
							</div>
						</div>
						<div className="form-control">
							<label className="label pl-0" htmlFor="photoURL">
								<span className="label-text text-lg">Photo URL</span>
							</label>
							<input type="text" {...register("photoURL", { required: true })} id="photoURL" name="photoURL" placeholder="Enter your photo url" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
							{/* <input type="file" id="image" name="image" accept="image/*" className="file-input file-input-bordered file-input-accent w-full" /> */}
							{/* <p className="text-red-500 mt-2">{imageError}</p> */}
							{errors?.photoURL && <p className="text-red-500 mt-2">Photo URL is required!</p>} {/* Error Message */}
						</div>


						<div className="form-control mt-4">
							<label className="label !justify-start text-md gap-2 cursor-pointer">
								<input onChange={handleAcceptTerms} type="checkbox" className="checkbox checkbox-accent checkbox-sm rounded-md border-gray-400 shadow-sm" id="terms" />
								<span htmlFor="terms" className="label-text ">Accept</span>
								{/* To Open Modal */}
								<label htmlFor="terms-modal" className=" link link-primary font-semibold transition-all hover:duration-200 text-blue-600 hover:text-blue-700"> Terms & Conditions.</label>
							</label>
						</div>
						<div className="form-control mt-1">
							<button type="submit" className="flex gap-3 mx-auto md:mx-0 w-full items-center justify-center text-white bg-gradient-to-br from-teal-500 to-teal-700 ring-2 ring-offset-1 ring-teal-400 disabled:ring-slate-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-semibold rounded-lg text-lg px-8 py-2 text-center disabled:from-slate-300 disabled:to-slate-400 disabled:text-slate-600 tooltip tooltip-bottom" data-tip={!acceptTerms ? "Please Accept Terms & Conditions" : "Click to Register"} disabled={!acceptTerms}>Register</button>
						</div>
					</div>
				</form>
				<div className="p-6 md:p-8 !pb-1 pt-1 md:pt-2 text-center">
					Already have an account? &nbsp;
					<Link href="/login" className='link link-primary font-semibold transition-all hover:duration-200 text-blue-600 hover:text-blue-700'>Login</Link>
				</div>

				<div className="divider">OR</div>

				<div className="!px-6 md:!px-8 !pt-3 card-body">
					{/* 
						<div className="form-control mt-1 mb-5">
							<button onClick={handleGitHubRegistration} className="btn btn-outline btn-base text-lg">
								<FaGithub className="mr-2" /> Register with GitHub
							</button>
						</div> 
					*/}
					<div className="form-control mt-1 mb-5">
						<button onClick={handleGoogleRegistration} className="relative flex w-100 items-center justify-center p-0.5 overflow-hidden text-lg font-semibold text-blue-700 rounded-lg group bg-gradient-to-br from-blue-600 to-blue-500 group-hover:from-blue-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
							<span className="flex items-center justify-center w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
								<FaGoogle className="mr-2 self-center" /> Register with Google
							</span>
						</button>
					</div>
				</div>
			</div>

			{/* Terms & Conditions Modal */}
			<Terms></Terms>
		</section>
	);
};

export default Registration;