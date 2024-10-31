import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getResortById, updateResortBasic } from '../../../service/tsCompanyService/tsCompanyAPI';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/solid'; // Make sure you import the icons
import { toast, Toaster } from 'react-hot-toast';
import Loading from '../../../components/LoadingComponent/loading';

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
        <div key={amenity.name} className="relative flex justify-center items-center rounded-2xl border mt-2 p-3">
          <span>{amenity.name}</span>
          <button
            type="button"
            onClick={() => handleRemoveAmenity(amenity.name)}
            className="absolute top-1 right-0 text-gray-400 flex items-center"
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
    return (<Loading />)
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
            <div className='flex'>
              <input
                type="text"
                className="border rounded-2xl"
                value={onSiteFeature}
                onChange={(e) => setOnSiteFeature(e.target.value)}
                placeholder="Thêm tính năng tại chỗ"
              />
              <button
                type="button"
                onClick={() => handleAddAmenity(onSiteFeature, '1')}
                className=" text-white p-2 rounded flex items-center space-x-2"
              >
                <PlusCircleIcon color='#2D99AE' className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className='border-b pb-4 p-4 py-6'>
          <h2 className='text-xl font-semibold mb-3 text-gray-800'>Các điểm tham quan lân cận</h2>
          <div className='grid grid-cols-6 gap-4 px-6 '>
            {renderAmenitiesByType('2')}
            <div className='flex'>
              <input
                type="text"
                className="border rounded-2xl"
                value={nearbyAttraction}
                onChange={(e) => setNearbyAttraction(e.target.value)}
                placeholder="Thêm điểm tham quan lân cận"
              />
              <button
                type="button"
                onClick={() => handleAddAmenity(nearbyAttraction, '2')}
                className=" text-white p-2 rounded flex items-center space-x-2"
              >
                <PlusCircleIcon color='#2D99AE' className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className='border-b pb-4 p-4 py-6'>
          <h2 className='text-xl font-semibold mb-3 text-gray-800'>Các chính sách</h2>
          <div className='grid grid-cols-6 gap-4 px-6'>
            {renderAmenitiesByType('3')}
            <div className='flex'>
              <input
                type="text"
                className="border rounded-2xl"
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
                placeholder="Thêm chính sách"
              />
              <button
                type="button"
                onClick={() => handleAddAmenity(policy, '3')}
                className=" text-white p-2 rounded flex items-center space-x-2"
              >
                <PlusCircleIcon color='#2D99AE' className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
       
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-14 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105"
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default UpdateResortAmenity;
