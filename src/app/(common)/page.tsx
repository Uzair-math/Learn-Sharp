import HomeBanner from '@/components/Home/HomeBanner';
import Testimonial from '@/components/Home/Testimonial';
import Newsletter from '@/components/Home/Newsletter';
import TuitionTypes from '@/components/Home/TuitionTypes';
import SuccessStory from '@/components/Home/SuccessStory';
import Statistics from '@/components/Home/Statistics';
import Gallery from '@/components/Home/Gallery';
import PopularTutors from '@/components/Home/PopularTutors/PopularTutors';

export default function Home() {
  return (
    <div className="">
      <HomeBanner />
      <Gallery/> 
      <PopularTutors/>
      <TuitionTypes />
      <Statistics />
      <Testimonial />
      <SuccessStory />
      <Newsletter />
    </div>
  )
}
