import React, { useState } from 'react';

const CreateResortAmenity = ({ onNext, onBack, onUpdateData, formData }) => {
  const [amenity, setAmenity] = useState({ name: '', type: '' });
  const [amenitiesList, setAmenitiesList] = useState(formData.resortAmenityList || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAmenity({
      ...amenity,
      [name]: value
    });
  };

  const addAmenity = () => {
    if (amenity.name && amenity.type) {
      const updatedAmenities = [...amenitiesList, amenity];
      setAmenitiesList(updatedAmenities);
      onUpdateData({ resortAmenityList: updatedAmenities });
      setAmenity({ name: '', type: '' }); // Reset form sau khi thêm tiện ích
    }
  };

  const removeAmenity = (index) => {
    const updatedList = amenitiesList.filter((_, i) => i !== index);
    setAmenitiesList(updatedList);
    onUpdateData({ resortAmenityList: updatedList });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Thêm Tiện Ích Resort</h3>

      {/* Form thêm tiện ích */}
      <div className="grid grid-cols-2 gap-4 border rounded-md p-8">
        <div>
          <label className="block mb-1">Tên tiện ích:</label>
          <input
            type="text"
            name="name"
            value={amenity.name}
            onChange={handleChange}
            placeholder="Nhập tên tiện ích"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Loại tiện ích:</label>
          <input
            type="text"
            name="type"
            value={amenity.type}
            onChange={handleChange}
            placeholder="Nhập loại tiện ích"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        onClick={addAmenity}
      >
        Thêm Tiện Ích
      </button>

      {/* Danh sách tiện ích đã thêm */}
      {amenitiesList.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-medium">Danh sách tiện ích:</h4>
          <ul className="space-y-2">
            {amenitiesList.map((amenity, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
                <span>{`${amenity.name} (${amenity.type})`}</span>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => removeAmenity(index)}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600" onClick={onBack}>
          Back
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateResortAmenity;
