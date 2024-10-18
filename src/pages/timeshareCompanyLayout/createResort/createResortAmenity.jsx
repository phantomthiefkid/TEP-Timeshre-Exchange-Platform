import React, { useState } from 'react';

const CreateResortAmenity = ({ onUpdateData, onNext, onBack, formData }) => {
  const [amenityName, setAmenityName] = useState('');
  const [amenityType, setAmenityType] = useState('');
  const [resortAmenityList, setResortAmenityList] = useState(formData.resortAmenityList || []);

  const handleAddAmenity = () => {
    if (amenityName && amenityType) {
      const newAmenity = { name: amenityName, type: amenityType };
      setResortAmenityList((prevList) => [...prevList, newAmenity]);
      setAmenityName(''); // Reset the input for name
      setAmenityType(''); // Reset the input for type
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Correctly update the formData by including the resortAmenityList in the previous formData
    onUpdateData({
      ...formData, // Keep the previous formData intact
      resortAmenityList // Only update the resortAmenityList
    });

    if (onNext) {
      onNext(); // Call onNext function to move to the next step
    }
  };

  return (
    <div className="p-6">
      <h4 className="text-xl font-semibold mb-4">Tiện ích khách sạn</h4>

      <div className="mb-4 flex flex-col space-y-2">
        <input
          type="text"
          value={amenityName}
          onChange={(e) => setAmenityName(e.target.value)}
          placeholder="Tên tiện ích"
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          value={amenityType}
          onChange={(e) => setAmenityType(e.target.value)}
          placeholder="Loại tiện ích"
          className="border p-2 rounded-lg"
        />
        <button
          type="button"
          onClick={handleAddAmenity}
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Thêm tiện ích
        </button>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <ul className="space-y-2">
          {resortAmenityList && resortAmenityList.length > 0 ? (
            resortAmenityList.map((amenity, index) => (
              <li key={index} className="flex justify-between border-b pb-2">
                <span className="font-medium">{amenity.name}</span>
                <span className="text-gray-600">{amenity.type}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">Chưa có tiện ích nào được thêm.</li>
          )}
        </ul>
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
