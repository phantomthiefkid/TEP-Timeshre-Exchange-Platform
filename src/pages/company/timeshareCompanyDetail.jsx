import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/footer";
import Navigation from "../../components/Navbar/navigation";
import {
  ArrowRightIcon,
  StarIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";
import { Link, useParams } from "react-router-dom";
import { getTimeshareCompanyDetail } from "../../service/public/resortService/resortAPI";
import SpinnerWaiting from "../../components/LoadingComponent/spinnerWaiting";

// Hardcoded resort data
const resorts = [
  {
    id: 1,
    name: "Nha Trang Vinpearl Resort",
    location: "Đảo Hòn Tre, Nha Trang, Khánh Hòa",
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1",
    rating: 4.6,
    reviews: 16,
  },
  {
    id: 2,
    name: "Phú Quốc Vinpearl Resort",
    location: "Phú Quốc, Kiên Giang",
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1",
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 3,
    name: "Đà Nẵng Vinpearl Resort",
    location: "Ngũ Hành Sơn, Đà Nẵng",
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1",
    rating: 4.7,
    reviews: 18,
  },
  {
    id: 4,
    name: "Hạ Long Vinpearl Resort",
    location: "Hạ Long, Quảng Ninh",
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1",
    rating: 4.5,
    reviews: 14,
  },
  {
    id: 5,
    name: "Sapa Vinpearl Resort",
    location: "Sapa, Lào Cai",
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1",
    rating: 4.4,
    reviews: 12,
  },
  {
    id: 6,
    name: "Hội An Vinpearl Resort",
    location: "Hội An, Quảng Nam",
    imageUrl:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1",
    rating: 4.6,
    reviews: 20,
  },
];

const TimeshareCompanyDetail = () => {
  const { tsId } = useParams();
  const [companyDetail, setCompanyDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const response = await getTimeshareCompanyDetail(tsId);
        if (response.status === 200) {
          setCompanyDetail(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch company detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetail();
  }, [tsId]);

  if (loading) {
    return (
      <div>
        <SpinnerWaiting />
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <section className="flex flex-row px-32 py-14 gap-4 min-h-screen">
        {/* Content Block */}
        <div className="flex-1">
          <Link className="text-blue-500" to="/timesharecompanylist">
            <u>Danh sách công ty Timeshare</u>
          </Link>
          <h1 className="text-4xl font-bold text-custom-blue-text py-12">
            {companyDetail.timeshareCompanyName}
          </h1>
          <p className="mt-2 w-full text-lg">{companyDetail.description}</p>
          {/* <button className="bg-blue-500 w-[500px] h-[50px] rounded-xl text-white font-medium flex justify-center items-center gap-4 mt-16">
            Đi đến danh sách Resort <ArrowRightIcon className="w-6" />
          </button> */}
        </div>

        {/* Image Block */}
        <div className="w-1/3 py-12 ml-36">
          <img
            src={companyDetail.logo}
            alt={companyDetail.timeshareCompanyName}
            className="w-full h-auto object-contain mt-10"
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TimeshareCompanyDetail;
