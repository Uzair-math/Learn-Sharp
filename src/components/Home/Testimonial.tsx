"use client"
import { Rating } from "@smastrom/react-rating";
import SectionTitle from "@/components/(shared)/SectionTitle/SectionTitle";
import Image from "next/image";
import '@smastrom/react-rating/style.css';

const Testimonial = () => {
	return (
		<div>
			<section className="max-w-7xl mx-auto mt-12 lg:mt-32 p-4 md:px-0">

				<SectionTitle heading="Our Happy Students" subHeading="Check out what our students says about us."></SectionTitle>

				<div className="mt-4 md:mt-8 grid mb-8 border-2 border-slate-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
					<figure data-testid="testimonial-figure-element1" className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-bl-lg md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700">
						<blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white uppercase">Awesome!</h3>
							<p className="my-4">&quot;The Learn Sharp  platform has completely transformed my approach to finding tutors for my children. As a busy parent, the convenience of browsing through qualified tutors and directly connecting with them has been a lifesaver. The user-friendly interface and comprehensive tutor profiles make the selection process a breeze. I highly recommend Learn Sharp  to fellow parents seeking reliable and proficient tutors for their children.&quot;</p>
						</blockquote>
						<figcaption className="flex items-center justify-center space-x-3">
							<Image className="rounded-full w-20 h-20" height={40} width={40} src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="profile picture" />
							<div className="space-y-0.5 font-medium dark:text-white text-left">
								<div>Jese Leos</div>
								{/* <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">Spanish Course Student</div> */}
								<Rating style={{ maxWidth: 90 }} value={5} readOnly />
							</div>
						</figcaption>
					</figure>
					<figure data-testid="testimonial-figure-element2" className="flex flex-col items-center justify-center p-8 text-center bg-white border-slate-200 rounded-b-lg md:rounded-br-lg dark:bg-gray-800 dark:border-gray-700">
						<blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white uppercase">High Quality!</h3>
							<p className="my-4">&quot;Being a tutor on the Learn Sharp  platform has been an exceptional experience. The tools provided for managing my profile, availability, and interactions with students have streamlined the entire tutoring process. The review and rating system allows me to showcase my expertise, and the secure payment integration ensures a hassle-free way to receive compensation for my services. Learn Sharp  has truly elevated my tutoring journey.&quot;</p>
						</blockquote>
						<figcaption className="flex items-center justify-center space-x-3">
							<Image className="rounded-full w-20 h-20" height={40} width={40} src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png" alt="profile picture" />
							<div className="space-y-0.5 font-medium dark:text-white text-left">
								<div>Joseph McFall</div>
								{/* <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">German Course Student</div> */}
								<Rating style={{ maxWidth: 90 }} value={5} readOnly />
							</div>
						</figcaption>
					</figure>
				</div>
			</section>
		</div>
	);
};

export default Testimonial;