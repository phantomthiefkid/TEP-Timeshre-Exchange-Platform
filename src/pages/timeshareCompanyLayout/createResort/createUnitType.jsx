import { PlusIcon, XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UnitTypeModal from '../../../components/Modal/unitTypeModal';

import { createResortUnitType } from '../../../service/tsCompanyService/tsCompanyAPI';
import { toast, Toaster } from 'react-hot-toast';

import SpinnerWaiting from '../../../components/LoadingComponent/spinnerWaiting';
import { FaArrowRight } from 'react-icons/fa6';
import { FaPlusCircle } from 'react-icons/fa';
const CreateUnitType = ({ onUpdateData, onNext, onBack, formData }) => {
  const [selectedUnitType, setSelectedUnitType] = useState(null);
  const { resortId } = useSelector((state) => state.resortId);
  const [isOpenModalUnitType, setIsOpenModalUnitType] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [indexSelected, setIndexSelected] = useState(-1)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
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

    try {

      setIsWaiting(true)
      for (const roomType of roomTypes) {
        const response = await createResortUnitType(roomType);

        if (response.status === 200) {
          setLoading(false);
        }
      }
      toast.success("Tạo mới thành công!", { duration: 1000 })
      setTimeout(() => {
        // navigate('/timesharecompany/resortmanagementtsc');
        navigate(`/timesharecompany/updateresort/${resortId}`);
      }, 1000);

    } catch (error) {
      console.log('Error creating unit types:', error);
    } finally {
      setIsWaiting(false)
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
        <div className="py-6 space-y-3">
          <h1 className="text-2xl font-semibold text-gray-600">
            Quản lý và tạo mới các loại phòng với thông tin chi tiết để phục vụ nhu cầu khách hàng
          </h1>
          <h3 className="text-lg text-gray-600">
            Cung cấp các loại phòng với thông tin tiện nghi cụ thể và quản lý chi tiết để nâng cao trải nghiệm người dùng
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
            className="flex flex-col items-center justify-center p-6 w-full h-44 gap-4 bg-gradient-to-r from-indigo-400 from-10% via-sky-400 via-30% to-emerald-400 to-90% text-white rounded-lg transform transition-all duration-300 ease-in-out hover:shadow-xl shadow-md border-none hover:bg-gradient-to-r hover:from-sky-400 hover:to-purple-400"
            onClick={handleOpenModalAdd} // Open modal on click
          >
            <label className="text-lg font-semibold">Tạo mới</label>
            <FaPlusCircle className="h-8 w-8 transform transition-transform duration-300 ease-in-out hover:rotate-45" />
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
          className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"
          onClick={handleSubmit}
        >
          {
            isWaiting ? (
              <>
                {/* Spinner */}
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Đợi trong giây lát...
              </>
            ) : "Hoàn tất"
          }
        </button>
      </div>
      {loading && (<SpinnerWaiting />)}
    </div>
  );
};

export default CreateUnitType;
