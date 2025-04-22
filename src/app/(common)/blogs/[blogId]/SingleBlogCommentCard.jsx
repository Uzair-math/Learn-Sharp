import React, { useState } from 'react';
import Image from 'next/image';

const SingleBlogCommentCard = ({ item }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const handleLikeClick = () => {
        if (!liked) {
            setLiked(true);
            setLikeCount(likeCount + 1);
        } else {
            setLiked(false);
            setLikeCount(likeCount - 1);
        }
    };

    return (
        <div className="">
            <div className="grid grid-cols-4 gap-3 items-center py-2">
                {/* userImgUrl */}
                <Image className='object-cover  mx-2 my-4 rounded-full' src={item.userImgUrl} alt='' width={50} height={50} />
                <p className='m-1'>Name:{item.bloggerName}</p>
                <p className='m-1'>Time: {item.time}</p>
                <p className='m-1'>Date: {item.date}</p>
            </div>
            <div className="border lg:w-[90%] bg-slate-100 lg:ml-10 ml-4 rounded-md border-slate-700/5">
                <p className='p-2 text-base '>{item.comment}</p>
                <div className='flex justify-end mr-4'>
                    <button onClick={handleLikeClick}>
                        {liked ? 'Unlike' : 'Like'}
                        <span role="img" aria-label="Heart Emoji">
                            {liked ? '❤️' : '🤍'}
                        </span>
                    </button>
                    <span className=' font-semibold text-lg m-1'>{likeCount}</span>
                </div>
            </div>
        </div>
    );
};

export default SingleBlogCommentCard;