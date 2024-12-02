import {
  DocumentIcon,
  DotsVerticalIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  createUser,
  getAllUser,
  getAllUserForCount,
} from "../../service/adminAPIService/adminAPI";
import CreateUserModal from "../../components/Modal/createUserModal";
import { toast, Toaster } from "react-hot-toast";
import DetailEditUserModal from "../../components/Modal/detailEditUserModal";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {
  FaBuilding,
  FaLock,
  FaUserAlt,
  FaUserCog,
  FaUsers,
} from "react-icons/fa";
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
  const [loading, setLoading] = useState(true);
  const [countAdmin, setCountAdmin] = useState(0);
  const [countSystemStaff, setCountSystemStaff] = useState(0);
  const [countTSC, setCountTSC] = useState(0);
  const [countCustomer, setCountCustomer] = useState(0);
  const [countAll, setCountAll] = useState(0);
  const [counts, setCounts] = useState({
    admin: 0,
    systemStaff: 0,
    tsc: 0,
    customer: 0,
    total: 0,
  });
  const fetchAllUser = async () => {
    try {
      let data = await getAllUser(page, size, roleId, userName);
      if (data.status === 200) {
        setAllUser(data.data.content);
        setTotalPages(data.data.totalPages);
        setLoading(false);
      }
    } catch (error) {
      throw error;
    }
  };

  // const fetchAllUserForCount = async () => {
  //   try {
  //     let data = await getAllUserForCount();
  //     if (data.status === 200) {
  //       let admin =
  //         data.data.content &&
  //         data.data.content.filter((item) => {
  //           return item.roleId === 4;
  //         });
  //       let systemstaff =
  //         data.data.content &&
  //         data.data.content.filter((item) => {
  //           return item.roleId === 3;
  //         });
  //       let tsc =
  //         data.data.content &&
  //         data.data.content.filter((item) => {
  //           return item.roleId === 2;
  //         });
  //       let customer =
  //         data.data.content &&
  //         data.data.content.filter((item) => {
  //           return item.roleId === 1;
  //         });

  //       setCountAdmin(admin.length);
  //       setCountCustomer(customer.length);
  //       setCountSystemStaff(systemstaff.length);
  //       setCountTSC(tsc.length);
  //       setCountAll(data.data.content.length);
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const fetchUserCounts = async () => {
    try {
      let currentPage = 0;
      let fetchedAllPages = false;
      let roleCounts = {
        admin: 0,
        systemStaff: 0,
        tsc: 0,
        customer: 0,
        total: 0,
      };

      while (!fetchedAllPages) {
        const data = await getAllUserForCount();
        if (data.status === 200) {
          // Count each role in the current page
          data.data.content.forEach((user) => {
            switch (user.roleId) {
              case 4:
                roleCounts.admin += 1;
                break;
              case 3:
                roleCounts.systemStaff += 1;
                break;
              case 2:
                roleCounts.tsc += 1;
                break;
              case 1:
                roleCounts.customer += 1;
                break;
              default:
                break;
            }
          });

          // Update total count for each page loaded
          roleCounts.total += data.data.content.length;

          // Check if all pages have been fetched
          fetchedAllPages = currentPage >= data.data.totalPages - 1;
          currentPage += 1;
        }
      }

      // Set final counts after all pages are fetched
      setCounts(roleCounts);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUser();
    // fetchUserCounts()
  }, [page, roleId, userName, flag]);

  useEffect(() => {
    // fetchAllUserForCount();
    fetchUserCounts();
  }, []);

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
    setIsUpdateModalOpen(true);
    setSelectedUser(user);
  };
  if (loading) {
    return <SpinnerWaiting />;
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
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-200 hover:shadow-lg transition-all duration-300">
              <FaUsers className="text-red-600" />
              <span className="text-sm font-medium">Tất cả: </span>
              <CountUp start={0} end={counts.total} duration={4} />
            </div>

            <div className="flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-200 hover:shadow-lg transition-all duration-300">
              <FaUserAlt className="text-blue-600" />
              <span className="text-sm font-medium">Customer: </span>
              <CountUp start={0} end={counts.customer} duration={4} />
            </div>

            <div className="flex items-center space-x-2 bg-green-100 text-green-600 px-4 py-2 rounded-lg shadow-md hover:bg-green-200 hover:shadow-lg transition-all duration-300">
              <FaUserCog className="text-green-600" />
              <span className="text-sm font-medium">System Staff: </span>
              <CountUp start={0} end={counts.systemStaff} duration={4} />
            </div>

            <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-600 px-4 py-2 rounded-lg shadow-md hover:bg-yellow-200 hover:shadow-lg transition-all duration-300">
              <FaBuilding className="text-yellow-600" />
              <span className="text-sm font-medium">Timeshare Company: </span>
              <CountUp start={0} end={counts.tsc} duration={4} />
            </div>

            <div className="flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-200 hover:shadow-lg transition-all duration-300">
              <FaLock className="text-blue-600" />
              <span className="text-sm font-medium">Admin: </span>
              <CountUp start={0} end={counts.admin} duration={4} />
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center p-6 space-x-6">
          <div className="flex space-x-4">
            {/* Search User */}
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              className="px-6 py-3 w-80 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 transition duration-300 ease-in-out transform hover:border-blue-500"
              onChange={handleSearch}
            />

            {/* Filter */}
            <select
              className="bg-white text-gray-700 py-3 px-5 pr-12 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:border-blue-500"
              value={roleId}
              onChange={handleRoleFilter}
            >
              <option value="">Tất cả</option>
              <option value="4">Quản trị viên</option>
              <option value="2">Công ty Timeshare</option>
              <option value="3">Nhân viên hệ thống</option>
              <option value="1">Khách hàng</option>
            </select>

            {/* Add New User Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg shadow-lg flex items-center gap-3 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform focus:outline-none"
            >
              <PlusIcon className="w-6 h-6" />
              <span className="font-semibold">Thêm người dùng mới</span>
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
            {allUser &&
              allUser.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-200"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 flex items-center">
                    <img
                      src="https://img.freepik.com/premium-vector/customer-testimonials_9206-746.jpg?semt=ais_hybrid"
                      alt={`${item.name}'s avatar`}
                      className="w-14 h-14 rounded-full mr-2" // Adjust size as needed
                    />
                    <div>
                      <p className="font-semibold text-gray-700 text-lg">
                        {item.userName ? item.userName : "Người dùng"}
                      </p>{" "}
                      {/* Display Name */}
                      <p className="text-gray-500 text-md">{item.email}</p>{" "}
                      {/* Display Email */}
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
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.isActive}
                        className="sr-only peer"
                        disabled
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-400 dark:text-gray-500">
                        {item.isActive ? "Đang hoạt động" : "Đã vô hiệu hóa"}
                      </span>
                    </label>
                  </td>
                  <td className="p-4 flex gap-4">
                    <button onClick={() => handleOpenUpdateModal(item)}>
                      <DocumentIcon color="gray" className="w-6 h-6" />
                    </button>
                    <button>
                      <DotsVerticalIcon className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <DetailEditUserModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          userData={selectedUser}
          setFlag={() => setFlag(!flag)}
        />

        {allUser && allUser.length > 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-5 w-full">
            <button
              onClick={handlePreviousPage}
              disabled={page === 0}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-500"
            >
              <FaChevronLeft />
            </button>
            <div className="flex space-x-2 bg-gray-200 rounded-full px-2 py-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    index === page
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
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
          <span className="flex items-center justify-center space-x-2 mt-5 w-full">
            Không có bài đăng nào!!!
          </span>
        )}
      </div>
    </>
  );
};

export default UserManagement;
