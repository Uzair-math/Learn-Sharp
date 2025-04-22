import React from 'react';
import Blogs from "@/app/(common)/blogs/Blogs"
import CommonBanner from '@/components/(shared)/CommonHeader/CommonBanner';
// import SectionTitle from '@/components/(shared)/SectionTitle/SectionTitle';


const Blog = () => {

    return (
        <div>
            {/* bg-teal-700 py-2 */}
            <CommonBanner bannerHeading="Blogs"></CommonBanner>
            {/* <SectionTitle heading="Blogs" subHeading="Your Thinking!"></SectionTitle> */}
            <Blogs></Blogs>
        </div>
    );
};

export default Blog;