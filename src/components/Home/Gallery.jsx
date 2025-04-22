"use client";
import React from 'react';
import Image from 'next/image';
import SectionTitle from "@/components/(shared)/SectionTitle/SectionTitle";
import CustomImage1 from '@/assets/images/carousel/image1.jpg'
import CustomImage2 from '@/assets/images/carousel/image2.jpg'
import CustomImage3 from '@/assets/images/carousel/image3.jpg'
import CustomImage4 from '@/assets/images/carousel/image4.jpg'

const Gallery = () => {
  return (
    <section className="max-w-7xl mx-auto mt-12 lg:mt-32 p-4 md:px-0">

      <SectionTitle heading="Photo Gallery" subHeading="Empowering Minds through Education: Nurturing Growth with Mentorship"></SectionTitle>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <Image className="h-auto max-w-full rounded-lg object-cover object-center" width={624} height={624} src={CustomImage1} alt="Gallery Image 1" />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg object-cover object-center" width={624} height={624} src={CustomImage2} alt="Gallery Image 2" />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg object-cover object-center" width={624} height={624} src={CustomImage3} alt="Gallery Image 3" />
        </div>
        <div>
          <Image className="h-auto max-w-full rounded-lg object-cover object-center" width={624} height={624} src={CustomImage4} alt="Gallery Image 4" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;