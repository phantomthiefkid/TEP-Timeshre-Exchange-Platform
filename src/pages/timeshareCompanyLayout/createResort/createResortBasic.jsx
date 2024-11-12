import { LocationMarkerIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { uploadFileImage } from '../../../service/uploadFileService/uploadFileAPI';

const CreateResortBasic = ({ onNext, onUpdateData, formData }) => {
  const [resortData, setResortData] = useState({
    resortName: formData.resortName || '',
    minPrice: formData.minPrice || 0,
    maxPrice: formData.maxPrice || 0,
    description: formData.description || '',
    address: formData.address || '',
    logo: "", 
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
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
    return Object.keys(newErrors).length === 0; 
  };

  const handleNext = () => {
    if (validateFields()) {
      onNext();
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const response = await uploadFileImage(formData);
    if (response.status === 200) {
      setResortData((prevData) => ({
        ...prevData,
        logo: response.data[0]
      }))
    }
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setResortData((prevData) => ({
        ...prevData,
        logo: imageUrl,
      }));
    }
  };

  return (
    <div className="space-y-2 px-4">
      <div className="relative">
        <div className="grid grid-cols-2 gap-6 px-4 py-4 p-4 bg-white shadow-lg">

          <div className="space-y-8  my-6">
     
            <div className="p-6 rounded-lg bg-white space-y-6">
              <h1 className="text-2xl font-bold text-gray-700 tracking-wide font-serif mb-4">Thông tin cơ bản</h1>

              <div className="space-y-2">
                <label className="font-semibold text-gray-700 text-lg tracking-wide">Tên Resort*</label>
                <input
                  className="border border-gray-300 bg-gray-50 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  type="text"
                  name="resortName"
                  value={resortData.resortName}
                  onChange={handleChange}
                  placeholder="Nhập tên resort"
                />
                {errors.resortName && <p className="text-red-500 text-sm mt-1">{errors.resortName}</p>}
              </div>

              <div className="space-y-4">
                <label className="font-semibold text-gray-700 text-lg tracking-wide">Khoảng giá (VND)*</label>
                <div className="grid grid-cols-5 gap-4 items-center">

                  <div className="relative col-span-2">
                    <span className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500">VND:</span>
                    <input
                      className="pl-16 pr-4 py-2 border border-gray-300 rounded-lg w-full bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 shadow transition-all"
                      type="number"
                      name="minPrice"
                      value={resortData.minPrice}
                      onChange={handleChange}
                      placeholder="0"
                    />
                    {errors.minPrice && <p className="text-red-500 text-sm mt-1">{errors.minPrice}</p>}
                  </div>

                  <div className="text-center col-span-1 text-sm font-semibold text-gray-600">
                    Đến
                  </div>
                  <div className="relative col-span-2">
                    <span className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500">VND:</span>
                    <input
                      className="pl-16 pr-4 py-2 border border-gray-300 rounded-lg w-full bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 shadow transition-all"
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

              <div className="space-y-2">
                <label className="font-semibold text-gray-700 text-lg tracking-wide">Mô tả</label>
                <textarea
                  className="border border-gray-300 bg-gray-50 p-4 rounded-lg w-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                  name="description"
                  value={resortData.description}
                  onChange={handleChange}
                  placeholder="Mô tả về resort"
                  rows="4"
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Address Section */}
            <div className="p-4 shadow-lg rounded-lg bg-white space-y-6">
              <div className="space-y-2">
                <label className="font-semibold text-gray-700 text-lg tracking-wide">Địa chỉ*</label>
                <div className="relative">
                  <span className="absolute left-3 top-6 transform -translate-y-1/2 text-red-500">
                    <LocationMarkerIcon className="w-5 h-5" />
                  </span>
                  <input
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                    type="text"
                    name="address"
                    value={resortData.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ resort"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>

              {/* Map Display */}
              <div className="mt-4">
                <img
                  src="https://thanhnien.mediacdn.vn/Uploaded/trungnq/2022_10_29/1-2829.jpg" // Temporary map image
                  alt="Map"
                  className="w-full h-60 object-cover border rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>


          {/* Column 2 */}
          <div className="space-y-4">

            <div className="space-y-4">
              <label className="block mb-2 font-medium">Logo resort</label>

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
              {resortData.logo && (
                <div className="flex justify-center items-center mt-4">
                  <div className="relative flex justify-center items-center">
                    <div className="p-2 bg-gradient-to-tr from-gray-200 to-gray-400 rounded-full"> {/* Outer Frame */}
                      <div className="p-1 bg-gradient-to-tr from-blue-300 to-purple-400 rounded-full"> {/* Inner Gradient Frame */}
                        <img
                          src={resortData.logo}
                          alt="Resort Logo"
                          className="w-32 h-32 object-cover border-4 border-white rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}


            </div>

          </div>
        </div>
      </div>


      {/* Nút tiếp theo */}
      <div className="mt-6 flex justify-end py-6">
        
        <button
          className="bg-indigo-400 hover:bg-indigo-700 text-indigo-100 pl-6 rounded-full flex items-center"
          onClick={handleNext}
        >
          <span class="mr-6">Bước tiếp theo</span><span class="bg-indigo-500 hover:bg-indigo-700 w-12 h-12 flex items-center justify-center rounded-full"><FaArrowRight /></span>
        </button>
      </div>
    </div>
  );
};

export default CreateResortBasic;
