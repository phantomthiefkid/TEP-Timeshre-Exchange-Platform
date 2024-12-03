import React, { useState } from 'react';
import { FaQuestion, FaSave, FaTimes } from 'react-icons/fa';

const AddFaqModal = ({ isOpen, onClose, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({ title: false, description: false });

    if (!isOpen) return null;

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setErrors((prev) => ({ ...prev, title: value.trim() === '' }));
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setDescription(value);
        setErrors((prev) => ({ ...prev, description: value.trim() === '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate again on submit
        const isTitleValid = title.trim() !== '';
        const isDescriptionValid = description.trim() !== '';

        if (!isTitleValid || !isDescriptionValid) {
            setErrors({
                title: !isTitleValid,
                description: !isDescriptionValid,
            });
            return;
        }

        const newQuestion = {
            title: title,
            description: description,
            type: "general"
        }

        onUpdate(newQuestion);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-2/5">
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
                <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                            <FaQuestion className="mr-2 text-gray-600" /> Câu hỏi
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleTitleChange}
                            className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none ${
                                errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                            required
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500 mt-1">Câu hỏi không được để trống.</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={handleDescriptionChange}
                            className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none ${
                                errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                            rows="7"
                            required
                        ></textarea>
                        {errors.description && (
                            <p className="text-sm text-red-500 mt-1">Câu hỏi không được để trống.</p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            className="flex items-center px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                            onClick={onClose}
                        >
                            <FaTimes className="mr-2" /> Hủy
                        </button>
                        <button
                            type="submit"
                            className={`flex items-center px-6 py-2 text-white rounded-full ${
                                title.trim() && description.trim()
                                    ? 'bg-blue-500 hover:bg-blue-600'
                                    : 'bg-gray-300 cursor-not-allowed'
                            }`}
                            disabled={!title.trim() || !description.trim()}
                        >
                            <FaSave className="mr-2" /> Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFaqModal