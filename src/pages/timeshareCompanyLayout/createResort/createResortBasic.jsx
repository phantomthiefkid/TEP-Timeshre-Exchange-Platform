import { LocationMarkerIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { FaCloudUploadAlt, FaUpload } from 'react-icons/fa';
import { FaArrowRight, FaXmark } from 'react-icons/fa6';
import { uploadFileImage, uploadMultipleFileImage } from '../../../service/uploadFileService/uploadFileAPI';

const CreateResortBasic = ({ onNext, onUpdateData, formData }) => {
  const [resortData, setResortData] = useState({
    resortName: formData.resortName || '',
    minPrice: formData.minPrice || 0,
    maxPrice: formData.maxPrice || 0,
    description: formData.description || '',
    address: formData.address || '',
    logo: "",
    imageUrls: []
  });
  const [errors, setErrors] = useState({});
  const [listUrlImage, setlistUrlImage] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([]);

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

    try {
      const response = await uploadFileImage(formData);
      if (response.status === 200) {
        response.data[0]
        setResortData((prevData) => ({
          ...prevData,
          logo: response.data[0]
        }));
        onUpdateData({
          logo: response.data[0],
        });
      }
    } catch (error) {
      console.error("Error uploading logo image:", error);
    }
  };


  const handleRemoveLogo = () => {
    setResortData(prevData => ({ ...prevData, logo: null }));
    onUpdateData({
      logo: "",
    });
  };
  const handleSelectAndUploadImages = async (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));

    // Cập nhật URL tạm thời để hiển thị trước khi upload
    setlistUrlImage(prevUrls => [...prevUrls, ...urls]);

    // Tạo bản sao của imageUrls hiện có
    const updatedImageUrls = [...resortData.imageUrls];

    try {
      // Lặp qua từng file, upload và cập nhật URL
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await uploadMultipleFileImage(formData);
        console.log("Response from API for each image:", response);

        if (response && response.data && response.data[0]) {
          updatedImageUrls.push(response.data[0]); // Thêm URL từ API vào danh sách
        } else {
          console.error("Upload failed or response format is incorrect for file:", file.name);
        }
      }

      // Cập nhật state với các URL ảnh đã upload
      setResortData((prevData) => ({
        ...prevData,
        imageUrls: updatedImageUrls
      }));
      onUpdateData({
        imageUrls: updatedImageUrls,
      });
      console.log("All uploaded image URLs:", updatedImageUrls);

    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };
  const handleRemoveImage = (index) => {
    // Xóa URL khỏi listUrlImage
    setlistUrlImage(prevUrls => prevUrls.filter((_, i) => i !== index));

    // Xóa file gốc khỏi selectedFiles
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));

    // Xóa URL đã upload khỏi imageUrls trong resortData
    setResortData(prevData => ({
      ...prevData,
      imageUrls: prevData.imageUrls.filter((_, i) => i !== index)
    }));
    onUpdateData(prevData => ({
      ...prevData,
      imageUrls: prevData.imageUrls.filter((_, i) => i !== index)
    }));
  };



  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mx-auto">

      <div className="grid grid-cols-2 gap-8 px-10 border-2 p-8 rounded-lg shadow-lg">

        <div className="space-y-6">

          <div className="p-6 rounded-lg bg-white space-y-6">
            <h1 className="text-2xl font-bold text-gray-700 font-serif">Thông tin cơ bản</h1>

            <div className="space-y-1">
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

            <div className="space-y-1">
              <label className="text-gray-700 text-lg font-medium">Khoảng giá (VND)*</label>
              <div className="flex gap-4">

                <div className="relative flex-1">
                  <span className="absolute left-3 top-3 text-gray-500">VND:</span>
                  <input
                    className="pl-14 border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="number"
                    name="minPrice"
                    value={resortData.minPrice}
                    onChange={handleChange}
                    placeholder="0"
                  />
                  {errors.minPrice && <p className="text-red-500 text-sm mt-1">{errors.minPrice}</p>}
                </div>

                <span className="text-gray-500 text-sm self-center">Đến</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-3 text-gray-500">VND:</span>
                  <input
                    className="pl-14 border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

            <div className="space-y-1">
              <label className="text-gray-700 text-lg font-medium">Địa chỉ*</label>
              <div className="relative">

                <LocationMarkerIcon className="absolute left-3 top-4 w-5 text-red-500" />
                <input
                  className="pl-10 border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  type="text"
                  name="address"
                  value={resortData.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ resort"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-gray-700 text-lg tracking-wide">Mô tả</label>
              <textarea
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-40"
                name="description"
                value={resortData.description}
                onChange={handleChange}
                placeholder="Mô tả về resort"
                rows="4"
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
          </div>
        </div>


        {/* Column 2 */}
        <div className="space-y-4">

          <div className="space-y-4">
            <label className="block mb-2 font-medium">Logo resort</label>

            {/* Upload button with icon */}
            {!resortData.logo && (
              <label
                htmlFor="upload-room-images"
                className="w-full h-32 border-dashed border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-lg hover:border-blue-400 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-gray-500">
                  <FaCloudUploadAlt size={40} className="text-blue-500 transition-transform duration-300 hover:scale-110" />
                  <span className="mt-2 text-base font-semibold">Chọn ảnh</span>
                </div>
              </label>
            )}

            {/* Input ẩn để chọn file */}
            <input
              id="upload-room-images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />

            {/* Hiển thị ảnh logo đã upload */}
            <div className="flex justify-center items-center mt-4">
              {resortData.logo && (
                <div className="relative flex justify-center items-center">
                  <div className="p-2 bg-gradient-to-tr from-gray-200 to-gray-400 rounded-full">
                    <div className="p-1 bg-gradient-to-tr from-blue-300 to-purple-400 rounded-full">
                      <img
                        src={resortData.logo}
                        alt="Resort Logo"
                        className="w-32 h-32 object-cover border-2 border-white rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                      />
                    </div>
                  </div>
                  {/* Icon X để xóa ảnh */}
                  <button
                    onClick={handleRemoveLogo}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2 hover:bg-red-600 transition-transform duration-300"
                  >
                    <FaXmark size={16} />
                  </button>
                </div>
              ) }
            </div>

          </div>
          <div className="space-y-4">
            <label className="block mb-2 font-medium">Ảnh resort</label>

            <div className="flex flex-col justify-start items-center mt-4 space-y-4">
            

              {/* Nút Choose Images và Upload Images */}
              <div className="flex space-x-4">
                {/* Nút Choose Images */}
                <label
                  htmlFor="upload-image-resort"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
                >
                  Tải ảnh lên
                </label>
                <input
                  id="upload-image-resort"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleSelectAndUploadImages}
                />


              </div>
              {resortData.imageUrls && resortData.imageUrls.length > 0 && (
                <div className="grid grid-cols-6 gap-4">
                  {resortData.imageUrls.map((url, index) => (
                    <div key={index} className="relative flex justify-center items-center">
                      <div className="p-2 bg-gradient-to-tr from-gray-200 to-gray-400 rounded-xl">
                        <div className="p-1 bg-gradient-to-tr from-blue-300 to-purple-400 rounded-xl relative">
                          {/* Ảnh */}
                          <img
                            src={url}
                            alt={`Resort Image ${index + 1}`}
                            className="w-28 h-24 object-cover border-4 border-white rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                          />

                          {/* Icon xóa */}
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                            aria-label="Remove image"
                          >
                            <FaXmark />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              ) }
            </div>


          </div>


        </div>
      </div>

      <div className="mt-6 flex justify-center py-6">
        <button
          className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-sky-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"
          onClick={handleNext}
        >
          <span className="mr-3">Bước tiếp theo</span>
          <span className="bg-white text-sky-700 w-8 h-8 flex items-center justify-center rounded-full shadow-md transform transition-all duration-300 hover:scale-110">
            <FaArrowRight />
          </span>
        </button>
      </div>

    </div>
  );
};

export default CreateResortBasic;
