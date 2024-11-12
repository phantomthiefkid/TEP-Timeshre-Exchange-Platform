import { PlusIcon, XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UnitTypeModal from '../../../components/Modal/unitTypeModal';

import { createResortUnitType } from '../../../service/tsCompanyService/tsCompanyAPI';
import { toast, Toaster } from 'react-hot-toast';

import SpinnerWaiting from '../../../components/LoadingComponent/spinnerWaiting';
import { FaArrowRight } from 'react-icons/fa6';
const CreateUnitType = ({ onUpdateData, onNext, onBack, formData }) => {
  const [selectedUnitType, setSelectedUnitType] = useState(null);
  const [isOpenModalUnitType, setIsOpenModalUnitType] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [indexSelected, setIndexSelected] = useState(-1)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleAddUnitType = (newUnitType) => {
    setRoomTypes([...roomTypes, newUnitType]);
    setIsOpenModalUnitType(false)
  }

  const handleDeleteRoomType = (indexToDelete) => {
    setRoomTypes(roomTypes.filter((_, index) => index !== indexToDelete));
  };
  const handleEditUnitType = (index) => {
    setSelectedUnitType({ ...roomTypes[index] });
    setIndexSelected(index)
    setIsOpenModalUnitType(true);
  };

  const handleSubmit = async () => {
    console.log(roomTypes)
    try {
      setLoading(true)
      for (const roomType of roomTypes) {
        const response = await createResortUnitType(roomType);

        if (response.status === 200) {
          setLoading(false);
        }
      }
      toast.success("Tạo mới thành công!", { duration: 1000 })
      setTimeout(() => {
        navigate('/timesharecompany/resortmanagementtsc');
      }, 1000);

    } catch (error) {
      console.log('Error creating unit types:', error);
    } finally {
      setLoading(false)
    }
  };

  const handleOpenModalAdd = () => {

    setSelectedUnitType(null)
    setIsOpenModalUnitType(true)
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className=' p-6 '>
        <div className="py-4 space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Loại phòng</h1>
          <h3 className="text-xl text-gray-500">
            Tạo các loại phòng cụ thể và những thông tin chi tiết
          </h3>
        </div>
        <div className='grid grid-cols-3 gap-4 p-4 min-h-96'>
          {roomTypes.map((room, index) => (
            <div
              onClick={() => handleEditUnitType(index)}
              key={index}
              className="relative border-2 h-44 shadow-md hover:shadow-lg rounded-xl hover:bg-gray-100 flex items-center"
            >
              {/* Left Section: Image */}
              <div className="w-1/3 h-full overflow-hidden">
                <img
                  src="https://hagiangamazingtour.vn/upload/images/resort-ha-giang-2-.jpg" // Assuming `imageUrl` is the key for the image
                  alt={room.title}
                  className="w-full h-full object-cover rounded-l-xl"
                />
              </div>

              {/* Right Section: Room Details */}
              <div className="w-2/3 pl-4 flex flex-col justify-center text-left">
                <h3 className="font-semibold text-xl">Phòng: {room.title}</h3>
                <p className="text-lg text-gray-600">Phòng ngủ: {room.bedrooms}</p>
                <p className="text-lg text-gray-600">Nhà bếp: {room.kitchen}</p>
                <p className="text-lg text-gray-600">Phòng tắm: {room.bathrooms}</p>
                <p className="text-lg font-medium text-blue-600 absolute bottom-2 right-2">Giá: {room.price} VND</p>
              </div>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRoomType(index);
                }}
                className="absolute top-1 right-1 bg-gray-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>

          ))}


          {/* Add Room Type Button */}
          <button
            className="flex flex-col items-center h-44 w-full gap-2 justify-center p-6 border-4 border-dashed border-gray-300 text-gray-700 rounded-xl hover:bg-slate-100 hover:border-sky-500 hover:text-sky-600 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
            onClick={handleOpenModalAdd} // Open modal on click
          >
            <label className="text-lg font-semibold tracking-wide">Thêm mới</label>
            <PlusIcon className="h-8 w-8" />
          </button>

        </div>

      </div>
      <UnitTypeModal
        isOpen={isOpenModalUnitType}
        onClose={() => setIsOpenModalUnitType(false)} // Close modal
        onAddRoomType={handleAddUnitType}
        selectedUnitType={selectedUnitType}
        onUpdateRoomType={(updatedUnitType) => {
          // Cập nhật item trong danh sách
          const updatedRoomTypes = [...roomTypes];
          updatedRoomTypes[indexSelected] = updatedUnitType;
          setRoomTypes(updatedRoomTypes);
          setIsOpenModalUnitType(false); // Đóng modal sau khi cập nhật
        }}
      />
      <div className="mt-6 flex justify-end">
        {/* <button type="button" onClick={onBack} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Quay lại
        </button> */}

        <button
          className="bg-indigo-400 hover:bg-indigo-700 text-indigo-100 pl-6 rounded-full flex items-center"
          onClick={handleSubmit}
        >
          <span class="mr-6">Hoàn tất</span><span class="bg-indigo-500 hover:bg-indigo-700 w-12 h-12 flex items-center justify-center rounded-full"><FaArrowRight /></span>
        </button>
      </div>
      {loading && (<SpinnerWaiting />)}
    </div>
  );
};

export default CreateUnitType;
