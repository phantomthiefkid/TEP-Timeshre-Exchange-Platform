import React, { useEffect, useState } from "react";
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

const ResortManagementTSC = () => {
  const [allResort, setAllResort] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
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
    <div>
      <div className="p-6 flex justify-between items-center">
        <div className="p-4">
          <h1 className="text-3xl text-gray-700 font-bold">Quản lí resort</h1>
          <p className="text-md font-medium text-gray-600 mt-2">
            Quản resort và các thông tin chi tiết
          </p>
        </div>
        <div className="flex space-x-4">
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-lg font-medium">
            Số lượng resort: <CountUp start={0} end={count} duration={2} />
          </span>
        </div>
      </div>

      <div className="flex justify-end items-center px-6">
        <div className="flex space-x-4">
          {/* Search User */}
          <input
            type="text"
            placeholder="Tìm kiếm resort..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
          />

          {/* Add New User */}
          <Link to={`/timesharecompany/createresort`}>
            <button className="bg-gradient-to-r from-blue-300 to-blue-400 border border-blue-300 text-gray-560 py-2 px-4 pr-10 rounded-xl shadow-md flex items-center justify-between cursor-pointer transition duration-300 ease-in-out transform hover:from-blue-400 hover:to-blue-300 hover:border-blue-500 focus:outline-none gap-4">
              <PlusIcon className="w-7 h-7" />
              Tạo mới resort
            </button>
          </Link>
        </div>
      </div>

      <div className="p-6">
        <table className="min-w-full bg-gray-50 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 rounded-lg">
            <tr className="text-left text-sm font-semibold uppercase tracking-wider text-gray-500 rounded-lg">
              <th className="p-4 rounded-l-lg" style={{ width: "5%" }}>
                STT
              </th>
              <th className="p-4" style={{ width: "40%" }}>
                Resort
              </th>
              <th className="p-4" style={{ width: "15%" }}>
                Logo
              </th>
              <th className="p-4" style={{ width: "20%" }}>
                Trạng thái
              </th>
              <th className="p-4 rounded-r-lg" style={{ width: "20%" }}>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allResort && allResort.length > 0 ? (
              allResort.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-100 transition duration-300 ease-in-out transform"
                >
                  <td className="p-4" style={{ width: "5%" }}>
                    {index + 1}
                  </td>
                  <td
                    className="p-4 flex items-center font-medium text-gray-700"
                    style={{ width: "40%" }}
                  >
                    {item.resortName}
                  </td>
                  <td className="p-4" style={{ width: "15%" }}>
                    <img
                      src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg"
                      alt="logo"
                      className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm"
                    />
                  </td>
                  <td className="p-4" style={{ width: "20%" }}>
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
                  <td className="p-4 flex gap-4" style={{ width: "20%" }}>
                    <button className="hover:text-blue-500 transition duration-300 ease-in-out">
                      <Link to={`/timesharecompany/updateresort/${item.id}`}>
                        <DocumentIcon color="gray" className="w-6 h-6" />
                      </Link>
                    </button>
                    <button className="hover:text-blue-500 transition duration-300 ease-in-out">
                      <DotsVerticalIcon className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Không tìm thấy gì
                </td>
              </tr>
            )}
          </tbody>
        </table>

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

export default ResortManagementTSC;
