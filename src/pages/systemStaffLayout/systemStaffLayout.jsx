import React from "react";
import { Outlet } from "react-router-dom";
import HeaderSystemStaff from "../../components/Header/headerSystemStaff";
import SidebarSystemStaff from "../../components/Sidebar/sidebarSystemStaff";

const SystemStaffLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarSystemStaff className="fixed left-0 top-0 h-full" />

      <div className="flex-grow  bg-white flex flex-col">
        <HeaderSystemStaff className="w-full" />

        <div className="flex-grow p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SystemStaffLayout;
