import SectionTitle from "@/components/(shared)/SectionTitle/SectionTitle";
import Image from "next/image";
// import Link from "next/link";
import HomeTutoring from '@/assets/images/tuition/home-tutoring.svg';
import OnlineTutoring from '@/assets/images/tuition/online-tutoring.svg';
import GroupTutoring from '@/assets/images/tuition/group-tutoring.svg';

const TuitionTypes = () => {


  return (
    <section className="max-w-7xl mx-auto mt-12 lg:mt-32 p-4 md:px-0">

      <SectionTitle heading="Tuition Types" subHeading="Find the Best Tuition Type which suit you most."></SectionTitle>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 mt-8">
        {/* <div className="flex card card-compact w-full bg-base-100 box-shadow-custom group" data-aos="zoom-in"> */}
        <div className="flex card card-compact w-full bg-base-100 custom-box-shadow group">
          {/* <LazyLoad offset={500}> */}
            <figure className='rounded-t-xl'>
              <Image className='overflow-hidden h-96 w-full object-cover rounded-t-xl transition duration-300 group-hover:scale-110' src={HomeTutoring} alt="Home Tutoring Image" />
            </figure>
          {/* </LazyLoad> */}
          <div className='border-t border-slate-300 mb-1'></div>
          <div className="flex-1 p-4 pt-4 pb-4">
            <h3 className='text-center text-2xl text-slate-700 font-bold'>Home Tutoring</h3>
            <h4 className='font-medium text-sm text-center mt-3 mb-3 text-slate-600'>Looking for one-to-one classes?</h4>
            <p className='font-medium text-base text-center mt-2 mb-2 text-slate-600'>Register Yourself & then Enroll to a course, by choosing the Course & then the Teacher.</p>
          </div>
        </div>
        
        <div className="flex card card-compact w-full bg-base-100 custom-box-shadow group">
          {/* <LazyLoad offset={500}> */}
            <figure className='rounded-t-xl'>
              <Image className='overflow-hidden h-96 w-full object-cover rounded-t-xl transition duration-300 group-hover:scale-110' src={OnlineTutoring} alt="Online Tutoring Image" />
            </figure>
          {/* </LazyLoad> */}
          <div className='border-t border-slate-300 mb-1'></div>
          <div className="flex-1 p-4 pt-4 pb-4">
            <h3 className='text-center text-2xl text-slate-700 font-bold'>Online Tutoring</h3>
            <h4 className='font-medium text-sm text-center mt-3 mb-3 text-slate-600'>Are you left with any doubts?</h4>
            <p className='font-medium text-base text-center mt-2 mb-2 text-slate-600'>Yes, we will record your live classes for you. Just subscribe to the videos.</p>
          </div>
        </div>
        
        <div className="flex card card-compact w-full bg-base-100 custom-box-shadow group">
          {/* <LazyLoad offset={500}> */}
            <figure className='rounded-t-xl'>
              <Image className='overflow-hidden h-96 w-full object-cover rounded-t-xl transition duration-300 group-hover:scale-110' src={GroupTutoring} alt="Group Tutoring Image" />
            </figure>
          {/* </LazyLoad> */}
          <div className='border-t border-slate-300 mb-1'></div>
          <div className="flex-1 p-4 pt-4 pb-4">
            <h3 className='text-center text-2xl text-slate-700 font-bold'>Group Tutoring</h3>
            <h4 className='font-medium text-sm text-center mt-3 mb-3 text-slate-600'>Need the Competitive & Affordable experience?</h4>
            <p className='font-medium text-base text-center mt-2 mb-2 text-slate-600'>Hire ours expert tutors in affordable payment and enhance learning with sharing.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TuitionTypes;