import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../components/Header/headerAdmin";
import SidebarAdmin from "../../components/Sidebar/sidebarAdmin";

const AdminLayout = () => {
  return (
    <div className="flex h-screen  overflow-hidden">
      <SidebarAdmin className="fixed left-0 top-0 h-full" />

      <div className="flex-grow  bg-white flex flex-col">
        <HeaderAdmin className="w-full" />

        <div className="flex-grow p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
