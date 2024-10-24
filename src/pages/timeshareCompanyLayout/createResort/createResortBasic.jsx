import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

const CreateResortBasic = ({ onNext, onUpdateData, formData }) => {
  const [resortData, setResortData] = useState({
    resortName: formData.resortName || '',
    minPrice: formData.minPrice || 0,
    maxPrice: formData.maxPrice || 0,
    description: formData.description || '',
    address: formData.address || '',
    roomImages: [], // Lưu ảnh phòng tải lên
  });
  const [errors, setErrors] = useState({});
  // Hàm xử lý thay đổi dữ liệu trong các input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Kiểm tra nếu là minPrice hoặc maxPrice thì chuyển đổi giá trị sang Number
    const newValue = (name === 'minPrice' || name === 'maxPrice') ? parseFloat(value) : value;

    setResortData({
      ...resortData,
      [name]: newValue,
    });

    onUpdateData({
      [name]: newValue,
    });
  };

  const validateFields = () => {
    const newErrors = {};

    if (!resortData.resortName.trim()) newErrors.resortName = 'Tên resort không được để trống';
    if (!resortData.minPrice) newErrors.minPrice = 'Yêu cầu nhập giá tối thiểu';
    if (!resortData.maxPrice) newErrors.maxPrice = 'Yêu cầu nhập giá';
    if (!resortData.description.trim()) newErrors.description = 'Mô tả không được để trống';
    if (!resortData.address.trim()) newErrors.address = 'Địa chỉ không được để trống';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      onUpdateData({ logo: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (validateFields()) {
      onNext();
    }
  };
  // Hàm xử lý upload ảnh phòng
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file)); // Tạo URL tạm cho ảnh
    setResortData((prevData) => ({
      ...prevData,
      roomImages: [...prevData.roomImages, ...images],
    }));
  };

  return (
    <div className="space-y-2 px-4">


      {/* Chia form thành 2 cột */}
      <div className="relative">


        <div className="grid grid-cols-2 gap-6 px-8 py-4 bg-white">

          {/* Column 1 */}
          <div className="space-y-4">
            <div className="border p-6 rounded-lg shadow-sm bg-gray-50 space-y-4">
              <h1 className="text-2xl font-semibold mb-4">Thông tin cơ bản</h1>
              <div>
                <label className="block mb-2 font-medium">Tên Resort:</label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  type="text"
                  name="resortName"
                  value={resortData.resortName}
                  onChange={handleChange}
                  placeholder="Nhập tên resort"
                />
                 {errors.resortName && <p className="text-red-500 text-sm mt-1">{errors.resortName}</p>}
              </div>

              {/* Giá min/max */}
              <div className="space-y-4">
                <label className="block mb-2 font-medium">Khoảng giá (VND):</label>
                <div className="grid grid-cols-5 items-center gap-4">

                  {/* Từ giá tối thiểu */}
                  <div className="relative col-span-2">
                    <label className="absolute top-3 left-2 text-sm font-semibold text-gray-600">Từ:</label>
                    <input
                      className="border border-gray-300 rounded-md p-2 w-full pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      type="number"
                      name="minPrice"
                      value={resortData.minPrice}
                      onChange={handleChange}
                      placeholder="0"
                    />
                    {errors.minPrice && <p className="text-red-500 text-sm mt-1">{errors.minPrice}</p>}
                    <span className="absolute top-2 right-8 text-sm font-semibold text-gray-600">VND</span>
                  </div>

                  {/* Chữ "Đến" ở giữa */}
                  <div className="text-center col-span-1 text-sm font-semibold text-gray-600">
                    Đến
                  </div>

                  {/* Đến giá tối đa */}
                  <div className="relative col-span-2">
                    <label className="absolute top-3 left-2 text-sm font-semibold text-gray-600">Đến:</label>
                    <input
                      className="border border-gray-300 rounded-md p-2 w-full pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      type="number"
                      name="maxPrice"
                      value={resortData.maxPrice}
                      onChange={handleChange}
                      placeholder="0"
                    />
                              {errors.maxPrice && <p className="text-red-500 text-sm mt-1">{errors.maxPrice}</p>}
                    <span className="absolute top-2 right-8 text-sm font-semibold text-gray-600">VND</span>
                  </div>
                </div>
              </div>



              {/* Mô tả */}
              <div>
                <label className="block mb-2 font-medium">Mô tả:</label>
                <textarea
                  className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  name="description"
                  value={resortData.description}
                  onChange={handleChange}
                  placeholder="Mô tả về resort"
                  rows="4"
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Địa chỉ */}
            <div className='border rounded-lg shadow-md p-6 bg-gray-50'>
              <div>
                <label className="block mb-2 font-medium">Địa chỉ:</label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  type="text"
                  name="address"
                  value={resortData.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ resort"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Vị trí trên bản đồ */}
              <div className='py-4'>
                <img
                  src="https://thanhnien.mediacdn.vn/Uploaded/trungnq/2022_10_29/1-2829.jpg" // Ảnh bản đồ tạm thời (hardcoded)
                  alt="Map"
                  className="w-full h-60 object-cover border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {/* Upload logo */}
            <div>
              <label className="block mb-2 font-medium">Logo:</label>
              <input
                type="file"
                accept="image/*"
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onChange={handleLogoUpload}
              />
            </div>

            {/* Display uploaded logo */}
            {resortData.logo && (
              <div className="mt-4">
                <img
                  src={resortData.logo}
                  alt="Resort Logo"
                  className="w-32 h-32 object-cover border rounded-lg"
                />
              </div>
            )}

            {/* Upload room images */}
            {/* Upload room images with icon button */}
            <div className="space-y-4">
              <label className="block mb-2 font-medium">Ảnh phòng:</label>

              {/* Upload button with icon */}
              <div className="flex items-center space-x-4 w-full">
                <label
                  htmlFor="upload-room-images"
                  className="bg-white border-2 justify-center w-full h-44 text-gray-700 py-2 px-4 rounded-xl shadow-lg cursor-pointer flex items-center space-x-2 hover:bg-gray-200"
                >

                  {/* Text */}
                  <div className='text center'><FaUpload size={34} color='gray' />

                  </div>
                </label>

                {/* Hidden input to trigger file upload */}
                <input
                  id="upload-room-images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>

              {/* Display uploaded images */}
              {resortData.roomImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {resortData.roomImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Room ${index + 1}`}
                        className="w-full h-32 object-cover border rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>


      {/* Nút tiếp theo */}
      <div className="mt-6 flex justify-center gap-6">
        <button
          className="bg-gray-300 text-gray-500 py-2 px-8 rounded-lg"
          disabled
        >
          Quay lại
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-600"
          onClick={handleNext}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default CreateResortBasic;
