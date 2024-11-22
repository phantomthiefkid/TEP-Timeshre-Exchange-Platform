import React, { useEffect, useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa';
import CreateUnitTypeForUpdateModal from '../../../components/Modal/createUnitTypeForUpdateModal';
import UpdateResortUnitTypeModal from '../../../components/Modal/updateResortUnitTypeModal';
import FormatCurrency from '../../../components/Validate/formatCurrency';

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

  useEffect(() => {
    setUnitTypeList(unitType)
  }, [unitType])

  return (
    <div className='min-h-screen'>
      <div className="grid grid-cols-2 gap-8 py-6 border p-8">
        {unitTypeList && unitTypeList.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleOpen(item)}
            className="flex flex-col md:flex-row items-stretch gap-4 rounded-lg border shadow-md hover:shadow-lg hover:border-2 hover:border-blue-200 transition-transform relative bg-white"
          >
            {/* Phần ảnh bên trái */}
            <img
              src={item.photos}
              alt="Room Image"
              className="w-full md:w-56 h-48 md:h-auto rounded-t-lg md:rounded-l-lg md:rounded-tr-none object-cover"
            />

            {/* Phần thông tin bên phải */}
            <div className="flex-1 flex flex-col justify-between p-4">
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-semibold text-blue-500">{item.title}</h3>
                <div className="flex flex-wrap gap-2 text-gray-700">
                  <p>{item.bedrooms} phòng ngủ</p>
                  <span className="text-gray-400">|</span>
                  <p>{item.sleeps} người</p>
                  <span className="text-gray-400">|</span>
                  <p>{item.kitchen}</p>
                </div>
                <p className="font-mono text-gray-500">{item.bathrooms} phòng tắm</p>
              </div>
              <p className="text-blue-500 text-lg md:text-xl font-semibold mt-4 md:mt-0">
                {FormatCurrency(item.price)}
              </p>
            </div>
          </div>
        ))}


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