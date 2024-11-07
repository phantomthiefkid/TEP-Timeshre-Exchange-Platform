import { DocumentIcon, DotsVerticalIcon, PlusIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup'
import { createUser, getAllUser, getAllUserForCount } from '../../service/adminAPIService/adminAPI';
import CreateUserModal from '../../components/Modal/createUserModal';
import { toast, Toaster } from 'react-hot-toast';
import DetailEditUserModal from '../../components/Modal/detailEditUserModal';
import SpinnerWaiting from '../../components/LoadingComponent/spinnerWaiting';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
const UserManagement = () => {
  const [allUser, setAllUser] = useState([]);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [roleId, setRoleId] = useState("");
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true)
  const [countAdmin, setCountAdmin] = useState(0)
  const [countSystemStaff, setCountSystemStaff] = useState(0)
  const [countTSC, setCountTSC] = useState(0)
  const [countCustomer, setCountCustomer] = useState(0)
  const [countAll, setCountAll] = useState(0)
  const fetchAllUser = async () => {
    try {
      let data = await getAllUser(page, size, roleId, userName);
      if (data.status === 200) {
        setAllUser(data.data.content);
        setTotalPages(data.data.totalPages);
        setLoading(false)
      }
    } catch (error) {
      throw error
    }
  };

  const fetchAllUserForCount = async () => {
    try {
      let data = await getAllUserForCount();
      if (data.status === 200) {
        let admin = data.data.content && data.data.content.filter((item) => {
          return item.roleId === 4
        })
        let systemstaff = data.data.content && data.data.content.filter((item) => {
          return item.roleId === 3
        })
        let tsc = data.data.content && data.data.content.filter((item) => {
          return item.roleId === 2
        })
        let customer = data.data.content && data.data.content.filter((item) => {
          return item.roleId === 1
        })

        setCountAdmin(admin.length)
        setCountCustomer(customer.length)
        setCountSystemStaff(systemstaff.length)
        setCountTSC(tsc.length)
        setCountAll(data.data.content.length)
      }
    } catch (error) {
      throw error
    }
  }

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleRoleFilter = (e) => {
    setRoleId(e.target.value);
    setPage(0);
  };

  const handleSearch = (e) => {
    setUserName(e.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchAllUser();
  }, [page, roleId, userName, flag]);

  useEffect(() => {
    fetchAllUserForCount();
  }, [])

  const handleCreateUser = async (newUser) => {
    try {
      if (newUser) {
        let data = await createUser(newUser);
        if (data.status === 200) {
          toast.success("Tạo mới thành công", { duration: 2000 });
        } else {
          toast.error("Tạo mới thất bại", { duration: 2000 });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra trong lúc tạo", { duration: 2000 });
    }
  };

  const handleOpenUpdateModal = (user) => {
    setIsUpdateModalOpen(true)
    setSelectedUser(user)
  }
  if (loading) {
    return (
      <SpinnerWaiting />
    );
  }


  return (
    <>
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl overflow-y-auto">
        <Toaster position="top-right" reverseOrder={false} />

        <div className="py-4 p-6 space-y-2 flex items-center justify-between">
          <div className="p-4">
            <h1 className="text-3xl text-gray-700 font-bold">
              Quản lí người dùng
            </h1>
            <p className="text-md font-medium text-gray-600 mt-2">
              Quản lí tài khoản người dùng và quyền hạn tài khoản ở đây.
            </p>
          </div>
          <div className="flex space-x-4">
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
              Tất cả: <CountUp start={0} end={countAll} duration={2} />
            </span>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">
              Customer: <CountUp start={0} end={countCustomer} duration={2} />
            </span>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium">
              System Staff: <CountUp start={0} end={countSystemStaff} duration={2} />
            </span>
            <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-sm font-medium">
              Timeshare Company: <CountUp start={0} end={countTSC} duration={2} />
            </span>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">
              Admin: <CountUp start={0} end={countAdmin} duration={2} />
            </span>
          </div>
        </div>

        <div className="flex justify-end items-center p-6">
          <div className="flex space-x-4">
            {/* Search User */}
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
            />

            {/* Filter */}
            <select
              className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 py-2 px-4 pr-10 rounded-xl shadow-md flex items-center justify-between cursor-pointer transition duration-300 ease-in-out transform  hover:border-blue-500 focus:outline-none"
              value={roleId}
              onChange={handleRoleFilter}
            >
              <option value="">Tất cả</option>
              <option class="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 cursor-pointer rounded-lg transition" value="4">Admin</option>
              <option class="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 cursor-pointer rounded-lg transition" value="2">Timeshare Company</option>
              <option class="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 cursor-pointer rounded-lg transition" value="3">System Staff</option>
              <option class="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 cursor-pointer rounded-lg transition" value="1">Customer</option>
            </select>

            {/* Add New User */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r gap-2 from-blue-300 to-blue-400 border border-blue-300 text-gray-560 py-2 px-4 pr-10 rounded-xl shadow-md flex items-center justify-between cursor-pointer transition duration-300 ease-in-out transform hover:from-blue-400 hover:to-blue-300 hover:border-blue-500 focus:outline-none"
            >
              <PlusIcon className="w-7 h-7" />
              Thêm người dùng mới
            </button>
            <CreateUserModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onCreate={handleCreateUser}
            />
          </div>
        </div>


        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-300 border-b border-gray-200">
              <th className="p-4 text-left ml-3">STT</th>
              <th className="text-left p-4">Họ và tên</th>
              <th className="text-left p-4">Địa chỉ email</th>
              <th className="text-left p-4">Vai trò</th>
              <th className="text-left p-4">Trạng thái</th>
              <th className="text-left p-4">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {allUser && allUser.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-200">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 flex items-center">
                  <img
                    src="https://img.freepik.com/premium-vector/customer-testimonials_9206-746.jpg?semt=ais_hybrid"
                    alt={`${item.name}'s avatar`}
                    className="w-14 h-14 rounded-full mr-2" // Adjust size as needed
                  />
                  <div>
                    <p className="font-semibold text-gray-700 text-lg">{item.userName ? item.userName : "Người dùng"}</p> {/* Display Name */}
                    <p className="text-gray-500 text-md">{item.email}</p> {/* Display Email */}
                  </div>
                </td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">{item.roleName}</td>
                <td className="p-4 text-center">
                  {/* <input
                    type="checkbox"
                    checked={item.state}
                    className={`w-6 h-6 ${item.state ? 'bg-green-500' : 'bg-gray-300'}`}
                  /> */}
                  <label class="flex items-center">
                    <input type="checkbox" checked={item.isActive} class="sr-only peer" disabled />
                    <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-400 dark:text-gray-500">{item.isActive ? "Đang hoạt động" : "Đã vô hiệu hóa"}</span>
                  </label>
                </td>
                <td className="p-4 flex gap-4">

                  <button onClick={() => handleOpenUpdateModal(item)}><DocumentIcon color='gray' className='w-6 h-6' /></button>
                  <button><DotsVerticalIcon className='w-6 h-6' /></button>

                </td>

              </tr>
            ))}

          </tbody>
        </table>

        <DetailEditUserModal isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          userData={selectedUser}
          setFlag={() => setFlag(!flag)}
        />

        {
          allUser && allUser.length > 0 ? (
            <div className="flex items-center justify-center space-x-2 mt-5 w-full">
              <button
                onClick={handlePreviousPage}
                disabled={page === 0}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-500"
              >
                <FaChevronLeft />
              </button>
              <div className="flex space-x-2 bg-gray-200 rounded-full px-2 py-1">
                {
                  Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setPage(index)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${index === page ? "bg-blue-500 text-white" : "bg-white text-gray-500"}`}
                    >
                      {index + 1}
                    </button>
                  ))
                }
              </div>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages - 1}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white"
              >
                <FaChevronRight />
              </button>
            </div>
          ) : (
            <span className="flex items-center justify-center space-x-2 mt-5 w-full">Không có bài đăng nào!!!</span>
          )
        }

      </div>
    </>
  );
};

export default UserManagement;
