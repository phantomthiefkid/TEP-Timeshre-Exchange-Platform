import React, { useState } from 'react';
import UpdateResortBasic from './UpdateResortBasic';
import UpdateResortAmenity from './UpdateResortAmenity';
import UpdateResortUnitType from './UpdateResortUnitType';

const UpdateResort = () => {
    const [activeTab, setActiveTab] = useState('basic'); // Default tab

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="w-full p-10 bg-white">
            <h2 className="text-3xl text-gray-800 font-bold mb-6">Chỉnh sửa thông tin Resort</h2>

            <div className="">
                <ul className="flex space-x-1 w-1/2 text-xl font-semibold">
                    <li className="flex-grow">
                        <button
                            onClick={() => handleTabChange('basic')}
                            className={`py-3 h-16 w-full border-gray-300 transition duration-300 
          ${activeTab === 'basic' ? 'bg-custom-blue-hover-sidebar text-white' : 'bg-gray-400 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Thông tin cơ bản
                        </button>
                    </li>
                    <li className="flex-grow">
                        <button
                            onClick={() => handleTabChange('amenities')}
                            className={`py-3 h-16 w-full border-gray-300 transition duration-300 
          ${activeTab === 'amenities' ? 'bg-custom-blue-hover-sidebar text-white' : 'bg-gray-400 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Tiện ích
                        </button>
                    </li>
                    <li className="flex-grow">
                        <button
                            onClick={() => handleTabChange('unitType')}
                            className={`py-3 h-16 w-full border-gray-300 transition duration-300 
          ${activeTab === 'unitType' ? 'bg-custom-blue-hover-sidebar text-white' : 'bg-gray-400 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Loại phòng
                        </button>
                    </li>
                </ul>
            </div>


            <div>
                {activeTab === 'basic' && <UpdateResortBasic />}
                {activeTab === 'amenities' && <UpdateResortAmenity />}
                {activeTab === 'unitType' && <UpdateResortUnitType />}
            </div>
        </div>
    );
};

export default UpdateResort;
