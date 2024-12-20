import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deActivateBlog, getAllBlog } from "../../../service/systemStaffService/systemStaffAPI";

const Bloglist = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState("");
  const [flag, setFlag] = useState(false);

  const fetchAllBlog = async () => {
    try {
      let data = await getAllBlog(title, page, size);
      if (data.status === 200) {
        setBlogs(data.data.content);
        setTotalPages(data.data.totalPages);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDeactivateBlog = async (id) => {
    try {
      await deActivateBlog(id);
      toast.success("Ẩn bài blog thành công!", { duration: 3000 });
      setFlag(!flag);
    } catch (error) {
      toast.error("Có lỗi xảy ra!", { duration: 3000 });
      throw error;
    }
  };

  useEffect(() => {
    fetchAllBlog();
  }, [page, size, title, flag]);

  return (
    <div className="bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <h2 className="text-3xl font-bold text-gray-700 text-center">
          Tất cả <span className="text-blue-500">blog</span>
        </h2>

        {/* Blog List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto py-2">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105"
            >
              {/* Image */}
              <img
                src={blog.image || "https://via.placeholder.com/300"}
                alt={blog.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Eye Icon */}
              <button
                onClick={() => handleDeactivateBlog(blog.id)}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition duration-300"
              >
                <FaEye className="text-2xl" title="Ẩn bài blog" />
              </button>

              {/* Blog Details */}
              <Link to={`/systemstaff/blogmanagement/${blog.id}`}>
                <div className="p-6 space-y-3">
                  <h3 className="text-gray-800 text-lg font-bold truncate">{blog.title}</h3>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium text-gray-700">Ngày tạo: </span>
                    {blog.createdAt}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium text-gray-700">Được đăng bởi: </span>
                    Unwind
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bloglist;
