import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import AddPolicyModal from "../../components/Modal/policy/addPolicyModal";
import PolicyModal from "../../components/Modal/policy/policyModal";
import { createPolicy, getAllPolicies, updatePolicyById } from "../../service/systemStaffService/systemStaffAPI";

const PolicyManagement = () => {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false); // Modal trạng thái
    const [modalPolicy, setModalPolicy] = useState(null); // FAQ được chỉnh sửa
    const [isCreate, setIsCreate] = useState(false);
    useEffect(() => {
        const fetchAllPolicies = async () => {
            try {
                let data = await getAllPolicies();
                if (data.status === 200) {
                    setPolicies(data.data);
                    setLoading(false);
                }
            } catch (error) {
                throw error;
            } finally {
                setLoading(false);
            }
        };

        fetchAllPolicies();
    }, [flag]);

    const handleOpen = (policy) => {
        setModalPolicy(policy); // Lưu FAQ để chỉnh sửa
        setIsOpenModal(true); // Mở modal
    };

    const handleClose = () => {
        setIsOpenModal(false);
    }

    const handleUpdatePolicy = async (update) => {
        try {
            await updatePolicyById(update).then(() => {
                toast.success("Cập nhật thông tin thành công!", { duration: 2000 })
                setFlag(!flag)
            })
        } catch (error) {
            toast.error("Có lỗi xảy ra!!!", { duration: 2000 });
            return error
        }
    }

    const handleCloseCreateModal = () => {
        setIsCreate(false)
    }

    const handleCreatePolicy = async (create) => {
        try {
            let data = await createPolicy(create)
            if (data.status === 200) {
                toast.success("Thêm chính sách thành công!", { duration: 2000 })
                setFlag(!flag)
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra!!!", { duration: 2000 });
            return error
        }
    }

    if (loading) {
        return <SpinnerWaiting />
    }

    return (
        <div className="min-h-screen">
            <Toaster position="top-right" reverseOrder={false} />

            <div className="py-6 px-8 space-y-4 border-l-8 border-blue-500 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md mx-6 my-6">
                <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                    Mục quản lý <span className="text-blue-600">Chính sách</span> và <span className="text-blue-600">Quyền riêng tư</span>
                </h1>
                <h3 className="text-lg text-gray-500">
                    <span className="font-semibold text-blue-600">Quản lý</span> tất cả các
                    chính sách và
                    <span className="font-semibold text-blue-600"> cập nhật thông tin</span>{" "}
                    tại đây.
                </h3>
            </div>
            <div className="flex justify-end px-8">{/* Nút "Thêm Chính sách" */}
                <button onClick={() => setIsCreate(true)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:bg-blue-700 font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200">
                    Thêm Chính sách
                </button>
            </div>

            <div className="max-w-7xl py-6 px-6 mx-auto bg-slate-50 p-6 rounded-xl">

                <div className="space-y-6">
                    {policies.map((policy) => (
                        <div key={policy.policyId} className=" p-6 hover:bg-slate-100">
                            <div className="flex justify-between items-center relative">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {policy.title}
                                    </h2>
                                    <p className="text-gray-600 mt-4">{policy.description}</p>
                                    <p className="text-gray-400 text-sm mt-4">
                                        Ngày tạo:{" "}
                                        {new Date(policy.createdDate).toLocaleDateString()}
                                    </p>
                                </div>
                                {/* Edit Button */}
                                <button
                                    onClick={() => handleOpen(policy)}
                                    className="text-white bg-red-500 hover:bg-red-600 font-semibold px-4 py-2 border border-red-500 rounded-md shadow-sm transition-colors duration-200 absolute top-0 right-2"
                                >
                                    <FaRegEdit />
                                </button>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isOpenModal && modalPolicy && (
                <PolicyModal
                    isOpen={isOpenModal}
                    onClose={handleClose}
                    selected={modalPolicy}
                    onUpdate={handleUpdatePolicy}
                />
            )}
            {isCreate && (<AddPolicyModal isOpen={isCreate} onUpdate={handleCreatePolicy} onClose={handleCloseCreateModal} />)}
        </div>
    );
};

export default PolicyManagement;
