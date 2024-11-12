import React, { useState, useEffect } from 'react';
import { PencilAltIcon, XIcon } from '@heroicons/react/solid';
import Loading from '../LoadingComponent/loading';
import { editUser } from '../../service/adminAPIService/adminAPI';
import { toast, Toaster } from 'react-hot-toast';

const roleMapping = {
    1: 'Khách hàng',
    2: 'Timeshare Company',
    3: 'System Staff',
    4: 'Admin'
};

const DetailEditUserModal = ({ isOpen, onClose, userData, setFlag }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [role, setRole] = useState(null);
    const [isActive, setIsActive] = useState(true);

    // Reset states whenever the modal opens
    useEffect(() => {
        if (isOpen && userData) {
            setRole(userData.roleId);
            setIsActive(userData.isActive);
        }
    }, [isOpen, userData]);

    useEffect(() => {
        console.log(isActive)
    }, [isActive]);

    if (!isOpen) return null;

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleSaveChanges = async () => {
        // Logic to save changes here
        try {
            setIsEditable(false);
            let data = await editUser({ id: userData.id, roleId: Number(role), isActive: isActive })
            if (data) {
                toast.success("Cập nhật thông tin thành công", { duration: 2000 })
                setFlag();
            } else {
                toast.error("Cập nhật thông tin thất bại", { duration: 2000 })
            }
        } catch (error) {

        }
    };

    if (!userData) {
        <Loading />

    }
    const handleClose = () => {
        onClose();
        setIsEditable(false)
    }
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <Toaster position="top-right"
                reverseOrder={false} />
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-lg p-1">

                {/* Header Section with Cover Image */}
                <div className="relative">
                    <img
                        src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/175029/Originals/background-xam%20(1).jpg"
                        alt="Cover"
                        className="w-full h-32 object-cover rounded-t-2xl"
                    />
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        <XIcon className="w-6 h-6" />
                    </button>
                    {/* Avatar (Positioned to overlap the cover image) */}
                    <div className="absolute -bottom-12 left-1/4 transform -translate-x-1/2">
                        <img
                            src="https://img.freepik.com/premium-vector/customer-testimonials_9206-746.jpg?semt=ais_hybrid"
                            alt="User Avatar"
                            className="w-28 h-28 rounded-full border-4 border-white object-cover"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-4 px-4">
                    {isEditable ? (
                        <button
                            onClick={handleSaveChanges}
                            className="px-4 py-2  font-medium bg-green-400 text-white rounded-xl hover:bg-green-300 transition duration-300"
                        >
                            Lưu thay đổi
                        </button>
                    ) : (
                        <button
                            onClick={handleEditClick}
                            className="px-4 py-2 border-2 font-medium text-gray-500 rounded-xl hover:bg-gray-200 transition duration-300"
                        >
                            Chỉnh sửa thông tin
                        </button>
                    )}
                </div>
                {/* Body Section */}
                <div className="p-6 text-left space-y-4">
                    {/* User Name */}
                    <div className="mt-8 p-6 text-left space-y-8">
                        {/* User Name */}
                        <div className="flex items-center gap-4">
                            <label className="block text-gray-600 font-medium w-1/3">Tên đăng nhập</label>
                            <input
                                type="text"
                                className=" text-gray-500 bg-gray-200 border rounded-lg p-2 w-full"
                                value={userData.userName}
                                disabled
                            />
                        </div>

                        {/* User Email */}
                        <div className="flex items-center gap-4">
                            <label className="block text-gray-600 font-medium w-1/3">Email</label>
                            <input
                                type="email"
                                className="text-gray-500 bg-gray-200 border rounded-lg p-2 w-full"
                                value={userData.email}
                                disabled
                            />
                        </div>

                        {/* Role */}
                        <div className="flex items-center gap-4">
                            <label className="block text-gray-600 font-medium w-1/3">Vai trò</label>
                            <div className="relative w-full">
                                <select
                                    className={`px-4 py-2 rounded-lg text-gray-500 border bg-gray-200 focus:ring focus:ring-blue-500 focus:outline-none transition-all ease-in-out duration-300 w-full ${isEditable ? 'bg-white' : 'cursor-not-allowed'}`}
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    disabled={!isEditable}
                                >
                                    {Object.entries(roleMapping).map(([id, name]) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Active Status Toggle */}
                        <div className="flex items-center gap-4">
                            <label className="block text-gray-600 font-medium w-1/3">Trạng thái</label>
                            <div className="flex items-center">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={() => {
                                            if (isEditable) {
                                                setIsActive((prev) => !prev);
                                            }
                                        }}
                                        className={`sr-only peer ${isEditable ? '' : 'cursor-not-allowed'}`}
                                    />
                                    <div className={`relative w-11 h-6 rounded-full transition-all duration-300 ${isActive ? 'bg-blue-600' : 'bg-gray-400'}`}>
                                        <div className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white border-gray-300 border rounded-full transition-transform duration-300 ${isActive ? 'translate-x-full border-white' : ''}`}></div>
                                    </div>
                                    {isActive ? (<span className="ml-3 text-sm font-medium text-gray-400">
                                        Hoạt động
                                    </span>) : <span className="ml-3 text-sm font-medium text-gray-400">
                                        Vô Hiệu Hóa
                                    </span>}
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* Close Button */}
                    <div className="text-center">
                        <button
                            onClick={handleClose}
                            className="mt-6 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-500 hover:text-white"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailEditUserModal;
