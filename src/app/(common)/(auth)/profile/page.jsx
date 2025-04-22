"use client"
import { useState } from 'react';
import UserImage from '@/assets/images/user.png'
import { toast } from 'react-hot-toast';
import useAuth from "@/hooks/useAuth.js"
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import saveUser from '@/utils/saveUser';

const Profile = () => {
  const { user, userData, userRole, setLoading, updateUserProfile } = useAuth();

  const { register, getValues, handleSubmit, formState: { errors } } = useForm();

  const currentUserName = user?.displayName;
  const currentUserPhotoURL = user?.photoURL;
  const currentUserEmail = userData?.email;
  const gender = userData?.gender;
  const mobileNumber = userData?.mobileNumber;
  const qualification = userData?.qualification;
  const location = userData?.location;
  const role = userData?.role;

  // states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (userInformation, event) => {

    event.preventDefault();
    // console.log(event.target.location.value);

    // Perform form validation here if necessary
    if (!currentUserName || !currentUserEmail) {
      setError("Invalid data! Please fill in all required fields.");
      return;
    }

    // get information
    const userInfo = {
      displayName: currentUserName,
      email: currentUserEmail,
      photoURL: event.target.photoURL.value,
      gender: event.target.gender.value,
      mobileNumber: event.target.mobileNumber.value,
      qualification: event.target.qualification.value,
      location: event.target.location.value,
      role: role,
    };

    // console.log(userInfo);

    try {
      setLoading(true);

      // Update the user profile
      await updateUserProfile({
        displayName: userInfo?.displayName,
        photoURL: userInfo?.photoURL,
      });

      // Save the user information and provide feedback
      saveUser(userInfo);
      // console.log(userInfo);
      // console.log("Profile updated!");
      setSuccess("Profile updated!");
      toast.success("Profile updated!");
      setLoading(false);

      // Uncomment the following line when you're ready to navigate to the profile page
      // navigate("/profile");
    } catch (error) {
      setError(error.message);
      toast.error("Something went wrong!", error);
      setLoading(false);
    }
  };


  return (
    <section className="max-w-5xl mx-auto mt-4 lg:mt-20 p-4">
      <div className="flex card card-compact w-full bg-base-100 shadow-xl border-2 border-teal-400">

        <div className="flex-1 p-6 md:p-8 pt-5 pb-1 md:pb-2">
          <h3 className='text-slate-700 text-3xl my-2 font-bold text-center'>Profile</h3>
        </div>

        <div className="mx-auto my-2 w-24 aspect-square rounded-full ring-2 ring-offset-2 ring-teal-400">
          <Image width={96} height={96} className='rounded-full aspect-square object-cover object-top' src={currentUserPhotoURL ? currentUserPhotoURL : UserImage} alt={currentUserName} />
        </div>
        <div className="flex-1 mt-2">
          <h4 className='text-slate-700 text-2xl my-2 font-bold text-center'>{currentUserName ? currentUserName : "Welcome, User!"}</h4>
          <p className='text-slate-600 text-md mt-2 mb-3 font-medium text-center'>{currentUserEmail}</p>
          {
            userRole && <p className="uppercase px-5 py-1 bg-teal-300 w-fit mx-auto rounded-xl">{userRole}</p>
          }
        </div>

        <div className='border-t border-slate-300 my-4 mx-6 md:mx-8'></div>

        <p className="!px-6 md:!px-8 text-green-600 mt-2 text-center">{success}</p>
        <p className="!px-6 md:!px-8 text-red-500 mt-2 text-center">{error}</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="!px-6 md:!px-8 !pt-2 card-body">

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="form-control">
                <label className="label pl-0" htmlFor="name">
                  <span className="label-text text-lg">Name</span>
                </label>
                <input type="text" readOnly {...register("name")} defaultValue={currentUserName} id="name" name="name" placeholder="Enter your name" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
                {errors?.name && <p className="text-red-500 mt-2">Name is required!</p>} {/* Error Message */}
              </div>
              <div className="form-control">
                <label className="label pl-0" htmlFor="email">
                  <span className="label-text text-lg">Email</span>
                </label>
                <input type="email" readOnly {...register("email")} defaultValue={currentUserEmail} id="email" name="email" placeholder="Enter your email address" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
                {errors?.email && <p className="text-red-500 mt-2">Email is required!</p>} {/* Error Message */}
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="form-control">
                <label className="label pl-0" htmlFor="mobileNumber">
                  <span className="label-text text-lg">Mobile Number</span>
                </label>
                <input type="text" {...register("mobileNumber")} defaultValue={mobileNumber} id="mobileNumber" name="mobileNumber" placeholder="Enter your mobileNumber" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
              </div>
              <div className="form-control">
                <label className="label pl-0" htmlFor="gender">
                  <span className="label-text text-lg">Gender(F/M)</span>
                </label>
                <input type="text" {...register("gender")} defaultValue={gender} id="gender" name="gender" placeholder="Enter your gender" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="form-control">
                <label className="label pl-0" htmlFor="location">
                  <span className="label-text text-lg">Location</span>
                </label>
                <input type="text" {...register("location")} defaultValue={location} id="location" name="location" placeholder="Enter your location" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
              </div>
              <div className="form-control">
                <label className="label pl-0" htmlFor="qualification">
                  <span className="label-text text-lg">Qualification</span>
                </label>
                <input type="text" {...register("qualification")} defaultValue={qualification} id="qualification" name="qualification" placeholder="Enter your qualification" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
              </div>
            </div>
            <div className="form-control">
              <label className="label pl-0" htmlFor="photoURL">
                <span className="label-text text-lg">Photo URL</span>
              </label>
              <input type="text" {...register("photoURL")} defaultValue={currentUserPhotoURL} id="photoURL" name="photoURL" placeholder="Enter your photo url" className="input input-bordered input-accent focus:ring-0 focus:border-teal-500" />
              {errors?.photoURL && <p className="text-red-500 mt-2">Photo URL is required!</p>} {/* Error Message */}
            </div>
            <div className="form-control mt-1">
              <button type="submit" className="flex gap-3 mx-auto md:mx-0 w-full items-center justify-center text-white bg-gradient-to-br from-teal-500 to-teal-700 ring-2 ring-offset-1 ring-teal-400 disabled:ring-slate-400 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-semibold rounded-lg text-lg px-8 py-2 text-center disabled:from-slate-300 disabled:to-slate-400 disabled:text-slate-600 tooltip tooltip-bottom">Update Profile</button>
            </div>
          </div>
        </form>

      </div>
    </section>
  );
};

export default Profile;