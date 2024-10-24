import React from "react";
import { Outlet } from "react-router-dom";
import SidebarTimeshareCompany from "../../components/Sidebar/sidebarTimeshareCompany";

const TimeshareCompanyLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarTimeshareCompany className="fixed left-0 top-0 h-full" />

      <div className="flex-grow  bg-white flex flex-col">
        {/* <Header className="w-full" /> */}

        <div className="flex-grow p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TimeshareCompanyLayout;
