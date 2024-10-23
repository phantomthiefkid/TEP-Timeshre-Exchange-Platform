import { XIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { FaUpload } from 'react-icons/fa';
import { updateResortUnitType } from '../../service/tsCompanyService/tsCompanyAPI';
import Loading from '../LoadingComponent/loading';
import LoadingWaitingComponent from '../LoadingComponent/loadingWaitingComponent';

const UpdateResortUnitTypeModal = ({ onClose, selectedUnitType, flag }) => {
  const [picture, setPicture] = useState([]);
  const [unitType, setUnitType] = useState(selectedUnitType)
  const [amenity, setAmenity] = useState({ name: "", type: "" });
  const [loading, setLoading] = useState(false);
  const handleUploadFileImage = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setPicture((prev) => [
      ...prev, images
    ])
  }
  const handleAmenityChange = (e) => {
    const { name, value } = e.target;
    setAmenity({ ...amenity, [name]: value });
    console.log(name, value)

  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUnitType({ ...unitType, [name]: value })

  }

  const handleAddAmenity = () => {
    if (amenity.name && amenity.type) {
      setUnitType({
        ...unitType,
        unitTypeAmenitiesList: [...unitType.unitTypeAmenitiesList, amenity],
      });
      setAmenity({ name: '', type: '' });
    }
    console.log(unitType)
  }

  const handleRemoveAmenity = (index) => {
    setUnitType({
      ...unitType,
      unitTypeAmenitiesList: unitType.unitTypeAmenitiesList.filter((_, i) => i !== index),
    });
  };

  const handleUpdate = () => {
    // Tạo một biến mới từ đối tượng chứa tất cả các trường ngoại trừ `id`
    const {
      id, // loại bỏ trường `id`
      unitTypeAmenitiesList, // lấy ra unitTypeAmenitiesList để xử lý
      ...otherFields // chứa tất cả các trường còn lại
    } = unitType; // giả sử bạn có dữ liệu resort trong state `resort`

    // Tạo mới unitTypeAmenitiesDTO và loại bỏ trường isActive từ unitTypeAmenitiesList
    const unitTypeAmenitiesDTOS = unitTypeAmenitiesList.map(({ isActive, ...rest }) => rest);

    // Tạo đối tượng cuối cùng để cập nhật
    const updatedResort = {
      ...otherFields, // giữ nguyên các trường khác
      unitTypeAmenitiesDTOS // thêm trường unitTypeAmenitiesDTO thay thế cho unitTypeAmenitiesList
    };

    setLoading(true)
    updateResortUnitType(updatedResort, selectedUnitType.id).then(() => {
      onClose()
      flag()
      toast.success("Cập nhật thành công!", { duration: 2000 });
    }).catch(() => {
      toast.error("Cập nhật thất bại!", { duration: 2000 });
    })
      .finally(() => {
        setLoading(false); // Tắt loading khi hoàn tất
      });

  };



  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      {!loading && (<div className="bg-white  rounded-lg shadow-lg w-full max-w-5xl">

        <h3 className="text-3xl font-bold text-center mb-4 mt-6">Cập nhật loại phòng</h3>
        <div className="max-h-[800px] overflow-auto">
          {/* Two-column layout */}
          <div className="grid grid-cols-2 gap-4 p-8">
            {/* Left column */}
            <div className='space-y-4'>
              <div className='grid grid-cols-1 space-y-2'>
                <label>Tên loại phòng *</label>
                <input
                  type="text"
                  name="title"
                  className="border p-2 rounded-lg"
                  value={unitType.title}
                  onChange={handleOnchange}
                  placeholder="Nhập tên loại phòng"
                />
              </div>
              <div className='grid grid-cols-1 space-y-2'>
                <label>Mô tả</label>
                <textarea
                  rows={5}
                  name="description"
                  className="border p-2 rounded-lg"
                  value={unitType.description}
                  onChange={handleOnchange}
                  placeholder="Mô tả"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className='flex flex-col'>
                  <label className="mb-1">Số phòng ngủ:</label>
                  <select
                    name="bedrooms"
                    className="border p-2"
                    value={unitType.bedrooms}
                    onChange={handleOnchange}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col'>
                  <label className="mb-1">Số người ở:</label>
                  <select
                    name="sleeps"
                    className="border p-2"
                    value={unitType.sleeps}
                    onChange={handleOnchange}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>


            </div>

            {/* Right column */}
            <div className="space-y-4">
              <label className="block mb-2 font-medium">Ảnh phòng:</label>
              <div className="flex items-center space-x-4 w-full">
                <label
                  htmlFor="upload-room-images"
                  className="bg-white border-2 justify-center w-full h-44 text-gray-700 py-2 px-4 rounded-xl shadow-sm cursor-pointer flex items-center space-x-2 hover:bg-gray-200"
                >
                  <div className='text-center'>
                    <FaUpload size={34} color='gray' />
                  </div>
                </label>
                <input
                  id="upload-room-images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleUploadFileImage}
                />
              </div>

              {picture.length > 0 && (
                <div className="grid grid-cols-6 gap-4 mt-4">
                  {picture.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Room ${index + 1}`}
                        className="w-full h-24 object-cover border rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Single column section below */}
          <div className="grid grid-cols-3 gap-4 mt-4 px-4 border rounded-2xl p-6 m-5">
            <div className="flex flex-col">
              <label className="mb-1">Số bedking:</label>
              <select
                name="bedsKing"
                className="border p-2"
                value={unitType.bedsKing}
                onChange={handleOnchange}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Số bedfull:</label>
              <select
                name="bedsFull"
                className="border p-2"
                value={unitType.bedsFull}
                onChange={handleOnchange}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Số bed sofa:</label>
              <select
                name="bedsSofa"
                className="border p-2"
                value={unitType.bedsSofa}
                onChange={handleOnchange}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Số bedsMurphy:</label>
              <select
                name="bedsMurphy"
                value={unitType.bedsMurphy}
                onChange={handleOnchange}
                className="border p-2">
                {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Số bedsQueen:</label>
              <select
                name="bedsQueen"
                value={unitType.bedsQueen}
                onChange={handleOnchange}
                className="border p-2">
                {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Số giường đôi:</label>
              <select
                name="bedsTwin"
                className="border p-2"
                value={unitType.bedsTwin}
                onChange={handleOnchange}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>


          </div>

          <div className='grid grid-cols-2 gap-4 mt-4 p-6'>
            <div className="flex flex-col">
              <label className="mb-1">Số phòng tắm:</label>
              <select
                name="bathrooms"
                className="border p-2"
                value={unitType.bathrooms}
                onChange={handleOnchange}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <label className="mb-2 font-medium">Nhà bếp:</label>
              <div className="flex gap-4">
                {["Không có", "Bếp chung", "Bếp riêng", "Bếp ngoài trời"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center p-2 rounded-lg cursor-pointer border-2 
            ${unitType.kitchen === option ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'} 
            hover:border-blue-400 hover:bg-blue-50`}
                  >
                    <input
                      type="radio"
                      name="kitchen"
                      value={option}
                      onChange={handleOnchange}
                      className="hidden" // Hide the default radio button
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className='flex flex-col mb-4'>
              <label className="mb-1 font-medium">Giá:</label>
              <input
                type="number"
                name="price"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={unitType.price}
                onChange={handleOnchange}
                placeholder="Giá (VND)"
              />
            </div>


          </div>

          {/* Amenities section */}
          <div className="py-4 p-8">
            <h4 className="font-medium">Tiện ích (Amenities)</h4>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                name="name"
                className="border p-2 flex-1"
                onChange={handleAmenityChange}
                value={amenity.name}
                placeholder="Tên tiện ích"
              />
              <input
                type="text"
                name="type"
                className="border p-2 flex-1"
                onChange={handleAmenityChange}
                value={amenity.type}
                placeholder="Loại tiện ích"
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleAddAmenity}
              >
                Thêm
              </button>
            </div>

            <ul>
              {unitType.unitTypeAmenitiesList && unitType.unitTypeAmenitiesList.map((amenity, index) => (
                <li key={index} className="flex justify-between mb-2">
                  <span>{`${amenity.name} (${amenity.type})`}</span>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemoveAmenity(index)}
                  >
                    Xóa
                  </button>
                </li>
              ))}
            </ul>
          </div>


          <div className="flex justify-end space-x-4 py-4 mb-2 px-8">
            <button
              className="bg-red-300 text-white px-12 py-2 rounded-lg"
              onClick={onClose}
            >
              Hủy bỏ
            </button>
            <button
              type='button'
              className="bg-green-500 text-white px-12 py-2 rounded-lg"
              onClick={handleUpdate}
            >
              Cập nhật
            </button>
          </div>
        </div>

      </div>)}
      {loading && (<LoadingWaitingComponent/>)}
    </div>
  )
}

export default UpdateResortUnitTypeModal