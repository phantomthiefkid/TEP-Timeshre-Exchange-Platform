import { LocationMarkerIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { FaCamera, FaUpload } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import Loading from '../../../components/LoadingComponent/loading';
import SpinnerWaiting from '../../../components/LoadingComponent/spinnerWaiting';
import { getResortById, updateResortBasic } from '../../../service/tsCompanyService/tsCompanyAPI';
import { uploadFileImage } from '../../../service/uploadFileService/uploadFileAPI';

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
    resortAmenityList: []
  });
  const [loading, setLoading] = useState(true);
  const [originalResort, setOriginalResort] = useState(null);
  const [flag, setFlag] = useState(false);
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
        resortAmenityList
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
        resortAmenityList
      };

      // Update both current resort data and the original resort data for comparison
      setResort(newResort);
      setOriginalResort(newResort);
      setLoading(false)
    }
  };

  useEffect(() => {
    getResortDetail()
  }, [id, flag])

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
      setResort({...resort, logo: response.data[0]});
    }
  }

  const hasChanged = () => {
    return JSON.stringify(resort) !== JSON.stringify(originalResort);
  };

  if (loading) {
    return (<SpinnerWaiting/>)
  }
 

  return (
    <div className='border rounded'>
      <Toaster position="top-center" reverseOrder={false} />
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
                value={resort.resortName}
                onChange={handleChange}
                placeholder="Nhập tên resort"
              />

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
                    value={resort.minPrice}
                    onChange={handleChange}
                    placeholder="0"
                  />
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
                    value={resort.maxPrice}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            {/* Mô tả */}
            <div className='grid grid-cols-1 space-y-2'>
              <label className='font-semibold text-gray-700 mb-2 text-lg tracking-wide'>Mô tả</label>
              <textarea
                className="border-b bg-slate-50 border-gray-600 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"
                name="description"
                value={resort.description}
                placeholder="Mô tả về resort"
                rows="6"
                onChange={handleChange}
              ></textarea>

            </div>
          </div>

          {/* Địa chỉ */}
          <div className='border p-6'>
            <div className='grid grid-cols-1 space-y-2'>
              <label className='font-semibold text-gray-700 mb-2 text-lg tracking-wide'>Địa chỉ*</label>
              <div className="relative">
                <span className="absolute left-3 top-4 text-gray-400">
                  <LocationMarkerIcon className='w-6 text-red-500' />
                </span>
                <input
                  className="border-b bg-slate-50 p-4 pl-10 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all w-full"
                  type="text"
                  name="address"
                  value={resort.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ resort"
                />
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
          


          {/* Upload room images */}
          {/* Upload room images with icon button */}
          <div className="space-y-4">
            <label className="block mb-2 font-medium">Logo resort:</label>

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

            Display uploaded images
            {resort.logo && (
              <div className="grid grid-cols-4 gap-4 mt-4">
               
                  <div  className="relative">
                    <img
                      src={resort.logo}
                      alt={`${resort.title}`}
                      className="w-full h-32 object-cover border rounded-lg"
                    />
                  </div>
              
              </div>
            )}
          </div>

        </div>
      </div>
      {hasChanged() && (
        <div className='flex justify-end p-6'>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-14 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleUpdate}
          >
            Cập nhật
          </button>
        </div>
      )}

    </div>
  )
}

export default UpdateResortBasic