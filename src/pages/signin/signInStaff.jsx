import React, { useEffect, useState } from "react";
import bgSignIn from "../../assets/bgSignInSignUp.png";
import logoTEP from "../../assets/logoTEPblack.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError, setIsLogin, setUserId } from "../../redux/UserSlice/SignIn";
import { jwtDecode } from "jwt-decode";
import { getAllTimeshareCompany } from "../../service/public/resortService/resortAPI";
import { staffLogin } from "../../service/accountAPI/accountService";

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
        localStorage.setItem("token", data.data.accessToken);
        dispatch(setIsLogin(true));
        dispatch(setUserId(decodedToken.userId));
        dispatch(setError(false));
        navigate("/timesharestaff");
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
                src={logoTEP}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                >
                  <path d="M8 2L8 6L4 6L4 48L15 48L15 39L19 39L19 48L30 48L30 6L26 6L26 2 Z M 10 10L12 10L12 12L10 12 Z M 14 10L16 10L16 12L14 12 Z M 18 10L20 10L20 12L18 12 Z M 22 10L24 10L24 12L22 12 Z M 32 14L32 18L34 18L34 20L32 20L32 22L34 22L34 24L32 24L32 26L34 26L34 28L32 28L32 30L34 30L34 32L32 32L32 34L34 34L34 36L32 36L32 38L34 38L34 40L32 40L32 42L34 42L34 44L32 44L32 48L46 48L46 14 Z M 10 15L12 15L12 19L10 19 Z M 14 15L16 15L16 19L14 19 Z M 18 15L20 15L20 19L18 19 Z M 22 15L24 15L24 19L22 19 Z M 36 18L38 18L38 20L36 20 Z M 40 18L42 18L42 20L40 20 Z M 10 21L12 21L12 25L10 25 Z M 14 21L16 21L16 25L14 25 Z M 18 21L20 21L20 25L18 25 Z M 22 21L24 21L24 25L22 25 Z M 36 22L38 22L38 24L36 24 Z M 40 22L42 22L42 24L40 24 Z M 36 26L38 26L38 28L36 28 Z M 40 26L42 26L42 28L40 28 Z M 10 27L12 27L12 31L10 31 Z M 14 27L16 27L16 31L14 31 Z M 18 27L20 27L20 31L18 31 Z M 22 27L24 27L24 31L22 31 Z M 36 30L38 30L38 32L36 32 Z M 40 30L42 30L42 32L40 32 Z M 10 33L12 33L12 37L10 37 Z M 14 33L16 33L16 37L14 37 Z M 18 33L20 33L20 37L18 37 Z M 22 33L24 33L24 37L22 37 Z M 36 34L38 34L38 36L36 36 Z M 40 34L42 34L42 36L40 36 Z M 36 38L38 38L38 40L36 40 Z M 40 38L42 38L42 40L40 40 Z M 10 39L12 39L12 44L10 44 Z M 22 39L24 39L24 44L22 44 Z M 36 42L38 42L38 44L36 44 Z M 40 42L42 42L42 44L40 44Z" />{" "}
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-10 1.68-10 5v2h20v-2c0-3.32-6.69-5-10-5z" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 17a2 2 0 110-4 2 2 0 010 4zm6-7V9a6 6 0 00-12 0v1H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2h-1zm-2 0H8V9a4 4 0 118 0v1z"
                  />
                </svg>
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
