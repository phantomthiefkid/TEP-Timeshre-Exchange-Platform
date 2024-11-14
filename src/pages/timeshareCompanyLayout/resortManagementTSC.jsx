import React, { useEffect, useState } from "react";
import Header from "../../components/Header/headerOtherRole";
import CountUp from "react-countup";
import {
  DocumentIcon,
  DotsVerticalIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import { getAllResort } from "../../service/tsCompanyService/tsCompanyAPI";
import Loading from "../../components/LoadingComponent/loading";
import { Link } from "react-router-dom";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import { FaChevronLeft, FaChevronRight, FaInfoCircle, FaSearch } from "react-icons/fa";
import FormatCurrency from "../../components/Validate/formatCurrency";

const ResortManagementTSC = () => {
  const [allResort, setAllResort] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [resortName, setResortName] = useState("");
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const fetAllResort = async () => {
    try {
      let data = await getAllResort(page, size, resortName);
      let amount = await getAllResort(0, 100, "");
      if (data.status === 200) {
        setAllResort(data.data.content);
        setTotalPages(data.data.totalPages);
        setLoading(false);
        setCount(amount.data.content.length);
      }
    } catch (error) {
      throw error;
    }
  };

  // Pagination handlers
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

  // Search handler
  const handleSearch = (e) => {
    setResortName(e.target.value);
    setPage(0); // Reset to first page
  };

  useEffect(() => {
    fetAllResort();
  }, [page, resortName]);

  if (loading) {
    return <SpinnerWaiting />;
  }

  return (
    <>
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
        <div className="p-6 flex justify-between items-center">
          <div className="py-4 p-6 space-y-2">
            <h1 className="text-4xl font-bold text-gray-700">Quản lí resort</h1>
            <h3 className="text-xl text-gray-500">
              Quản lí resort và các thông tin chi tiết
            </h3>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-2 bg-red-200 text-red-600 px-4 py-2 rounded-lg shadow-md hover:bg-red-300 hover:shadow-lg transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 12h3v8h14v-8h3L12 2zm5 15h-2v-4h-2v4H9v-4H7v4H5v-5.586L12 4.828l7 6.586V17h-2v-4h-2v4z" />
              </svg>
              Số lượng resort:{" "}
              <CountUp start={0} end={count} duration={4} className="ml-1" />
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 mt-3 py-4">
          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xl">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Tìm kiếm resort..."
              className="outline-none bg-transparent w-full text-gray-600 placeholder-gray-500"
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Link to={`/timesharecompany/createresort`}>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg shadow-lg flex items-center gap-3 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform focus:outline-none">
                <PlusIcon className="w-7 h-7" />
                Tạo mới resort
              </button>
            </Link>
          </div>
        </div>

        <div className="p-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 rounded-lg">
              <tr className="w-full bg-gray-300 border-b border-gray-200">
                <th className="p-4 text-left">STT</th>
                <th className="p-4 text-left">Resort</th>
                <th className="p-4 text-left">Giá Tối Thiểu</th>
                <th className="p-4 text-left">Giá Tối Đa</th>
                <th className="p-4 text-left">Địa chỉ</th>
                <th className="p-4 text-left">Trạng thái</th>
                <th className="p-4 text-left"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allResort && allResort.length > 0 ? (
                allResort.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-slate-100"
                  >
                    {/* STT */}
                    <td className="p-4">{index + 1}</td>

                    {/* Resort Name and Logo */}
                    <td className="p-4 flex items-center space-x-3 font-medium text-gray-700">
                      <img
                        src={item.logo || "default-logo.png"} // Placeholder if logo is null
                        alt="logo"
                        className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm"
                      />
                      <span>{item.resortName}</span>
                    </td>

                    {/* Min Price */}
                    <td className="p-4 text-gray-700">
                      {item.minPrice ? FormatCurrency(item.minPrice) : "N/A"}
                    </td>

                    {/* Max Price */}
                    <td className="p-4 text-gray-700">
                      {item.maxPrice ? FormatCurrency(item.maxPrice) : "N/A"}
                    </td>

                    {/* Address */}
                    <td className="p-4 text-gray-700">{item.address || "N/A"}</td>

                    {/* Timeshare Company ID */}


                    {/* Status */}
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

                    {/* Actions */}
                    <td className="p-4 flex gap-4">
                      <button className="hover:text-blue-500 transition duration-300 ease-in-out">
                        <Link to={`/timesharecompany/updateresort/${item.id}`}>
                          <FaInfoCircle className="w-6 h-6 text-gray-500 hover:text-blue-500 hover:scale-105 duration-150" />
                        </Link>
                      </button>
                    </td>
                  </tr>
                ))
              ) :  (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    Không tìm thấy gì
                  </td>
                </tr>
              ) }
            </tbody>
          </table>

          {allResort && allResort.length > 0 ? (
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
        </div>
      </div>
    </>
  );
};

export default ResortManagementTSC;
