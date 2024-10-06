import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { XIcon } from '@heroicons/react/solid';
const FilterModal = ({ isOpen, onClose }) => {
    const [priceRange, setPriceRange] = useState([500000, 10000000]); // Giá trị mặc định
    const [rating, setRating] = useState('all'); // Giá trị mặc định cho đánh giá
    const [amenities, setAmenities] = useState([]); // Danh sách tiện ích đã chọn

    // Hàm xử lý khi thay đổi giá trị thanh kéo
    const handleSliderChange = (newRange) => {
        setPriceRange(newRange);
    };

    // Hàm xử lý khi chọn đánh giá
    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    // Hàm xử lý khi chọn tiện ích
    const handleAmenitiesChange = (e) => {
        const value = e.target.value;
        setAmenities((prev) => {
            if (prev.includes(value)) {
                return prev.filter((amenity) => amenity !== value); // Bỏ chọn tiện ích
            } else {
                return [...prev, value]; // Thêm tiện ích vào danh sách
            }
        });
    };

    if (!isOpen) return null; // Nếu popup không mở, không hiển thị gì

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold mb-4">Bộ lọc</h2>
                    <button onClick={onClose}><XIcon className='w-8' color='gray'/></button>

                </div>

                {/* Phần khoảng giá */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-bold text-xl">Khoản giá</label>
                    <div className="mb-6">
                        <Slider
                            range
                            min={500000}
                            max={10000000}
                            value={priceRange}
                            onChange={handleSliderChange}
                            trackStyle={[{ backgroundColor: '#0099FF' }]}
                            handleStyle={[
                                { borderColor: 'gray' },
                                { borderColor: 'gray' },
                            ]}
                            railStyle={{ backgroundColor: 'lightgray' }}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                            <label className="text-gray-500 font-semibold">Giá tối thiểu</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    name="min"
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                                    className="border rounded px-2 py-1 w-48"
                                    min="500000"
                                    max={priceRange[1] - 1}
                                />
                                <span className="text-gray-700 font-bold">VND</span>
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-500 font-semibold">Giá tối đa</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    name="max"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                                    className="border rounded px-2 py-1 w-48"
                                    min={priceRange[0] + 1}
                                    max="10000000"
                                />
                                <span className="text-gray-700 font-bold">VND</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phần chọn đánh giá */}
                <label className="block text-gray-700 mb-2 font-bold text-xl">Đánh giá</label>
                <div className="flex flex-col mb-4 space-y-4">
                    {['all', '4.5', '4', '3.5'].map((value) => (
                        <label key={value} className="flex items-center mb-2 cursor-pointer">
                            <input
                                type="radio"
                                value={value}
                                checked={rating === value}
                                onChange={handleRatingChange}
                                className="hidden"
                            />
                            <span className={`flex items-center justify-center w-6 h-6 border-2 
                                ${rating === value ? 'bg-blue-500 border-transparent' : 'border-gray-300'} 
                                mr-2 transition-colors duration-200 ease-in-out 
                                hover:bg-blue-100 rounded-full`}>
                            </span>
                            {value === 'all' ? 'Tất cả' : `${value} trở lên`}
                        </label>
                    ))}
                </div>

                {/* Phần chọn tiện ích */}
                <label className="block text-gray-700 mb-2 font-bold text-xl">Tiện ích</label>
                <div className="flex flex-col">
                    {['wifi', 'pool', 'parking', 'gym'].map((amenity) => (
                        <label key={amenity} className="flex items-center mb-4 cursor-pointer transition-colors duration-200 hover:bg-gray-100 p-2 rounded">
                            <input
                                type="checkbox"
                                value={amenity}
                                checked={amenities.includes(amenity)}
                                onChange={handleAmenitiesChange}
                                className="hidden peer" // Ẩn checkbox
                            />
                            <span className="w-6 h-6 flex items-center justify-center border-2 
                border-gray-300 rounded-md mr-2 peer-checked:bg-blue-500 
                peer-checked:border-transparent transition-colors duration-200">
                                {amenities.includes(amenity) && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </span>
                            {amenity.charAt(0).toUpperCase() + amenity.slice(1)} {/* Chữ cái đầu tiên in hoa */}
                        </label>
                    ))}
                </div>


                {/* Nút đóng popup */}
                <div className='flex justify-end gap-6'>
                    <button
                        className="w-32 bg-white border border-blue-400 text-blue-400 py-2 rounded-xl mt-4"
                    >
                        Đặt lại
                    </button>
                    <button
                        className="w-32 bg-blue-500 text-white py-2 rounded-xl mt-4"
                    >
                        Áp dụng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
