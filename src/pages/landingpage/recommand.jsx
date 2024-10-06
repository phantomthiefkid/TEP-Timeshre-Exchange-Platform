import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import 'swiper/css/effect-coverflow';

const Recommand = () => {
  const resorts = [
    {
      name: 'Flamingo Đại Lải',
      location: 'Vĩnh Phúc, Việt Nam',
      price: '1790000',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/427296494.jpg?k=b2a1a10dd58ef2f6e425513b14ebc6c3fd54a2f762f9d7c3c8367e076ef382e1&o=&hp=1',
    },
    {
      name: 'New World Hoiana',
      location: 'Hội An, Việt Nam',
      price: '1500000',
      image: 'https://dulichkhampha24.com/wp-content/uploads/2020/03/resort-da-nang-1.jpg',
    },
    {
      name: 'Golden Lotus Grand',
      location: 'Nha Trang, Việt Nam',
      price: '2100000',
      image: 'https://vuanem.com/blog/wp-content/uploads/2023/02/The-Grand-ho-tram-Strip-Resort-1125x727.jpg',
    },
    {
      name: 'Melody',
      location: 'Hạ Long, Việt Nam',
      price: '1300000',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/325561898.jpg?k=45cea3a2a3298ccc716294dde8b23cc5a5cd17613e83f2db7327320d34f941a8&o=&hp=1',
    },
    {
      name: 'Winter',
      location: 'Sapa, Việt Nam',
      price: '2300000',
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/36682884.jpg?k=aecf39ae38dd9cfffbb69b50c6507a68ffcb7c55181e234c18c96c64d0e2bdbb&o=&hp=1',
    },
    {
      name: 'Sunflower',
      location: 'Hội An, Việt Nam',
      price: '1100000',
      image: 'https://motortrip.vn/wp-content/uploads/2021/09/resort-phu-yen-23.jpg',
    },
  ];

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
          {resorts.map((resort, index) => (
            <SwiperSlide key={index} className="relative py-6 px-5">
              <div className="bg-white h-h-recommend-card border border-solid border-gray-300 min-h-[400px] w-w-recommend-img shadow-lg hover:shadow-xl rounded-lg transition-shadow duration-300 ease-in-out overflow-visible">
                <img
                  src={resort.image}
                  alt={resort.name}
                  className="w-w-recommend-img rounded-lg h-h-recommend-img object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{resort.name}</h3>
                  <p className="text-gray-500 py-3">{resort.location}</p>
                  <p className="text-gray-700 text-xl font-bold mt-2 flex items-center">
                    Chỉ từ
                    <span className='text-3xl mx-2'>{resort.price}</span>
                    VND
                  </p>

                </div>
                <div className='flex justify-center py-4'><button class="rounded-lg w-60 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 duration-300">Xem chi tiết</button></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>



  );
};

export default Recommand;
