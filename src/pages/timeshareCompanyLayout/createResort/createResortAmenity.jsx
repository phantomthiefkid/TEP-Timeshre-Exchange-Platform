import { PlusCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';

const CreateResortAmenity = ({ onUpdateData, onNext, onBack, formData }) => {
  const [amenityName, setAmenityName] = useState('');
  const [amenityType, setAmenityType] = useState('');
  const [resortAmenityList, setResortAmenityList] = useState(formData.resortAmenityList || []);
  const [showInputs, setShowInputs] = useState(false);

  const handleAddAmenity = () => {
    if (amenityName && amenityType) {
      const newAmenity = { name: amenityName, type: amenityType };
      setResortAmenityList((prevList) => {
        const updatedList = [...prevList, newAmenity];
        console.log("Updated List: ", updatedList); // This logs the new state correctly
        return updatedList;
      });
      setAmenityName(''); // Reset the input for name
      setAmenityType(''); // Reset the input for type
      setShowInputs(false); // Hide the input fields after adding
    }
  };

  useEffect(() => {
    onUpdateData({
      ...formData,
      resortAmenityList,
    });
  }, [resortAmenityList])

  const handleDeleteAmenity = (indexToRemove) => {
    setResortAmenityList((prevList) => prevList.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="p-6">
      <div className="border border-blue-500 rounded-md p-8 space-y-14">
        <h4 className="text-2xl font-bold mb-4">Tiện ích khách sạn</h4>

        {/* Section for Adding Amenities */}
        <div className="mt-4">
          <h3 className="text-md font-semibold">Các tính năng và tiện nghi tại chỗ</h3>
          <button
            className="bg-white font-semibold border text-gray-600 rounded-lg px-4 py-2 mt-2 flex gap-2"
            onClick={() => setShowInputs(!showInputs)}
          >
            Thêm
            <div className='w-6'><PlusIcon /></div>
          </button>

          {showInputs && (
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={amenityName}
                onChange={(e) => setAmenityName(e.target.value)}
                placeholder="Tên tiện ích"
                className="border p-2 rounded-lg w-1/3"
              />
              <input
                type="text"
                value={amenityType}
                onChange={(e) => setAmenityType(e.target.value)}
                placeholder="Loại tiện ích"
                className="border p-2 rounded-lg w-1/3"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 flex-shrink-0"
              >
                Thêm
              </button>
            </div>
          )}
        </div>

        {/* Display Added Amenities in a Grid */}
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h4 className="text-xl font-semibold mb-4">Danh sách tiện ích đã thêm</h4>
          {resortAmenityList && resortAmenityList.length > 0 ? (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {resortAmenityList.map((amenity, index) => (
                <li
                  key={index}
                  className="relative border p-4 rounded-lg bg-gray-50"
                >
                  {/* Delete Button in the Top-Right Corner */}
                  <button
                    onClick={() => handleDeleteAmenity(index)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-semibold text-xs"
                  >
                    <div className='w-6'>
                      <PlusCircleIcon />
                    </div>
                  </button>

                  {/* Amenity Details */}
                  <div className='grid grid-cols-2'>
                    <div className="font-medium text-gray-900">{amenity.name}</div>
                    <div className="font-medium text-gray-900">{amenity.type}</div>
                  </div>
                </li>
              ))}
            </ul>

          ) : (
            <p className="text-gray-500 text-sm">Chưa có tiện ích nào được thêm.</p>
          )}
        </div>

        {/* Other Sections */}
        <div className="mt-4">
          <h3 className="text-md font-semibold">Các điểm tham quan lân cận</h3>
          <button className="bg-white font-semibold border text-gray-600 rounded-lg px-4 py-2 mt-2 flex gap-2">
            Thêm
            <div className='w-6'><PlusIcon /></div>
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-md font-semibold">Các chính sách</h3>
          <button className="bg-white font-semibold border text-gray-600 rounded-lg px-4 py-2 mt-2 flex gap-2">
            Thêm
            <div className='w-6'><PlusIcon /></div>
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Quay lại
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default CreateResortAmenity;
