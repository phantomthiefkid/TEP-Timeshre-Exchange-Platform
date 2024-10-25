import React from "react";
import logoTEP from "../../assets/logoTEPblack.png"; // Ensure the path is correct
import bgSignIn from "../../assets/bgSignInSignUp.png";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

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

          <form className="space-y-6 bg-white p-6">
            <div className="relative">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Họ và tên
              </label>
              <div className="absolute inset-y-0 top-6 left-0 pl-3 flex items-center pointer-events-none">
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
                    d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.87 0-7 3.13-7 7v1h14v-1c0-3.87-3.13-7-7-7z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Nhập họ và tên của bạn"
                required
                className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="absolute inset-y-0 top-6 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.75 4H3.25C2.01 4 1 5.01 1 6.25v11.5C1 18.99 2.01 20 3.25 20h17.5c1.24 0 2.25-1.01 2.25-2.25V6.25C23 5.01 21.99 4 20.75 4zM20.75 6c.138 0 .25.112.25.25v.511l-8.75 5.478-8.75-5.478V6.25c0-.138.112-.25.25-.25h17.5zM3.25 18c-.138 0-.25-.112-.25-.25v-9.02l8.772 5.493a.75.75 0 00.756 0l8.772-5.493v9.02c0 .138-.112.25-.25.25H3.25z" />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập địa chỉ email của bạn"
                required
                className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Tên đăng nhập
              </label>
              <div className="absolute inset-y-0 top-6 left-0 pl-3 flex items-center pointer-events-none">
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
                    d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.87 0-7 3.13-7 7v1h14v-1c0-3.87-3.13-7-7-7z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Nhập tên đăng nhập"
                required
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
              <div className="absolute inset-y-0 top-6 left-0 pl-3 flex items-center pointer-events-none">
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
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu"
                required
                className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Nhập lại mật khẩu
              </label>
              <div className="absolute inset-y-0 top-6 left-0 pl-3 flex items-center pointer-events-none">
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
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                required
                className="mt-1 block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Đăng ký
              </button>
            </div>
          </form>
          <div className="mt-6 text-center text-md">
            <span>Đã có tài khoản?</span>
            <button
              onClick={() => navigate("/signin")} // Navigate to the signin page on button click
              className="ml-1 text-blue-500 hover:text-blue-800 font-medium"
            >
              Quay lại đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
