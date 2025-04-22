"use client"
import React, { useState } from 'react';
import CommonBanner from '@/components/(shared)/CommonHeader/CommonBanner';
import Lottie from 'lottie-react';
import ContactUsLottie from '@/assets/lottie/contact-us.json';
import { BsSend } from 'react-icons/bs';
import useAuth from "@/hooks/useAuth";
import toast from 'react-hot-toast';

const Contact = () => {

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
  });

  const { user }: any = useAuth();
  // console.log("logged user", user);
  // const currentUserEmail = user?.email;

  const sendEmail = async () => {

    setLoading(true);

    // console.log('Name:', data.name);
    // console.log('Subject:', data.subject);
    // console.log('Email:', data.email);
    // console.log('Message:', data.message);

    const emailData = {
      name: data.name,
      to: data.email,
      subject: data.subject,
      message: data.message,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sendEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        // console.log("Email sent successfully");
        setLoading(false);
        toast.success("Email sent successfully!");
      } else {
        // console.error("Email sending failed");
        setLoading(false);
        toast.error("Email sending failed!");
      }
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  };

  return (
    <div>
      {/* Contact Banner */}
      <CommonBanner bannerHeading="Contact Us" />

      {/* Google Map */}
      <div className="mt-12 md:mt-20">
        <header>
          <h2 className="content-title text-center">Find Us on Google Map</h2>
        </header>
        <p className="content-description text-center mb-8">
          Check out the map for finding our location.
        </p>
      </div>
      <div className="max-w-[1190px] w-100 px-4 mx-auto">
        <iframe className="border-2 border-slate-200 w-full h-[300px] md:h-[500px] rounded-lg" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3070.1811708823325!2d90.41576684428637!3d23.780119352475314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c79ebfc24eab%3A0xea7dab563f12457a!2sGulshan%201%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1684626393720!5m2!1sen!2sbd" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div className="mt-16 md:mt-24">
        <header>
          <h2 className="content-title text-center">Get in Touch with Us</h2>
        </header>
        <p className="content-description text-center">
          We will get back to you as soon as we can.
        </p>
      </div>
      <section className="flex flex-col md:flex-row gap-4 md:gap-16 items-center max-w-7xl mx-auto mt-4 md:mt-8 p-4">
        <div>
          <Lottie className="max-w-xl mx-auto" animationData={ContactUsLottie} loop={true} />
        </div>

        <div className="flex max-w-xl card card-compact w-full bg-base-100 px-0 md:px-4 py-2 md:py-7 box-shadow-custom">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="!px-6 md:!px-8 !pt-2 card-body">
              <div className="form-control">
                <label className="label pl-0" htmlFor="name">
                  <span className="label-text text-md md:text-[16px]">Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered focus:outline-teal-500 focus:border-teal-200 focus:ring-teal-400 input-sm py-5 text-[14px]"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
              <div className="form-control">
                <label className="label pl-0" htmlFor="subject">
                  <span className="label-text text-md md:text-[16px]">Subject</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Email subject"
                  className="input input-bordered focus:outline-teal-500 focus:border-teal-200 focus:ring-teal-400 input-sm py-5 text-[14px]"
                  onChange={(e) => setData({ ...data, subject: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label pl-0" htmlFor="email">
                  <span className="label-text text-md md:text-[16px]">Email</span>
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="input input-bordered focus:outline-teal-500 focus:border-teal-200 focus:ring-teal-400 input-sm py-5 text-[14px]"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label pl-0" htmlFor="message">
                  <span className="label-text text-md md:text-[16px]">Message</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="input input-bordered focus:outline-teal-500 focus:border-teal-200 focus:ring-teal-400 text-[14px] h-auto"
                  placeholder="Enter your message"
                  onChange={(e) => setData({ ...data, message: e.target.value })}
                ></textarea>
              </div>

              <div className="form-control mt-3">

                <button type="button" onClick={sendEmail} disabled={loading} className="relative flex w-100 items-center justify-center p-0.5 overflow-hidden text-lg font-semibold text-teal-700 rounded-lg group bg-gradient-to-br from-teal-600 to-teal-500 group-hover:from-teal-600 group-hover:to-teal-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800">
                  {!loading &&
                    <span className="flex items-center justify-center w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <BsSend className="mr-2 self-center" />
                      Send Message
                    </span>
                  }
                  {loading &&
                    <span className="flex items-center justify-center w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <span className="loading loading-bars loading-md mr-2 self-center"></span>
                      <span className="animate-pulse">Sending Message...</span>
                    </span>
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
