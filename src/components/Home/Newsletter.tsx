import { BsFillSendFill } from "react-icons/bs";
import SectionTitle from "@/components/(shared)/SectionTitle/SectionTitle";

const Newsletter = () => {
  return (
    // <section className="max-w-7xl mx-auto mt-12 lg:mt-20" data-aos="zoom-in">
    <section className="max-w-7xl mx-auto mt-12 lg:mt-20">
      
      <SectionTitle heading="Newsletter" subHeading="Stay in the loop by subscribing to our Newsletter!"></SectionTitle>

      <div className="mx-4 p-6 lg:p-12 rounded-lg border-2 shadow-lg border-teal-400 mt-6">
        <p className='content-description text-center mt-2'>Sign up for our newsletter and be the first to know about the latest updates, exclusive offers, and valuable resources from Learn Sharp . Our newsletter is packed with insightful content, educational tips, and exciting updates to support your learning journey.</p>
        <p className='content-description text-center mt-2'>Join our vibrant community of learners, educators, and enthusiasts who are passionate about education and learning.</p>
        <p className='content-description text-center mt-2'>Enter your email address below and click &apos;Subscribe&apos; to start receiving our informative and inspiring newsletter. <br /> Don&apos;t miss out on the opportunity to stay up to date with the latest developments in the education field.</p>
        <p className='content-description text-center mt-2 mb-6'>Subscribe to the Learn Sharp  newsletter today and embark on a journey of continuous learning!</p>
        <div className="relative mt-6 mb-3 md:mb-7 max-w-xl mx-auto">
          <input type="text" placeholder="Enter your email address" className="input input-bordered input-accent focus:border-teal-500 focus:ring-teal-500 outline:border-teal-500 w-full pr-16" />
          <button aria-label="Subscribe" className="btn absolute !bg-teal-300 hover:!bg-teal-400 top-0 right-0 rounded-l-none">
            <BsFillSendFill className='text-lg md:text-xl font-bold' />
            <span className='hidden md:block ml-1'>Subscribe</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;