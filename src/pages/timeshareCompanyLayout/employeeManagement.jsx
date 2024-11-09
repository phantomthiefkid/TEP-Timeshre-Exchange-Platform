import React, { useEffect, useState } from "react";
import Header from "../../components/Header/headerOtherRole";
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

  const fetchAllResorts = async () => {
    try {
      const data = await getAllResort();
      if (data.status === 200) {
        console.log("Fetched Resorts:", data.data.content); // Log resort data
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
    return (<SpinnerWaiting />)
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
        <div className="p-6 flex justify-between items-center">
          <div>
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
            <input
              type="text"
              placeholder="Tìm kiếm nhân viên..."
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
            />

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
                    className="border-b border-gray-200 hover:bg-slate-100">

                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 flex items-center font-medium text-gray-700">
                      {item.userName}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-sm font-medium ${item.isActive ? "bg-green-200 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                      >
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${item.isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                        ></span>
                        <span>{item.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}</span>
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

          {
            allTimeshareStaff && allTimeshareStaff.length > 0 ? (
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
