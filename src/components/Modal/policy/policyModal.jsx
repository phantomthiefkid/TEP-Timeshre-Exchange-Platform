import React, { useState, useEffect } from 'react';
import { FaQuestionCircle, FaRegFile, FaSave, FaTimes } from "react-icons/fa";

const PolicyModal = ({ isOpen, onClose, selected, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (selected) {
            setTitle(selected.title);
            setDescription(selected.description);
        }
    }, [selected]);

    if (!isOpen) return null; // Nếu modal không mở thì không hiển thị gì

    // onChange handler for title
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // onChange handler for description
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Create the updated FAQ object
        const updatedFaq = {
            policyId: selected.policyId,  // assuming `selected` has an `id` property
            title,
            description,
            type: "general"
        };

        // Send the updated FAQ data to the parent component
        onUpdate(updatedFaq);
        onClose(); // Close the modal after saving
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-2/5">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-center items-center space-x-4">
                        <img src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1733226321176_logoTEPblack.png" alt="System Logo" className="w-40 object-cover" />
                    </div>

                    <button
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                        onClick={onClose}
                    >
                        ✖
                    </button>
                </div>

                {/* Modal Body */}
                <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                            <FaRegFile className="mr-2 text-gray-600" /> Chính sách
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleTitleChange} // Handle title change
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleDescriptionChange} // Handle description change
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                            rows="7"
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                            onClick={onClose}
                        >
                            <FaTimes className="mr-2" /> Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        >
                            <FaSave className="mr-2" /> Lưu
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default PolicyModal;
