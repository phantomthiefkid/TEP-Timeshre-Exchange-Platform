import React, { useEffect, useState } from 'react';
import UpdateResortBasic from './UpdateResortBasic';
import UpdateResortAmenity from './UpdateResortAmenity';
import UpdateResortUnitType from './UpdateResortUnitType';
import { useParams } from 'react-router-dom';
import { getResortById } from '../../../service/tsCompanyService/tsCompanyAPI';

const UpdateResort = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('basic'); // Default tab
    const [resort, setResort] = useState({})
    const [unitType, setUnitType] = useState([])
    const [flag, setFlag] = useState(false);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const getDetailResort = async () => {
        let data = await getResortById(id);
        if (data.status === 200) {
            setResort(data.data)
            setUnitType(data.data.unitTypeDtoList)
            console.log(data.data.unitTypeDtoList)
        }
    }
    useEffect(() => {
        getDetailResort()
    }, [id, flag])
    const autoSetFlag = () => {
        setFlag(!flag)
    }
    return (
        <div className="w-full p-10 bg-white">
            <h2 className="text-3xl text-gray-800 font-bold mb-6">Chỉnh sửa thông tin Resort</h2>

            <div className="">
                <ul className="flex space-x-1 w-1/2 text-xl font-semibold">
                    <li className="flex-grow">
                        <button
                            onClick={() => handleTabChange('basic')}
                            className={`py-3 h-16 w-full border-gray-300 transition duration-300 
          ${activeTab === 'basic' ? 'bg-custom-blue-hover-sidebar text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Thông tin cơ bản
                        </button>
                    </li>
                    <li className="flex-grow">
                        <button
                            onClick={() => handleTabChange('amenities')}
                            className={`py-3 h-16 w-full border-gray-300 transition duration-300 
          ${activeTab === 'amenities' ? 'bg-custom-blue-hover-sidebar text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Tiện ích khách sạn
                        </button>
                    </li>
                    <li className="flex-grow">
                        <button
                            onClick={() => handleTabChange('unitType')}
                            className={`py-3 h-16 w-full border-gray-300 transition duration-300 
          ${activeTab === 'unitType' ? 'bg-custom-blue-hover-sidebar text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Loại phòng
                        </button>
                    </li>
                </ul>
            </div>


            <div className='mb-20'>
                {activeTab === 'basic' && <UpdateResortBasic />}
                {activeTab === 'amenities' && <UpdateResortAmenity />}
                {activeTab === 'unitType' && <UpdateResortUnitType unitType={unitType} flag={autoSetFlag}/>}
            </div>
        </div>
    );
};

export default UpdateResort;
