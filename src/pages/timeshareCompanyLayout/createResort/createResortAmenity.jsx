import { PlusCircleIcon, XCircleIcon, XIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

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
      if (type === '1') setOnSiteFeature('');
      else if (type === '2') setNearbyAttraction('');
      else if (type === '3') setPolicy('');
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

  // Filter amenities by type for rendering
  const renderAmenitiesByType = (type) => {
    return amenities
      .filter((amenity) => amenity.type === type)
      .map((amenity) => (
        <div
          key={amenity.name}
          className="relative flex justify-center items-center rounded-full border  mt-2 p-2 transition-colors duration-200 ease-in-out hover:border-sky-500 focus-within:border-sky-500"
        >
          <span className="text-sky-500 font-bold">{amenity.name}</span>

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
            {renderAmenitiesByType('1')}

            {/* Input and Add Button */}
            <div className="col-span-2 flex items-center space-x-4">
              <input
                type="text"
                className="w-full max-w-md border border-gray-300 ease-in-out hover:border-sky-500 focus-within:border-sky-500 rounded-full px-4 py-2 placeholder-sky-500 text-gray-700 transition duration-200"
                value={onSiteFeature}
                onChange={(e) => setOnSiteFeature(e.target.value)}
                placeholder="Thêm tính năng tại chỗ"
              />
              <button
                type="button"
                onClick={() => handleAddAmenity(onSiteFeature, '1')}
                className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircleIcon color='#FFFFFF' className="h-6 w-6" />
                <span className="ml-2">Thêm</span>
              </button>
            </div>
          </div>
        </div>


        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Các điểm tham quan lân cận</h3>
          <div className="grid grid-cols-6 py-4 gap-6">
            {renderAmenitiesByType('2')}
            <div className="col-span-2 flex items-center space-x-4">
              <input
                type="text"
                className="w-full max-w-md border border-gray-300 ease-in-out hover:border-sky-500 focus-within:border-sky-500 rounded-full px-4 py-2 placeholder-sky-500 text-gray-700 transition duration-200"
                value={nearbyAttraction}
                onChange={(e) => setNearbyAttraction(e.target.value)}
                placeholder="Thêm điểm tham quan lân cận"
              />
              <button
                type="button"
                onClick={() => handleAddAmenity(nearbyAttraction, '2')}
                className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircleIcon color='#FFFFFF' className="h-6 w-6" />
                <span className="ml-2">Thêm</span>
              </button>
            </div>
          </div>


        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Các chính sách</h3>
          <div className="grid grid-cols-6 py-4 gap-6">
            {renderAmenitiesByType('3')}
            <div className="col-span-2 flex items-center space-x-4">
              <input
                type="text"
                className="w-full max-w-md border border-gray-300 ease-in-out hover:border-sky-500 focus-within:border-sky-500 rounded-full px-4 py-2 placeholder-sky-500 text-gray-700 transition duration-200"
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
                placeholder="Thêm chính sách"
              />
              <button
                type="button"
                onClick={() => handleAddAmenity(policy, '3')}
                className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircleIcon color='#FFFFFF' className="h-6 w-6" />
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
