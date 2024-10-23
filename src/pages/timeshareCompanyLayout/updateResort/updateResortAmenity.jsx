import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getResortById } from '../../../service/tsCompanyService/tsCompanyAPI';

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
  const [loading, setLoading] = useState(true);
  const [originalResort, setOriginalResort] = useState(null);
  const [flag, setFlag] = useState(false);

  const getResortDetail = async () => {
    let data = await getResortById(id);
    if (data.status === 200) {
      const {
        resortName,
        logo,
        minPrice,
        maxPrice,
        status,
        address,
        timeshareCompanyId,
        description,
        resortAmenityList
      } = data.data;

      const newResort = {
        resortName,
        logo,
        minPrice,
        maxPrice,
        status,
        address,
        timeshareCompanyId,
        description,
        resortAmenityList
      };

      // Update both current resort data and the original resort data for comparison
      setResort(newResort);
      setOriginalResort(newResort);
      setLoading(false)
    }
  };

  useEffect(() => {
    getResortDetail()
  }, [id, flag])

  if (resort) {
    console.log(resort)
  }
  return (
    <div className='border rounded shadow-md bg-white p-6'>
      <div className='grid grid-rows-3 gap-6'>

        {/* On-Site Features and Amenities */}
        <div className='border-b pb-4'>
          <h2 className='text-xl font-semibold mb-3 text-gray-800'>Các tính năng và tiện nghi tại chỗ</h2>
          <div className='grid grid-cols-6 gap-4 px-6'>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className='border-b pb-4'>
          <h2 className='text-xl font-semibold mb-3 text-gray-800'>Các điểm tham quan lân cận</h2>
          <div className='grid grid-cols-6 gap-4 px-6'>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
          </div>
        </div>

        {/* Policies */}
        <div>
          <h2 className='text-xl font-semibold mb-3 text-gray-800'>Các chính sách</h2>
          <div className='grid grid-cols-6 gap-4 px-6'>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
           <button className='border rounded-xl p-2'>Bể bơi ngoài trời</button>
          </div>
        </div>

      </div>
    </div>

  )
}

export default UpdateResortAmenity