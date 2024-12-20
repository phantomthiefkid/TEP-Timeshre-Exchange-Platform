import React, { useState } from "react";
import bgSignIn from "../../assets/bgSignInSignUp.png";
import logoTEP from "../../assets/logoTEPblack.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../service/accountAPI/accountService";
import {
  setError,
  setIsLoading,
  setIsLogin,
  setRoleName,
  setUserId,
} from "../../redux/UserSlice/SignIn";
import { jwtDecode } from "jwt-decode";
import { FaEnvelope, FaLock } from "react-icons/fa";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.isLogin.isError);
  const handleLoginEvent = async (e) => {
    e.preventDefault();

    let userCredentials = {
      email,
      password,
    };

    // Gọi API để đăng nhập
    let data = await postLogin(userCredentials);

    if (data && data.data && data.data.accessToken) {
      // Giải mã accessToken để lấy RoleName
      const decodedToken = jwtDecode(data.data.accessToken);
      const roleName = decodedToken.RoleName; // Giả sử token có trường RoleName
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("roleName", roleName);
      // Dispatch thông tin login vào Redux
      dispatch(setIsLogin(true)); // Đánh dấu trạng thái đăng nhập là true
      dispatch(setRoleName(roleName)); // Lưu RoleName vào Redux
      dispatch(setIsLoading(false));
      dispatch(setError(false));
      dispatch(setUserId(decodedToken.userId));

      // Điều hướng sau khi đăng nhập thành công
      if (roleName === "ADMIN") {
        navigate("/admin");
      } else if (roleName === "SYSTEMSTAFF") {
        navigate("/systemstaff");
      } else if (roleName === "TIMESHARECOMPANY") {
        navigate("/timesharecompany");
      } else {
        navigate("/");
      }
    } else {
      dispatch(setError(true));
      console.error("Login failed:", data.error || "Unknown error");
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
        <div
          className="absolute inset-0 lg:hidden bg-cover bg-center"
          style={{
            backgroundImage: `url('https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/459368859_1954583321621123_4504985679253766720_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEsBf99JUFPr7bnaNmK7uGVTpJOClJ7kVdOkk4KUnuRV3lUETciYH33_e0udy1dKsM1PJHm_-yxSdcpcn696HYX&_nc_ohc=12aThnS8KoAQ7kNvgFXlSC9&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=Ax_0LO2-fjW_eWUY0Sni2qQ&oh=00_AYB2UIW2IYAJUr_-8hAy8dq-EcWEnYZnJ54ZntyzrSSNlQ&oe=66E7B493')`,
          }}
        />
        <div className="w-full max-w-md relative z-10">
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
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              {/* Envelope Icon */}
              <div className="absolute inset-y-0 left-0 pl-3 top-6 flex items-center pointer-events-none">
                <FaEnvelope />
              </div>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập địa chỉ email của bạn"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {/* Sign In Button */}
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

            <div className="space-y-3 mt-3">
              <button
                type="button"
                onClick={() => navigate("/signin/staff")} // Navigates to systemstaff login page
                className="w-full py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Đăng nhập nhân viên
              </button>
            </div>
          </form>

          {/* <div className="flex items-center justify-center mt-4">
            <div className="flex-grow border-t border-gray-500"></div>
            <span className="mx-4 text-gray-400">Hoặc đăng nhập bằng</span>
            <div className="flex-grow border-t border-gray-500"></div>
          </div> */}

          {/* <div className="mt-6">
            <button className="w-full py-2 px-4 bg-white text-gray-700 font-semibold border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4285F4"
                  d="M44.5 20H24v8.5h11.8C34.6 33.8 30.2 37 24 37c-7 0-13-6-13-13s6-13 13-13c3.3 0 6.2 1.2 8.5 3.2L39 9.1C35.5 6.2 30 4 24 4 12.4 4 3 13.4 3 25s9.4 21 21 21c10.4 0 20-7.5 20-21 0-1.1-.1-2.3-.3-3.5z"
                />
                <path
                  fill="#34A853"
                  d="M6.3 14.6l6.6 4.8C14.7 16 18.9 13 24 13c3.3 0 6.2 1.2 8.5 3.2l6.5-5C34.6 7.2 30.2 5 24 5c-7 0-13.1 4.5-15.9 9.6z"
                />
                <path
                  fill="#FBBC05"
                  d="M24 43c6.2 0 10.7-2.1 14-5.9l-6.5-5.1c-2.1 1.6-4.9 2.5-7.6 2.5-5.6 0-10.6-3.7-12.4-9L6.3 33.5C9.1 38.5 15.7 43 24 43z"
                />
                <path
                  fill="#EA4335"
                  d="M43.6 24c0-1.2-.1-2.4-.3-3.5H24v7h11.8c-.5 2.4-2 4.3-4.1 5.7l6.5 5C40.8 35.4 43.6 30.5 43.6 24z"
                />
              </svg>
              <span>Đăng nhập với Google</span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
