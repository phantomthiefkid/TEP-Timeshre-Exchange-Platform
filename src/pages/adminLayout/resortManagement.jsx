import { DotsVerticalIcon, PlusIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../components/Header/headerAdmin";
import {
  createTimeshareCompany,
  getAllTimeshareCompany,
  getTimeshareCompanyById,
} from "../../service/adminAPIService/adminAPI";
import CreateTimeshareCompanyModal from "../../components/Modal/createTimeshareCompanyModal";
import DetailTimeshareCompanyModal from "../../components/Modal/detailTimeshareCompanyModal";
import { toast, Toaster } from "react-hot-toast";
import Loading from "../../components/LoadingComponent/loading";

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

  const fetchAllTimeshareCompany = async () => {
    try {
      let data = await getAllTimeshareCompany(page, size, timeshareCompanyName);
      if (data.status === 200) {
        setAllTimeshareCompany(data.data.content);
        setTotalPages(data.data.totalPages);
        setLoading(false);
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
    return <Loading />;
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <HeaderAdmin />
      <div className="p-6 flex justify-between items-center">
        <div className="p-4">
          <h1 className="text-3xl text-gray-700 font-bold">Quản lí đối tác</h1>
          <p className="text-md font-medium text-gray-600 mt-2">
            Quản lí đối tác công ty timeshare ở đây.
          </p>
        </div>
      </div>

      <div className="flex justify-end items-center p-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Tìm kiếm đối tác..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
          />

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 flex items-center gap-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500"
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
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr className="rounded-xl text-gray-500">
              <th className="text-left p-4 rounded-l-xl">STT</th>
              <th className="text-left p-4">Tên đối tác</th>
              <th className="text-left p-4">Địa chỉ</th>
              <th className="text-left p-4">Trạng thái</th>
              <th className="text-left p-4"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {allTimeshareCompany &&
              allTimeshareCompany.map((item, index) => (
                <tr key={index}>
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

        <div className="flex justify-between items-center p-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Previous
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
            Next
          </button>
        </div>
      </div>

      <DetailTimeshareCompanyModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        company={selectedCompany}
      />
    </div>
  );
};

export default resortManagement;
