"use client"
import { Fade } from "react-awesome-reveal";

interface CommonBannerProps {
  bannerHeading: string;
}

const CommonBanner: React.FC<CommonBannerProps> = ({ bannerHeading }) => {
  return (
    <div className="bg-gradient-to-br from-teal-600 to-teal-700">
      <div className="flex justify-center items-center gap-8 max-w-7xl mx-auto py-16 lg:py-32">
        <div className="max-w-xl p-4 text-center">
          <header className='text-5xl text-teal-200 font-bold'>
            <Fade duration={300} triggerOnce={true} cascade>{bannerHeading}</Fade>
          </header>
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;