import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom'
import SpinnerWaiting from '../../../components/LoadingComponent/spinnerWaiting';
import { getDetailBlogById } from '../../../service/public/blogService/blogAPI';
import "../../../style/blog/styleBlog.css"
const BlogDetailGuest = () => {
    const { id } = useParams();
    const [blogDetail, setBlogDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchBlogDetail = async () => {
        try {
            let data = await getDetailBlogById(id)
            if (data.status === 200) {
                setBlogDetail(data.data); // Lưu toàn bộ dữ liệu vào state
                console.log(data.data);
                setLoading(false)
            }
        } catch (error) {
            console.error('Error fetching blog details:', error);
        }
    };

    useEffect(() => {
        fetchBlogDetail(); // Gọi hàm fetch khi component mount
    }, []);

    if (!blogDetail) {
        return <SpinnerWaiting/>
    }
    return (
        <>
            <div className='relative w-full'>
                <img
                    alt='cover photo'
                    src='https://unwinds.s3.ap-southeast-2.amazonaws.com/1731728788447_coverphotos.jpg'
                    className='w-full'
                />
                <div className="absolute top-1/2 left-1/2 px-4 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold p-1 border-4 transition-all duration-300 ease-in-out hover:text-slate-200 hover:bg-[rgba(0,0,0,0.25)] bg-transparent">
                    <div className="p-1 font-serif px-6 font-thin">
                        Travel Blog
                    </div>
                </div>
            </div>
            <div className=' mb-20 max-w-7xl mx-auto'>


                <div className='w-3/4 mx-auto my-10'>
                    <div><div className="flex items-center text-gray-500 justify-start">
                        {/* Logo */}
                        <img
                            src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731728579799_LogoUnwind.png"
                            alt="Logo"
                            className="w-12 h-8 mr-2" // Điều chỉnh kích thước logo và khoảng cách
                        />

                        {/* Tên blog và ngày tạo */}
                        <div className='flex gap-2'>
                            <p className="text-sm">Unwind o</p>
                            <p className="text-sm">Được tạo lúc: {blogDetail.createdAt}</p>
                        </div>
                    </div>

                    </div>
                    <div className='mx-auto py-4'>
                        <p className='text-center text-sky-500 hover:text-sky-600 text-lg'>Việt Nam</p>
                        <h1 className="text-4xl text-center font-sans text-gray-800 font-medium mt-4">{blogDetail.title}</h1>
                    </div>


                    {/* Ảnh bìa */}
                    {blogDetail.image && (
                        <div className="my-4">
                            <img
                                src={blogDetail.image}
                                alt="Blog Cover"
                                className="w-full object-cover shadow-md"
                            />

                        </div>
                    )}
                </div>
                <div className="p-6 mx-auto max-w-4xl space-y-6">
                    {/* Nội dung */}
                    <div
                        className="prose lg:prose-xl"
                        dangerouslySetInnerHTML={{
                            __html: blogDetail.content,
                        }}
                    />

                </div>
                <div className="mt-6 flex justify-center py-6">
                    <Link to={`/blogs`}>
                        <button
                            className="flex items-center justify-center bg-gradient-to-r from-[#519cf1] to-[#1462f3] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"

                        >
                            <span className="mr-3">Quay về danh sách các bài blog</span>
                            <span className="bg-white text-sky-700 w-8 h-8 flex items-center justify-center rounded-full shadow-md transform transition-all duration-300 hover:scale-110">
                                <FaArrowLeft />
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default BlogDetailGuest