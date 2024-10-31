import { LocationMarkerIcon } from '@heroicons/react/solid';
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
            <div className="border p-10 shadow-sm bg-white space-y-4">
              <h1 className="text-2xl font-bold text-gray-600 tracking-wide font-serif mb-2">Thông tin cơ bản</h1>
              <div className='grid grid-cols-1 space-y-2'>
                <label className="font-semibold text-gray-700 mb-2 text-lg tracking-wide">Tên Resort*</label>
                <input
                 className="border-b bg-slate-50 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"
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
                <label className="font-semibold text-gray-700 mb-2 text-lg tracking-wide">Khoảng giá (VND)*</label>
                <div className="grid grid-cols-5 items-center gap-4">

                  {/* Từ giá tối thiểu */}
                  <div className="relative col-span-2">
                  <span className="absolute left-3 top-2 text-gray-500">VND:</span>
                    <input
                       className="pl-14 bg-gray-50 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                      type="number"
                      name="minPrice"
                      value={resortData.minPrice}
                      onChange={handleChange}
                      placeholder="0"
                    />
                    {errors.minPrice && <p className="text-red-500 text-sm mt-1">{errors.minPrice}</p>}
                   
                  </div>

                  {/* Chữ "Đến" ở giữa */}
                  <div className="text-center col-span-1 text-sm font-semibold text-gray-600">
                    Đến
                  </div>

                  {/* Đến giá tối đa */}
                  <div className="relative col-span-2">
                  <span className="absolute left-3 top-2 text-gray-500">VND:</span>
                    <input
                       className="pl-14 bg-gray-50 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                      type="number"
                      name="maxPrice"
                      value={resortData.maxPrice}
                      onChange={handleChange}
                      placeholder="0"
                    />
                    {errors.maxPrice && <p className="text-red-500 text-sm mt-1">{errors.maxPrice}</p>}
                    
                  </div>
                </div>
              </div>



              {/* Mô tả */}
              <div className='grid grid-cols-1 space-y-2'>
                <label className='font-semibold text-gray-700 mb-2 text-lg tracking-wide'>Mô tả</label>
                <textarea
                   className="border-b bg-slate-50 border-gray-600 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"
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
            <div className='border p-6'>
              <div>
                <label className='font-semibold text-gray-700 mb-2 text-lg tracking-wide'>Địa chỉ*</label>
                <div className="relative">
                  <span className="absolute left-3 top-4 text-gray-400">
                    <LocationMarkerIcon className='w-6 text-red-500' />
                  </span>
                  <input
                    className="border-b-4 bg-slate-50 p-4 pl-10 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all w-full"
                    type="text"
                    name="address"
                    value={resortData.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ resort"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

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
                  className="w-full h-36 border-dashed border-4 border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer transition hover:border-blue-400 hover:bg-gray-100"
                >
                  <FaUpload size={40} className="text-gray-400 mb-2" />
                  <span className="text-gray-500 font-semibold">Tải lên ảnh loại phòng</span>
                  <span className="text-sm text-gray-400">(Kéo thả hoặc nhấn để chọn ảnh)</span>
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
