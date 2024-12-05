import React, { useEffect, useState } from "react";
import {
  createTimeshareStaff,
  getAllResort,
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
import { HiUsers } from "react-icons/hi";

const employeeManagement = () => {
  const [allTimeshareStaff, setAllTimeshareStaff] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [StaffName, setStaffName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTSStaff, setSelectedTSStaff] = useState(null);
  const [allResorts, setAllResorts] = useState([]);

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
        if (data.status === 200 || data.status === 400) {
          toast.success("Tạo mới thành công", { duration: 2000 });
        } else {
          toast.error("Tạo mới thất bại", { duration: 2000 });
        }
      }
    } catch (error) {
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

  const fetchAllResorts = async () => {
    try {
      const data = await getAllResort();
      if (data.status === 200) {
        setAllResorts(data.data.content);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getResortName = (resortId) => {
    const resort = allResorts.find((resort) => resort.id === resortId);
    return resort ? resort.resortName : "-";
  };

  useEffect(() => {
    fetchAllTimeshareStaff();
    fetchAllResorts();
  }, [page, StaffName]);

  if (loading) {
    return <SpinnerWaiting />;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="py-4 px-6 space-y-4 border-l-4 border-blue-500 bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-gray-700">
              Quản lý Nhân viên <span className="text-blue-600">tối ưu</span> đội ngũ
            </h1>
            <h3 className="text-lg text-gray-500">
              <span className="font-semibold text-blue-600">
                Theo dõi thông tin nhân sự
              </span>, trạng thái hoạt động và hiệu quả làm việc.
            </h3>
          </div>
          <div className="p-4 flex items-center rounded-xl bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg transform transition-transform duration-300 hover:shadow-xl">
            <div className="flex items-center justify-center gap-4">
              <HiUsers className="text-2xl" />
              <div className="text-right">
                <h3 className="text-lg font-semibold">
                  Số lượng nhân viên:{" "}
                  <CountUp start={0} end={count} duration={2} />
                </h3>
              </div>
            </div>
          </div>
        </div>


        <div className="flex justify-end items-center px-6">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Tìm kiếm nhân viên..."
              className="px-6 py-3 w-80 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 transition duration-300 ease-in-out transform hover:border-blue-500"
              onChange={handleSearch}
            />

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg shadow-lg flex items-center gap-3 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform focus:outline-none"
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
          <table className="min-w-full bg-white border border-gray-200 ">
            <thead className="bg-gray-100 rounded-lg">
              <tr className="w-full bg-gray-300 border-b border-gray-200">
                <th className="p-4 text-left ml-3">STT</th>
                <th className="p-4">Tên nhân viên</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-left"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allTimeshareStaff &&
                allTimeshareStaff.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-slate-100"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 flex items-center font-medium text-gray-700">
                      {item.userName}
                    </td>
                    <td className="p-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={item.isActive}
                          className="sr-only peer"
                          disabled
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                        <span className="ms-3 text-sm font-medium text-gray-400 dark:text-gray-500">
                          {item.isActive ? "Đang hoạt động" : "Đã vô hiệu hóa"}
                        </span>
                      </label>
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

          {allTimeshareStaff && allTimeshareStaff.length > 0 ? (
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
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${index === page
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
          <DetailTimeshareStaffModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            tsStaff={selectedTSStaff}
            onSave={fetchAllTimeshareStaff}
          />
        </div>
      </div>
    </>
  );
};

export default employeeManagement;
