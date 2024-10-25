import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../../components/Sidebar/sidebarAdmin";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin className="fixed left-0 top-0 h-full" />

      <div className="flex-grow  bg-white flex flex-col">
        {/* <Header className="w-full" /> */}

        <div className="flex-grow p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
