import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import "swiper/css/effect-coverflow";
import { getResortRandom } from "../../service/public/resortService/resortAPI";
import { Link } from "react-router-dom";

const Recommand = () => {
  const resorts = [
    {
      name: "Flamingo Đại Lải",
      location: "Vĩnh Phúc, Việt Nam",
      price: "1790000",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/427296494.jpg?k=b2a1a10dd58ef2f6e425513b14ebc6c3fd54a2f762f9d7c3c8367e076ef382e1&o=&hp=1",
    },
    {
      name: "New World Hoiana",
      location: "Hội An, Việt Nam",
      price: "1500000",
      image:
        "https://dulichkhampha24.com/wp-content/uploads/2020/03/resort-da-nang-1.jpg",
    },
    {
      name: "Golden Lotus Grand",
      location: "Nha Trang, Việt Nam",
      price: "2100000",
      image:
        "https://vuanem.com/blog/wp-content/uploads/2023/02/The-Grand-ho-tram-Strip-Resort-1125x727.jpg",
    },
    {
      name: "Melody",
      location: "Hạ Long, Việt Nam",
      price: "1300000",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/325561898.jpg?k=45cea3a2a3298ccc716294dde8b23cc5a5cd17613e83f2db7327320d34f941a8&o=&hp=1",
    },
    {
      name: "Winter",
      location: "Sapa, Việt Nam",
      price: "2300000",
      image:
        "https://cf2.bstatic.com/xdata/images/hotel/max1024x768/400525888.jpg?k=91e866a5a2c93538f2a4c635c8d5f2772ae269a5249aad32135879c1ff8f3347&o=&hp=1",
    },
    {
      name: "Sunflower",
      location: "Hội An, Việt Nam",
      price: "1100000",
      image:
        "https://motortrip.vn/wp-content/uploads/2021/09/resort-phu-yen-23.jpg",
    },
  ];

  const [randomList, setRandomList] = useState([]);

  const fetchResortRandom = async () => {
    let data = await getResortRandom();
    if (data.status === 200) {
      console.log(data.data);
      setRandomList(data.data)
    }
  }

  useEffect(() => {
    fetchResortRandom()
  }, [])

  return (
    <div className="py-4 h-h-landing-child-3">
      <div className="text-center">
        <h2 className="text-4xl font-medium text-gray-700">Gợi ý cho bạn</h2>
      </div>

      {/* Swiper displaying resort cards */}
      <div className="mt-10 h-h-recommend-card-dive overflow-visible mx-auto">
        <Swiper
          effect="coverflow"
          spaceBetween={10}
          slidesPerView={5}
          grabCursor={true}
          // navigation={true}
          centeredSlides={true}
          loop={true}
          modules={[Navigation]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 0,
            slideShadows: false,
          }}
        >
          {randomList &&
            randomList.map((resort, index) => (
              <SwiperSlide key={index} className="relative py-6 px-5">
                <div className="bg-white h-h-recommend-card border border-solid border-gray-300 min-h-[400px] w-w-recommend-img shadow-lg hover:shadow-xl rounded-lg transition-shadow duration-300 ease-in-out overflow-visible">
                  <div className="relative w-w-recommend-img h-h-recommend-img rounded-lg overflow-hidden">
                    <img
                      src={
                        resort.logo ||
                        "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={resort.resortName || "Resort"}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity duration-300 rounded-lg"></div>
                  </div>

                  <div className="p-4 min-h-32">
                    <h3 className="text-xl font-semibold">
                      {resort.resortName || "Tên không khả dụng"}
                    </h3>

                    <p className="text-gray-500 text-md mt-1">
                      Giá từ:{" "}
                      {resort.minPrice > 0 && resort.maxPrice > 0
                        ? `${resort.minPrice.toLocaleString()} - ${resort.maxPrice.toLocaleString()} VND`
                        : "Liên hệ"}
                    </p>
                  </div>
                  <Link to={`/resortdetail/${resort.id}`}>
                    <div className="flex justify-center py-4">
                      <button className="rounded-lg w-60 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 duration-300">
                        Xem chi tiết
                      </button>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}

        </Swiper>
      </div>
    </div>
  );
};

export default Recommand;
