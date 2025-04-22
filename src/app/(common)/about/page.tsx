"use client"
import React from 'react';
import { Accordion } from 'flowbite-react';
import FAQsImage from '@/assets/images/faqs.jpg'
import CommonBanner from '@/components/(shared)/CommonHeader/CommonBanner';
import Link from 'next/link';
import Image from 'next/image';

const About = () => {
  return (
    <div>

      {/* <ReactHelmet documentTitle="Language School | About" metaDescription="About"></ReactHelmet> */}

      {/* About Us Banner */}
      <CommonBanner bannerHeading="About Us"></CommonBanner>

      <section className="max-w-7xl mx-auto mt-12 lg:mt-20 p-4 text-slate-700 text-justify">
        <div>
          <header>
            <h2 className="content-title text-center">Interested to Know More About Us?</h2>
          </header>
          <p className="content-description text-center mb-8">
            Check for finding out more information!
          </p>
        </div>
        <div>
          <div className='border-2 border-slate-200 rounded-xl p-4 md:p-8 shadow-lg'>
            <header>
              <h3 className='text-lg md:text-xl'>Welcome to <span className='font-bold text-teal-600'>Learn Sharp </span>!</h3>
            </header>
            <div className='text-sm md:text-base'>
              <p className='mt-4'>At Learn Sharp , our vision is to bridge the gap between students and qualified tutors, making the process of finding the perfect tutor an efficient and enriching experience. We are committed to offering a comprehensive web application that simplifies the journey of connecting eager learners with knowledgeable tutors in their local communities.</p>
              <p className='mt-4'>Our aim is to create a centralized hub that empowers students and parents to find reliable tutors who can cater to their educational needs. Whether you&apos;re seeking academic assistance, specialized skill development, or exam preparation, Learn Sharp  is here to facilitate that journey.</p>
              <p className='mt-4'>As the demand for personalized learning grows, our platform provides a user-friendly interface that allows students to explore tutor profiles, view ratings, reviews, and subjects taught. Likewise, tutors can showcase their expertise and availability, creating a conducive environment for meaningful learning connections to flourish.</p>
              <p className='mt-4'>What sets Learn Sharp  apart is our commitment to fostering a seamless and secure learning experience. With our intuitive dashboard systems for both students and tutors, we provide a space to manage preferences, schedules, and communication effectively. We also recognize the importance of reviews and ratings in the learning process, which is why we facilitate a comprehensive review system to ensure transparency and accountability.</p>
              <p className='mt-4'>Our tech-forward approach utilizes the latest in web development, including React.js with Redux for state management, NextJS, TypeScript, and a reliable database in MongoDB. We also prioritize the security of user data through JWT-based user authentication and the integration of the reputable Stripe payment gateway.</p>
              <p className='mt-4'>Learn Sharp  thrives on collaboration, bringing together a dedicated team of developers and leaders who share a passion for education. Our mission is to provide an intuitive and reliable platform that nurtures the growth of both students and tutors. As the educational landscape continues to evolve, we&apos;re excited to be at the forefront, transforming the way tutoring services are accessed and delivered.</p>
              <p className='mt-4'>Join us on this educational journey, where connecting with qualified tutors is just a click away. Explore the possibilities that Learn Sharp  offers and embark on a transformative learning experience that empowers you to succeed.</p>
              <p className='mt-4'>Discover, connect, and excel with Learn Sharp  - Where Learning Comes to Life!</p>
            </div>
          </div>
        </div>

        <div className='mt-16 md:mt-24'>
          <header>
            <h2 className="content-title text-center">Frequently Asked Questions (FAQs)</h2>
          </header>
          <p className="content-description text-center mb-10">
            Are you looking for some answers? Check for finding out more information!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 items-center mb-4">
          <Accordion className='col-span-1 md:col-span-3 w-full max-w-7xl mx-auto mb-4 md:mb-8 border-2 border-slate-200'>
            <Accordion.Panel>
              <Accordion.Title>
                What is Learn Sharp ?
              </Accordion.Title>
              <Accordion.Content className='border-b-2 border-teal-200'>
                <p className="mb-2 text-gray-500 text-sm md:text-base dark:text-gray-400">
                  Learn Sharp  is a comprehensive MERN stack web application designed to connect students and parents with qualified and reliable tutors in their local area. It serves as a centralized hub for finding, connecting, and hiring tutors who can cater to various educational needs.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                How does Learn Sharp  work?
              </Accordion.Title>
              <Accordion.Content className='border-b-2 border-teal-200'>
                <p className="mb-2 text-gray-500 text-sm md:text-base dark:text-gray-400">
                  Learn Sharp  allows students or parents to create accounts and browse through a directory of qualified tutors. You can view tutor profiles, ratings, and reviews to make an informed decision. Once you find the right tutor, you can directly contact them for tutoring services.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                What kind of tutors can I find on Learn Sharp ?
              </Accordion.Title>
              <Accordion.Content className='border-b-2 border-teal-200'>
                <p className="mb-2 text-gray-500 text-sm md:text-base dark:text-gray-400">
                  Learn Sharp  offers a wide range of tutors, from academic subjects to specialized skills. You can find tutors for subjects like math, science, languages, music, arts, and more. Our platform ensures diversity in tutor expertise to meet various learning needs.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                Can I review and rate tutors on Learn Sharp ?
              </Accordion.Title>
              <Accordion.Content className='border-b-2 border-teal-200'>
                <p className="mb-2 text-gray-500 text-sm md:text-base dark:text-gray-400">
                  Yes, Learn Sharp  encourages transparency and accountability through a review and rating system. After receiving tutoring services, students can provide feedback on tutors, helping others make informed choices.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                How do I make payments for tutoring services?
              </Accordion.Title>
              <Accordion.Content className='border-b-2 border-teal-200'>
                <p className="mb-2 text-gray-500 text-sm md:text-base dark:text-gray-400">
                  Learn Sharp  provides a seamless payment experience through the integration of the Stripe payment gateway. You can make secure payments for tutoring services directly through the platform.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                Can tutors create profiles on Learn Sharp ?
              </Accordion.Title>
              <Accordion.Content className='border-b-2 border-teal-200'>
                <p className="mb-2 text-gray-500 text-sm md:text-base dark:text-gray-400">
                  Yes, tutors can create detailed profiles showcasing their qualifications, experience, subjects taught, and hourly rates. This allows students to make informed decisions based on the tutor&apos;s expertise.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                What sets Learn Sharp  apart from other tutoring platforms?
              </Accordion.Title>
              <Accordion.Content className='border-b-2 border-teal-200'>
                <p className="mb-2 text-gray-500 text-sm md:text-base dark:text-gray-400">
                  Learn Sharp  stands out with its user-friendly interface, comprehensive search and filtering system, and a commitment to delivering a seamless and secure learning experience. Our platform&apos;s focus on transparency, efficiency, and qualified tutors makes us a unique choice for both students and parents.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                How can I get in touch with Learn Sharp  support?
              </Accordion.Title>
              <Accordion.Content className='border-b-2 border-teal-200'>
                <p className="mb-2 text-gray-500 text-sm md:text-base dark:text-gray-400">
                  If you have any questions or need assistance, you can contact our dedicated support team through the &apos;Contact Us&apos; section on the website. We are here to assist you throughout your Learn Sharp  journey.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                Is my data safe on Learn Sharp ?
              </Accordion.Title>
              <Accordion.Content className='border-b-2 border-teal-200'>
                <p className="mb-2 text-gray-500 text-sm md:text-base dark:text-gray-400">
                  Absolutely. Learn Sharp  prioritizes the security of user data. We utilize secure user authentication with JSON Web Tokens (JWT) and integrate a reputable payment gateway, Stripe, to ensure safe transactions.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
          <div className='col-span-2'>
            <Image className="w-full min-w-[350px]" src={FAQsImage} alt="FAQs Image" />
          </div>
        </div>
        <div>
          If you have any other questions or need further information, please feel free to&nbsp;
          <Link
            href="/contact"
            rel="nofollow"
            className="text-teal-600 hover:underline dark:text-teal-500 font-semibold"
          >contact
          </Link> our friendly staff. We are here to assist you on your language learning journey!
        </div>
      </section>
    </div>
  );
};

export default About;