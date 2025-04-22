"use client"
import { useState } from 'react';
import useAuth from "@/hooks/useAuth"
import { toast } from "react-hot-toast";
import { useTitle } from '@/hooks/useTitle';
import Swal from 'sweetalert2';
import Link from 'next/link';

const PasswordReset = () => {

	useTitle("Password Reset");

	const { setLoading, resetPassword } = useAuth();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [emailError, setEmailError] = useState("");

	// Password Reset
	const handlePasswordReset = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;

		setSuccess("");
		setError("");
		setEmailError("");

		if (email.length < 1) {
			setError("You must enter a valid email address to reset your password!");
			setEmailError("Email field can not be empty!");
			return;
		}

		Swal.fire({
			title: 'Are you sure?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, reset it!'
		}).then((result) => {
			if (result.isConfirmed) {
				resetPassword(email)
					.then(() => {
						setSuccess("Please check your email address to reset your password!");
						toast.success("Please check your email!");
						setLoading(false);
						form.reset();
					})
					.catch(error => {
						setError(error.message);
						toast.error("Please enter correct email address to reset your password!");
						setLoading(false);
					})
			}
		})
		
	};

	return (
		<section className="max-w-lg mx-auto mt-4 lg:mt-20 p-4">
			<div className="flex card card-compact w-full bg-base-100 custom-box-shadow">

				<div className="flex-1 p-6 md:p-8 pt-5 pb-1 md:pb-2">
					<h3 className='text-slate-700 text-2xl my-2 font-bold text-center'>Reset your Password</h3>
				</div>

				<div className='border-t border-slate-300 my-4 mx-6 md:mx-8'></div>

				<p className="!px-6 md:!px-8 text-green-600 mt-2 text-center">{success}</p>
				<p className="!px-6 md:!px-8 text-red-500 mt-2 text-center">{error}</p>

				<form onSubmit={handlePasswordReset}>
					<div className="!px-6 md:!px-8 !pt-2 card-body">
						<div className="form-control">
							<label className="label pl-0" htmlFor="email">
								<span className="label-text text-lg">Email</span>
							</label>
							<input type="email" id="email" name="email" placeholder="Enter your email address" className={emailError ? "input input-error focus:ring-0 focus:border-red-500" : "input input-bordered input-info focus:ring-0 focus:border-teal-700"} />
							<p className="text-red-500 mt-2">{emailError}</p>
						</div>
						<div className="form-control mt-4">
							<button type="submit" className="text-white bg-gradient-to-br from-red-600 to-orange-700 ring-2 ring-offset-1 ring-red-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reset Password</button>
						</div>
					</div>
				</form>
				<div className="p-6 md:p-8 !pb-8 pt-1 md:pt-2 text-center">
					Go Back to <Link href="/login" aria-label="Login Button" className='link link-primary font-semibold transition-all hover:duration-200 text-teal-600 hover:text-teal-700'>Login</Link>
				</div>

			</div>
		</section>
	);
};

export default PasswordReset;