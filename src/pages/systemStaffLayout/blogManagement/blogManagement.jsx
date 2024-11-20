import React, { useState } from 'react';
import Bloglist from './Bloglist';
import CreateBlog from './CreateBlog';

const BlogManagement = () => {
    // State to track which component to display
    const [activeComponent, setActiveComponent] = useState('blogList');

    // Function to handle button click to switch components
    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            <div className="w-full relative">
                {/* Image */}
                <img
                    src="https://marketplace.canva.com/EAD0X2Vero8/1/0/1600w/canva-%C4%91%C6%91n-gi%E1%BA%A3n-thi%C3%A2n-nhi%C3%A2n-%E1%BA%A3nh-kh%C3%A1m-ph%C3%A1-b%C3%A0i-%C4%91%C4%83ng-twitter-N4UXG6Nb33w.jpg"
                    alt="Featured Image"
                    className="w-full h-96 object-cover"
                />
                {/* Overlay Text */}
                <div className="absolute top-1/4 left-1/2 px-4 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold p-1 border-4 transition-all duration-300 ease-in-out hover:text-slate-200 hover:bg-[rgba(0,0,0,0.25)] bg-transparent">
                    <div className="p-1">
                        Travel Blog
                    </div>
                </div>
            </div>

            {/* Button Container */}
            <div className='flex justify-center items-center py-8 mx-auto w-full mt-6 gap-4'>
                <div
                    className="text-center hover:text-slate-200 hover:bg-[rgba(0,0,0,0.25)] text-gray-500 text-xl font-bold px-4 p-2 border-2 border-gray-500 hover:border-white cursor-pointer"
                    onClick={() => handleButtonClick('blogList')}
                >
                    Danh sách các bài blog
                </div>
                <div
                    className="text-center hover:text-slate-200 hover:bg-[rgba(0,0,0,0.25)] text-gray-500 text-xl font-bold px-4 p-2 border-2 border-gray-500 hover:border-white cursor-pointer"
                    onClick={() => handleButtonClick('createBlog')}
                >
                    Thêm mới một bài blog
                </div>
            </div>

            <div className="py-6">
                {activeComponent === 'blogList' && <Bloglist />}
                {activeComponent === 'createBlog' && <CreateBlog create={() => setActiveComponent("blogList")} />}
            </div>

        </>
    );
};

export default BlogManagement;
