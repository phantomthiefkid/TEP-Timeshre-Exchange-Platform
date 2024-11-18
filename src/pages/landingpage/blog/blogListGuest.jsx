import React, { useEffect, useState } from "react";
import Navigation from "../../../components/Navbar/navigation";
import { Link } from "react-router-dom";
import { getAllBlog } from "../../../service/public/blogService/blogAPI";
import Footer from "../../../components/Footer/footer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SpinnerWaiting from "../../../components/LoadingComponent/spinnerWaiting";

const BlogListGuest = () => {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(0); // Current page (0-indexed)
    const [size, setSize] = useState(14); // Blogs per page
    const [totalPages, setTotalPages] = useState(1); // Total pages
    const [loading, setLoading] = useState(true);
    const fetchAllBlogs = async () => {
        try {
            let data = await getAllBlog("", page, size);
            if (data.status === 200) {
                setBlogs(data.data.content);
                setTotalPages(data.data.totalPages);
                setLoading(false)
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchAllBlogs();
    }, [page, size]);

    if (loading) {
        return <SpinnerWaiting />
    }

    return (
        <>
            <Navigation />
            <div className="bg-gray-100">
                <div className="w-full relative">
                    {/* Image */}
                    <img
                        src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731835758600_coverphotosblogs.jpg"
                        alt="Featured Image"
                        className="w-full object-cover"
                    />
                    {/* Overlay Text */}
                    <div className="absolute top-1/2 left-1/2 px-8 font-sans font-thin transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl p-1 border-4 transition-all duration-300 ease-in-out hover:text-slate-200 bg-[rgba(0,0,0,0.25)] hover:bg-[rgba(0,0,0,0.35)]">
                        <div className="p-5 text-center">
                            <h1 className="text-3xl font-bold">Blog Du Lịch</h1>
                            <p className="mt-2 text-lg">Khám phá những điểm đến tuyệt vời và mẹo hay cho chuyến phiêu lưu tiếp theo của bạn. Khám phá những địa phương, nền văn hóa và trải nghiệm mới!</p>
                        </div>
                    </div>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 w-2/3 mx-auto py-10">
                    <span className="col-span-3 text-xl py-6 font-thin mt-10 hover:text-orange-400">
                        Tất cả blog
                    </span>
                    {blogs.map((blog) => (
                        <Link to={`/blogs/${blog.id}`} key={blog.id}>
                            <div className="group relative overflow-hidden shadow-xl transform transition-all duration-500 ease-in-out">
                                {/* Image */}
                                <img
                                    src={blog.image || "https://via.placeholder.com/300"}
                                    alt={blog.title}
                                    className="w-full h-64 object-cover transition-transform duration-500 ease-in-out"
                                />
                                {/* Blog Info */}
                                <div className="bg-white p-10 space-y-2">
                                    <h3
                                        className="text-gray-800 text-2xl font-medium font-sans overflow-hidden line-clamp-2 h-16"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                        }}
                                    >
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        <span className="font-medium text-gray-700">Ngày tạo: </span>
                                        {blog.createdAt}
                                    </p>

                                    <p className="text-gray-600 text-sm">
                                        <span className="font-medium text-gray-700">
                                            Được đăng bởi:{" "}
                                        </span>
                                        Unwind
                                    </p>

                                    {/* Xem chi tiết Button */}
                                    <button
                                        className="mt-4 py-3 text-gray-500 text-left font-medium text-md hover:text-gray-700 hover:scale-105 rounded-lg transition-all duration-300 ease-in-out"
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}


                </div>
                {/* Pagination */}
                {blogs.length > 0 ? (
                    <div className="flex items-center justify-center space-x-2 mt-5 w-full my-6">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                            disabled={page === 0}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-500"
                        >
                            <FaChevronLeft />
                        </button>
                        <div className="flex space-x-2 bg-gray-200 rounded-full px-2 py-1">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setPage(index)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full ${index === page
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-gray-500"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                            disabled={page === totalPages - 1}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                ) : (
                    <span className="flex items-center justify-center mt-5 w-full">
                        Không có bài đăng nào!!!
                    </span>
                )}
            </div>
            <Footer />
        </>
    );
};

export default BlogListGuest;
