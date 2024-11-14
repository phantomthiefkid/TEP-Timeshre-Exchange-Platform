import { LocationMarkerIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { FaUpload, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { useParams } from 'react-router-dom'
import Loading from '../../../components/LoadingComponent/loading';
import SpinnerWaiting from '../../../components/LoadingComponent/spinnerWaiting';
import ViewImageModal from '../../../components/Modal/tsComapny/viewImageModal';
import { getResortById, updateResortBasic } from '../../../service/tsCompanyService/tsCompanyAPI';
import { uploadFileImage, uploadMultipleFileImage } from '../../../service/uploadFileService/uploadFileAPI';

const UpdateResortBasic = () => {

  const { id } = useParams();
  const [resort, setResort] = useState({
    resortName: '',
    logo: '',
    minPrice: 0,
    maxPrice: 0,
    status: '',
    address: '',
    timeshareCompanyId: 0,
    description: '',
    resortAmenityList: [],
    imageUrls: []
  });
  const [loading, setLoading] = useState(true);
  const [originalResort, setOriginalResort] = useState(null);
  const [flag, setFlag] = useState(false);
  const [isViewImageModal, setIsViewImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const getResortDetail = async () => {
    let data = await getResortById(id);
    if (data.status === 200) {
      const {
        resortName,
        logo,
        minPrice,
        maxPrice,
        status,
        address,
        timeshareCompanyId,
        description,
        resortAmenityList,
        imageUrls
      } = data.data;

      const newResort = {
        resortName,
        logo,
        minPrice,
        maxPrice,
        status,
        address,
        timeshareCompanyId,
        description,
        resortAmenityList,
        imageUrls
      };
      console.log(newResort, "123")

      // Update both current resort data and the original resort data for comparison
      setResort(newResort);
      setOriginalResort(newResort);
      setLoading(false)
    }
  };

  useEffect(() => {
    getResortDetail()
  }, [id, flag])

  const handleSelectImage = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsViewImageModal(true)
  }

  const handleClose = () => {
    setIsViewImageModal(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name !== 'timeshareCompanyId') {
      setResort((prevResort) => ({
        ...prevResort,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      await updateResortBasic(resort, id);
      toast.success("Cập nhật thành công!!", { duration: 3000 });
      setFlag(!flag);
      await getResortDetail();
    } catch (error) {
      toast.error("Cập nhật thất bại! Vui lòng thử lại.", { duration: 3000 });
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const response = await uploadFileImage(formData);
    if (response.status === 200) {
      setResort({ ...resort, logo: response.data[0] });
    }
  }

  const handleSelectAndUploadImages = async (e) => {
    const files = Array.from(e.target.files);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await uploadMultipleFileImage(formData);
        if (response.status === 200) {
          setResort((prevResort) => ({
            ...prevResort,
            imageUrls: [...prevResort.imageUrls, response.data[0]],
          }));
        }
      }
    } catch (error) {
      throw error
    }
  }

  const handleRemoveImage = (index) => {
    setResort((prevResort) => ({
      ...prevResort,
      imageUrls: prevResort.imageUrls.filter((_, i) => i !== index),
    }));
  };


  const hasChanged = () => {
    return JSON.stringify(resort) !== JSON.stringify(originalResort);
  };

  if (loading) {
    return (<SpinnerWaiting />)
  }


  return (
    <div className="bg-white p-8 rounded-lg shadow-xl mx-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Basic Information Section */}
          <div className="border p-6 shadow space-y-6">
            <h1 className="text-2xl font-bold text-gray-700 font-serif">Thông tin cơ bản</h1>

            {/* Resort Name */}
            <div className="space-y-1">
              <label className="text-gray-700 text-lg font-medium">Tên Resort*</label>
              <input
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="text"
                name="resortName"
                value={resort.resortName}
                onChange={handleChange}
                placeholder="Nhập tên resort"
              />
            </div>

            {/* Price Range */}
            <div className="space-y-1">
              <label className="text-gray-700 text-lg font-medium">Khoảng giá (VND)*</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-3 text-gray-500">VND:</span>
                  <input
                    className="pl-14 border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="number"
                    name="minPrice"
                    value={resort.minPrice}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                <span className="text-gray-500 text-sm self-center">Đến</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-3 text-gray-500">VND:</span>
                  <input
                    className="pl-14 border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    type="number"
                    name="maxPrice"
                    value={resort.maxPrice}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-gray-700 text-lg font-medium">Địa chỉ*</label>
              <div className="relative">
                <LocationMarkerIcon className="absolute left-3 top-4 w-5 text-red-500" />
                <input
                  className="pl-10 border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  type="text"
                  name="address"
                  value={resort.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ resort"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-gray-700 text-lg font-medium">Mô tả</label>
              <textarea
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-40"
                name="description"
                value={resort.description}
                onChange={handleChange}
                placeholder="Mô tả về resort"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Logo Upload Section */}
          <div className="border p-6 shadow-lg space-y-6">
            <label className="text-gray-700 text-lg font-medium">Logo Resort:</label>

            {/* Upload Button */}
            {!resort.logo && (
              <label
                htmlFor="upload-room-images"
                className="relative w-full h-28 border-dashed border-4 border-blue-300 rounded-lg flex flex-col justify-center items-center cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-shadow hover:shadow-lg"
              >
                <FaUpload size={30} className="text-blue-400 mb-2" />
                <span className="text-blue-600 font-semibold">Chọn ảnh logo</span>
                <span className="text-sm text-blue-400">(Kéo thả hoặc nhấn để tải ảnh)</span>
                <input
                  id="upload-room-images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>)
            }

            <div className="flex justify-center items-center mt-4">
              {resort.logo && (
                <div className="relative flex justify-center items-center mt-6">
                  <div className="w-36 h-36 rounded-full border-2 border-blue-300 shadow-lg overflow-hidden cursor-pointer hover:scale-105 transform transition-all relative">
                    <img
                      src={resort.logo}
                      alt={`${resort.title}`}
                      className="object-cover w-full h-full"
                      onClick={() => handleSelectImage(resort.logo)}
                    />
                  </div>
                  <button
                    onClick={() => setResort({ ...resort, logo: '' })} // Clear logo on click
                    className="absolute top-2 right-2 z-20 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-transform duration-300"
                  >
                    <FaXmark size={16} />
                  </button>
                </div>
              )}

            </div>



            <div className="space-y-4">
              <label className="block mb-2 font-medium">Ảnh resort</label>

              <div className="flex flex-col justify-start items-center mt-4 space-y-4">


                {/* Nút Choose Images và Upload Images */}
                <div className="flex space-x-4 items-center w-full">
                  {/* Upload Images Button */}
                  <label
                    htmlFor="upload-image-resort"
                    className="relative w-full h-28 border-dashed border-4 border-blue-300 rounded-lg flex flex-col justify-center items-center cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-shadow hover:shadow-lg"
                  >
                    <FaUpload size={30} className="text-blue-400 mb-2" />
                    <span className="text-blue-600 font-semibold">Chọn ảnh resort</span>
                    <span className="text-sm text-blue-400">(Kéo thả hoặc nhấn để tải ảnh)</span>
                    <input
                      id="upload-image-resort"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleSelectAndUploadImages} />
                  </label>


                </div>

                {resort.imageUrls && resort.imageUrls.length > 0 ? (
                  <div className="grid grid-cols-6 gap-4 min-h-60">
                    {resort.imageUrls.map((url, index) => (
                      <div key={index} className="relative flex justify-center items-center">

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
                    ))}

                  </div>
                ) : (<div className='min-h-56'>
                  <span>Chưa có ảnh nào</span>
                </div>)}
              </div>


            </div>

          </div>


        </div>
      </div>

      {/* Update Button */}
      {hasChanged() && (
        <div className="flex justify-end mt-8">
          <button
            className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-sky-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"
            onClick={handleUpdate}
          >
            <span className="mr-3">Cập nhật</span>
            <span className="bg-white text-sky-700 w-8 h-8 flex items-center justify-center rounded-full shadow-md transform transition-all duration-300 hover:scale-110">
              <FaArrowRight />
            </span>
          </button>
        </div>
      )}
      {isViewImageModal && (<ViewImageModal imageSrc={selectedImage} isOpen={handleSelectImage} onClose={handleClose} />)}
    </div>


  )
}

export default UpdateResortBasic