import {
  DocumentIcon,
  DotsVerticalIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import HeaderAdmin from "../../components/Header/headerAdmin";
import { createUser, getAllUser } from "../../service/adminAPIService/adminAPI";
import CreateUserModal from "../../components/Modal/createUserModal";
import { toast, Toaster } from "react-hot-toast";
import DetailEditUserModal from "../../components/Modal/detailEditUserModal";
import Loading from "../../components/LoadingComponent/loading";
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
  const fetchAllUser = async () => {
    try {
      let data = await getAllUser(page, size, roleId, userName);
      if (data.status === 200) {
        setAllUser(data.data.content);
        setTotalPages(data.data.totalPages);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    return <Loading />;
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <HeaderAdmin />
      <div className="p-6 flex justify-between items-center">
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
            Tất cả: <CountUp start={0} end={21} duration={2} />
          </span>
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">
            Customer: <CountUp start={0} end={10} duration={2} />
          </span>
          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium">
            System Staff: <CountUp start={0} end={3} duration={2} />
          </span>
          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-sm font-medium">
            Timeshare Company: <CountUp start={0} end={7} duration={2} />
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
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={roleId}
            onChange={handleRoleFilter}
          >
            <option value="">Tất cả</option>
            <option value="4">Admin</option>
            <option value="2">Timeshare Company</option>
            <option value="3">System Staff</option>
            <option value="1">Customer</option>
          </select>

          {/* Add New User */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 flex items-center gap-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500"
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

      {/* User Table */}
      <div className="p-6">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr className="rounded-xl text-gray-500">
              <th className="text-left p-4 rounded-l-xl">STT</th>
              <th className="text-left p-4">Họ và tên</th>
              <th className="text-left p-4">Địa chỉ email</th>
              <th className="text-left p-4">Vai trò</th>
              <th className="text-left p-4">Trạng thái</th>
              <th className="text-left p-4 rounded-r-xl">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {allUser &&
              allUser.map((item, index) => (
                <tr key={index}>
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 flex items-center">
                    <img
                      src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=5dOtTlzsDu0Q7kNvgGmqM3K&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AQXge5qrw4LXdmvXPL5sfJg&oh=00_AYAmYlBZfq86NfBJdoNTVuTAUpyzWPKCwwJGACxjQJKi2w&oe=67118559"
                      alt={`${item.name}'s avatar`}
                      className="w-10 h-10 rounded-full mr-2" // Adjust size as needed
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

        <div className="flex justify-between items-center p-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Trang trước
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
                className={`px-4 py-2 rounded-lg ${
                  index === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={page === totalPages - 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
