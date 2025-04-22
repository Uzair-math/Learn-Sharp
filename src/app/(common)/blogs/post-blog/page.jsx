"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useTitle } from '@/hooks/useTitle';
import blogPostApi from "@/utils/blogPostApi"
import CommonBanner from '@/components/(shared)/CommonHeader/CommonBanner';
import Image from 'next/image';
// import useGetUser from "@/hooks/useGetUser";
import getUser from '@/utils/getUser';


const PostBlog = () => {

    useTitle("Add Blog Post");

    const router = useRouter();
    const { user } = useAuth();

    // console.log(" post blog page 22", user);
    const [blogPostImageUrl, setBlogPostImageUrl] = useState('')
    const [storeUserData, setStoreUserData] = useState([])


    const toDay = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    }

    const navigate = () => {
        router.push('/blogs');
    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();


    const uploadImage = async (event) => {
        const formData = new FormData();
        // if (!event.target.files[0]) return;

        const selectedImageFile = event.target.files[0]
        if (selectedImageFile) {
            const fileName = selectedImageFile.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();
            // Define allowed extensions
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

            if (allowedExtensions.includes(fileExtension)) {
                //   console.log('Valid file extension: ' + fileExtension);
            } else {
                // File has an invalid extension
                return toast.error('Invalid Image Extension: ' + fileExtension)
            }
        }

        formData.append("image", event.target.files[0]);
        const toastId = toast.loading("Uploading image...");
        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=1cc8373b2b72da27fdf6f46447e5d7a8`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (!res.ok) throw new Error("😞 Failed to upload image");

            const data = await res.json();
            toast.dismiss(toastId);
            toast.success("Image added successfully!");
            setValue("photo", data.data.url);
            setBlogPostImageUrl(data.data.url)
            console.log('49', data.data.url);

        } catch (error) {
            toast.error(`Uploading !😞! Error `);
            toast.dismiss(toastId);
        }
    };

    const onSubmit = async (data) => {
        const postImgUrl = blogPostImageUrl;
        const postDescription = data.words;
        const postDate = toDay();
        const userEmail = user.email
        const userName = user.displayName;
        const userData = await getUser(user?.email);
        // console.log(userData.role,userData.photoURL, userEmail);
        const userRole = userData.role;
        const userImgUrl = userData.photoURL

        const allData = {
            postImgUrl, postDescription, postDate, userName, userRole, userImgUrl
        }

        // console.log("91", allData);
        blogPostApi(allData)
        navigate()

    }
    return (
        <div>
            <CommonBanner bannerHeading="Add a Blog Post"></CommonBanner>

            <section className='text-sm max-w-7xl mx-auto mt-6 lg:mt-12 lg:p-4 p-2 text-slate-700 text-justify'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {blogPostImageUrl ? <Image src={blogPostImageUrl} className="mb-6 object-cover object-center" width={1280} height={500} alt="Blog Image" /> : ""}

                    <label className='form-label text-xl' htmlFor='xmlFile'>
                        Image Upload
                    </label>
                    <input
                        type='file'
                        className='form-control rounded-md mt-2'
                        id='xmlFile'
                        // {...register('imageFile')}
                        onChange={uploadImage}
                    />

                    <textarea placeholder='Type Your Thinking' className='my-4 w-full h-28 rounded-lg mt-2' {...register("words", {})} />

                    <button className='bg-slate-600 py-4 px-8 rounded-md text-white hover:bg-slate-700' type='submit'>Submit</button>
                </form>
            </section>
        </div>
    );
};

export default PostBlog;