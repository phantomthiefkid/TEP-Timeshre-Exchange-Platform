import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
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
  const today = new Date();
  const defaultStartDate = new Date(today);
  defaultStartDate.setDate(today.getDate() - 5);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(today);

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  const [transaction] = useState([
    {
      project: "Website Redesign",
      progress: 80,
      dueDate: "23 Aug 2023",
      pkg: "pkg1",
      logo: "https://placehold.co/24x24",
    },
    {
      project: "Landing Page Redesign",
      progress: 60,
      dueDate: "16 Aug 2023",
      pkg: "pkg1",
      logo: "https://placehold.co/24x24",
    },
    {
      project: "Redesign Steam Wallet",
      progress: 49,
      dueDate: "29 Jul 2023",
      pkg: "pkg1",
      logo: "https://placehold.co/24x24",
    },
    {
      project: "Internal CMS Tools",
      progress: 100,
      dueDate: "22 Jun 2023",
      pkg: "pkg2",
      logo: "https://placehold.co/24x24",
    },
    {
      project: "E-Commerce App Phase 01",
      progress: 20,
      dueDate: "01 Jun 2023",
      pkg: "pkg3",
      logo: "https://placehold.co/24x24",
    },
    {
      project: "Netflix UX Evaluation",
      progress: 20,
      dueDate: "01 Jun 2023",
      pkg: "pkg3",
      logo: "https://placehold.co/24x24",
    },
  ]);

  const lineChartData = {
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
      "Dec",
    ],
    datasets: [
      {
        label: "Income",
        data: [
          3000, 4000, 3500, 4500, 5000, 6000, 7000, 8000, 7500, 8500, 9000,
          9500,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Outcome",
        data: [
          2000, 2500, 2400, 2600, 3000, 3200, 3500, 3700, 3600, 4000, 4200,
          4500,
        ],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  };

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
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        {/* Revenue */}
        <div className={`p-4 rounded-lg bg-gray-400 text-white`}>
          <div>Icon</div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Tổng doanh thu</h3>
              <p className="text-2xl font-bold">90,000 VNĐ</p>
            </div>
          </div>
        </div>
        {/* Customer */}
        <div className={`p-4 rounded-lg bg-gray-400 text-white`}>
          <div>Icon</div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                Tổng số lượng khách hàng
              </h3>
              <p className="text-2xl font-bold">300</p>
            </div>
          </div>
        </div>
        {/* Timeshare Company */}
        <div className={`p-4 rounded-lg bg-gray-400 text-white`}>
          <div>Icon</div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                Tổng số Công Ty Timeshare
              </h3>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
        {/* Resort */}
        <div className={`p-4 rounded-lg bg-gray-400 text-white`}>
          <div>Icon</div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Tổng số Resort</h3>
              <p className="text-2xl font-bold">233</p>
            </div>
          </div>
        </div>
      </div>
      {/* revenue analysis */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Biến động</h3>
          <div className="w-full">Income out Come</div>
        </div>
        <div className="col-span-2 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Doanh số</h3>
          <div className="w-full h-[420px]">
            <Line data={lineChartData} />
          </div>
        </div>
      </div>

      {/* Package analysis */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex flex-row justify-between">
            <h3 className="text-lg font-semibold mb-4">Thống kê bài đăng</h3>
            {/* Date Filter */}
            <div className="flex space-x-2 items-center">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                className="px-3 py-2 border rounded"
              />
              <span className="text-gray-500">to</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                className="px-3 py-2 border rounded"
              />
            </div>
          </div>
          <div className="h-auto">
            <Bar data={barChartData} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Thống kê gói</h3>
          <div className="h-auto">
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>

      {/* Transaction */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Project</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-200 rounded-lg">
              Select Due Date
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg">
              Filters
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              See All
            </button>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package
              </th>
            </tr>
          </thead>
          <tbody>
            {transaction.map(
              ({ project, logo, progress, dueDate, pkg }, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <img
                      src={logo}
                      alt="Project Logo"
                      className="w-6 h-6 mr-2"
                    />
                    {project}
                  </td>
                  <td className="px-6 py-4">
                    <ProgressBar progress={progress} />
                  </td>
                  <td className="px-6 py-4">{dueDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        pkg === "pkg1"
                          ? "bg-yellow-100 text-yellow-800"
                          : pkg === "pkg2"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pkg}
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">Showing 1-6 from 100</p>
          <div className="flex space-x-1">
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded-lg">2</button>
            <button className="px-3 py-1 bg-gray-200 rounded-lg">3</button>
            <button className="px-3 py-1 bg-gray-200 rounded-lg">...</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
