import React, { useState } from 'react';

const UnitTypeModal = ({ isOpen, onClose, onAddRoomType }) => {
    const [formData, setFormData] = useState({
        title: '',
        area: '',
        bathrooms: 1,
        bedrooms: 1,
        bedsFull: 1,
        bedsKing: 1,
        bedsSofa: 1,
        bedsMurphy: 1,
        bedsQueen: 1,
        bedsTwin: 1,
        buildingsOption: '',
        price: '',
        description: '',
        kitchen: '',
        photos: '',
        resortId: '',
        sleeps: 1,
        view: '',
        unitTypeAmenitiesDTOS: []
    });
    const [amenity, setAmenity] = useState({ name: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAmenityChange = (e) => {
        const { name, value } = e.target;
        setAmenity({ ...amenity, [name]: value });
    };

    const handleAddAmenity = () => {
        if (amenity.name && amenity.type) {
            setFormData({
                ...formData,
                unitTypeAmenitiesDTOS: [...formData.unitTypeAmenitiesDTOS, amenity],
            });
            setAmenity({ name: '', type: '' });
        }
    };

    const handleRemoveAmenity = (index) => {
        setFormData({
            ...formData,
            unitTypeAmenitiesDTOS: formData.unitTypeAmenitiesDTOS.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = () => {
        onAddRoomType(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <h3 className="text-lg font-medium mb-4">Thêm loại phòng mới</h3>

                {/* Grid layout for form fields */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="title"
                        className="border p-2"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Nhập tiêu đề"
                    />

                    <input
                        type="text"
                        name="area"
                        className="border p-2"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="Nhập diện tích"
                    />

                    <div className="flex flex-col">
                        <label className="mb-1">Số phòng tắm:</label>
                        <select
                            name="bathrooms"
                            className="border p-2"
                            value={formData.bathrooms}
                            onChange={handleChange}
                        >
                            {[1, 2, 3, 4, 5].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1">Số phòng ngủ:</label>
                        <select
                            name="bedrooms"
                            className="border p-2"
                            value={formData.bedrooms}
                            onChange={handleChange}
                        >
                            {[1, 2, 3, 4, 5].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1">Số giường Full:</label>
                        <select
                            name="bedsFull"
                            className="border p-2"
                            value={formData.bedsFull}
                            onChange={handleChange}
                        >
                            {[1, 2, 3, 4, 5].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1">Số giường King:</label>
                        <select
                            name="bedsKing"
                            className="border p-2"
                            value={formData.bedsKing}
                            onChange={handleChange}
                        >
                            {[1, 2, 3, 4, 5].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="number"
                        name="price"
                        className="border p-2"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Giá (VND)"
                    />

                    <div className="flex flex-col">
                        <label className="mb-1">Số người ở:</label>
                        <select
                            name="sleeps"
                            className="border p-2"
                            value={formData.sleeps}
                            onChange={handleChange}
                        >
                            {[1, 2, 3, 4, 5].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <textarea
                        name="description"
                        className="border p-2 col-span-2"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Mô tả"
                    />

                    <input
                        type="text"
                        name="kitchen"
                        className="border p-2"
                        value={formData.kitchen}
                        onChange={handleChange}
                        placeholder="Nhà bếp"
                    />

                    <input
                        type="number"
                        name="resortId"
                        className="border p-2"
                        value={formData.resortId}
                        onChange={handleChange}
                        placeholder="ID Resort"
                    />

                    <input
                        type="text"
                        name="view"
                        className="border p-2"
                        value={formData.view}
                        onChange={handleChange}
                        placeholder="View"
                    />
                </div>

                <div className="my-4">
                    <h4 className="font-medium">Tiện ích (Amenities)</h4>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            name="name"
                            className="border p-2 flex-1"
                            value={amenity.name}
                            onChange={handleAmenityChange}
                            placeholder="Tên tiện ích"
                        />
                        <input
                            type="text"
                            name="type"
                            className="border p-2 flex-1"
                            value={amenity.type}
                            onChange={handleAmenityChange}
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
                        {formData.unitTypeAmenitiesDTOS.map((amenity, index) => (
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

                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleSubmit}
                    >
                        Thêm mới
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnitTypeModal;
