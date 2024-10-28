import React, { useEffect, useState } from 'react';
import { getRentalPostingById } from '../../../service/systemStaffService/systemStaffAPI';

const DetailRentalList = ({ onClose, selected }) => {
    const [rentailPosting, setRentailPosting] = useState();

    const fetchRentalPosting = async () => {
        try {
            let data = await getRentalPostingById(selected);
            if (data.status === 200) {
                setRentailPosting(data.data)
            }
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchRentalPosting()
    }, [selected])


    const handleClickOutside = (event) => {
        if (event.target.id === 'popup-overlay') {
            onClose();
        }
    };

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [onClose]);

    return (
        <div
            id="popup-overlay"
            className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center"
            onClick={handleClickOutside}
        >
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl relative p-8 md:p-12">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="text-left mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Thông tin bài đăng</h2>
                    <p className="text-gray-500 text-sm">Các thông tin chi tiết về bài đăng</p>
                </div>

                {/* Resort Image and Name */}
                <div className="flex mb-6">
                    <img
                        className="w-72 rounded-lg mr-6"
                        src="https://cf2.bstatic.com/xdata/images/hotel/max1024x768/347378548.jpg?k=0909e2e51d15ca947d2a52917ecccdb4808f5433e37748046aefb2ddead1fec8&o=&hp=1"
                        alt="Resort"
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700">{rentailPosting.resortName}</h3>
                        <p className="text-gray-500 mt-2">{rentailPosting.resortDescription || 'No description available.'}</p>
                    </div>
                </div>

                {/* Rental Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div><strong>Room Code:</strong> {rentailPosting.roomCode}</div>
                    <div><strong>Owner Name:</strong> {rentailPosting.ownerName}</div>
                    <div><strong>Check-in Date:</strong> {rentailPosting.checkinDate}</div>
                    <div><strong>Check-out Date:</strong> {rentailPosting.checkoutDate}</div>
                    <div><strong>Total Price:</strong> ${rentailPosting.totalPrice} (at ${rentailPosting.pricePerNights}/night)</div>
                </div>

                {/* Room Amenities */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Room Amenities</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        {rentailPosting.roomAmenities && rentailPosting.roomAmenities.length > 0 ? (
                            rentailPosting.roomAmenities.map((amenity, index) => (
                                <li key={index} className="capitalize">
                                    {amenity.name} ({amenity.type || 'General'})
                                </li>
                            ))
                        ) : (
                            <li>No room amenities available.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>


    );
};

export default DetailRentalList;
