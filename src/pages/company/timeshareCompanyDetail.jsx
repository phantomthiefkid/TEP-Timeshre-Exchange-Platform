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
    return <div>Loading...</div>; // You can replace this with a more sophisticated loading indicator if you prefer
  }

  return (
    <>
      <Navigation />
      <section className="grid grid-cols-10 px-32 py-14 gap-4">
        <div className="col-span-6 relative">
          <Link className="text-blue-500" to="/timesharecompanylist">
            <u>Danh sách công ty Timeshare</u>
          </Link>
          <h1 className="text-4xl font-bold text-custom-blue-text py-12">
            {companyDetail.timeshareCompanyName}
          </h1>
          <p className="mt-2 w-full text-lg">
            {companyDetail.description || "No description available."}
          </p>
          <button className="bg-blue-500 w-[500px] h-[50px] absolute bottom-10 rounded-xl text-white font-medium flex justify-center items-center gap-4">
            Đi đến danh sách Resort <ArrowRightIcon className="w-6" />
          </button>
        </div>
        <div className="col-span-4 py-12">
          <img
            src={companyDetail.logo || "fallback-image-url.jpg"} // Use a fallback image if logo is not available
            alt={companyDetail.timeshareCompanyName}
          />
        </div>
      </section>

      {/* Resort Suggestions Section */}
      <section className="px-32 py-14">
        <h2 className="text-gray-800 font-bold text-3xl mb-8">Gợi ý Resort</h2>

        {/* <div className="grid grid-cols-2 gap-20">
          {companyDetail.resorts &&
            companyDetail.resorts.map((resort) => (
              <div key={resort.id} className="space-y-6">
                <div className="border grid grid-cols-12 h-[260px] rounded-lg">
                  <div className="col-span-4 h-full">
                    <img
                      className="object-cover h-full rounded-l-lg"
                      src={resort.imageUrl}
                      alt={resort.name}
                    />
                  </div>

                  <div className="col-span-8 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-serif font-bold">
                        {resort.name}
                      </h3>
                      <p className="text-gray-600 flex gap-3">
                        <LocationMarkerIcon className="w-6" color="red" />
                        {resort.location}
                      </p>
                    </div>

                    <div className="flex justify-end items-center">
                      <StarIcon color="yellow" className="w-6" />
                      <p className="text-lg font-semibold mr-2">
                        {resort.rating}
                      </p>
                      <p className="font-thin text-gray-500">
                        ({resort.reviews} đánh giá)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div> */}

        <div className="text-center mt-12">
          <button className="bg-sky-500 text-lg text-white px-6 py-2 w-72 rounded-xl">
            Xem thêm
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default TimeshareCompanyDetail;
