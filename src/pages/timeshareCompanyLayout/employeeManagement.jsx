import React, { useEffect, useState } from "react";
import Header from "../../components/Header/headerOtherRole";
import {
  createTimeshareStaff,
  getAllTimeshareStaff,
  getTsStaffById,
} from "../../service/tsCompanyService/tsCompanyAPI";
import { DotsVerticalIcon, PlusIcon } from "@heroicons/react/solid";
import CountUp from "react-countup";
import toast, { Toaster } from "react-hot-toast";
import CreateTimeshareStaffModal from "../../components/Modal/createTimeshareStaffModal";
import DetailTimeshareStaffModal from "../../components/Modal/detailTimeshareStaffModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";

const employeeManagement = () => {
  const [allTimeshareStaff, setAllTimeshareStaff] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [StaffName, setStaffName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTSStaff, setSelectedTSStaff] = useState(null);

  const fetchAllTimeshareStaff = async () => {
    try {
      let data = await getAllTimeshareStaff(page, size, StaffName);
      let amount = await getAllTimeshareStaff(0, 100, "");
      if (data.status === 200) {
        setAllTimeshareStaff(data.data.content);
        setTotalPages(data.data.totalPages);
        setLoading(false);
        setCount(amount.data.content.length);
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

  const handleSearch = (e) => {
    setStaffName(e.target.value);
    setPage(0);
  };

  const handleCreateTimeshareStaff = async (newTimeshareStaff) => {
    try {
      if (newTimeshareStaff) {
        let data = await createTimeshareStaff(newTimeshareStaff);
        console.log(data);
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

  const fetchTSStaffDetails = async (id) => {
    try {
      const response = await getTsStaffById(id);
      setSelectedTSStaff(response.data);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTimeshareStaff();
  }, [page, StaffName]);

  if (loading) {
    return (<SpinnerWaiting/>)
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="p-6 flex justify-between items-center">
        <div className="p-4">
          <h1 className="text-3xl text-gray-700 font-bold">
            Quản lí nhân viên
          </h1>
          <p className="text-md font-medium text-gray-600 mt-2">
            Quản lí nhân viên của bạn.
          </p>
        </div>
        <div className="flex space-x-4">
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-lg font-medium">
            Số lượng nhân viên: <CountUp start={0} end={count} duration={2} />
          </span>
        </div>
      </div>

      <div className="flex justify-end items-center px-6">
        <div className="flex space-x-4">
          {/* Search User */}
          <input
            type="text"
            placeholder="Tìm kiếm nhân viên..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
          />

          {/* Add New User */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-300 to-blue-400 border border-blue-300 text-gray-560 py-2 px-4 pr-10 rounded-xl shadow-md flex items-center justify-between cursor-pointer transition duration-300 ease-in-out transform hover:from-blue-400 hover:to-blue-300 hover:border-blue-500 focus:outline-none gap-4"
          >
            <PlusIcon className="w-7 h-7" />
            Thêm mới nhân viên
          </button>

          <CreateTimeshareStaffModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreateTimeshareStaff}
          />
        </div>
      </div>

      <div className="p-6">
        <table className="min-w-full bg-gray-50 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 rounded-lg">
            <tr className="text-left text-sm font-semibold uppercase tracking-wider text-gray-500 rounded-lg">
              <th className="p-4 rounded-l-lg">STT</th>
              <th className="p-4">Tên nhân viên</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4 rounded-r-lg"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allTimeshareStaff &&
              allTimeshareStaff.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-95"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 flex items-center font-medium text-gray-700">
                    {item.userName}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        item.isActive
                          ? "bg-green-200 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-4">
                    <button
                      onClick={() => fetchTSStaffDetails(item.id)}
                      className="hover:text-blue-500 transition duration-300 ease-in-out"
                    >
                      <DotsVerticalIcon className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            <FaChevronLeft />
          </button>

          <div className="flex space-x-2 bg-white px-2 py-1">
            {page > 2 && (
              <>
                <button
                  onClick={() => setPage(0)}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-blue-500"
                >
                  1
                </button>
                <span className="flex items-center justify-center text-gray-500">
                  ...
                </span>
              </>
            )}

            {Array.from({ length: totalPages }, (_, index) => {
              if (index >= page - 2 && index <= page + 2) {
                return (
                  <button
                    key={index}
                    onClick={() => setPage(index)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl ${
                      index === page
                        ? "bg-blue-500 text-white shadow-lg font-semibold"
                        : "text-gray-500 hover:text-blue-500 hover:font-semibold"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              }
              return null;
            })}

            {page < totalPages - 3 && (
              <>
                <span className="flex items-center justify-center text-gray-500">
                  ...
                </span>
                <button
                  onClick={() => setPage(totalPages - 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-blue-500"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={handleNextPage}
            disabled={page === totalPages - 1}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            <FaChevronRight />
          </button>
        </div>
        <DetailTimeshareStaffModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          tsStaff={selectedTSStaff}
          onSave={fetchAllTimeshareStaff}
        />
      </div>
    </>
  );
};

export default employeeManagement;
