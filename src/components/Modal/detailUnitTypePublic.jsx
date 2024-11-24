import { XIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { getDetailUnitType } from '../../service/public/resortService/resortAPI';
import { FaBed, FaUsers, FaUtensils, FaBath, FaMoneyBillWave } from "react-icons/fa";

const DetailUnitTypeModal = ({ selectedId, onClose }) => {
    const [unitType, setUnitType] = useState({});
    const [selectedImage, setSelectedImage] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu

    const getUnitTypeDetailById = async () => {
        setIsLoading(true); // Bắt đầu tải dữ liệu
        try {
            const data = await getDetailUnitType(selectedId);
            if (data.status === 200) {
                setUnitType(data.data);
                setSelectedImage(data.data.photos);
            }
        } catch (error) {
            console.error("Failed to fetch unit type details", error);
        } finally {
            setIsLoading(false); // Kết thúc tải dữ liệu
        }
    };

    useEffect(() => {
        getUnitTypeDetailById();
    }, [selectedId]);

    const renderAmenitiesByType = (type) => {
        const filteredAmenities = unitType?.unitTypeAmenitiesDTOS?.filter(
            (amenity) => amenity.type === type && amenity.isActive
        ) || [];

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAmenities.length > 0 ? (
                    filteredAmenities.map((amenity, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white relative"
                        >
                            <div className="w-2 h-2 bg-gray-800 rounded-full absolute left-2 top-1/2 transform -translate-y-1/2"></div>
                            <div className="pl-6">
                                <h5 className="text-base font-normal text-gray-800">{amenity.name}</h5>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 italic">
                        Không có tiện nghi được liệt kê
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Nền mờ */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

            {/* Nội dung modal */}
            <div className="relative bg-white shadow-lg p-2 w-full max-w-4xl z-50">
                {/* Icon "X" đóng modal */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                >
                    <XIcon className="h-6 w-6" />
                </button>

                {isLoading ? (
                    // Spinner khi đang tải dữ liệu
                    <div className="flex justify-center items-center h-80">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>
                ) : (
                    // Nội dung chi tiết loại phòng
                    <div className="flex flex-col space-y-2">
                        {/* Ảnh chính */}
                        <div>
                            <img
                                src={selectedImage}
                                alt="Room"
                                className="w-full h-80 object-cover mb-4"
                            />
                        </div>

                        {/* Thông tin chi tiết */}
                        <div className="p-6 bg-white shadow-md rounded-lg max-h-[45vh] overflow-y-auto">
                            {/* Tiêu đề */}
                            <h3 className="font-bold text-2xl mb-3 text-center text-blue-600 flex justify-center items-center gap-2"> <FaBed size={30} className="text-blue-500 " />{unitType.title || 'N/A'}</h3>
                            <p className="text-gray-600 italic mb-6 text-center">
                                {unitType.description || 'Không có mô tả'}
                            </p>
                            <hr className="border-gray-300 border-2 mb-6 m-6" />
                            <div className="grid grid-cols-2 gap-4 text-gray-800 ">
                                <div>
                                    
                                    <p className="text-lg font-light mb-1 flex items-center gap-2">
                                        <FaUsers className="text-gray-500 text-xl" />
                                        <strong>Số người:</strong> <span className="font-normal">{unitType.sleeps || '0'}</span>
                                    </p>
                                    <p className="text-lg font-light mb-1 flex items-center gap-2">
                                        <FaUtensils className="text-gray-500 text-xl" />
                                        <strong>Nhà bếp:</strong> <span className="font-normal">{unitType.kitchen || 'Không có thông tin'}</span>
                                    </p>
                                    <p className="text-lg font-light mb-1 flex items-center gap-2">
                                        <FaBath className="text-gray-500 text-xl" />
                                        <strong>Phòng tắm:</strong> <span className="font-normal">{unitType.bathrooms || '0'} phòng tắm</span>
                                    </p>
                                    <p className="text-lg font-light mb-1 flex items-center gap-2">
                                        <FaMoneyBillWave className="text-gray-500 text-xl" />
                                        <strong>Giá:</strong> <span className="font-normal">{unitType.price ? `${unitType.price.toLocaleString()} VND` : '0'}</span>
                                    </p>
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <p className="text-lg font-light">
                                        <strong>King bed:</strong> <span className="font-normal">{unitType.bedsKing || '0'}</span>
                                    </p>
                                    <p className="text-lg font-light">
                                        <strong>Full bed:</strong> <span className="font-normal">{unitType.bedsFull || '0'}</span>
                                    </p>
                                    <p className="text-lg font-light">
                                        <strong>Sofa bed:</strong> <span className="font-normal">{unitType.bedsSofa || '0'}</span>
                                    </p>
                                    <p className="text-lg font-light">
                                        <strong>Murphy bed:</strong> <span className="font-normal">{unitType.bedsMurphy || '0'}</span>
                                    </p>
                                    <p className="text-lg font-light">
                                        <strong>Twin bed:</strong> <span className="font-normal">{unitType.bedsTwin || '0'}</span>
                                    </p>
                                </div>
                            </div>
                            <hr className="border-gray-300 border-2 mb-6 m-6" />
                           
                            <div className="mt-4">
                                <h4 className="font-bold text-xl mb-3 text-gray-600">Tiện nghi:</h4>

                                {/* Tiện nghi KITCHEN */}
                                <div>
                                    <h5 className="font-semibold text-lg text-gray-500">Bếp:</h5>
                                    {renderAmenitiesByType("KITCHEN")}
                                </div>

                                {/* Tiện nghi ENTERTAINMENT */}
                                <div>
                                    <h5 className="font-semibold text-lg text-gray-500">Giải trí:</h5>
                                    {renderAmenitiesByType("ENTERTAINMENT")}
                                </div>

                                {/* Tiện nghi FEATURES */}
                                <div>
                                    <h5 className="font-semibold text-lg text-gray-500">Tiện nghi:</h5>
                                    {renderAmenitiesByType("FEATURES")}
                                </div>

                                {/* Tiện nghi POLICY */}
                                <div>
                                    <h5 className="font-semibold text-lg text-gray-500">Chính sách:</h5>
                                    {renderAmenitiesByType("POLICY")}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailUnitTypeModal;
