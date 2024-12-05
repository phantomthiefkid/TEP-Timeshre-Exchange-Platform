import { DotsVerticalIcon, PlusIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import {
  createTimeshareCompany,
  getAllTimeshareCompany,
  getAllTimeshareCompanyForCount,
  getTimeshareCompanyById,
} from "../../service/adminAPIService/adminAPI";
import CreateTimeshareCompanyModal from "../../components/Modal/createTimeshareCompanyModal";
import DetailTimeshareCompanyModal from "../../components/Modal/detailTimeshareCompanyModal";
import { toast, Toaster } from "react-hot-toast";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import { FaChevronLeft, FaChevronRight, FaBuilding } from "react-icons/fa";
import CountUp from "react-countup";
const resortManagement = () => {
  const [allTimeshareCompany, setAllTimeshareCompany] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [timeshareCompanyName, setTimeshareCompanyName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countPartner, setCountPartner] = useState(0);
  const fetchAllTimeshareCompany = async () => {
    try {
      let data = await getAllTimeshareCompany(page, size, timeshareCompanyName);
      let count = await getAllTimeshareCompanyForCount();
      if (data.status === 200) {
        setAllTimeshareCompany(data.data.content);
        setTotalPages(data.data.totalPages);
        setLoading(false);
      }
      if (data.status === 200) {
        setCountPartner(count.data.content.length)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompanyDetails = async (id) => {
    try {
      const response = await getTimeshareCompanyById(id);
      setSelectedCompany(response.data);
      setIsDetailModalOpen(true);
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
    setTimeshareCompanyName(e.target.value);
    setPage(0);
  };

  const handleCreateNewTimeshareCompany = async (newTimeshareCompany) => {
    try {
      if (newTimeshareCompany) {
        // Replace this with your API call function to create a new timeshare company
        let response = await createTimeshareCompany(newTimeshareCompany);

        if (response.status === 200) {
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

  useEffect(() => {
    fetchAllTimeshareCompany();
  }, [page, timeshareCompanyName]);

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
              Quản lí <span className="text-blue-600">đối tác</span>
            </h1>
            <p className="text-md font-medium text-gray-600 mt-2">
              Quản lí <span className="text-blue-600">đối tác</span> công ty <span className="text-blue-600">timeshare</span> ở đây.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-200 hover:shadow-lg transition-all duration-300">
              <FaBuilding className="text-red-600 text-lg" />
              <span className="text-sm font-medium">Tất cả: </span>
              <CountUp start={0} end={countPartner} duration={4} />
            </div>
          </div>
        </div>


        <div className="flex justify-end items-center p-6">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Tìm kiếm đối tác..."
              className="px-6 py-3 w-80 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 transition duration-300 ease-in-out transform hover:border-blue-500"
              onChange={handleSearch}
            />

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg shadow-lg flex items-center gap-3 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform focus:outline-none"
            >
              <PlusIcon className="w-7 h-7" />
              Thêm đối tác mới
            </button>

            <CreateTimeshareCompanyModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onCreate={handleCreateNewTimeshareCompany}
            />
          </div>
        </div>

        <div className="p-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="w-full bg-gray-300 border-b border-gray-200">
                <th className="p-4 text-left ml-3">STT</th>
                <th className="text-left p-4">Tên đối tác</th>
                <th className="text-left p-4">Địa chỉ</th>
                <th className="text-left p-4">Trạng thái</th>
                <th className="text-left p-4"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {allTimeshareCompany &&
                allTimeshareCompany.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-200">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 flex items-center">
                      <img
                        src={item.logo}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <div>
                        <p className="font-semibold text-gray-700 text-lg">
                          {item.timeshareCompanyName
                            ? item.timeshareCompanyName
                            : "Đối tác"}
                        </p>{" "}
                        <p className="text-gray-500 text-md">{item.contact}</p>{" "}
                      </div>
                    </td>
                    <td className="p-4">{item.address}</td>
                    <td className="p-4 text-center">
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
                      <button onClick={() => fetchCompanyDetails(item.id)}>
                        <DotsVerticalIcon className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {
            allTimeshareCompany && allTimeshareCompany.length > 0 ? (
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

        <DetailTimeshareCompanyModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          company={selectedCompany}
        />
      </div>
    </>
  );
};

export default resortManagement;
