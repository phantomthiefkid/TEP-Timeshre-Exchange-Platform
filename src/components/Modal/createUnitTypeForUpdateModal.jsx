import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaUpload } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { createResortUnitType } from '../../service/tsCompanyService/tsCompanyAPI';
import Loading from '../LoadingComponent/loading';
const CreateUnitTypeForUpdateModal = ({ onClose, flag }) => {
    const [picture, setPicture] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
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
        resortId: Number(id),
        sleeps: 0,
        view: '',
        unitTypeAmenitiesDTOS: []
    })
    const [amenity, setAmenity] = useState({ name: "", type: "" });
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

        // Kiểm tra nếu name thuộc các trường cần ép kiểu thành số
        const numericFields = ['bathrooms', 'bedrooms', 'bedsFull', 'bedsKing', 'bedsSofa', 'bedsMurphy', 'bedsQueen', 'bedsTwin', 'price', 'sleeps'];

        // Nếu là numeric field, ép kiểu thành số, nếu không giữ nguyên
        setUnitType({
            ...unitType,
            [name]: numericFields.includes(name) ? Number(value) : value
        });
    };


    const handleAddAmenity = () => {
        if (amenity.name && amenity.type) {
            setUnitType((prevUnitType) => ({
                ...prevUnitType,
                unitTypeAmenitiesDTOS: [...prevUnitType.unitTypeAmenitiesDTOS, { ...amenity }],
            }));

            // Reset lại tiện ích sau khi thêm
            setAmenity({ name: '', type: '' });
        }
        console.log(unitType);
    };


    const handleRemoveAmenity = (index) => {
        setUnitType({
            ...unitType,
            unitTypeAmenitiesDTOS: unitType.unitTypeAmenitiesDTOS.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = () => {
        setLoading(true)
        createResortUnitType(unitType).then(() => {
            toast.success("Cập nhật thành công!", { duration: 2000 });
            flag()
            onClose()

        }).catch(() => {
            toast.error("Cập nhật thất bại!", { duration: 2000 });
        })
            .finally(() => {
                setLoading(false); // Tắt loading khi hoàn tất
            });


    }



    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-white  rounded-lg shadow-lg w-full max-w-5xl">

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
                            {unitType.unitTypeAmenitiesDTOS && unitType.unitTypeAmenitiesDTOS.map((amenity, index) => (
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
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                "Chờ..."
                            ) : (
                                "Cập nhật"
                            )}
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CreateUnitTypeForUpdateModal