import React from 'react';

const ViewImageModal = ({ imageSrc, isOpen, onClose }) => {
  if (!isOpen) return null;  // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-4xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        
        {/* Image */}
        <img
          src={imageSrc}
          alt="Large view"
          className="max-w-[80vw] max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );
};

export default ViewImageModal;
