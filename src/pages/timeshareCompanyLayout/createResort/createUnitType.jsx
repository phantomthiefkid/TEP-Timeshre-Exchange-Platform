import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CreateUnitType = ({ onUpdateData, onNext, onBack, formData }) => {
  const { resortId } = useSelector((state) => state.resortId); // Ensure you access the correct state

  // Initialize the unitType state
  const [unitType, setUnitType] = useState({
    title: '',
    area: '',
    bathrooms: 0,
    bedrooms: 0,
    bedsFull: 0,
    bedsKing: 0,
    bedsSofa: 0,
    bedsMurphy: 0,
    bedsQueen: 0,
    bedsTwin: 0,
    buildingsOption: '',
    price: 0,
    description: '',
    kitchen: '',
    photos: '',
    resortId: resortId, // Set resortId from Redux state
    sleeps: 0,
    view: '',
    unitTypeAmenitiesDTOS: [{ name: '', type: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the input field is a number
    const isNumberField = ['bathrooms', 'bedrooms', 'bedsFull', 'bedsKing', 'bedsSofa', 'bedsMurphy', 'bedsQueen', 'bedsTwin', 'price', 'sleeps'].includes(name);
    const newValue = isNumberField ? Number(value) : value; // Convert to number if it's a number field
    setUnitType((prev) => ({ ...prev, [name]: newValue })); // Update unitType state
    console.log(unitType); // Log the current state for debugging
  };

  const handleAmenityChange = (index, field, value) => {
    const updatedAmenities = [...unitType.unitTypeAmenitiesDTOS];
    updatedAmenities[index][field] = value; // Update specific amenity field
    setUnitType((prev) => ({ ...prev, unitTypeAmenitiesDTOS: updatedAmenities })); // Update state
    console.log(unitType); // Log the current state for debugging
  };

  const addAmenity = () => {
    setUnitType((prev) => ({
      ...prev,
      unitTypeAmenitiesDTOS: [...prev.unitTypeAmenitiesDTOS, { name: '', type: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateData(unitType); // Cập nhật dữ liệu
    console.log(unitType)
    if (onNext) {
      onNext(); // Gọi hàm onNext nếu nó tồn tại
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold">Thông tin Loại phòng</h3>

      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Tiêu đề:</label>
          <input
            type="text"
            name="title"
            value={unitType.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Diện tích:</label>
          <input
            type="text"
            name="area"
            value={unitType.area}
            onChange={handleChange}
            placeholder="Nhập diện tích"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Số phòng tắm:</label>
          <input
            type="number"
            name="bathrooms"
            value={unitType.bathrooms}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Số phòng ngủ:</label>
          <input
            type="number"
            name="bedrooms"
            value={unitType.bedrooms}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* More Beds */}
        <div>
          <label className="block mb-1">Giường Full:</label>
          <input
            type="number"
            name="bedsFull"
            value={unitType.bedsFull}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Giường King:</label>
          <input
            type="number"
            name="bedsKing"
            value={unitType.bedsKing}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Giường Sofa:</label>
          <input
            type="number"
            name="bedsSofa"
            value={unitType.bedsSofa}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Giường Murphy:</label>
          <input
            type="number"
            name="bedsMurphy"
            value={unitType.bedsMurphy}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Giường Queen:</label>
          <input
            type="number"
            name="bedsQueen"
            value={unitType.bedsQueen}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Giường Twin:</label>
          <input
            type="number"
            name="bedsTwin"
            value={unitType.bedsTwin}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Additional Fields */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block mb-1">Tùy chọn tòa nhà:</label>
          <input
            type="text"
            name="buildingsOption"
            value={unitType.buildingsOption}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Giá (VND):</label>
          <input
            type="number"
            name="price"
            value={unitType.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Số người ở:</label>
          <input
            type="number"
            name="sleeps"
            value={unitType.sleeps}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">View:</label>
          <input
            type="text"
            name="view"
            value={unitType.view}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-4">
        <label className="block mb-1">Mô tả:</label>
        <textarea
          name="description"
          value={unitType.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="4"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-1">Nhà bếp:</label>
        <textarea
          name="kitchen"
          value={unitType.kitchen}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="4"
        />
      </div>

      {/* Amenities */}
      <div className="mt-4">
        <h4 className="text-lg font-medium">Tiện ích loại phòng</h4>
        {unitType.unitTypeAmenitiesDTOS.map((amenity, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mt-2">
            <input
              type="text"
              placeholder="Tên tiện ích"
              value={amenity.name}
              onChange={(e) => handleAmenityChange(index, 'name', e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Loại tiện ích"
              value={amenity.type}
              onChange={(e) => handleAmenityChange(index, 'type', e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        ))}
        <button
          type="button"
          className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={addAmenity}
        >
          Thêm Tiện Ích
        </button>
      </div>

      {/* Photos */}
      <div className="mt-4">
        <label className="block mb-1">Ảnh:</label>
        <input
          type="text"
          name="photos"
          value={unitType.photos}
          onChange={handleChange}
          placeholder="URL ảnh"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <button type="button" onClick={onBack} className="text-blue-500">
          Quay lại
        </button>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Tiếp theo
        </button>
      </div>
    </form>
  );
};

export default CreateUnitType;
