import React, { useState } from 'react';
import { PlusIcon, XIcon } from '@heroicons/react/solid';
import UnitTypeModal from '../../../components/Modal/unitTypeModal';

const Test = () => {
    const [roomTypes, setRoomTypes] = useState([]); // State to store room types
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    // Handle adding a new room type from modal
    const handleAddRoomType = (newRoomType) => {
        setRoomTypes([...roomTypes, newRoomType]); // Add new room type (object) to the list
        setIsModalOpen(false); // Close modal after adding
    };

    // Handle deleting a room type
    const handleDeleteRoomType = (indexToDelete) => {
        setRoomTypes(roomTypes.filter((_, index) => index !== indexToDelete)); // Remove room type by index
    };

    return (
        <div className="p-16">
            <div className="p-8 px-8 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Loại phòng</h2>

                {/* Room Types Grid */}
                <div className="grid grid-cols-4 gap-4 p-4">
                    {roomTypes.map((room, index) => (
                        <div
                            key={index}
                            className="relative p-4 border-2 h-24 shadow-sm hover:shadow-md rounded-md text-center flex justify-center items-center"
                        >
                            <span>{room.title}</span> {/* Display the title of the room */}

                            {/* Delete Button (X icon) */}
                            <button
                                onClick={() => handleDeleteRoomType(index)} // Handle deleting room type
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                <XIcon className="h-4 w-4" />
                            </button>
                        </div>
                    ))}

                    {/* Add Room Type Button */}
                    <button
                        className="flex items-center justify-center p-4 border text-black rounded-lg"
                        onClick={() => setIsModalOpen(true)} // Open modal on click
                    >
                        <PlusIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Room Type Modal */}
                <UnitTypeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)} // Close modal
                    onAddRoomType={handleAddRoomType} // Add the room type when form is submitted
                />
            </div>
        </div>
    );
};

export default Test;
