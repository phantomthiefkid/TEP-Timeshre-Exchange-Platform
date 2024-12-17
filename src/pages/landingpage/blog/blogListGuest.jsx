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
    const [size, setSize] = useState(12); // Blogs per page
    const [totalPages, setTotalPages] = useState(1); // Total pages
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Cuộn lên đầu
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

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
    const destinations = [
        {
            "name": "Hạ Long",
            "img": "https://vcdn1-dulich.vnecdn.net/2022/05/07/vinhHaLongQuangNinh-1651912066-8789-1651932294.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=bAYE9-ifwt-9mB2amIjnqg",
            "description": "Vịnh Hạ Long, nằm ở phía đông bắc Việt Nam, nổi tiếng với làn nước màu ngọc lục bảo và hàng ngàn đảo đá vôi cao chót vót được bao phủ bởi rừng mưa."
        },
        {
            "name": "Đà Nẵng",
            "img": "https://vcdn1-dulich.vnecdn.net/2022/06/03/cauvang-1654247842-9403-1654247849.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Swd6JjpStebEzT6WARcoOA",
            "description": "Đà Nẵng là một thành phố ven biển nổi tiếng với những bãi biển cát trắng, Ngũ Hành Sơn, và Cầu Vàng mang tính biểu tượng được nâng đỡ bởi đôi bàn tay khổng lồ."
        },
        {
            "name": "Hội An",
            "img": "https://cdn3.ivivu.com/2023/10/du-lich-hoi-an-ivivu-img1.jpg",
            "description": "Hội An là một phố cổ được bảo tồn tốt, nổi tiếng với những ngôi nhà gỗ truyền thống, các con phố hẹp và buổi tối rực rỡ ánh đèn lồng."
        },
        {
            "name": "Sapa",
            "img": "https://divui.com/blog/wp-content/uploads/2018/10/sapa.jpg",
            "description": "Sapa, nằm ở phía tây bắc Việt Nam, nổi tiếng với những thửa ruộng bậc thang, cộng đồng dân tộc thiểu số và phong cảnh núi non hùng vĩ."
        },
        {
            "name": "Phú Quốc",
            "img": "https://anhdulich.vn/storage/album-anh/phu-quoc/phuquoc1-vepp.jpg",
            "description": "Phú Quốc là một hòn đảo thiên đường với làn nước trong xanh, bãi biển hoang sơ và bầu không khí thư giãn, lý tưởng để nghỉ ngơi và tham gia các môn thể thao dưới nước."
        },
        {
            "name": "Nha Trang",
            "img": "https://angialand.com.vn/wp-content/uploads/2022/02/Anh-thu-te-hoang-hon-Vega-City-Nha-Trang-1.jpg",
            "description": "Nha Trang là một thành phố nghỉ dưỡng ven biển nổi tiếng với những bãi biển đẹp, suối nước nóng và cuộc sống về đêm sôi động."
        },
        {
            "name": "Mũi Né",
            "img": "https://malibumuineresort.com/Uploads/images/BaiViet/we.jpeg",
            "description": "Mũi Né nổi tiếng với những đồi cát rộng lớn, bãi biển và các điểm lướt ván dọc theo bờ biển phía nam Việt Nam."
        },
        {
            "name": "Ninh Bình",
            "img": "https://onevivu.vn/wp-content/uploads/2020/10/Du-lich-Trang-An-Ninh-Binh-1.jpg",
            "description": "Ninh Bình nổi tiếng với phong cảnh thiên nhiên, bao gồm các dãy núi đá vôi, hang động và các chuyến tham quan sông yên bình trong Quần thể danh thắng Tràng An."
        },
        {
            "name": "Vũng Tàu",
            "img": "https://locphatland.com/wp-content/uploads/2021/08/ba-ria-vung-tau.jpeg",
            "description": "Vũng Tàu là một thành phố ven biển với những bãi biển đẹp, hải sản tươi ngon và các di tích lịch sử như tượng Chúa Kitô Vua ở Vũng Tàu."
        },
        {
            "name": "Huế",
            "img": "https://huedailytour.net/wp-content/uploads/2023/02/DAI-NOI.jpeg",
            "description": "Huế là một thành phố cổ giàu văn hóa và lịch sử, nổi tiếng với Kinh Thành Huế, các ngôi chùa cổ kính và lăng tẩm hoàng gia."
        }
    ]
        ;




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
                    <div className="flex items-center justify-center space-x-2 mt-5 w-full my-6 py-8">
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
            <div className="fixed bottom-4 right-1/2 z-50">
                {isVisible && (
                    <button
                        onClick={scrollToTop}
                        className="bg-gradient-to-r from-sky-300 to-gray-500 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all ease-in-out duration-300 transform focus:outline-none"
                        title="Scroll to top"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7-7-7 7"
                            />
                        </svg>
                    </button>

                )}
            </div>
            <div className="bg-zinc-100 w-full p-6 mb-4">
                {/* Điểm đến nổi bật */}
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
                        {destinations.map((destination, index) => (
                            <div
                                key={index}
                                className="relative group bg-white shadow-lg overflow-hidden transition hover:shadow-xl"
                            >
                                <img
                                    src={destination.img}
                                    alt={destination.name}
                                    className="w-full h-72 object-cover transition duration-300 group-hover:blur-sm"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition"></div>

                                {/* Show description on hover */}
                                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-4">
                                    <p className="text-white  p-4 rounded-md text-xs sm:text-sm">
                                        {destination.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            <Footer />
        </>
    );
};

export default BlogListGuest;
