import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Background overlay */}
    <div
      className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
      onClick={onClose}
    ></div>
  
    {/* Modal content */}
    <div className="bg-white p-8 rounded-2xl shadow-2xl transform transition-transform duration-300 scale-100 max-w-md w-full">
      {/* Modal header */}
      <div className="text-center">
        <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 9v2m0 4v2m0-6V7m0 0a5 5 0 110 10 5 5 0 010-10z"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-gray-800">
          {message || "Are you sure?"}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {isLoading
            ? "Processing your request, please wait..."
            : "This action cannot be undone. Please confirm to proceed."}
        </p>
      </div>
  
      {/* Spinner */}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
  
      {/* Action buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={onClose}
          className="px-5 py-2 text-sm bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full transition disabled:opacity-50"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-5 py-2 text-sm bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-full transition disabled:opacity-50"
          disabled={isLoading}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
  );
};

export default ConfirmModal;
