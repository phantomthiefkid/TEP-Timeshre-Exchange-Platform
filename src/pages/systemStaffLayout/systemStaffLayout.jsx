import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarSystemStaff from '../../components/Sidebar/sidebarSystemStaff'

const SystemStaffLayout = () => {
    return (
        <div className='flex'>
        <SidebarSystemStaff/>
        <div className="flex-grow p-6">
          <Outlet />
        </div>
      </div>
    )
}

export default SystemStaffLayout