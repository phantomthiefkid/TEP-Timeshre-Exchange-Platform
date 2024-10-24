import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { FaCamera } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import Loading from '../../../components/LoadingComponent/loading';
import { getResortById, updateResortBasic } from '../../../service/tsCompanyService/tsCompanyAPI';

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

    // Update only fields other than timeshareCompanyId
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
      setFlag(!flag); // This toggles the flag state
      // After the update, fetch the resort details again
      await getResortDetail(); // Fetch updated data
    } catch (error) {
      toast.error("Cập nhật thất bại! Vui lòng thử lại.", { duration: 3000 });
    }
  };

  const hasChanged = () => {
    return JSON.stringify(resort) !== JSON.stringify(originalResort);
  };

  if(loading) {
    return <Loading/>
  }
  console.log(resort)

  return (
      <div className='border rounded'>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="grid grid-cols-2 gap-6 px-8 py-4 bg-white">

          {/* Column 1 */}
          <div className="space-y-4">
            <div className="border p-10 rounded-lg shadow-sm bg-white space-y-4">
              <h1 className="text-2xl font-semibold mb-4">Thông tin cơ bản</h1>
              <div>
                <label className="block mb-2 font-medium">Tên Resort*</label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  type="text"
                  name="resortName"
                  value={resort.resortName}
                  onChange={handleChange}
                  placeholder="Nhập tên resort"
                />

              </div>

              {/* Giá min/max */}
              <div className="space-y-4">
                <label className="block mb-2 font-medium">Khoảng giá (VND)*</label>
                <div className="grid grid-cols-5 items-center gap-4">

                  {/* Từ giá tối thiểu */}
                  <div className="relative col-span-2">
                    <label className="absolute top-3 left-2 text-sm font-semibold text-gray-600">Từ:</label>
                    <input
                      className="border border-gray-300 rounded-md p-2 w-full pl-10 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      type="number"
                      name="minPrice"
                      value={resort.minPrice}
                      onChange={handleChange}
                      placeholder="0"
                    />

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
                      value={resort.maxPrice}
                      onChange={handleChange}
                      placeholder="0"
                    />

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
                  value={resort.description}
                  placeholder="Mô tả về resort"
                  rows="6"
                  onChange={handleChange}
                ></textarea>

              </div>
            </div>

            {/* Địa chỉ */}
            <div className='border rounded-lg shadow-md p-6 bg-gray-50'>
              <div>
                <label className="block mb-2 font-medium">Địa chỉ*</label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  type="text"
                  name="address"
                  value={resort.address}
                  placeholder="Nhập địa chỉ resort"
                />

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

              />
            </div>


            {/* Upload room images */}
            {/* Upload room images with icon button */}
            <div className="space-y-4">
              <label className="block mb-2 font-medium">Ảnh phòng:</label>

              {/* Upload button with icon */}
              <div className="flex items-center space-x-4 w-full">
                <label
                  htmlFor="upload-room-images"
                  className="bg-white border-2 justify-center w-full h-44 text-gray-700 py-2 px-4 rounded-xl shadow-lg cursor-pointer flex items-center space-x-2 hover:bg-gray-100"
                >

                  {/* Text */}
                  <div className='text center'><FaCamera size={34} color='gray' />

                  </div>
                </label>

                {/* Hidden input to trigger file upload */}
                <input
                  id="upload-room-images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                // onChange={handleFileUpload}
                />
              </div>

              Display uploaded images
              {/* {resortData.roomImages.length > 0 && (
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
            )} */}
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