import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { FaPlusCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import CreateUnitTypeForUpdateModal from '../../../components/Modal/createUnitTypeForUpdateModal';
import ConfirmModal from '../../../components/Modal/systemstaff/confirmMoal';
import UpdateResortUnitTypeModal from '../../../components/Modal/updateResortUnitTypeModal';
import FormatCurrency from '../../../components/Validate/formatCurrency';
import { deactiveUnitType } from '../../../service/tsCompanyService/tsCompanyAPI';
const UpdateResortUnitType = ({ unitType, flag }) => {

  const [unitTypeList, setUnitTypeList] = useState();
  const [openUnitTypeModal, setOpenUnitTypeModal] = useState(false);
  const [openUnitTypeCreateModal, setOpenUnitTyCreatepeModal] = useState(false);
  const [selectedUnitType, setSelectedUnitType] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [unitTypeIdSelected, setUnitTypeIdSelected] = useState(null);
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

  const openConfirmDelete = (unitTypeId) => {
    setModalOpen(true)
    setUnitTypeIdSelected(unitTypeId)
  }

  const handleDeactive = async () => {
    try {
      await deactiveUnitType(unitTypeIdSelected)
      toast.success("Vô hiệu hóa thành công!!!", { duration: 3000 })
      flag()
      setModalOpen(false)
    } catch (error) {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại!");
    } finally {
      setModalOpen(false); // Close modal after action
    }
  }

  return (
    <div className='min-h-screen'>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="grid grid-cols-2 gap-8 py-6 border p-8">
        {unitTypeList && unitTypeList.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-stretch gap-4 rounded-lg border shadow-md hover:shadow-lg hover:border-2 hover:border-blue-200 transition-transform relative bg-white"
          >

            <img
              src={item.photos}
              alt="Room Image"
              onClick={() => handleOpen(item)}
              className="w-full md:w-56 h-48 md:h-auto rounded-t-lg md:rounded-l-lg md:rounded-tr-none object-cover"
            />

            {/* Phần thông tin bên phải */}
            <div className="flex-1 flex flex-col justify-between p-4" onClick={() => handleOpen(item)}>
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
            <div className="absolute top-4 right-4">
              {item.isActive ? (
                <button
                  onClick={() => openConfirmDelete(item.id)}
                  className="flex items-center justify-center w-10 h-10 bg-green-100 hover:bg-green-200 rounded-full shadow-md transition-transform duration-200 hover:scale-105"
                >
                  <FaEye className="text-green-500 text-2xl" title="Active" />
                </button>
              ) : (
                <div
                  className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full shadow-md"
                  title="Inactive"
                >
                  <FaEyeSlash className="text-red-500 text-2xl" />
                </div>
              )}
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
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeactive}
        message="Bạn có chắc chắn muốn vô hiệu hóa loại phòng này?"

      />
    </div>

  )
}

export default UpdateResortUnitType