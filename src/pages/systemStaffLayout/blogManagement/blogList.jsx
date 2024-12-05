import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deActivateBlog, getAllBlog } from '../../../service/systemStaffService/systemStaffAPI';
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
        setTotalPages(data.data.totalPages)
      }
    } catch (error) {
      throw error
    }
  }

  const handleDeactivateBlog = async (id) => {
    try {
      await deActivateBlog(id)
      toast.success("Ẩn bài blog thành công!", { duration: 3000 })
      setFlag(!flag)
    } catch (error) {
      toast.error("Có lỗi xảy ra!", { duration: 3000 })
      throw error
    }
  }

  useEffect(() => {
    fetchAllBlog();
  }, [page, size, title, flag])

  return (
    <div className='bg-gray-100'>
      <Toaster position='top-tright' reverseOrder={false} />
      <div className="w-2/3 mx-auto p-6 space-y-8">


        {/* Blog List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 mx-auto py-2">
          <span className="col-span-3 text-xl py-6 font-thin mt-10 hover:text-orange-400">
            Tất cả blog
          </span>
          {blogs.map((blog) => (

            <div className="group relative overflow-hidden shadow-xl transform transition-all duration-500 ease-in-out">
              {/* Image */}
              <img
                src={blog.image || "https://via.placeholder.com/300"}
                alt={blog.title}
                className="w-full h-64 object-cover transition-transform duration-500 ease-in-out"
              />

              {/* Eye Icon */}
              <div className="absolute top-4 right-4 z-10">
                <button onClick={() => handleDeactivateBlog(blog.id)}><FaEye className="text-white bg-black bg-opacity-50 p-2 rounded-full text-3xl cursor-pointer hover:bg-opacity-70 transition duration-300 ease-in-out" title="View Details" /></button>
              </div>

              <Link to={`/systemstaff/blogmanagement/${blog.id}`} key={blog.id}>
                <div className="bg-white p-10 space-y-4 min-h-56">
                  <h3 className="text-gray-800 text-2xl font-normal">
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
                </div>
              </Link>
            </div>


          ))}

        </div>
      </div>
    </div>

  );
}

export default Bloglist;
