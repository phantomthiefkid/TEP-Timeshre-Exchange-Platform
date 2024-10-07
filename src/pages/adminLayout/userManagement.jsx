import { DocumentIcon, DotsVerticalIcon, PlusIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';

import { userData } from '../../util/ResortData';
import CountUp from 'react-countup'
import HeaderAdmin from '../../components/Header/headerAdmin';
import { getAllUser } from '../../service/adminAPIService/adminAPI';
const UserManagement = () => {
  const [allUser, setAllUser] = useState([]);
  const fetchAllUser = async () => {
    let data = await getAllUser();
    try {
      setAllUser(data.data.content)
      console.log(data.data.content)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAllUser();
  }, [])
  return (
    <div>
      <HeaderAdmin />

      {/* Page Title and Description */}
      <div className="p-6 flex justify-between items-center">
        <div className='p-4'>
          <h1 className="text-3xl text-gray-700 font-bold">Quản lí người dùng</h1>
          <p className="text-md font-medium text-gray-600 mt-2">Quản lí tài khoản người dùng và quyền hạn tài khoản ở đây.</p>
        </div>
        <div className="flex space-x-4">
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">Tất cả: <CountUp start={0} end={40} duration={2} /></span>
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">Customer: <CountUp start={0} end={20} duration={2} /></span>
          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium">System Staff: <CountUp start={0} end={10} duration={2} /></span>
          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-sm font-medium">Timeshare Company: <CountUp start={0} end={10} duration={2} /></span>
        </div>
      </div>

      <div className="flex justify-end items-center p-6">
        <div className="flex space-x-4">
          {/* Search User */}
          <input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Filter */}
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">Tất cả</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="editor">Editor</option>
          </select>

          {/* Add New User */}
          <button className="px-6 flex items-center gap-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500">
            <PlusIcon className='w-7 h-7' />
            Thêm người dùng mới
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="p-6">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr className="rounded-xl text-gray-500">
              <th className="text-left p-4 rounded-l-xl">STT</th>
              <th className="text-left p-4">Họ và tên</th>
              <th className="text-left p-4">Số điện thoại</th>
              <th className="text-left p-4">Vai trò</th>
              <th className="text-left p-4">Trạng thái</th>
              <th className="text-left p-4">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {allUser && allUser.map((item, index) => (
              <tr key={index}>
                <td className="p-4">{index + 1}</td>
                <td className="p-4 flex items-center">
                  <img
                    src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=GF-jF4aByOYQ7kNvgH44j7n&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AyHc8LeK2Ims_L1Rgaj2CbU&oh=00_AYDHhjUXq1VxCYQcpSWtwpX0zSw8lefq0FzEpUIg2uuszA&oe=670A0CD9            "
                    alt={`${item.name}'s avatar`}
                    className="w-10 h-10 rounded-full mr-2" // Adjust size as needed
                  />
                  <div>
                    <p className="font-semibold text-gray-700 text-lg">{item.userName? item.userName : "Null"}</p> {/* Display Name */}
                    <p className="text-gray-500 text-md">{item.email}</p> {/* Display Email */}
                  </div>
                </td>
                <td className="p-4">{item.phone}</td>
                <td className="p-4">{item.roleRoleName}</td>
                <td className="p-4 text-center">
                  {/* <input
                    type="checkbox"
                    checked={item.state}
                    className={`w-6 h-6 ${item.state ? 'bg-green-500' : 'bg-gray-300'}`}
                  /> */}
                  <label class="flex items-center">
                    <input type="checkbox" checked={item.state} class="sr-only peer" disabled />
                    <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-400 dark:text-gray-500">Disabled toggle</span>
                  </label>
                </td>
                <td className="p-4 flex gap-4">

                  <button><DocumentIcon color='gray' className='w-6 h-6' /></button>
                  <button><DotsVerticalIcon className='w-6 h-6' /></button>

                </td>

              </tr>
            ))}




          </tbody>
        </table>



      </div>
    </div>
  );
};

export default UserManagement;
