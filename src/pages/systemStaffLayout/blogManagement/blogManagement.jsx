import React, { useState } from 'react';
import Bloglist from "./blogList";
import CreateBlog from './createBlog';

const BlogManagement = () => {
    const [activeComponent, setActiveComponent] = useState('blogList');

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    return (
        <>
            <div className="w-full relative">
                <div className="py-4 p-6 space-y-4 border-l-4 border-blue-500 bg-gray-50 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-gray-700">
                        Danh sách <span className="text-blue-600">bài blog</span> và
                        <span className="text-blue-600"> quản lý nội dung</span>
                    </h1>
                    <h3 className="text-lg text-gray-500">
                        <span className="font-semibold text-blue-600">Quản lý</span> tất cả các bài blog hiện có và
                        <span className="font-semibold text-blue-600"> cập nhật nội dung</span> dễ dàng tại đây.
                    </h3>
                </div>
            </div>

            <div className="flex justify-end items-center py-4 mx-auto w-full mt-6 gap-8">
                {activeComponent !== 'blogList' && (
                    <div
                    className="relative rounded-xl text-center text-lg font-semibold px-8 py-4 cursor-pointer bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                        onClick={() => handleButtonClick('blogList')}
                    >
                        <span className=" flex items-center justify-center gap-2">
                            📜 Danh sách các bài blog
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                    </div>
                )}

                {activeComponent !== 'createBlog' && (
                    <div
                        className="relative rounded-xl text-center text-lg font-semibold px-8 py-4 cursor-pointer bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                        onClick={() => handleButtonClick('createBlog')}
                    >
                        <span className="flex items-center justify-center gap-2">
                            ✍️ Thêm mới một bài blog
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                    </div>
                )}
            </div>

            <div>
                {activeComponent === 'blogList' && <Bloglist />}
                {activeComponent === 'createBlog' && <CreateBlog create={() => setActiveComponent("blogList")} />}
            </div>
        </>
    );
};

export default BlogManagement;
