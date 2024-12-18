import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom'
import SpinnerWaiting from '../../../components/LoadingComponent/spinnerWaiting';
import Navigation from '../../../components/Navbar/navigation';
import { getDetailBlogById, getAllBlog } from '../../../service/public/blogService/blogAPI';
import "../../../style/blog/styleBlog.css"
const BlogDetailGuest = () => {
    const { id } = useParams();
    const [blogDetail, setBlogDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([])
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
    const fetchAllBlogs = async () => {
        try {
            let data = await getAllBlog("", 0, 8);
            if (data.status === 200) {
                setBlogs(data.data.content);
                console.log(data.data.content)
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogDetail();
        fetchAllBlogs()
    }, [id]);

    if (!blogDetail) {
        return <SpinnerWaiting />
    }
    return (
        <>
            <Navigation />
            <div className='bg-gray-100'>
                {/* Phần ảnh bìa chính */}
                <div className="relative w-full">
                    <img
                        alt="cover photo"
                        src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1734459893087_20cbf31ecf279ccab1a3264a2cec80c6 (1).jpg"
                        className="w-full h-[450px] object-cover"
                    />
                </div>

                {/* Phần tiêu đề blog */}
                <div className="max-w-7xl mx-auto px-6 my-10 text-center">
                    <p className="text-sky-500 text-lg font-medium hover:underline">
                        Việt Nam
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold font-sans text-gray-800 mt-4">
                        {blogDetail.title || "Khám phá thế giới cùng chúng tôi"}
                    </h1>
                    <p className="mt-2 text-gray-500 text-sm">
                        Được tạo lúc: {new Date(blogDetail.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                </div>

                {/* Nội dung blog */}
                <div className="mb-20 max-w-7xl mx-auto px-6">
                    {/* Meta thông tin */}
                    <div className="w-full my-6 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <img
                                src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731728579799_LogoUnwind.png"
                                alt="Logo"
                                className="w-16 h-10 object-contain"
                            />
                            <div>
                                <p className="text-gray-500 text-base">Unwind o Ngày tạo {new Date(blogDetail.createdAt).toLocaleDateString("vi-VN")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Ảnh minh họa */}
                    {blogDetail.image && (
                        <div className="my-6">
                            <img
                                src={blogDetail.image}
                                alt="Blog Cover"
                                className="w-3/4 mx-auto object-cover shadow-md"
                            />
                        </div>
                    )}

                    {/* Nội dung chính */}
                    <div className="p-10 mx-auto max-w-4xl space-y-6 bg-white border">
                        <div
                            className="prose lg:prose-xl prose-sky"
                            dangerouslySetInnerHTML={{
                                __html: blogDetail.content,
                            }}
                        />
                    </div>

                    {/* Nút quay lại */}
                    <div className="mt-10 flex justify-center py-6">
                        <Link to={`/blogs`}>
                            <button className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-sky-700 transition-all duration-300 transform hover:scale-105">
                                <span className="mr-3">Quay về danh sách các bài blog</span>
                                <span className="bg-white text-sky-600 w-8 h-8 flex items-center justify-center rounded-full shadow-md transform transition-all duration-300 hover:scale-110">
                                    <FaArrowLeft />
                                </span>
                            </button>
                        </Link>
                    </div>

                    {/* Blogs gợi ý */}
                    <div className="bg-gray-100 py-10">
                        <h2 className="text-2xl font-bold text-center text-gray-600 mb-6">
                            Các bài viết khác có thể bạn quan tâm
                        </h2>
                        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {blogs.map((blog) => (
                                <Link
                                    key={blog.id}
                                    to={`/blogs/${blog.id}`}
                                    className="group block bg-white border shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                >
                                    {/* Hình ảnh */}
                                    <div className="w-full h-48 overflow-hidden">
                                        <img
                                            src={blog.image || "https://via.placeholder.com/400x300"}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    {/* Nội dung */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-sky-500">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                                            {blog.description || "Một bài viết thú vị đang chờ bạn khám phá!"}
                                        </p>
                                        <p className="mt-4 text-sm text-gray-400">
                                            {blog.createdAt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </>

    )
}

export default BlogDetailGuest