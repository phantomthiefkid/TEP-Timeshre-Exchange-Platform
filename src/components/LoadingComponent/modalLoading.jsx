import React from 'react';
import { DNA } from 'react-loader-spinner';

const ModalLoading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <DNA 
          visible={true} 
          height="80" 
          width="80" 
          ariaLabel="dna-loading" 
          wrapperClass="dna-wrapper" 
        />
        <p className="mt-4 text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default ModalLoading;
