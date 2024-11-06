import React, { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa';
import CreateUnitTypeForUpdateModal from '../../../components/Modal/createUnitTypeForUpdateModal';
import UpdateResortUnitTypeModal from '../../../components/Modal/updateResortUnitTypeModal';

const UpdateResortUnitType = ({ unitType, flag }) => {

  const [unitTypeList, setUnitTypeList] = useState();
  const [openUnitTypeModal, setOpenUnitTypeModal] = useState(false);
  const [openUnitTypeCreateModal, setOpenUnitTyCreatepeModal] = useState(false);
  const [selectedUnitType, setSelectedUnitType] = useState({});
  const handleOpen = (item) => {
    setOpenUnitTypeModal(true)
    setSelectedUnitType(item)
  }

  const onClose = () => {
    setOpenUnitTypeModal(false)
  }

  const handleOpenCreate = () => {

  }

  useEffect(() => {
    setUnitTypeList(unitType)
  }, [unitType])

  return (
    <div className=''>
      <div className="grid grid-cols-2 gap-8 py-6 border p-8">
        {unitTypeList && unitTypeList.map((item, index) => (
          <div key={item.id} onClick={() => handleOpen(item)} className="flex items-stretch gap-4 rounded-xl border shadow-md hover:shadow-lg relative">
            {/* Bên trái là ảnh */}
            <img
              src="https://dyf.vn/wp-content/uploads/2021/11/thiet-ke-noi-that-phong-khach-san-hien-dai.jpg"
              alt="Room Image"
              className="w-56 h-full rounded-l-xl object-cover"
            />

            {/* Bên phải là thông tin phòng */}
            <div className="space-y-1 p-2">
              <h3 className="text-xl font-semibold text-blue-500">{item.title}</h3>
              <div className='flex space-x-2'>
                <p>{item.bedrooms} phòng ngủ,</p>
                <p>{item.sleeps} người,</p>
                <p>{item.kitchen}</p>
              </div>
              <p className='font-mono'>{item.bathrooms} phòng tắm</p>
              <p className='absolute bottom-0 right-6 text-blue-500 text-xl font-semibold'>{item.price} VND</p>
            </div>
          </div>))}

        {
          openUnitTypeModal && (<UpdateResortUnitTypeModal onClose={onClose} selectedUnitType={selectedUnitType} flag={flag} />)}
        {
          openUnitTypeCreateModal && (<CreateUnitTypeForUpdateModal onClose={() => setOpenUnitTyCreatepeModal(false)} flag={flag} />)
        }


        <div onClick={() => setOpenUnitTyCreatepeModal(true)} className="flex justify-center text-xl h-36 items-center gap-4 rounded-xl border shadow-md hover:shadow-lg">
          Thêm <FaPlusCircle size={20} />
        </div>

      </div>
      
    </div>

  )
}

export default UpdateResortUnitType