import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  HiCurrencyDollar,
  HiUsers,
  HiOfficeBuilding,
  HiBriefcase,
} from "react-icons/hi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import {
  getAllResort,
  getTotalMoney,
  getTotalResort,
  getTotalStaff,
  getAllWalletTransactions,
  getRevenueTSC,
} from "../../service/tsCompanyService/tsCompanyAPI";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FormatCurrency from "../../components/Validate/formatCurrency";
import CountUp from "react-countup";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCompany = () => {
  const today = new Date();
  const defaultStartDate = new Date(today);
  defaultStartDate.setDate(today.getDate() - 5);
  const [allResort, setAllResort] = useState([]);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(today);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalResort, setTotalResort] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [transactions, setTransactions] = useState(null);
  const [pageTransactions, setPageTransactions] = useState(0);
  const [sizeTransactions, setSizeTransactions] = useState(12);
  const [totalPagesTransactions, setTotalPagesTransactions] = useState(0);
  const [revenue, setRevenue] = useState({});
  const fetAllResort = async () => {
    try {
      let data = await getAllResort(page, size, "");
      // let amount = await getAllResort(0, 100, "");
      if (data.status === 200) {
        setAllResort(data.data.content);

        setTotalPages(data.data.totalPages);
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchRevenue = async () => {
    try {
      let data = await getRevenueTSC();
      if (data.status === 200) {
        setRevenue(data.data); // Lưu dữ liệu gốc
        const incomeData = processRevenueData(data.data); // Chuyển đổi dữ liệu
        setLineChartData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: incomeData, // Cập nhật mảng income
            },
          ],
        }));
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchTransactions = async () => {
    try {
      let data = await getAllWalletTransactions(
        pageTransactions,
        sizeTransactions
      );
      if (data.status === 200) {
        setTransactions(data.data.content);
        setTotalPagesTransactions(data.data.totalPages);
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchTotalMoney = async () => {
    try {
      let data = await getTotalMoney();
      if (data.status === 200) {
        setTotalMoney(data.data);
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchTotalStaff = async () => {
    try {
      let data = await getTotalStaff();
      if (data.status === 200) {
        setTotalStaff(data.data);
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchTotalResort = async () => {
    try {
      let data = await getTotalResort();
      if (data.status === 200) {
        setTotalResort(data.data);
      }
    } catch (error) {
      throw error;
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (pageTransactions < totalPagesTransactions - 1) {
      setPageTransactions(pageTransactions + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageTransactions > 0) {
      setPageTransactions(pageTransactions - 1);
    }
  };

  useEffect(() => {
    fetAllResort();
  }, [pageTransactions]);

  useEffect(() => {
    fetchTransactions();
  }, [pageTransactions]);

  useEffect(() => {
    fetchTotalMoney(), fetchTotalResort(), fetchTotalStaff(), fetchRevenue();
  }, []);

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  const processRevenueData = (revenue) => {
    const months = [
      "01-2024",
      "02-2024",
      "03-2024",
      "04-2024",
      "05-2024",
      "06-2024",
      "07-2024",
      "08-2024",
      "09-2024",
      "10-2024",
      "11-2024",
      "12-2024",
    ];
    return months.map((month) => revenue[month] || 0); // Nếu không có giá trị, trả về 0
  };

  const formatTransactionType = (type) => {
    switch (type) {
      case "REJECT_REQUESTEXCHANGE":
        return {
          label: "Từ chối yêu cầu trao đổi",
          style:
            "text-red-500 p-2 text-lg  rounded-2xl px-4 text-left",
       };
      case "APPROVAL_REQUESTEXCHANGE":
        return {
          label: "Duyệt yêu cầu trao đổi",
          style:
            " text-green-500   p-2 text-lg rounded-2xl px-4 text-left",
        };
      case "REJECT_EXCHANGEPOSTING":
        return {
          label: "Từ chối bài trao đổi",
          style:
            " text-red-500   p-2 text-lg rounded-2xl px-4 text-left",
        };
      case "APPROVAL_EXCHANGEPOSTING":
        return {
          label: "Duyệt bài trao đổi",
          style:
            " text-green-500   p-2 text-lg rounded-2xl px-4 text-left",
        };
      case "REJECT_RENTALPOSTING":
        return {
          label: "Từ chối bài cho thuê",
          style:
            " text-red-500   p-2 text-lg rounded-2xl px-4 text-left",
        };
      case "APPROVAL_RENTAL_POSTING":
        return {
          label: "Duyệt bài cho thuê",
          style:
            " text-green-500   p-2 text-lg rounded-2xl px-4 text-left",
        };
      default:
        return {
          label: "Không xác định",
          style:
            "text-gray-500 p-2 text-lg rounded-2xl px-4 text-left",
        };
    }
  };

  const [lineChartData, setLineChartData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    datasets: [
      {
        label: "Income",
        data: [], // Initially empty, will be updated
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        borderWidth: 5,
      },
    ],
  });

  const generateSampleProjects = () => {
    const pkgs = ["pkg1", "pkg2", "pkg3"];
    const projects = [];
    for (let i = 1; i <= 20; i++) {
      const randomDaysAgo = Math.floor(Math.random() * 30); // Random days between 0-30
      const dueDate = new Date();
      dueDate.setDate(today.getDate() - randomDaysAgo);

      projects.push({
        project: `Project ${i}`,
        progress: Math.floor(Math.random() * 100), // Random progress 0-100
        dueDate: dueDate.toISOString().split("T")[0],
        pkg: pkgs[Math.floor(Math.random() * pkgs.length)], // Random package
      });
    }
    return projects;
  };

  const [projects] = useState(generateSampleProjects());

  // Format date to dd/mm/yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Filter projects based on date range
  const filteredProjects = projects.filter((project) => {
    const projectDate = new Date(project.dueDate);
    return projectDate >= startDate && projectDate <= endDate;
  });

  // Group data by date and package
  const groupedData = filteredProjects.reduce((acc, project) => {
    const date = formatDate(project.dueDate);
    if (!acc[date]) acc[date] = { pkg1: 0, pkg2: 0, pkg3: 0 };
    acc[date][project.pkg] += 1;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Pkg1",
        data: Object.values(groupedData).map((data) => data.pkg1),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Pkg2",
        data: Object.values(groupedData).map((data) => data.pkg2),
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Pkg3",
        data: Object.values(groupedData).map((data) => data.pkg3),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Data for Pie Chart (Project categories)
  const pieChartData = {
    labels: ["pkg2", "pkg1", "pkg3"],
    datasets: [
      {
        label: "Projects",
        data: [20, 50, 30], // Percentages or counts
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(255, 99, 132, 0.5)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6 p-4">
      <div className="bg-white p-4 rounded-lg shadow-xl border-2 flex items-center space-x-4">
        {/* Icon */}
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h11M9 21V3m5 18l7-7-7-7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-600">Dashboard</h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Revenue */}
        <div
          className={`p-6 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-600 text-white shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl`}
        >
          <div className="flex items-center justify-between">
            <HiCurrencyDollar className="text-5xl" />
            <div className="text-right">
              <h3 className="text-lg font-semibold">Ví tiền</h3>
              <p className="text-3xl font-bold">
                <CountUp start={0} end={totalMoney} duration={3} />
              </p>
            </div>
          </div>
        </div>
        {/* Customer */}
        <div
          className={`p-6 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
        >
          <div className="flex items-center justify-between">
            <HiOfficeBuilding className="text-5xl" />
            <div className="text-right">
              <h3 className="text-lg font-semibold">Số lượng resort</h3>
              <p className="text-3xl font-bold">
                <CountUp start={0} end={totalResort} duration={3} />
              </p>
            </div>
          </div>
        </div>
        {/* Timeshare Company */}
        <div
          className={`p-6 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl`}
        >
          <div className="flex items-center justify-between">
            <HiUsers className="text-5xl" />
            <div className="text-right">
              <h3 className="text-lg font-semibold">Số lượng nhân viên</h3>
              <p className="text-3xl font-bold">
                <CountUp start={0} end={totalStaff} duration={3} />
              </p>
            </div>
          </div>
        </div>
       
      </div>

      {/* revenue analysis */}
      <div className="grid grid-cols-1 border-2 shadow-xl rounded-xl">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Doanh số</h3>
          <div className="w-full h-[550px] mx-auto">
            <Line data={lineChartData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Transaction */}
        <div className="bg-white p-6 border-2 shadow-xl rounded-xl col-span-2 h-full flex flex-col relative ">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Giao dịch</h3>
          </div>
          <div className="flex-grow overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 mb-10">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại giao dịch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mô tả
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giao dịch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions &&
                  transactions.map(
                    (
                      { transactionType, description, money, createdAt },
                      index
                    ) => (
                      <tr
                        key={index}
                        className="bg-white border-b hover:bg-slate-100"
                      >
                        <td className="px-2 py-4 text-center">
                          <span
                            className={`${formatTransactionType(transactionType).style
                              }`}
                          >
                            {formatTransactionType(transactionType).label}
                          </span>
                        </td>
                        <td className="px-2 py-4">
                          <span className="px-2 py-4 text-left">
                            {description}
                          </span>
                        </td>
                        <td className="px-2 py-4 text-center">{FormatCurrency(money)}</td>
                        <td className="px-2 py-4">{createdAt}</td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <div className="flex items-center justify-center absolute bottom-0 left-1/3 m-4">
              {transactions && transactions.length > 0 && (
                <div className="flex justify-between items-center space-x-1">
                  {/* Nút Previous */}
                  <button
                    onClick={handlePreviousPage}
                    disabled={pageTransactions === 0}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                  >
                    <FaChevronLeft />
                  </button>
                  {/* Nút Pagination */}
                  <div className="flex space-x-2 bg-gray-200 rounded-full px-2 py-1">
                    {Array.from(
                      { length: totalPagesTransactions },
                      (_, index) => {
                        // Hiển thị trang đầu, trang cuối, trang hiện tại, và các trang gần hiện tại
                        if (
                          index === 0 ||
                          index === totalPagesTransactions - 1 ||
                          (index >= pageTransactions - 1 &&
                            index <= pageTransactions + 1)
                        ) {
                          return (
                            <button
                              key={index}
                              onClick={() => setPageTransactions(index)}
                              className={`w-8 h-8 flex items-center justify-center rounded-full ${index === pageTransactions
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-500"
                                }`}
                            >
                              {index + 1}
                            </button>
                          );
                        }

                        // Hiển thị dấu "..." cho các khoảng cách lớn
                        if (
                          (index === pageTransactions - 2 &&
                            pageTransactions > 2) ||
                          (index === pageTransactions + 2 &&
                            pageTransactions < totalPagesTransactions - 3)
                        ) {
                          return (
                            <span
                              key={index}
                              className="w-8 h-8 flex items-center justify-center text-gray-500"
                            >
                              ...
                            </span>
                          );
                        }

                        return null; // Không hiển thị các nút khác
                      }
                    )}
                  </div>
                  <button
                    onClick={handleNextPage}
                    disabled={pageTransactions === totalPagesTransactions - 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Transaction */}
        <div className="bg-white p-6 border-2 shadow-xl rounded-xl col-span-1 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Danh sách resort</h3>
            <div className="flex space-x-2">
              <Link to={`/timesharecompany/resortmanagementtsc`}>
                <button className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                  Xem tất cả
                </button>
              </Link>
            </div>

          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resort
                </th>
              </tr>
            </thead>
            <tbody>
              {allResort &&
                allResort.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-slate-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                      <img
                        src={item.logo}
                        alt="Project Logo"
                        className="w-8 h-8 mr-2 rounded-md"
                      />
                      {item.resortName}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default DashboardCompany;
