import React, { useEffect, useMemo, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCalendar,
  FaChevronLeft,
  FaChevronRight,
  FaCreditCard,
  FaList,
  FaRegBuilding,
} from "react-icons/fa";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";
import {
  getAllRentalPosting,
  getAllTransaction,
  getPackageByDate,
  getTotalCompany,
  getTotalCustomers,
  getTotalPackages,
  getTotalResorts,
} from "../../service/systemStaffService/systemStaffAPI";
import { FaHouseCircleCheck, FaUserGroup } from "react-icons/fa6";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

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

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [postingPage, setPostingPage] = useState(0);
  const [postingSize, setPostingSize] = useState(10);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [rentalPostings, setRentalPostings] = useState([]);
  const [totalResorts, setTotalResorts] = useState(0);
  const [totalTSComps, setTotalTSComps] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalRentalPackage, setTotalRentalPackage] = useState(0);
  const [totalExchangePackage, setTotalExchangePackage] = useState(0);
  const [totalMemberPackage, setTotalMemberPackage] = useState(0);
  const [allTransaction, setAllTransaction] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [walletTransactionEnum, setWalletTransactionEnum] = useState(null);

  const [totalRentalPackageChart, setTotalRentalPackageChart] = useState(0);
  const [totalExchangePackageChart, setTotalExchangePackageChart] = useState(0);
  const [totalMemberPackageChart, setTotalMemberPackageChart] = useState(0);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const today = new Date();

  const defaultStartDate = new Date(today);
  const defaultEndDate = new Date(today);
  defaultStartDate.setDate(today.getDate() - 3);
  defaultEndDate.setDate(today.getDate() + 3);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const lineChartData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh thu",
        data: [
          3000, 4000, 3500, 4500, 5000, 6000, 7000, 8000, 7500, 8500, 9000,
          9500,
        ],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(0, 153, 255, 0.2)",
        tension: 0.4,
      },
      {
        label: "Chi phí",
        data: [
          2000, 2500, 2400, 2600, 3000, 3200, 3500, 3700, 3600, 4000, 4200,
          4500,
        ],
        borderColor: "rgba(255, 0, 0, 1)",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        tension: 0.4,
      },
    ],
  };
  const lineChartOption = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(value);
          },
        },
      },
    },
  };

  // const generateDateLabels = (startDate, endDate) => {
  //   const labels = [];
  //   let currentDate = new Date(startDate);

  //   // Loop through each date from startDate to endDate
  //   while (currentDate <= endDate) {
  //     labels.push(format(currentDate, "dd/MM/yyyy"));
  //     currentDate.setDate(currentDate.getDate() + 1);  // Move to the next day
  //   }

  //   return labels;
  // };

  const barChartData = useMemo(
    () => ({
      // labels: generateDateLabels(startDate, endDate),
      labels: [
        startDate.getTime() === endDate.getTime()
          ? format(startDate, "dd/MM/yyyy")
          : `${format(startDate, "dd/MM/yyyy")} - ${format(
              endDate,
              "dd/MM/yyyy"
            )}`,
      ],
      datasets: [
        {
          label: "Gói cho thuê",
          data: [totalRentalPackageChart],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Gói trao đổi",
          data: [totalExchangePackageChart],
          backgroundColor: "rgba(0, 176, 155, 0.5)",
          borderColor: "rgba(0, 176, 155, 1)",
          borderWidth: 1,
        },
        {
          label: "Gói thành viên",
          data: [totalMemberPackageChart],
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    }),
    [
      startDate,
      endDate,
      totalRentalPackageChart,
      totalExchangePackageChart,
      totalMemberPackageChart,
    ]
  );

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const doughnutChartData = {
    labels: ["Gói trao đổi", "Gói cho thuê", "Gói thành viên"],
    datasets: [
      {
        label: "Số lượng",
        data: [totalExchangePackage, totalMemberPackage, totalRentalPackage],
        backgroundColor: [
          "rgba(0, 176, 155, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "#4a5352",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const doughnutChartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
  };
  const incomeDoughnutData = {
    labels: ["Gói cho thuê", "Gói trao đổi", "Gói thành viên"],
    datasets: [
      {
        data: [374820, 241600, 213420],
        backgroundColor: ["#2196F3", "#009688", "#FF9800"],
        borderWidth: 0,
      },
    ],
  };
  const incomeDoughnutOption = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(value);
          },
        },
      },
    },
    cutout: "80%",
  };

  const fetchAllTransaction = async () => {
    try {
      let data = await getAllTransaction(page, size, walletTransactionEnum);

      if (data.status === 200) {
        setAllTransaction(data.data.content);
        setTotalPages(data.data.totalPages);
      } else {
        console.error("Unexpected API response status:", data.status);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
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
  const transactionTypeEnum = {
    RENTALBOOKING: "Thanh toán đặt cho thuê",
    RENTALPOSTING: "Thanh toán đăng bài cho thuê",
    EXCHANGEPOSTING: "Thanh toán đăng bài trao đổi",
    RENTALREFUND: "Hoàn tiền cho thuê",
    EXCHANGEREFUND: "Hoàn tiền trao đổi",
    MEMBERSHIP: "Thanh toán gói thành viên",
    APPROVAL_RENTAL_POSTING: "Chấp thuận bài đăng cho thuê",
    APPROVAL_REQUESTEXCHANGE: "Chấp thuận yêu cầu trao đổi",
    APPROVAL_EXCHANGEPOSTING: "Chấp thuận bài đăng trao đổi",
    REJECT_EXCHANGEPOSTING: "Từ chối bài đăng trao đổi",
    REJECT_RENTALPOSTING: "Từ chối bài đăng cho thuê",
    REJECT_REQUESTEXCHANGE: "Từ chối yêu cầu trao đổi",
    DEPOSITMONEY: "Nạp tiền vào ví hệ thống",
    RENTALPACKAGE04: "Thanh toán gói trao đổi 4",
    APPROVAL_RENTALPOSTING: "Chấp thuận bài đăng cho thuê",
    EXCHANGEREQUEST: "Yêu cầu trao đổi",
    EXCHANGEREQUEST_VALUATION: "Thanh toán bù trừ trao đổi",
  };

  const fetchDashboardData = async () => {
    try {
      const [
        rentalPostingsData,
        resortsData,
        customersData,
        packagesData,
        totalCompanyData,
      ] = await Promise.all([
        getAllRentalPosting(),
        getTotalResorts(),
        getTotalCustomers(),
        getTotalPackages(),
        getTotalCompany(),
      ]);

      if (rentalPostingsData.status === 200) {
        setRentalPostings(rentalPostingsData.data.content);
      }
      if (resortsData.status === 200) {
        setTotalResorts(resortsData.data);
      }
      if (customersData.status === 200) {
        setTotalCustomers(customersData.data);
      }
      if (packagesData.status === 200) {
        setTotalRentalPackage(packagesData.data.totalRentalPackage);
        setTotalExchangePackage(packagesData.data.totalExchangePackage);
        setTotalMemberPackage(packagesData.data.totalMemberShip);
      }
      if (totalCompanyData.status === 200) {
        setTotalTSComps(totalCompanyData.data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  const fetchPackageAnalysisData = async () => {
    try {
      const startIsoDate = startDate.toISOString();
      const endIsoDate = endDate.toISOString();

      const response = await getPackageByDate(startIsoDate, endIsoDate);

      if (response.status === 200) {
        const data = response.data;
        console.log(
          data.totalRentalPackage,
          data.totalExchangePackage,
          data.totalMemberShip
        );

        setTotalRentalPackageChart(data.totalRentalPackage);
        setTotalExchangePackageChart(data.totalExchangePackage);
        setTotalMemberPackageChart(data.totalMemberShip);
      }
    } catch (error) {
      console.error("Error fetching package analysis data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDateChange = (date) => {
    if (endDate < date) {
      toast.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!");
      return;
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (startDate > date) {
      toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }
    setEndDate(date);
  };

  useEffect(() => {
    fetchAllTransaction();
  }, [page, size, walletTransactionEnum]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    fetchPackageAnalysisData();
  }, [startDate, endDate]);

  if (loading) {
    return <SpinnerWaiting />;
  }

  return (
    <div className="container mx-auto p-4 bg-white space-y-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-4 gap-6">
        {/* Revenue */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white h-48">
          <div className="flex items-center justify-center bg-blue-300 rounded-xl w-10 h-10 mb-8">
            <FaCreditCard size={22} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-base">Tổng doanh thu</h3>
            <p className="text-3xl font-bold">
              <CountUp
                start={0}
                end={totalRevenue || 829840}
                duration={2}
                separator=","
                prefix="₫ "
                decimals={0}
              />
            </p>
          </div>
          <FaCreditCard
            className="absolute bottom-0 right-0 w-36 h-36 opacity-10"
            style={{ bottom: -25, right: -16 }}
          />
        </div>
        {/* Customer */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-green-400 to-green-600 text-white h-48">
          <div className="flex items-center justify-center bg-green-300 rounded-xl w-10 h-10 mb-8">
            <FaUserGroup size={22} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-base">Tổng số khách hàng</h3>
            <p className="text-3xl font-bold">
              <CountUp start={0} end={totalCustomers} duration={2} />
            </p>
          </div>
          <FaUserGroup
            className="absolute bottom-0 right-0 w-36 h-36 opacity-10"
            style={{ bottom: -25, right: -16 }}
          />
        </div>
        {/* Timeshare Company */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-purple-400 to-purple-600 text-white h-48">
          <div className="flex items-center justify-center bg-purple-300 rounded-xl w-10 h-10 mb-8">
            <FaRegBuilding size={22} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-base">Tổng số công ty timeshare</h3>
            <p className="text-3xl font-bold">
              <CountUp start={0} end={totalTSComps} duration={2} />
            </p>
          </div>
          <FaRegBuilding
            className="absolute bottom-0 right-0 w-36 h-36 opacity-10"
            style={{ bottom: -25, right: -16 }}
          />
        </div>
        {/* Resort */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-600 text-white h-48">
          <div className="flex items-center justify-center bg-orange-300 rounded-xl w-10 h-10 mb-8">
            <FaHouseCircleCheck size={22} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-base">Tổng số resort</h3>
            <p className="text-3xl font-bold">
              <CountUp start={0} end={totalResorts} duration={2} />
            </p>
          </div>
          <FaHouseCircleCheck
            className="absolute bottom-0 right-0 w-36 h-36 opacity-10"
            style={{ bottom: -25, right: -16 }}
          />
        </div>
      </div>
      {/* revenue analysis */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 col-span-1">
          <h3 className="text-2xl font-semibold mb-4">Biến động</h3>
          <div className="flex flex-col justify-center items-center mt-6">
            <span className="text-gray-700 text-xl">Tổng doanh thu</span>
            <p className="text-3xl font-semibold mt-2 ">
              <CountUp
                start={0}
                end={829840}
                duration={2}
                separator=","
                prefix="₫ "
                decimals={0}
              />
            </p>
          </div>
          <div className="w-full">
            <div className="flex justify-between pt-16 px-3">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-1 h-4 bg-blue-500"></div>
                  <span className="text-gray-700">Gói cho thuê</span>
                </div>
                <p className="text-2xl font-semibold mt-2">
                  <CountUp
                    start={0}
                    end={374820}
                    duration={2}
                    separator=","
                    prefix="₫ "
                    decimals={0}
                  />
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-1 h-4 bg-teal-500"></div>
                  <span className="text-gray-700">Gói trao đổi</span>
                </div>
                <p className="text-2xl font-semibold mt-2">
                  <CountUp
                    start={0}
                    end={241600}
                    duration={2}
                    separator=","
                    prefix="₫ "
                    decimals={0}
                  />
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-1 h-4 bg-orange-500"></div>
                  <span className="text-gray-700">Gói thành viên</span>
                </div>
                <p className="text-2xl font-semibold mt-2">
                  <CountUp
                    start={0}
                    end={213420}
                    duration={2}
                    separator=","
                    prefix="₫ "
                    decimals={0}
                  />
                </p>
              </div>
            </div>
            <div className="relative w-full h-40 mt-20">
              <Doughnut
                data={incomeDoughnutData}
                options={incomeDoughnutOption}
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
          <h3 className="text-2xl font-semibold mb-4">Doanh số</h3>
          <div className="w-full h-auto">
            <Line data={lineChartData} options={lineChartOption} />
          </div>
        </div>
      </div>

      {/* Package analysis */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
          <div className="flex flex-row justify-between mb-4">
            <h3 className="text-2xl font-semibold mb-4">Thống kê bài đăng</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-gray-500">Từ ngày</span>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="px-3 py-1 border rounded w-full"
                  open={showStartDatePicker}
                  onClickOutside={() => setShowStartDatePicker(false)}
                  disabled
                />
                <FaCalendar
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowStartDatePicker(!showStartDatePicker)}
                />
              </div>
              <span className="text-gray-500">đến</span>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="px-3 py-1 border rounded w-full"
                  open={showEndDatePicker}
                  onClickOutside={() => setShowEndDatePicker(false)}
                  disabled
                />
                <FaCalendar
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowEndDatePicker(!showEndDatePicker)}
                />
              </div>
            </div>
          </div>
          <div className="h-auto">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
          <h3 className="text-2xl font-semibold mb-4">Thống kê gói</h3>
          <div className="h-auto">
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </div>
      </div>

      {/* Transaction and Postings */}
      <div className="grid grid-cols-3 gap-6">
        {/* Transaction Table */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200">
          <div className="flex flex-row justify-between">
            <h3 className="text-2xl font-semibold mb-4">
              Danh sách thanh toán
            </h3>

            <div className="flex items-center space-x-1 mb-4">
              <label
                htmlFor="transactionTypeFilter"
                className="text-base text-gray-500 mr-2"
              >
                Xếp theo:
              </label>
              <select
                id="transactionTypeFilter"
                onChange={(e) => {
                  const selectedType = e.target.value;
                  setWalletTransactionEnum(
                    selectedType === "all" ? null : selectedType
                  ); // Set the selected transaction type filter or reset to null
                  setPage(0); // Reset page number
                }}
                value={walletTransactionEnum || "all"} // Set to "all" when no filter is selected
                className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="all">Tất cả giao dịch</option>
                {Object.keys(transactionTypeEnum).map((key) => (
                  <option key={key} value={key}>
                    {transactionTypeEnum[key]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Loại giao dịch
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Phương thức thanh toán
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
              </tr>
            </thead>

            <tbody>
              {allTransaction.slice(0, 10).map((transaction, index) => (
                <tr key={transaction.id || index} className="bg-white border-b">
                  <td className="p-4 w-[310px] flex items-center">
                    <div
                      className={`flex justify-center items-center p-2 pb-2.5 pl-2.5 rounded-full shadow-md mr-3 ${
                        transaction.money < 0
                          ? "bg-gradient-to-r from-red-200 via-red-300 to-red-400"
                          : "bg-gradient-to-r from-green-200 via-green-300 to-green-400"
                      }`}
                    >
                      <img
                        src={
                          transaction.money < 0
                            ? "https://unwinds.s3.ap-southeast-2.amazonaws.com/1732484766160_send.png"
                            : "https://unwinds.s3.ap-southeast-2.amazonaws.com/1732484765718_receive.png"
                        }
                        alt="Transaction Icon"
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 font-semibold">
                        {transactionTypeEnum[transaction.transactionType] ||
                          transaction.transactionType}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {transaction.createdAt}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-left">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(transaction.money)}
                  </td>
                  <td className="p-4 w-56">
                    <div
                      className="border border-blue-300 bg-slate-50 rounded-full flex items-center p-2"
                      style={{ width: "170px", height: "50px" }}
                    >
                      <img
                        src={
                          transaction.paymentMethod === "VNPAY"
                            ? "https://unwinds.s3.ap-southeast-2.amazonaws.com/1732483786480_images.png"
                            : "https://unwinds.s3.ap-southeast-2.amazonaws.com/1732484223950_2 (2).png"
                        }
                        className="bg-white rounded-full w-10 h-10 p-1"
                        alt="Payment Method Icon"
                      />
                      <div className="max-w-full ml-4 flex flex-col">
                        <span className="text-black text-xs">
                          Thanh toán qua
                        </span>
                        <span className="text-black font-bold text-sm">
                          {transaction.paymentMethod === "VNPAY" ? (
                            <span className="text-black font-bold text-sm">
                              Ví VNPay
                            </span>
                          ) : (
                            <span className="text-black font-bold text-sm">
                              Ví hệ thống
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm w-72">
                    {transaction.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {allTransaction && allTransaction.length > 0 ? (
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
          ) : (
            <div className="flex flex-col items-center justify-center mt-5 w-full min-h-[370px] border-2 border-dashed border-gray-300 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100">
              <FaList className="text-gray-400 text-6xl animate-pulse mb-4" />
              <span className="text-gray-600 text-lg font-medium">
                Không có bài đăng cho thuê nào có sẵn
              </span>
            </div>
          )}
        </div>

        {/* Posting AwaitConfirmation */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 min-h-[50vh]">
          <div className="flex flex-row items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold">
              Danh sách chờ xác nhận giá
            </h3>
            <Link
              to="/systemstaff/valuationlist"
              className="text-blue-500 hover:underline hover:text-blue-700"
            >
              Xem tất cả
            </Link>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Tên Resort
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Định giá
                </th>
              </tr>
            </thead>
            <tbody>
              {rentalPostings &&
                rentalPostings
                  .filter((post) => post.status === "AwaitingConfirmation")
                  .slice(0, 10)
                  .map((post) => (
                    <tr
                      key={post.rentalPostingId}
                      className="bg-white border-b"
                    >
                      <td className="px-6 py-4 font-semibold">
                        {post.resortName}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(post.priceValuation)}
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

export default Dashboard;
