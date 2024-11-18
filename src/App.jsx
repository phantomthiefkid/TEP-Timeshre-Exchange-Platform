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
import SignInStaff from "./pages/signin/signInStaff";
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
import RentalPostingManagement from "./pages/timeshareStaffLayout/rentalPostingMNG";
import ExchangePostingManagement from "./pages/timeshareStaffLayout/exchangePostingMNG";
import ExchangVerifyManagement from "./pages/timeshareStaffLayout/exchangeVerifyMNG";
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
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import CreateResort from "./pages/timeshareCompanyLayout/createResort/createResort";
import Test from "./pages/timeshareCompanyLayout/createResort/test";
import UpdateResort from "./pages/timeshareCompanyLayout/updateResort/updateResort";
import CreatePosting from "./pages/systemStaffLayout/createPosting";
import ValuationList from "./pages/systemStaffLayout/valuationList";
import Feedback from "./pages/systemStaffLayout/feedback";
import FeedbackResortDetail from "./pages/systemStaffLayout/feedbackResortDetail";
import BlogManagement from "./pages/systemStaffLayout/blogManagement/blogManagement";
import CreateBlog from "./pages/systemStaffLayout/blogManagement/createBlog";
import BlogDetail from "./pages/systemStaffLayout/blogManagement/blogDetail";
import BlogListGuest from "./pages/landingpage/blog/blogListGuest";
import BlogDetailGuest from "./pages/landingpage/blog/blogDetailGuest";
import ProfileTsCompany from "./pages/timeshareCompanyLayout/profileTsCompany";
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
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signin/staff" element={<SignInStaff />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resortsearchlist" element={<ResortSearchList />} />
        <Route path="/resortdetail/:id" element={<ResortDetail />} />
        <Route path="/blogs" element={<BlogListGuest />} />
        <Route path="/blogs/:id" element={<BlogDetailGuest />} />
        <Route path="/timesharecompanylist" element={<TimeshareCompany />} />
        <Route
          path="/timesharecompanydetail/:tsId"
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
            <Route path="createposting" element={<CreatePosting />} />
            <Route path="valuationList" element={<ValuationList />} />
            <Route path="blogmanagement" element={<BlogManagement />} />
            <Route path="blogmanagement/newblog" element={<CreateBlog />} />
            <Route path="feedbackmng" element={<Feedback />} />
            <Route path="blogmanagement/:id" element={<BlogDetail />} />
            <Route
              path={`feedbackdetail/:id`}
              element={<FeedbackResortDetail />}
            />
          </Route>
        </Route>

        {/* Timeshare company routes */}
        <Route
          path="/timesharecompany"
          element={
            <ProtectRoute
              isAllowed={isLogin && role === "TIMESHARECOMPANY"}
              redirectPath="/signin"
            />
          }
        >
          <Route path="/timesharecompany" element={<TimeshareCompanyLayout />}>
            <Route index element={<ResortManagementTSC />} />
            <Route
              path="resortmanagementtsc"
              element={<ResortManagementTSC />}
            />
            <Route path="employeemanagement" element={<EmployeeManagement />} />
            <Route path="createresort" element={<CreateResort />} />
            <Route path="updateresort/:id" element={<UpdateResort />} />
            <Route path="profiletscompany" element={<ProfileTsCompany />} />
          </Route>
        </Route>
        {/* Timeshare staff routes */}
        <Route path="/timesharestaff" element={<TimeshareStaffLayout />}>
          <Route index element={<RentalListManagement />} />
          <Route path="rentalmanagement" element={<RentalListManagement />} />
          <Route
            path="rentalpostingmanagement"
            element={<RentalPostingManagement />}
          />
          <Route
            path="exchangepostingmanagement"
            element={<ExchangePostingManagement />}
          />
          <Route
            path="exchangeverifymanagement"
            element={<ExchangVerifyManagement />}
          />
          <Route path="feedback" element={<FeeddbackList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
