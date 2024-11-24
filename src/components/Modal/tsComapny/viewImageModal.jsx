import React from 'react';
import { FaXmark } from 'react-icons/fa6';

const ViewImageModal = ({ imageSrc, isOpen, onClose }) => {
  if (!isOpen) return null;  // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg relative">
        {/* Close Button */}

        {/* Image */}
        <img
          src={imageSrc}
          alt="Large view"
          className="max-w-[80vw] max-h-[80vh] object-contain "
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-4xl text-gray-500 hover:text-gray-700"
        >
          <FaXmark color='#E3463F'/>
        </button>
      </div>


    </div>
  );
};

export default ViewImageModal;
