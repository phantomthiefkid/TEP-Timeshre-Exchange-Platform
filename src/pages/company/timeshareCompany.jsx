import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navbar/navigation";
import Footer from "../../components/Footer/footer";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllResortByName,
  getAllTimeshareCompany,
} from "../../service/public/resortService/resortAPI";
import { FaSearch } from "react-icons/fa";

const TimeshareCompany = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [resort, setResort] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null); // Dùng để lưu timeout của debounce
  const [tsCompany, setTsCompany] = useState("");

  const handleSearch = (e) => {
    const searchInput = e.target.value;
    setKeyword(searchInput);

    // Nếu không có từ khóa thì reset kết quả tìm kiếm
    if (!searchInput) {
      setResort([]);
      clearTimeout(debounceTimeout); // Dừng timeout nếu không có từ khóa
    }

    // Nếu có từ khóa, dùng debounce để chờ trước khi gọi API
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Xóa timeout trước đó nếu có
    }

    const timeout = setTimeout(() => {
      fetchResortList(searchInput);
    }, 300); // Chờ 300ms sau khi người dùng dừng nhập

    setDebounceTimeout(timeout); // Lưu timeout mới
  };

  const fetchResortList = async (searchInput) => {
    if (searchInput) {
      // Chỉ fetch khi có keyword
      try {
        let data = await getAllResortByName(0, 20, searchInput);
        if (data.status) {
          setResort(data.data.content);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setResort([]);
    }
  };

  const fetchTimeshareCompany = async () => {
    try {
      let data = await getAllTimeshareCompany();
      if (data.status == 200) {
        setTsCompany(data.data.content);
      }
    } catch (error) {
      return error;
    }
  };

  const handleTSCDetails = () => {};
  useEffect(() => {
    fetchTimeshareCompany();
  }, []);

  return (
    <>
      <Navigation />
      <div className="max-w-full h-auto relative">
        <img src="../src/assets/tsCom-banner.png" className="w-full h-auto" />
        <div className="grid grid-rows-2 font-sans w-full max-w-[1720px] h-[210px] text-black px-5 lg:px-20 absolute top-10 left-10 space-y-4">
          <h1 className="text-4xl text-white font-bold text-left mt-14">
            Công ty Timeshare
          </h1>
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
              <input
                type="text"
                className="px-4 py-2 w-64 md:w-80 lg:w-full h-10 focus:outline-none"
                placeholder="Search..."
                value={keyword}
                onChange={handleSearch}
              />
              <button className="flex items-center bg-blue-500 justify-center px-4 py-4 border-l max-h-full">
                <Link to="/resortsearchlist" style={{ color: "White" }}>
                  <FaSearch />
                </Link>
              </button>
            </div>
          </div>

          {resort && resort.length > 0 && (
            <div className="absolute top-44 left-24 w-[1480px] bg-gray-100 border border-gray-300 shadow-xl rounded-lg z-10 mt-2">
              <ul className="max-h-60 overflow-y-auto">
                {resort.map((item) => (
                  <li
                    key={item.id}
                    className="px-4 py-2 border-b border-gray-200 hover:bg-gray-300"
                  >
                    <Link
                      to={`/resortdetail/${item.id}`}
                      className="text-black hover:text-blue-800"
                    >
                      {item.resortName} - {item.address}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 px-4 md:px-4">
        <div className="space-y-10">
          <div className="grid grid-cols-4 gap-8 max-w-full mb-10 items-center">
            {tsCompany &&
              tsCompany.slice(0, 8).map((item, index) => (
                <div className="flex justify-center " key={index}>
                  <Link>
                    <img
                      src={item.logo}
                      alt={item.timeshareCompanyName}
                      className="w-[370px] h-[170px] object-contain border-2 border-gray-300 rounded-2xl shadow-xl"
                    />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="max-max-w-full flex justify-center">
        <div className="mt-10 md:px-4 w-9/12">
          {/* Another heading for the list of company names */}
          <div className="flex justify-start">
            <h2 className="text-3xl font-bold mb-6 text-custom-blue-text">
              Danh sách Công ty Timeshare
            </h2>
          </div>

          {/* Grid layout for company names */}
          <div className="grid grid-cols-2 max-w-full">
            {tsCompany &&
              tsCompany.map((company, index) => (
                <div
                  key={index}
                  className="p-4 rounded-md flex justify-start text-blue-600 text-lg text-center"
                >
                  <button onClick={handleTSCDetails}>
                    <p className="underline">{company.timeshareCompanyName}</p>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="relative">
        <img
          src="..\src\assets\contact-banner.png"
          className="w-full h-auto mb-10 mt-10"
        />
        <div className="absolute top-0 left-12 max-w-full h-full flex items-center justify-start p-8">
          <div className="text-white text-lg">
            <p>Mọi thắc mắc xin vui lòng liên hệ với chúng tôi qua email.</p>
            <p className="mb-4">
              Chúng tôi sẽ trả lời trong vòng 24 giờ làm việc.
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded w-[250px] h-[50px]"
              onClick={() => navigate("/contact")}
            >
              Liên hệ
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TimeshareCompany;
