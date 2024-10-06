import { useState } from 'react'
import { BrowserRouter, createBrowserRouter, Route, Routes, Navigate  } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import AdminLayout from './pages/adminLayout/adminLayout'
import ResortManagement from './pages/adminLayout/resortManagement'
import TrackLogManagement from './pages/adminLayout/trackLogManagement'
import UserManagement from './pages/adminLayout/userManagement'
import TimeshareCompany from './pages/company/timeshareCompany'
import TimeshareCompanyDetail from './pages/company/timeshareCompanyDetail'
import LandingPage from './pages/landingpage/landingpage'
import ResortDetail from './pages/resort/resortDetail'
import ResortSearchList from './pages/resort/resortSearchList'
import SignIn from './pages/signin/signIn'
import SignUp from './pages/signup/signUp'
import Dashboard from './pages/systemStaffLayout/dashboard'
import FaqManagement from './pages/systemStaffLayout/faqManagement'
import PostManagement from './pages/systemStaffLayout/postManagement'
import SystemStaffLayout from './pages/systemStaffLayout/systemStaffLayout'
import EmployeeManagement from './pages/timeshareCompanyLayout/employeeManagement'
import ResortManagementTSC from './pages/timeshareCompanyLayout/resortManagementTSC'
import TimeshareCompanyLayout from './pages/timeshareCompanyLayout/timeshareCompanyLayout'
import FeeddbackList from './pages/timeshareStaffLayout/feedbackList'
import RentalListManagement from './pages/timeshareStaffLayout/rentalListManagement'
import RequestListManagement from './pages/timeshareStaffLayout/requestListManagement'
import TimeshareStaffLayout from './pages/timeshareStaffLayout/timeshareStaffLayout'
import viteLogo from '/vite.svg'


function App() {


  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resortsearchlist" element={<ResortSearchList />} />
        <Route path="/resortdetail/:id" element={<ResortDetail />} />
        <Route path="/timesharecompany" element={<TimeshareCompany />} />
        <Route path="/timesharecompanydetail" element={<TimeshareCompanyDetail />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="*" index element={<Navigate to="/admin/usermanagement" />} />
          <Route path="/admin/usermanagement" element={<UserManagement />} />
          <Route path="/admin/resortmanagement" element={<ResortManagement />} />
          <Route path="/admin/tracklogmanagement" element={<TrackLogManagement />} />
        </Route>

        <Route path="/systemstaff" element={<SystemStaffLayout />}>
          <Route path="*" index element={<Navigate to="/systemstaff/dashboard" />} />
          <Route path="/systemstaff/dashboard" element={<Dashboard />} />
          <Route path="/systemstaff/post" element={<PostManagement />} />
          <Route path="/systemstaff/faqs" element={<FaqManagement />} />
        </Route>

        <Route path="/timesharecompany" element={<TimeshareCompanyLayout />}>
          <Route path="*" index element={<Navigate to="/timesharecompany/resortmanagement" />} />
          <Route path="/timesharecompany/resortmanagementtsc" element={<ResortManagementTSC/>} />
          <Route path="/timesharecompany/employeemanagement" element={<EmployeeManagement/>} />          
        </Route>
        <Route path="/timesharestaff" element={<TimeshareStaffLayout />}>
          <Route path="*" index element={<Navigate to="/timesharestaff/rentalmanagement" />} />
          <Route path="/timesharestaff/rentalmanagement" element={<RentalListManagement/>} />
          <Route path="/timesharestaff/requestmanagement" element={<RequestListManagement/>} />  
          <Route path="/timesharestaff/feedback" element={<FeeddbackList/>} />        
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
