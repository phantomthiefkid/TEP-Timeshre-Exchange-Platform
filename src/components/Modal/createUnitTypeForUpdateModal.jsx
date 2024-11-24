import { XCircleIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FaBook, FaCouch, FaGamepad, FaPlus, FaPlusCircle, FaUpload, FaUtensils } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
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
        setAmenity({ ...amenity, [name]: value })

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
    console.log(unitType)

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


    const handleRemoveAmenity = (name) => {
        setUnitType({
            ...unitType,
            unitTypeAmenitiesDTOS: unitType.unitTypeAmenitiesDTOS.filter((amenity) => amenity.name !== name),
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

        console.log(unitType)
    }

    const renderAmenitiesByType = (type) => {
        const amenities = unitType.unitTypeAmenitiesDTOS.filter(
            (amenity) => amenity.type === type
        );

        return (
            <div>
                {amenities.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                        {amenities.map((amenity, index) => (
                            <div
                                key={`${type}-${index}`}
                                className="relative bg-gray-100 shadow-md p-1 flex justify-between items-center rounded-full border-2 transition-colors duration-200 ease-in-out hover:border-sky-500"
                            >
                                <span className="text-gray-500 font-normal">{amenity.name}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveAmenity(amenity.name)}
                                    className="text-red-400 flex items-center p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out"
                                >
                                    <XCircleIcon className="h-7 w-7" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">Chưa có tiện ích nào</p>
                )}
            </div>
        );
    };



    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="bg-white rounded-xl shadow-lg w-full max-w-7xl">

                <div className="relative bg-blue-900 text-gray-100 py-4 px-6 rounded-t-xl shadow-lg">
                    {/* Background Image/Overlay */}
                    <div
                        className="absolute inset-0 opacity-20 bg-cover bg-center rounded-t-xl"
                        style={{
                            backgroundImage: 'url(https://unwinds.s3.ap-southeast-2.amazonaws.com/1732163006058_unitType.jpg)'
                        }}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                        <h3 className="text-2xl font-extrabold tracking-wider uppercase font-serif mb-2">
                            Cập nhật loại phòng
                        </h3>
                        <div className="mt-1">
                            <p className="text-lg font-medium italic text-blue-100">
                                Cập nhật thông tin chi tiết để hoàn thiện danh mục
                            </p>
                        </div>
                    </div>

                    {/* Decorative Bottom Arc */}
                    <div
                        className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-blue-900 to-transparent rounded-b-xl"
                    ></div>
                </div>

                <div className="max-h-[800px] overflow-auto p-2">
                    <div className="p-8 bg-white border-2 rounded-lg space-y-8">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-6 space-y-6">
                                <h4 className="text-2xl font-semibold text-gray-700 border-b pb-2">
                                    Thông tin cơ bản
                                </h4>
                                <div className="flex flex-col">
                                    <label className="font-medium text-gray-700 mb-1">Tên loại phòng *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="border-b bg-slate-100 rounded-lg p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all"

                                        onChange={handleOnchange}
                                        placeholder="Nhập tên loại phòng"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
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
                                    <div>
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
                                    <div className="flex flex-col col-span-2">
                                        <label className="font-semibold text-md mb-2">Mẫ phòng (nếu có):</label>
                                        <input
                                            type="text"
                                            name="buildingsOption"
                                            className="border-b bg-gray-100 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all rounded-lg"

                                            onChange={handleOnchange}

                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="col-span-6 space-y-4">
                                <h4 className="text-2xl font-semibold text-gray-700 border-b pb-2">
                                    Chi tiết loại phòng
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col col-span-2">
                                        <label className="font-medium text-gray-700 mb-1">Mô tả</label>
                                        <textarea
                                            rows={5}
                                            name="description"
                                            className="border-b bg-gray-100 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all rounded-lg"

                                            onChange={handleOnchange}
                                            placeholder="Mô tả chi tiết..."
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col col-span-2">
                                        <label className="font-semibold text-md mb-2">Hướng phòng:</label>
                                        <input
                                            type="text"
                                            name="view"
                                            className="border-b bg-gray-100 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all rounded-lg"

                                            onChange={handleOnchange}
                                            placeholder="Hướng phòng"
                                        />

                                    </div>
                                    <div className="flex flex-col col-span-2">
                                        <label className="font-semibold text-md mb-2">Diện tích:</label>
                                        <input
                                            type="text"
                                            name="area"
                                            className="border-b bg-gray-100 p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-all rounded-lg"

                                            onChange={handleOnchange}
                                            placeholder="Nhập diện tích phòng..."
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 px-6">
                            <h4 className="text-2xl text-center font-semibold text-gray-600 border-b pb-2">
                                Ảnh phòng
                            </h4>
                            <div className="space-y-2">
                                
                                {
                                    !unitType.photos && (<div className="flex justify-center items-center w-full">
                                        <label
                                            htmlFor="upload-room-images"
                                            className="w-full h-44 border-dashed border-4 border-gray-300 rounded-lg flex flex-col justify-center items-center cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-shadow hover:shadow-lg"
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
                                    </div>)
                                }

                                <div className="flex flex-col items-center">
                                    {unitType.photos && (

                                        <div className="relative w-3/4 h-64">
                                            <img
                                                src={unitType.photos}
                                                alt={`${unitType.title}`}
                                                className="object-cover w-full h-full rounded-lg shadow-md"
                                            />
                                            <button
                                                onClick={() => setUnitType({ ...unitType, photos: '' })} // Clears the image when clicked
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-transform duration-300"
                                            >
                                                <FaXmark size={16} />
                                            </button>
                                        </div>

                                    )}

                                </div>

                            </div>
                        </div>
                    </div>


                    <div className='border-2 py-4 mt-4 rounded-lg'>
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
                    </div>



                    <div className='grid grid-cols-2 gap-4 mt-4 p-6 border-2 py-4 rounded-lg'>
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
                                        className={`flex items-center text-gray-900 p-2 cursor-pointer border-2 rounded-full 
${unitType.kitchen === option ? 'border-blue-500 bg-gradient-to-r from-blue-200 to-purple-200 text-gray-600' : 'border-gray-300 bg-white'} 
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
                    <div className="py-6 px-8 bg-white border-2 mt-4 rounded-lg">
                        <h4 className="font-bold text-xl text-gray-800 mb-6">Tiện ích (Amenities)</h4>
                        <div className="flex flex-wrap gap-4 mb-8 items-center">
                            {/* Tên tiện ích */}
                            <input
                                type="text"
                                name="name"
                                className="flex-grow border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleAmenityChange}
                                value={amenity.name}
                                placeholder="Tên tiện ích"
                            />

                            {/* Chọn loại tiện ích */}
                            <select
                                name="type"
                                value={amenity.type}
                                onChange={handleAmenityChange}
                                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" disabled>Chọn loại tiện ích</option>
                                <option value="KITCHEN">Bếp</option>
                                <option value="ENTERTAINMENT">Giải trí</option>
                                <option value="FEATURES">Tiện nghi</option>
                                <option value="POLICY">Chính sách</option>
                            </select>

                            {/* Thêm tiện ích */}
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2"
                                onClick={handleAddAmenity}
                            >
                                Thêm
                                <FaPlus size={16} />
                            </button>
                        </div>

                        {/* Các nhóm tiện ích */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Kitchen */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h5 className="font-semibold text-lg text-blue-600 flex items-center gap-2">
                                    <FaUtensils /> Bếp
                                </h5>
                                {renderAmenitiesByType("KITCHEN")}
                            </div>

                            {/* Entertainment */}
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <h5 className="font-semibold text-lg text-purple-600 flex items-center gap-2">
                                    <FaGamepad /> Giải trí
                                </h5>
                                {renderAmenitiesByType("ENTERTAINMENT")}
                            </div>

                            {/* Features */}
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h5 className="font-semibold text-lg text-green-600 flex items-center gap-2">
                                    <FaCouch /> Tiện nghi
                                </h5>
                                {renderAmenitiesByType("FEATURES")}
                            </div>

                            {/* Policy */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h5 className="font-semibold text-lg text-yellow-600 flex items-center gap-2">
                                    <FaBook /> Chính sách
                                </h5>
                                {renderAmenitiesByType("POLICY")}
                            </div>
                        </div>
                    </div>



                    <div className="flex justify-end space-x-4 py-4 mb-2 px-8">
                        <button
                            className="flex items-center justify-center bg-gradient-to-r from-red-200 to-red-400 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"
                            onClick={onClose}
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-sky-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"
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
                            </>) : "Thêm"}
                        </button>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default CreateUnitTypeForUpdateModal