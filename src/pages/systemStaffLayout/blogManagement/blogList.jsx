import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlog } from '../../../service/systemStaffService/systemStaffAPI';
const Bloglist = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState("");

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

  useEffect(() => {
    fetchAllBlog();
  }, [page, size, title])

  return (
    <div className='bg-gray-100'>
      <div className="w-2/3 mx-auto p-6 space-y-8">


        {/* Blog List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 mx-auto py-2">
          <span className="col-span-3 text-xl py-6 font-thin mt-10 hover:text-orange-400">
            Tất cả blog
          </span>
          {blogs.map((blog) => (
            <Link to={`/systemstaff/blogmanagement/${blog.id}`} key={blog.id}>
              <div className="group relative overflow-hidden shadow-xl transform transition-all duration-500 ease-in-out">
                {/* Image */}
                <img
                  src={blog.image || "https://via.placeholder.com/300"}
                  alt={blog.title}
                  className="w-full h-64 object-cover transition-transform duration-500 ease-in-out"
                />


                <div className="bg-white p-10 space-y-4">
                  <h3 className="text-gray-800 text-3xl font-light font-serif">
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
              </div>
            </Link>
          ))}

        </div>
      </div>
    </div>

  );
}

export default Bloglist;
