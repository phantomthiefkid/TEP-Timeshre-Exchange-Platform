import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getResortById, updateResortBasic } from '../../../service/tsCompanyService/tsCompanyAPI';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/solid'; // Make sure you import the icons
import { toast, Toaster } from 'react-hot-toast';
import Loading from '../../../components/LoadingComponent/loading';
import SpinnerWaiting from '../../../components/LoadingComponent/spinnerWaiting';
import { FaArrowRight, FaSave } from 'react-icons/fa';

const UpdateResortAmenity = () => {
  const { id } = useParams();
  const [resort, setResort] = useState({
    resortName: '',
    logo: '',
    minPrice: 0,
    maxPrice: 0,
    status: '',
    address: '',
    timeshareCompanyId: 0,
    description: '',
    resortAmenityList: []
  });
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const [onSiteFeature, setOnSiteFeature] = useState('');
  const [nearbyAttraction, setNearbyAttraction] = useState('');
  const [policy, setPolicy] = useState('');

  const getResortDetail = async () => {
    const data = await getResortById(id);
    if (data.status === 200) {
      const newResort = data.data;
      setResort(newResort);
      setAmenities(newResort.resortAmenityList); // Initialize amenities from resort data
      setLoading(false);
    }
  };

  useEffect(() => {
    getResortDetail();
  }, [id, flag]);

  const handleAddAmenity = (name, type) => {
    if (name) {
      setAmenities((prev) => [...prev, { name, type }]);
      if (type === '1') setOnSiteFeature('');
      if (type === '2') setNearbyAttraction('');
      if (type === '3') setPolicy('');
    }
  };

  const handleRemoveAmenity = (name) => {
    setAmenities((prev) => prev.filter((amenity) => amenity.name !== name));
  };

  const renderAmenitiesByType = (type) => {
    return amenities
      .filter((amenity) => amenity.type === type)
      .map((amenity) => (
        <div key={amenity.name} className="relative flex justify-center items-center rounded-full border  mt-2 p-2 transition-colors duration-200 ease-in-out hover:border-sky-500 focus-within:border-sky-500">
          <span className="text-sky-500 font-normal">{amenity.name}</span>
          <button
            type="button"
            onClick={() => handleRemoveAmenity(amenity.name)}
            className="absolute right-0 text-red-400 flex items-center p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out"
          >
            <XCircleIcon className="h-7 w-7" />
          </button>
        </div>
      ));
  };

  const handleSubmit = async () => {

    const updatedResort = {
      resortName: resort.resortName,
      logo: resort.logo,
      minPrice: resort.minPrice,
      maxPrice: resort.maxPrice, // Assuming you have a way to update this
      status: resort.status, // Assuming you have a way to update this
      address: resort.address, // Assuming you have a way to update this
      timeshareCompanyId: resort.timeshareCompanyId, // Assuming you have a way to update this
      description: resort.description,
      resortAmenityList: amenities
    };

    try {
      await updateResortBasic(updatedResort, id).then(() => {
        toast.success("Cập nhật thành công!!!", { duration: 3000 })
      })
    } catch (error) {
      toast.error("Cập nhật thất bại! Vui lòng thử lại.", { duration: 3000 });
    }

  };

  if (loading) {
    return (<SpinnerWaiting />)
  }
  return (
    <div className='border rounded shadow-md bg-white p-6'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='grid grid-rows-3 gap-6'>

        {/* On-Site Features and Amenities */}
        <div className='border-b pb-4 p-4 py-6'>
          <h2 className='text-xl font-semibold mb-3 text-gray-800'>Các tính năng và tiện nghi tại chỗ</h2>
          <div className='grid grid-cols-6 gap-4 px-6'>
            {renderAmenitiesByType('1')}
            <div className="col-span-2 flex items-center space-x-4">
              <input
                type="text"
                className="w-full max-w-md border border-gray-300 ease-in-out hover:border-sky-500 focus-within:border-sky-500 rounded-full px-4 py-2 placeholder-sky-500 text-gray-700 transition duration-200"
                value={onSiteFeature}
                onChange={(e) => setOnSiteFeature(e.target.value)}
                placeholder="Thêm tính năng tại chỗ"
              />
              <button
                type="button"
                onClick={() => handleAddAmenity(onSiteFeature, '1')}
                className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircleIcon color='#FFFFFF' className="h-6 w-6" />
                <span className="ml-2">Thêm</span>
              </button>
            </div>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className='border-b pb-4 p-4 py-6'>
          <h2 className='text-xl font-semibold mb-3 text-gray-800'>Các điểm tham quan lân cận</h2>
          <div className='grid grid-cols-6 gap-4 px-6 '>
            {renderAmenitiesByType('2')}
            <div className="col-span-2 flex items-center space-x-4">
              <input
                type="text"
                className="w-full max-w-md border border-gray-300 ease-in-out hover:border-sky-500 focus-within:border-sky-500 rounded-full px-4 py-2 placeholder-sky-500 text-gray-700 transition duration-200"
                value={nearbyAttraction}
                onChange={(e) => setNearbyAttraction(e.target.value)}
                placeholder="Thêm điểm tham quan lân cận"
              />
              <button
                type="button"
                onClick={() => handleAddAmenity(nearbyAttraction, '2')}
                className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircleIcon color='#FFFFFF' className="h-6 w-6" />
                <span className="ml-2">Thêm</span>
              </button>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Các chính sách</h3>
          <div className="grid grid-cols-6 py-4 gap-6">
            {renderAmenitiesByType('3')}
            <div className="col-span-2 flex items-center space-x-4">
              <input
                type="text"
                className="w-full max-w-md border border-gray-300 ease-in-out hover:border-sky-500 focus-within:border-sky-500 rounded-full px-4 py-2 placeholder-sky-500 text-gray-700 transition duration-200"
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
                placeholder="Thêm chính sách"
              />
              <button
                type="button"
                onClick={() => handleAddAmenity(policy, '3')}
                className="flex items-center justify-center bg-gradient-to-r from-sky-500 to-sky-400 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircleIcon color='#FFFFFF' className="h-6 w-6" />
                <span className="ml-2">Thêm</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">

        <button
          className="flex items-center justify-center bg-gradient-to-r from-sky-400 to-sky-500 text-white font-semibold py-2 px-8 rounded-full shadow-lg hover:bg-sky-800 transition-all duration-300 transform hover:scale-105"
          onClick={handleSubmit}
        >
          <span className="mr-3">Cập nhật</span>
          <span className="text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md transform transition-all duration-300 hover:scale-110">
            <FaSave />
          </span>
        </button>
      </div>
    </div>
  );
};

export default UpdateResortAmenity;
