import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaPlusCircle, FaUpload } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { createResortUnitType } from '../../service/tsCompanyService/tsCompanyAPI';
import { uploadFileImage } from '../../service/uploadFileService/uploadFileAPI';
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
    const handleUploadFileImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        const response = await uploadFileImage(formData)
        if (response.status === 200) {
            setUnitType({ ...unitType, photos: response.data[0] });
        }
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
            <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl">

                <div className='bg-gradient-to-r from-blue-900 to-custom-blue-hover-sidebar text-center text-white py-6 rounded-t-xl shadow-lg'>
                    <h3 className="text-3xl font-bold tracking-wide font-serif mb-2">Thêm loại phòng</h3>
                    <p className="text-base italic text-blue-200">
                        Tạo loại phòng và các thông tin chi tiết
                    </p>
                </div>

                <div className="max-h-[800px] overflow-auto px-6 p-4">
                    {/* Two-column layout */}
                    <div className="grid grid-cols-2 gap-4 p-8">
                        {/* Left column */}
                        <div className='space-y-4'>
                            <div className='grid grid-cols-1 space-y-2'>
                                <label className='font-semibold text-gray-700 mb-2 text-lg tracking-wide'>Tên loại phòng *</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="border-b bg-slate-50 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"

                                    onChange={handleOnchange}
                                    placeholder="Nhập tên loại phòng"
                                />
                            </div>

                            <div className='grid grid-cols-1 space-y-2'>
                                <label className='font-semibold text-gray-700 mb-2 text-lg tracking-wide'>Mô tả</label>
                                <textarea
                                    rows={3}
                                    name="description"
                                    className="border-b bg-slate-50 border-gray-600 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"

                                    onChange={handleOnchange}
                                    placeholder="Mô tả chi tiết..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-4">
                                <div className='flex flex-col'>
                                    <label className=" text-md font-semibold mb-2">Số phòng ngủ:</label>
                                    <div className="relative inline-block w-full">
                                        <select
                                            name="bedrooms"
                                            className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"
                                            onChange={handleOnchange}
                                        >
                                            <option value="" disabled selected>
                                                Chọn số phòng ngủ
                                            </option>
                                            {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>


                                </div>
                                <div className='flex flex-col'>
                                    <label className="font-semibold text-md mb-2">Số người ở:</label>
                                    <div className="relative inline-block w-full">
                                        <select
                                            name="sleeps"
                                            className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"

                                            onChange={handleOnchange}
                                        >
                                            <option value="" disabled selected>
                                                Chọn số người ở
                                            </option>
                                            {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-semibold text-md mb-2">Khu vực:</label>
                                    <input
                                        type="text"
                                        name="area"
                                        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"

                                        onChange={handleOnchange}
                                        placeholder="Nhập khu vực"
                                    />

                                </div>

                                {/* Số người ở Field - Second Instance */}
                                <div className="flex flex-col">
                                    <label className="font-semibold text-md mb-2">Buildings Option:</label>
                                    <input
                                        type="text"
                                        name="buildingsOption"
                                        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"

                                        onChange={handleOnchange}

                                    />

                                </div>
                            </div>


                        </div>

                        {/* Right column */}
                        <div className="space-y-2">
                            <label className="font-semibold text-gray-700 mb-2 text-lg tracking-wide ">Ảnh phòng:</label>
                            <div className="flex justify-center items-center w-full">
                                <label
                                    htmlFor="upload-room-images"
                                    className="w-full h-36 border-dashed border-4 border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer transition hover:border-blue-400 hover:bg-gray-100"
                                >
                                    <FaUpload size={40} className="text-gray-400 mb-2" />
                                    <span className="text-gray-500 font-semibold">Tải lên ảnh loại phòng</span>
                                    <span className="text-sm text-gray-400">(Kéo thả hoặc nhấn để chọn ảnh)</span>
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

                            <div className='min-h-44 py-2'>
                                {unitType.photos && (
                                    <div className="flex justify-center items-center mt-6">
                                            <div className="relative">
                                                <img
                                                    src={unitType.photos}
                                                    alt={`${unitType.title}`}
                                                    className="w-full h-24 object-cover border rounded-lg"
                                                />
                                            </div>
                                     
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col py-4">
                                <label className="font-semibold text-md mb-2">View:</label>
                                <input
                                    type="text"
                                    name="view"
                                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"

                                    onChange={handleOnchange}
                                    placeholder="View"
                                />

                            </div>
                        </div>

                    </div>

                    <label className='font-semibold text-gray-700 text-xl tracking-wide p-6'>Các loại giường</label>
                    <div className="grid grid-cols-3 gap-6 mt-4 px-4  p-6 m-5">
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-2 text-md tracking-tight">Số bedking:</label>
                            <div className="relative inline-block w-full">
                                <select
                                    name="bedsKing"
                                    className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"

                                    onChange={handleOnchange}
                                >
                                    {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-2 text-md tracking-tight">Số bedfull:</label>
                            <div className="relative inline-block w-full">
                                <select
                                    name="bedsFull"
                                    className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"
                                    onChange={handleOnchange}
                                >
                                    {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-2 text-md tracking-tight">Số bed sofa:</label>
                            <div className="relative inline-block w-full">
                                <select
                                    name="bedsSofa"
                                    className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"

                                    onChange={handleOnchange}
                                >
                                    {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-2 text-md tracking-tight">Số bedsMurphy:</label>
                            <div className="relative inline-block w-full">
                                <select
                                    name="bedsMurphy"
                                    className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"

                                    onChange={handleOnchange}
                                >
                                    {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-2 text-md tracking-tight">Số bedsQueen:</label>
                            <div className="relative inline-block w-full">
                                <select
                                    name="bedsQueen"
                                    className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"

                                    onChange={handleOnchange}
                                >
                                    {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-2 text-md tracking-tight">Số giường đôi:</label>
                            <div className="relative inline-block w-full">
                                <select
                                    name="bedsTwin"
                                    className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"

                                    onChange={handleOnchange}
                                >
                                    {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className='grid grid-cols-2 gap-4 mt-4 p-6'>
                        <div className="flex flex-col">
                            <label className="font-semibold text-gray-700 mb-2 text-lg tracking-wide">Số phòng tắm:</label>
                            <div className="relative inline-block w-full">
                                <select
                                    name="bathrooms"
                                    className="appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer"

                                    onChange={handleOnchange}
                                >
                                    {[0, 1, 2, 3, 4, 5, 6].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <label className="font-semibold text-gray-700 mb-2 text-lg tracking-wide">Nhà bếp:</label>
                            <div className="flex gap-2">
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
                        <div className="flex flex-col mb-4">
                            <label className="font-semibold text-gray-700 mb-2 text-lg tracking-wide">
                                Giá:
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-500">VND</span>
                                <input
                                    type="number"
                                    name="price"
                                    className="pl-14 bg-gray-100 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                                    onChange={handleOnchange}
                                    placeholder="Nhập giá"
                                />
                            </div>
                        </div>



                    </div>

                    {/* Amenities section */}
                    <div className="py-4 p-8">
                        <h4 className="font-semibold text-md mb-2">Tiện ích (Amenities)</h4>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                name="name"
                                className="border-b bg-slate-50 p-2 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"
                                onChange={handleAmenityChange}
                                value={amenity.name}
                                placeholder="Tên tiện ích"
                            />
                            <input
                                type="text"
                                name="type"
                                className="border-b bg-slate-50 p-2 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"
                                onChange={handleAmenityChange}
                                value={amenity.type}
                                placeholder="Loại tiện ích"
                            />
                            <button
                                type="button"
                                className="bg-gray-50px-4 py-2 rounded-lg hover:text-blue-700"
                                onClick={handleAddAmenity}
                            >
                                <FaPlusCircle size={22} color="#3366CC" />
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
                            className="bg-gradient-to-r gap-2 border border-red-400 text-red-500 py-2 px-8 pr-10 rounded-xl shadow-md flex items-center justify-between cursor-pointer transition duration-300 ease-in-out transform hover:from-red-500 hover:to-red-300 hover:text-white hover:scale-105 focus:outline-none"
                            onClick={onClose}
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="button"
                            className="bg-gradient-to-r gap-2 from-green-400 to-green-600 border text-gray-560 py-2 px-8 pr-10 rounded-xl shadow-md flex items-center justify-between cursor-pointer transition duration-300 ease-in-out transform hover:from-green-500 hover:to-green-300 hover:scale-105 text-white focus:outline-none"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (<>
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
                            </>) : "Tạo mới"}
                        </button>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default CreateUnitTypeForUpdateModal