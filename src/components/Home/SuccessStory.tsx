"use client"
import React, { useEffect } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
// import '@smastrom/react-rating/style.css'
// import { Rating } from '@smastrom/react-rating'
import Image from 'next/image';
import womanImage1 from "@/assets/images/success/image1.jpg"
import manImage1 from "@/assets/images/success/image2.jpg"
import manImage2 from "@/assets/images/success/image3.jpg"
import AOS from 'aos';
// import 'aos/dist/aos.css';
import SectionTitle from "@/components/(shared)/SectionTitle/SectionTitle";

const SuccessStory: React.FC = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);

	const [sliderRef] = useKeenSlider<HTMLDivElement>(
		{
			loop: true,
		},
		[
			(slider) => {
				let timeout: ReturnType<typeof setTimeout>
				let mouseOver = false
				function clearNextTimeout() {
					clearTimeout(timeout)
				}
				function nextTimeout() {
					clearTimeout(timeout)
					if (mouseOver) return
					timeout = setTimeout(() => {
						slider.next()
					}, 2000)
				}
				slider.on("created", () => {
					slider.container.addEventListener("mouseover", () => {
						mouseOver = true
						clearNextTimeout()
					})
					slider.container.addEventListener("mouseout", () => {
						mouseOver = false
						nextTimeout()
					})
					nextTimeout()
				})
				slider.on("dragStarted", clearNextTimeout)
				slider.on("animationEnded", nextTimeout)
				slider.on("updated", nextTimeout)
			},
		]
	)

	return (
		<section className="max-w-7xl mx-auto mt-12 lg:mt-32 p-4 md:px-0">
			<SectionTitle heading="Success Story" subHeading="Success Story: Learn Sharp 's Impact and Growth"></SectionTitle>
			<div data-aos="fade-up" ref={sliderRef} className="keen-slider lg:h-[300px] md:h-[400px] sm:h-[400px] custom-box-shadow rounded-md">
				<div className="keen-slider__slide number-slide rounded-lg lg:flex">
					<Image className='object-cover h-auto max-sm:mx-auto max-md:mx-auto m-8 rounded-l-full rounded-t-full' src={manImage1} alt='Image of John Smith' placeholder='blur' width={"200"} />
					<div className="mx-8">
						<h1 className='mt-10 mb-5 text-2xl font-bold'>John&apos;s Remarkable Progress</h1>
						<p className="text-justify pb-8">John Smith, a determined high school student, embarked on his journey to academic excellence with Learn Sharp . Struggling to grasp advanced calculus concepts, John turned to the platform in search of a qualified tutor. With the help of Learn Sharp , he found a skilled tutor who not only clarified complex equations but also instilled in him the confidence to tackle challenging math problems. John&apos;s dedication, coupled with personalized guidance, enabled him to excel in calculus and achieve top grades in his exams. Today, John stands as a testament to Learn Sharp &apos;s commitment to empowering students and fostering success.</p>
					</div>
				</div>
				<div className="keen-slider__slide number-slide rounded-lg lg:flex">
					<Image className='object-cover h-auto max-sm:mx-auto max-md:mx-auto m-8 rounded-l-full rounded-t-full' src={womanImage1} alt='Image of Susan Gray' placeholder='blur' width={"200"} />
					<div className="mx-8">
						<h1 className='mt-10 mb-5 text-2xl font-bold'>Susan&apos;s Language Mastery</h1>
						<p className="text-justify pb-8">Susan Gray, an aspiring globetrotter, set her sights on becoming a multilingual communicator. Through Learn Sharp &apos;s language tutoring, Susan embarked on an exciting journey of language acquisition. With the guidance of experienced language tutors, she mastered new languages and expanded her cultural horizons. Learn Sharp &apos;s innovative approach to language learning, including interactive sessions and tailored study materials, transformed Susan from a novice to a confident polyglot. Armed with her newfound language skills, Susan now confidently explores new countries and connects with people from diverse backgrounds.</p>
					</div>
				</div>
				<div className="keen-slider__slide number-slide rounded-lg lg:flex">
					<Image className='object-cover h-auto max-sm:mx-auto max-md:mx-auto m-8 rounded-l-full rounded-t-full' src={manImage2} alt='Image of James Patterson' placeholder='blur' width={"200"} />
					<div className="mx-8">
						<h1 className='mt-10 mb-5 text-2xl font-bold'>James&apos; Academic Resilience</h1>
						<p className="text-justify pb-8">James Patterson, a diligent college student, faced a challenging semester with complex computer science coursework. Feeling overwhelmed, he turned to Learn Sharp  for assistance. With the platform&apos;s support, James connected with a dedicated tutor who not only clarified intricate programming concepts but also provided valuable study strategies. Through consistent guidance and personalized mentoring, James not only excelled in his computer science projects but also gained a deeper understanding of the subject. Learn Sharp &apos;s unwavering commitment to helping students overcome obstacles empowered James to navigate his academic journey with confidence and achieve outstanding results.</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SuccessStory;