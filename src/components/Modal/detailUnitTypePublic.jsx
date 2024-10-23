import { XIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { getDetailUnitType } from '../../service/public/resortService/resortAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import CSS của Swiper
import resorts from '../../util/ResortData';

const DetailUnitTypeModal = ({ selectedId, onClose }) => {
    const [unitType, setUnitType] = useState({});
    const [selectedImage, setSelectedImage] = useState(''); // Ảnh đang hiển thị
    const [arrImg, setArrImg] = useState([]);

    const getUnitTypeDetailById = async () => {
        let data = await getDetailUnitType(selectedId);
        if (data.status === 200) {
            setUnitType(data.data);
            // Set ảnh chính là ảnh đầu tiên trong danh sách (nếu có)
            if (data.data.photos && data.data.photos.length > 0) {
                setSelectedImage(data.data.photos[0]);
            }
        }
    };

    useEffect(() => {
        getUnitTypeDetailById();
        setArrImg(resorts);
        if (resorts.length > 0) {
            setSelectedImage(resorts[0].img);
        }
    }, [selectedId]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Nền mờ */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

            {/* Nội dung modal */}
            <div className="relative bg-white rounded-lg shadow-lg p-2 w-full max-w-4xl z-50">
                {/* Icon "X" đóng modal */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                >
                    <XIcon className="h-6 w-6" />
                </button>

                {/* Nội dung chính: Ảnh trên cùng và thông tin bên dưới */}
                <div className="flex flex-col space-y-2">
                    {/* Ảnh chính */}
                    <div>

                        <img
                            src={selectedImage}
                            alt="Room"
                            className="w-full h-80 object-cover mb-4"
                        />

                        {/* Swiper cho các ảnh phụ */}

                        <Swiper spaceBetween={10} slidesPerView={4}>
                            {arrImg &&
                                arrImg.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={image.img}
                                            alt="Sub Image"
                                            className="w-full h-24 object-cover cursor-pointer"
                                            onClick={() => setSelectedImage(image.img)}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>

                    </div>

                    {/* Thông tin chi tiết */}
                    <div className="p-6 bg-white shadow-md rounded-lg max-h-[45vh] overflow-y-auto">
                        {/* Tiêu đề */}
                        <h3 className="font-bold text-2xl mb-3 text-center text-blue-600">Chi tiết loại phòng</h3>

                        {/* Mô tả */}
                        <p className="text-gray-600 italic mb-6 text-center">
                            {unitType.description || 'Không có mô tả'}
                        </p>

                        <hr className="border-gray-300 mb-6" />

                        {/* Thông tin chi tiết */}
                        <div className="grid grid-cols-2 gap-4 text-gray-800">
                            {/* Loại phòng */}
                            <div>
                                <p className="text-lg font-semibold mb-1">
                                    <strong>Loại phòng:</strong> <span className="font-normal">{unitType.title || 'N/A'}</span>
                                </p>
                                <p className="text-lg font-semibold mb-1">
                                    <strong>Số người:</strong> <span className="font-normal">{unitType.sleeps || 'N/A'}</span>
                                </p>
                                <p className="text-lg font-semibold mb-1">
                                    <strong>Nhà bếp:</strong> <span className="font-normal">{unitType.kitchen || 'Không có thông tin'}</span>
                                </p>
                                <p className="text-lg font-semibold mb-1">
                                    <strong>Phòng tắm:</strong> <span className="font-normal">{unitType.bathrooms || 'N/A'} phòng tắm</span>
                                </p>
                                <p className="text-lg font-semibold mb-1">
                                    <strong>Giá:</strong> <span className="font-normal">{unitType.price ? `${unitType.price.toLocaleString()} VND` : 'N/A'}</span>
                                </p>
                            </div>

                            {/* Loại giường */}
                            <div className='grid grid-cols-2'>
                                <p className="text-lg font-semibold">
                                    <strong>King bed:</strong> <span className="font-normal">{unitType.bedsKing || 'N/A'}</span>
                                </p>
                                <p className="text-lg font-semibold">
                                    <strong>Full bed:</strong> <span className="font-normal">{unitType.bedsFull || 'N/A'}</span>
                                </p>
                                <p className="text-lg font-semibold">
                                    <strong>Sofa bed:</strong> <span className="font-normal">{unitType.bedsSofa || 'N/A'}</span>
                                </p>
                                <p className="text-lg font-semibold">
                                    <strong>Murphy bed:</strong> <span className="font-normal">{unitType.bedsMurphy || 'N/A'}</span>
                                </p>
                                <p className="text-lg font-semibold">
                                    <strong>Twin bed:</strong> <span className="font-normal">{unitType.bedsTwin || 'N/A'}</span>
                                </p>
                            </div>
                        </div>

                        {/* Tiện nghi */}
                        <div className="mt-4">
                            <h4 className="font-bold text-xl mb-3 text-blue-600">Tiện nghi:</h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {unitType.unitTypeAmenitiesDTOS && unitType.unitTypeAmenitiesDTOS.length > 0 ? (
                                    unitType.unitTypeAmenitiesDTOS.map((amenity, index) => (
                                        <li key={index} className="text-md">
                                            <strong>{amenity.name}:</strong> {amenity.type}
                                        </li>
                                    ))
                                ) : (
                                    <li>Không có tiện nghi được liệt kê</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailUnitTypeModal;
