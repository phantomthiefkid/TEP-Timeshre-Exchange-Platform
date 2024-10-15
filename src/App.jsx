import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectRoute from "./auth/protectRoute";
import AdminLayout from "./pages/adminLayout/adminLayout";
import ResortManagement from "./pages/adminLayout/resortManagement";
import TrackLogManagement from "./pages/adminLayout/trackLogManagement";
import UserManagement from "./pages/adminLayout/userManagement";
import TimeshareCompany from "./pages/company/timeshareCompany";
import TimeshareCompanyDetail from "./pages/company/timeshareCompanyDetail";
import LandingPage from "./pages/landingpage/landingpage";
import ResortDetail from "./pages/resort/resortDetail";
import ResortSearchList from "./pages/resort/resortSearchList";
import SignIn from "./pages/signin/signIn";
import SignUp from "./pages/signup/signUp";
import Dashboard from "./pages/systemStaffLayout/dashboard";
import FaqManagement from "./pages/systemStaffLayout/faqManagement";
import PostManagement from "./pages/systemStaffLayout/postManagement";
import SystemStaffLayout from "./pages/systemStaffLayout/systemStaffLayout";
import EmployeeManagement from "./pages/timeshareCompanyLayout/employeeManagement";
import ResortManagementTSC from "./pages/timeshareCompanyLayout/resortManagementTSC";
import TimeshareCompanyLayout from "./pages/timeshareCompanyLayout/timeshareCompanyLayout";
import FeeddbackList from "./pages/timeshareStaffLayout/feedbackList";
import RentalListManagement from "./pages/timeshareStaffLayout/rentalListManagement";
import RequestListManagement from "./pages/timeshareStaffLayout/requestListManagement";
import TimeshareStaffLayout from "./pages/timeshareStaffLayout/timeshareStaffLayout";
import AboutUs from "./pages/about/aboutUs";
import Faqs from "./pages/faqs/faq";
import Policy from "./pages/policy/policy";
import Contact from "./pages/contact/contact";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { setIsLogin, setRoleName, setUserId } from "./redux/UserSlice/SignIn";
import Loading from "./components/LoadingComponent/loading";
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
function App() {
  const dispatch = useDispatch();
  const { isLogin, role } = useSelector((state) => state.isLogin);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("roleName", decodedToken.RoleName);
        dispatch(setRoleName(decodedToken.RoleName));
        dispatch(setIsLogin(true));
        dispatch(setUserId(decodedToken.userId));
      } catch (error) {
        console.log("Invalid token", error);
        localStorage.removeItem("token");
        localStorage.removeItem("roleName");
      }
    }
    setIsLoading(false);
  }, [dispatch]);
  if (isLoading) {
    return <Loading />; // Hiển thị trạng thái chờ khi kiểm tra đăng nhập
  }
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resortsearchlist" element={<ResortSearchList />} />
        <Route path="/resortdetail/:id" element={<ResortDetail />} />
        <Route
          path="/timesharecompanyinformation"
          element={<TimeshareCompany />}
        />
        <Route
          path="/timesharecompanydetail"
          element={<TimeshareCompanyDetail />}
        />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectRoute
              isAllowed={isLogin && role === "ADMIN"}
              redirectPath="/signin"
            />
          }
        >
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/usermanagement" />} />
            <Route path="/admin/usermanagement" element={<UserManagement />} />
            <Route
              path="/admin/resortmanagement"
              element={<ResortManagement />}
            />
            <Route
              path="/admin/tracklogmanagement"
              element={<TrackLogManagement />}
            />
          </Route>
        </Route>

        {/* System staff routes */}
        <Route
          path="/systemstaff"
          element={
            <ProtectRoute
              isAllowed={isLogin && role === "SYSTEMSTAFF"}
              redirectPath="/signin"
            />
          }
        >
          <Route element={<SystemStaffLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="post" element={<PostManagement />} />
            <Route path="faqs" element={<FaqManagement />} />
          </Route>
        </Route>

        {/* Timeshare company routes */}
        <Route path="/timesharecompany" element={<TimeshareCompanyLayout />}>
          <Route index element={<ResortManagementTSC />} />
          <Route path="resortmanagementtsc" element={<ResortManagementTSC />} />
          <Route path="employeemanagement" element={<EmployeeManagement />} />
        </Route>

        {/* Timeshare staff routes */}
        <Route path="/timesharestaff" element={<TimeshareStaffLayout />}>
          <Route index element={<RentalListManagement />} />
          <Route path="rentalmanagement" element={<RentalListManagement />} />
          <Route path="requestmanagement" element={<RequestListManagement />} />
          <Route path="feedback" element={<FeeddbackList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
