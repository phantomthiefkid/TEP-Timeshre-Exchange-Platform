import { PlusCircleIcon, XCircleIcon, XIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaSpinner } from 'react-icons/fa6';

const CreateResortAmenity = ({ onUpdateData, onNext, onBack, formData }) => {
  const [amenities, setAmenities] = useState([]);

  // Separate states for each section
  const [onSiteFeature, setOnSiteFeature] = useState('');
  const [nearbyAttraction, setNearbyAttraction] = useState('');
  const [policy, setPolicy] = useState('');

  // Handle adding amenity based on type
  const handleAddAmenity = (name, type) => {
    if (name) {
      setAmenities([...amenities, { name, type }]);

      // Clear the corresponding input field based on type
      if (type === 'AMENITIES') setOnSiteFeature('');
      else if (type === 'NEARBY ATTRACTIONS') setNearbyAttraction('');
      else if (type === 'POLICY') setPolicy('');
    }
  };

  // Handle removing an amenity by name
  const handleRemoveAmenity = (name) => {
    const updatedAmenities = amenities.filter((amenity) => amenity.name !== name);
    setAmenities(updatedAmenities);
  };

  useEffect(() => {
    onUpdateData({
      ...formData,
      resortAmenityList: amenities
    });
  }, [amenities])

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) {
      onNext();
    }
  };

  console.log(amenities)
  // Filter amenities by type for rendering
  const renderAmenitiesByType = (type) => {
    return amenities
      .filter((amenity) => amenity.type === type)
      .map((amenity) => (
        <div
          key={amenity.name}
          className="relative bg-gray-100 shadow-md flex justify-center items-center rounded-full border  mt-2 p-2 transition-colors duration-200 ease-in-out hover:border-sky-500 focus-within:border-sky-500"
        >
          <span className="text-gray-500 font-normal">{amenity.name}</span>

          <button
            type="button"
            onClick={() => handleRemoveAmenity(amenity.name)}
            className="absolute right-0 text-red-400 flex items-center p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out"
          >
            <XCircleIcon className="h-7 w-7" />
          </button>

        </div>
      ));
  };




  return (
    <div className="p-6">
      <div className="border border-sky-400 rounded-md p-8 space-y-14">
        <h4 className="text-2xl font-bold mb-4 text-gray-600">Tiện ích khách sạn</h4>

        {/* Section for Adding On-site Features */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Các tính năng và tiện nghi tại chỗ</h3>
          <div className="grid grid-cols-6 py-4 gap-6">
            {/* Render amenities by type */}
            {renderAmenitiesByType('AMENITIES')}

            {/* Select and Add Button */}
            <div className="col-span-2 flex items-center space-x-4">
              <select
                className="w-full max-w-md border border-gray-300 ease-in-out hover:border-sky-500 focus-within:border-sky-500 rounded-full px-4 py-2 text-gray-700 transition duration-200"
                value={onSiteFeature}
                onChange={(e) => setOnSiteFeature(e.target.value)}
              >
                <option value="" disabled>
                  Chọn tính năng tại chỗ
                </option>
                <option value="Hồ bơi ngoài trời">Hồ bơi ngoài trời</option>
                <option value="Khu vui chơi">Khu vui chơi</option>
                <option value="Nhà hàng">Nhà hàng</option>
                <option value="Phòng xông hơi">Phòng xông hơi</option>
                <option value="An ninh">An ninh</option>
                <option value="Giặt là chung">Giặt là chung</option>
                <option value="Khu mua sắm">Khu mua sắm</option>
                <option value="Dịch vụ Spa">Dịch vụ Spa</option>
              </select>
              <button
                type="button"
                onClick={() => handleAddAmenity(onSiteFeature, 'AMENITIES')}
                className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircleIcon color="#FFFFFF" className="h-6 w-6" />
                <span className="ml-2">Thêm</span>
              </button>
            </div>
          </div>

        </div>


        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Các điểm tham quan lân cận</h3>
          <div className="grid grid-cols-6 py-4 gap-6">
            {/* Render amenities by type */}
            {renderAmenitiesByType('NEARBY ATTRACTIONS')}

            {/* Select and Add Button */}
            <div className="col-span-2 flex items-center space-x-4">
              <select
                className="w-full max-w-md border border-gray-300 ease-in-out hover:border-sky-500 focus-within:border-sky-500 rounded-full px-4 py-2 text-gray-700 transition duration-200"
                value={nearbyAttraction}
                onChange={(e) => setNearbyAttraction(e.target.value)}
              >
                <option value="" disabled>
                  Chọn điểm tham quan lân cận
                </option>
                <option value="Bãi biển">Bãi biển</option>
                <option value="Đi thuyền">Đi thuyền</option>
                <option value="Nhà thuốc">Nhà thuốc</option>
                <option value="Câu cá">Câu cá</option>
                <option value="Sân golf">Sân golf</option>
                <option value="Cơ sở y tế">Cơ sở y tế</option>
                <option value="Lặn biển">Lặn biển</option>
                <option value="Trượt nước">Trượt nước</option>
              </select>

              <button
                type="button"
                onClick={() => handleAddAmenity(nearbyAttraction, 'NEARBY ATTRACTIONS')}
                className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircleIcon color="#FFFFFF" className="h-6 w-6" />
                <span className="ml-2">Thêm</span>
              </button>
            </div>
          </div>


        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Các chính sách</h3>
          <div className="grid grid-cols-6 py-4 gap-6">
            {renderAmenitiesByType('POLICY')}
            <div className="col-span-2 flex items-center space-x-4">
              <select
                className="w-full max-w-md border border-gray-300 ease-in-out hover:border-sky-500 focus-within:border-sky-500 rounded-full px-4 py-2 text-gray-700 transition duration-200"
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
              >
                <option value="" disabled>
                  Chọn điểm tham quan lân cận
                </option>
                <option value="Không hút thuốc">Không hút thuốc</option>
                <option value="Không thú cưng">Không thú cưng</option>
                <option value="Độ tuổi tối thiểu: 18">Độ tuổi tối thiểu: 18</option>
              </select>
              <button
                type="button"
                onClick={() => handleAddAmenity(policy, 'POLICY')}
                className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircleIcon color="#FFFFFF" className="h-6 w-6" />
                <span className="ml-2">Thêm</span>
              </button>
            </div>
          </div>


        </div>

      </div>

      <div className="mt-6 flex justify-between space-x-4">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"
        >
          <span className="bg-white text-sky-700 w-8 h-8 flex items-center justify-center rounded-full shadow-md transform transition-all duration-300 hover:scale-110 mr-3">
            <FaArrowLeft />
          </span>
          <span>Trở lại</span>
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"
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

export default CreateResortAmenity;
