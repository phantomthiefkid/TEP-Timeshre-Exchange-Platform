import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../../components/Sidebar/sidebarAdmin";

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar luôn hiện */}
      <SidebarAdmin />

      {/* Phần Outlet này sẽ chứa các trang quản trị được điều hướng */}
      <div className="flex-grow ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
