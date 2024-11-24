import React, { useState } from 'react';
import { FaPlusCircle, FaImage, FaRegNewspaper, FaImages, FaArrowLeft, FaTimes } from 'react-icons/fa';
import QuillEditor from '../../../components/Blog/QuillEditor';
import { createBlog } from '../../../service/systemStaffService/systemStaffAPI';
import { uploadFileImage } from '../../../service/uploadFileService/uploadFileAPI';

const CreateBlog = ({ create }) => {
  const [title, setTitle] = useState('');

  const [image, setImage] = useState(null);
  const [blogContent, setBlogContent] = useState(null)

  const handleOnChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleOnChangeBlogContent = (content) => {
    setBlogContent(content);
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const response = await uploadFileImage(formData);
    if (response.status === 200) {
      setImage(response.data[0]);
      console.log(response.data[0]);
    }
  }

  const handleSubmit = async () => {
    const blogData = {
      title,
      image,
      content: blogContent
    }
    let data = await createBlog(blogData);
    if (data.status === 200) {
      create();
    }
  }

  return (
    <div className="w-2/3 mx-auto p-8 bg-slate-100 shadow-lg rounded-lg mb-20">
      <div className="space-y-8 border-2 border-white p-6">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-xl font-semibold text-gray-800 mb-2"
          >
            Tiêu đề
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleOnChangeTitle}
            placeholder="Nhập tiêu đề của bài viết"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-xl font-semibold text-gray-800 mb-2"
          >
            Thêm ảnh bìa
          </label>
          {
            !image && (<div className="flex items-center justify-between gap-4">
              <button
                onClick={() => document.getElementById('image').click()}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition flex items-center space-x-2"
              >
                <FaImage className="text-lg" />
                <span>Chọn ảnh</span>
              </button>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>)
          }
          {image && (
            <div className="relative mt-4">
              <img
                src={image}
                alt="Ảnh bìa"
                className="w-full max-h-64 object-cover rounded-lg border"
              />
              <button
                onClick={() => setImage(null)} // Hàm xóa ảnh
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600 transition"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
          )}

        </div>

        {/* Content Editor */}
        <div>
          <label
            htmlFor="content"
            className="block text-xl font-semibold text-gray-800 mb-2"
          >
            Nội dung
          </label>
          <div className="border border-gray-300 rounded-lg shadow-sm bg-gray-50">
            <QuillEditor
              id="content"
              className="h-96"
              onChange={handleOnChangeBlogContent}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center py-6 flex items-center justify-center">
          <button
            className="flex items-center justify-center bg-gradient-to-r from-[#02d39a] to-[#05b2d9] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"
            onClick={handleSubmit}
          >
            <span className="mr-3">Tạo blog</span>
            <span className="bg-white text-sky-700 w-8 h-8 flex items-center justify-center rounded-full shadow-md transform transition-all duration-300 hover:scale-110">
              <FaArrowLeft />
            </span>
          </button>
        </div>
      </div>
    </div>



  );
};

export default CreateBlog;
