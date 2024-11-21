import React, { useEffect, useState } from "react";
import bgSignIn from "../../assets/bgSignInSignUp.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setError,
  setIsLoading,
  setIsLogin,
  setRoleName,
  setUserId,
} from "../../redux/UserSlice/SignIn";
import { jwtDecode } from "jwt-decode";
import { getAllTimeshareCompany } from "../../service/public/resortService/resortAPI";
import { staffLogin } from "../../service/accountAPI/accountService";
import { FaLock, FaUser } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";

const SignInStaff = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.isLogin.isError);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllTimeshareCompany();
        if (data && data.status === 200) {
          setCompanyList(data.data.content);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleLoginEvent = async (e) => {
    e.preventDefault();

    let userCredentials = {
      tsCompanyId: selectedCompany,
      username: userName,
      password: password,
    };

    try {
      const data = await staffLogin(userCredentials);

      if (data && data.data && data.data.accessToken) {
        const decodedToken = jwtDecode(data.data.accessToken);
        const roleName = decodedToken.RoleName; // Giả sử token có trường RoleName

        localStorage.setItem("token", data.data.accessToken);
        localStorage.setItem("roleName", roleName);

        dispatch(setIsLogin(true));
        dispatch(setRoleName(roleName)); // Lưu RoleName vào Redux
        dispatch(setIsLoading(false));
        dispatch(setError(false));
        dispatch(setUserId(decodedToken.userId));
        dispatch(setError(false));

        if (roleName === "TIMESHARECOMPANYSTAFF") {
          navigate("/timesharestaff");
        } else {
          navigate("/");
        }
      } else {
        dispatch(setError(true));
        console.error("Login failed:", data.error || "Unknown error");
      }
    } catch (error) {
      dispatch(setError(true));
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-[100vh] grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block w-full">
        <img
          className="max-h-[100vh] w-full object-cover"
          src={bgSignIn}
          alt="Background"
        />
      </div>

      <div className="relative col-span-1 flex justify-center items-center p-6 lg:p-12">
        <div className="relative w-full max-w-md">
          <div className="mb-8 text-center">
            <a href="/">
              <img
                className="w-[200px] lg:w-[205px] mx-auto"
                src="https://unwinds.s3.ap-southeast-2.amazonaws.com/1731986300333_logoTEPblack.png"
                alt="Logo"
              />
            </a>
          </div>

          <form className="space-y-6 bg-white p-6" onSubmit={handleLoginEvent}>
            <div className="relative">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Công ty Timeshare
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 top-6 flex items-center pointer-events-none">
                <FaBuildingUser />
              </div>
              <select
                id="company"
                name="company"
                required
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="mt-1 block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>
                  Vui lòng chọn công ty
                </option>
                {companyList.length > 0 &&
                  companyList.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.timeshareCompanyName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Tên đăng nhập
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 top-6 flex items-center pointer-events-none">
                <FaUser />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Nhập tên đăng nhập của bạn"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>

              {/* Lock Icon */}
              <div className="absolute inset-y-0 left-0 pl-3 top-6 flex items-center pointer-events-none">
                <FaLock />
              </div>

              {/* Password Input Field */}
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Error message */}
            <div className="space-y-3">
              <span className="text-red-600">
                {error ? "Tài khoản hoặc mật khẩu không đúng!!" : ""}
              </span>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Đăng nhập
              </button>
            </div>

            {/* User login button */}
            <div className="space-y-3 mt-3">
              <button
                type="button"
                onClick={() => navigate("/signin")} // Navigates to user login page
                className="w-full py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Đăng nhập người dùng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInStaff;
