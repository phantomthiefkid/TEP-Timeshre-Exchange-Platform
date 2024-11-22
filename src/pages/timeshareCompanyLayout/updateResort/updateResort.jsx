import React, { useEffect, useState } from 'react';
import UpdateResortBasic from './updateResortBasic.jsx'
import UpdateResortAmenity from './updateResortAmenity.jsx';
import UpdateResortUnitType from './updateResortUnitType.jsx';
import { useParams } from 'react-router-dom';
import { getResortById } from '../../../service/tsCompanyService/tsCompanyAPI';
import { FaInfoCircle, FaHotel, FaBed } from 'react-icons/fa';
import { SparklesIcon } from '@heroicons/react/solid';
const UpdateResort = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('basic');
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
            {/* Resort Images Section */}
            <div className="flex gap-4 mb-8">
                <img
                    src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1732110520952_image1.jpg"
                    alt="Resort view 1"
                    className="w-1/3 h-60 object-cover shadow-lg"
                />
                <img
                    src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1732110521667_image2.jpg"
                    alt="Resort view 2"
                    className="w-1/3 h-60 object-cover shadow-lg"
                />
                <img
                    src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1732110521884_image3.jpg"
                    alt="Resort view 3"
                    className="w-1/3 h-60 object-cover shadow-lg"
                />
            </div>
            <div className="py-4 space-y-4">
                <h2 className="text-2xl font-extrabold text-sky-600 leading-tight">
                    <SparklesIcon className="inline-block mr-2 h-8 w-8 text-sky-500" />
                    Cập nhật thông tin một khu nghỉ dưỡng sang trọng với đầy đủ các tiện nghi và dịch vụ
                </h2>

                <span className="block text-lg text-gray-600 font-medium mt-4">
                    Chỉnh sửa các thông tin chi tiết về resort bao gồm <span className="text-blue-600 hover:text-blue-800">thông tin cơ bản</span>,
                    <span className="text-blue-600 hover:text-blue-800"> tiện ích nổi bật</span>, và <span className="text-blue-600 hover:text-blue-800">các loại phòng</span> để đáp ứng nhu cầu của khách hàng.
                </span>
            </div>



            <div className="w-full flex justify-center">
                <ul className="flex space-x-2 w-3/4 text-lg font-semibold rounded-lg shadow-lg bg-gray-50 p-2">
                    <li className="flex-grow">
                        <button
                            onClick={() => handleTabChange('basic')}
                            className={`py-3 h-16 w-full rounded-md transition duration-300 flex items-center justify-center gap-2
          ${activeTab === 'basic'
                                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg'
                                    : 'bg-white text-gray-500 hover:bg-gray-200 shadow-md'}`}
                        >
                            <FaInfoCircle className={`text-2xl ${activeTab === 'basic' ? 'text-gray-300' : 'text-gray-400'}`} />
                            <span>Thông tin cơ bản</span>
                        </button>
                    </li>
                    <li className="flex-grow">
                        <button
                            onClick={() => handleTabChange('amenities')}
                            className={`py-3 h-16 w-full rounded-md transition duration-300 flex items-center justify-center gap-2
          ${activeTab === 'amenities'
                                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg'
                                    : 'bg-white text-gray-500 hover:bg-gray-200 shadow-md'}`}
                        >
                            <FaHotel className={`text-2xl ${activeTab === 'amenities' ? 'text-green-300' : 'text-gray-400'}`} />
                            <span>Tiện ích khách sạn</span>
                        </button>
                    </li>
                    <li className="flex-grow">
                        <button
                            onClick={() => handleTabChange('unitType')}
                            className={`py-3 h-16 w-full rounded-md transition duration-300 flex items-center justify-center gap-2
          ${activeTab === 'unitType'
                                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg'
                                    : 'bg-white text-gray-500 hover:bg-gray-200 shadow-md'}`}
                        >
                            <FaBed className={`text-2xl ${activeTab === 'unitType' ? 'text-purple-300' : 'text-gray-400'}`} />
                            <span>Loại phòng</span>
                        </button>
                    </li>
                </ul>
            </div>




            <div className='mb-20 py-6'>
                {activeTab === 'basic' && <UpdateResortBasic />}
                {activeTab === 'amenities' && <UpdateResortAmenity />}
                {activeTab === 'unitType' && <UpdateResortUnitType unitType={unitType} flag={autoSetFlag} />}
            </div>
        </div>
    );
};

export default UpdateResort;
