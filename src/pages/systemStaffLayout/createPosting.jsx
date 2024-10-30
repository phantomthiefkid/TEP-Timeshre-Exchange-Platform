import React, { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CreatePosting = () => {

    return (
        <div className="p-8">
            <div className="space-y-4 mb-10 text-center">
                <h1 className="text-4xl font-bold text-blue-700">Tạo mới bài đăng</h1>
                <h3 className="text-lg text-gray-600">
                    Nhập thông tin để tạo bài đăng mới và các chi tiết liên quan
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-10">
                {/* Left Column */}
                <div className=" shadow-md">
                    <div className="flex justify-between items-center cursor-pointe p-4 bg-gray-200 text-gray-700">
                        <h3 className="font-semibold text-lg">Thông tin cơ bản</h3>

                    </div>

                    <div className=''>

                        <div className='p-6'>
                            <h3 className="font-semibold text-lg mb-2">Chọn resort</h3>
                            <input
                                type="text"
                                name="resortName"
                                placeholder="Chọn resort..."
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-4 p-6">
                            <div>
                                <label className="block mb-1 text-gray-600">Giường</label>
                                <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">Số người</label>
                                <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">Giường đơn</label>
                                <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">Giường đôi</label>
                                <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">Sofa</label>
                                <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">Giường gấp</label>
                                <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">Phòng tắm</label>
                                <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">Nhà bếp</label>
                                <div className="space-y-2 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="kitchenNone" className="h-6 w-6 rounded-full text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" />
                                        <label htmlFor="kitchenNone" className="text-gray-600">Không có</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="sharedKitchen" className="h-6 w-6 rounded-full text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" />
                                        <label htmlFor="sharedKitchen" className="text-gray-600">Bếp chung</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="privateKitchen" className="h-6 w-6 rounded-full text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" />
                                        <label htmlFor="privateKitchen" className="text-gray-600">Bếp riêng</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">Hướng phòng</label>
                                <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-600">Số căn hộ (nếu có)</label>
                                <input type="text" name="apartmentNumber" placeholder="Số căn hộ" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 shadow-md">
                    <div className="flex justify-between items-center cursor-pointe p-4 bg-gray-200 text-gray-700">
                        <h3 className="font-semibold text-lg">Hình ảnh và mô tả</h3>

                    </div>
                    <div className="space-y-2 p-6">
                        <label className="block font-medium">Ảnh phòng:</label>
                        <div className="flex items-center space-x-4 w-full">
                            <label
                                htmlFor="upload-room-images"
                                className="w-full h-36 border-dashed border-4 border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer transition hover:border-blue-400 hover:bg-gray-100"
                            >
                                <FaUpload size={40} className="text-gray-400 mb-2" />
                                <span className="text-gray-500 font-semibold">Tải lên ảnh loại phòng</span>
                                <span className="text-sm text-gray-400">(Kéo thả hoặc nhấn để chọn ảnh)</span>
                            </label>
                            <input
                                id="upload-room-images"
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                            />
                        </div>
                        <div className="grid grid-cols-6 gap-4 mt-4 p-4">
                            <img src="https://checkintravel.vn/blog/uploads/2020/12/resort-tai-ha-giang-3.jpg" alt="room preview 1" className="w-full h-24 object-cover rounded-lg" />
                            <img src="https://checkintravel.vn/blog/uploads/2020/12/resort-tai-ha-giang-3.jpg" alt="room preview 2" className="w-full h-24 object-cover rounded-lg" />
                            <img src="https://checkintravel.vn/blog/uploads/2020/12/resort-tai-ha-giang-3.jpg" alt="room preview 3" className="w-full h-24 object-cover rounded-lg" />
                            <img src="https://checkintravel.vn/blog/uploads/2020/12/resort-tai-ha-giang-3.jpg" alt="room preview 4" className="w-full h-24 object-cover rounded-lg" />
                        </div>
                    </div>
                    <div className="space-y-4 p-6">
                        <label className="block font-medium">Mô tả</label>
                        <textarea rows={6} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" placeholder="Nhập mô tả về phòng..." />
                    </div>
                </div>
                <div className="mb-6 rounded-md border-2 shadow-md">
                    <div className="flex justify-between items-center cursor-pointe p-4 bg-gray-200 text-gray-700">
                        <h3 className="font-semibold text-lg">Thời gian hiệu lực</h3>

                    </div>
                    <div className="grid grid-cols-2 gap-4 p-6">
                        <div>
                            <label className="block text-gray-600 mb-1">Ngày nhận phòng</label>
                            <input type="date" className="w-full px-3 py-2 border rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Ngày trả phòng</label>
                            <input type="date" className="w-full px-3 py-2 border rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Số đêm</label>
                            <input type="number" min="1" className="w-full px-3 py-2 border rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                </div>


                <div className="mb-6 rounded-md border-2 shadow-md">
                    <div className="flex justify-between items-center cursor-pointe p-4 bg-gray-200 text-gray-700">
                        <h3 className="font-semibold text-lg">Thanh toán</h3>

                    </div>
                    <div className="space-y-4 p-6">
                        <div>
                            <label className="block text-gray-600 mb-1">Giá tiền (VND)</label>
                            <input type="number" min="0" className="w-full px-3 py-2 border rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Phương thức thanh toán</label>
                            <div className="flex items-center space-x-4 mt-2">
                                <div className="flex items-center">
                                    <input type="radio" id="cash" name="paymentMethod" className="h-5 w-5 rounded-full text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" />
                                    <label htmlFor="cash" className="ml-2 text-gray-600">Tiền mặt</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="online" name="paymentMethod" className="h-5 w-5 rounded-full text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" />
                                    <label htmlFor="online" className="ml-2 text-gray-600">Thanh toán trực tuyến</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Chính sách hoàn trả</label>
                            <select className="w-full px-3 py-2 border rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500">
                                <option>Không hoàn trả</option>
                                <option>Hoàn trả trong vòng 24 giờ</option>
                                <option>Hoàn trả trong vòng 7 ngày</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 rounded-md border-2 shadow-md">
                {/* Tiện ích phòng */}
                <div className="flex justify-between items-center cursor-pointe p-4 bg-gray-200 text-gray-700">
                    <h3 className="font-semibold text-lg">Tiện ích phòng</h3>

                </div>

                {/* Nhà bếp Amenities */}
                <div className='rounded-md border-b-2 p-6'>
                    <h4 className="font-medium text-gray-700 mb-1">Nhà bếp</h4>
                    <div className="grid grid-cols-5 gap-4">
                        {["Máy pha cà phê", "Bếp nướng", "Lò vi sóng", "Máy bánh mì", "Máy rửa chén", "Tủ lạnh to", "Tủ lạnh nhỏ", "Bếp từ"].map((item) => (
                            <div key={item} className="flex items-center">
                                <input type="checkbox" id={item} className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                                <label htmlFor={item} className="ml-2 text-gray-600">{item}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Giải trí Amenities */}
                <div className='rounded-md border-b-2 p-6'>
                    <h4 className="font-medium text-gray-700 mb-1">Giải trí</h4>
                    <div className="grid grid-cols-5 gap-4">
                        {["Máy phát DVD", "Radio", "TV Thông minh", "Dàn âm thanh", "Máy chơi game"].map((item) => (
                            <div key={item} className="flex items-center">
                                <input type="checkbox" id={item} className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                                <label htmlFor={item} className="ml-2 text-gray-600">{item}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Đặc trưng Amenities */}
                <div className='rounded-md border-b-2 p-6'>
                    <h4 className="font-medium text-gray-700 mb-1">Đặc trưng</h4>
                    <div className="grid grid-cols-5 gap-4">
                        {["Máy lạnh", "Ban công", "BBQ", "Lò sưởi", "Hồ bơi riêng", "Khu vực ăn ngoài trời", "Ghế bãi biển"].map((item) => (
                            <div key={item} className="flex items-center">
                                <input type="checkbox" id={item} className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                                <label htmlFor={item} className="ml-2 text-gray-600">{item}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Buttons Section */}
            <div className="flex justify-end space-x-4 mt-6">

                <Link to={`/systemstaff/post`}>
                <button className="bg-gray-300 text-gray-800 font-semibold py-2 px-14 rounded shadow hover:bg-gray-400 transition">
                    Quay về
                </button>
                </Link>
                <button className="bg-green-500 text-white font-semibold py-2 px-14 rounded shadow hover:bg-green-600 transition">
                    Tạo mới
                </button>
            </div>



        </div>
    );
};

export default CreatePosting;
