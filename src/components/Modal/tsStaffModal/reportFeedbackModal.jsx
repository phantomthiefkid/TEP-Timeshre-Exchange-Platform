import React, { useState } from 'react';
import logo from "../../../assets/logoTEPblack.png"
const ReportFeedbackModal = ({ selected, onClose, onSubmit }) => {
    const [note, setNote] = useState("");

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(selected, note)
        onClose();
    };

    const handleOutsideClick = (e) => {
        // Close modal if click occurs outside the modal content
        if (e.target.id === 'modal-background') {
            onClose();
        }
    };

    return (
        <div
            id="modal-background"
            onClick={handleOutsideClick}
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
        >
            <div
                className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    &#x2715;
                </button>


                <div className="flex justify-center mb-2">
                    <img
                        src={logo}
                        alt="System Logo"
                        className="h-16 w-auto"
                    />
                </div>

                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Báo cáo phản hồi</h2>
                <p className="text-gray-600 mb-6">
                    Vui lòng nhập nội dung báo cáo của bạn dưới đây.
                </p>

                <div>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none h-44"
                        placeholder="Nhập nội dung báo cáo..."
                        value={note}
                        onChange={handleNoteChange}
                    ></textarea>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-gradient-to-r text-center w-full from-red-400 to-red-600 border text-gray-560 py-2 px-8 shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:from-red-500 hover:to-red-300 text-white focus:outline-none"
                        onClick={handleSubmit}
                        disabled={!note.trim()}
                    >
                        Gửi báo cáo
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ReportFeedbackModal;
