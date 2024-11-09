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
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";

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
            <span className="flex items-center bg-gradient-to-r from-red-100 to-red-300 text-red-700 px-3 py-1 rounded-full text-lg font-semibold shadow-lg transform transition duration-500 ease-in-out hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 12h3v8h14v-8h3L12 2zm5 15h-2v-4h-2v4H9v-4H7v4H5v-5.586L12 4.828l7 6.586V17h-2v-4h-2v4z" />
              </svg>
              Số lượng resort:{" "}
              <CountUp start={0} end={count} duration={2} className="ml-1" />
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
              <button className="bg-gradient-to-r from-blue-300 to-blue-400 border border-blue-300 text-gray-560 py-2 px-4 pr-10 rounded-xl shadow-md flex items-center justify-between cursor-pointer transition duration-300 ease-in-out transform hover:from-blue-400 hover:to-blue-300 hover:border-blue-500 focus:outline-none gap-4">
                <PlusIcon className="w-7 h-7" />
                Tạo mới resort
              </button>
            </Link>
          </div>
        </div>

        <div className="p-6">
          <table className="min-w-full bg-white border border-gray-200 ">
            <thead className="bg-gray-100 rounded-lg">
              <tr className="w-full bg-gray-300 border-b border-gray-200">
                <th className="p-4 text-left ml-3">STT</th>
                <th className="p-4 text-left">Resort</th>
                <th className="p-4 text-left">Logo</th>
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
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 flex items-center font-medium text-gray-700">
                      {item.resortName}
                    </td>
                    <td className="p-4">
                      <img
                        src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg"
                        alt="logo"
                        className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm"
                      />
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-sm font-medium ${item.isActive ? 'bg-green-200 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                      >
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${item.isActive ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        ></span>
                        <span>{item.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span>
                      </span>

                    </td>

                    <td className="p-4 flex gap-4">
                      <button className="hover:text-blue-500 transition duration-300 ease-in-out">
                        <Link to={`/timesharecompany/updateresort/${item.id}`}>
                          {" "}
                          <DocumentIcon color="gray" className="w-6 h-6" />
                        </Link>
                      </button>
                      <button className="hover:text-blue-500 transition duration-300 ease-in-out">
                        <DotsVerticalIcon className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : !allResort ? (
                <Loading />
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    Không tìm thấy gì
                  </td>
                </tr>
              )}
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
      </div>
    </>
  );
};

export default ResortManagementTSC;
