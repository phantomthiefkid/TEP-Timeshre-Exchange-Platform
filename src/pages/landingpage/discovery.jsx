import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'; 

import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

const Discovery = ({ onExploreClick }) => {
    return (
        <div className="min-h-[h-h-landing-child] bg-custom-blue py-20">
            <div className='flex mx-auto px-20 w-full'>
                
                <div className='w-1/2 px-32 pr-8 text-left'>
                    <h1 className='text-5xl w-full font-medium text-white leading-snug'>
                        Khám phá những resort và khách sạn tốt nhất cho kỳ nghỉ của bạn.
                    </h1>
                </div>

                <div className='w-1/2 p-20 py-10 px-44'>
                    <p className='text-white text leading-snug'>
                        Chúng tôi cung cấp nhiều loại hình resort và khách sạn tốt nhất phù hợp với nhu cầu của bạn. Vì vậy đừng lo lắng về chất lượng dịch vụ mà hãy tận hưởng trọn vẹn kỳ nghỉ này.
                    </p>
                    <button onClick={onExploreClick} className='mt-4 px-4 py-2 bg-blue-400 hover:bg-blue-600 text-white font-semibold rounded-lg'>
                        Khám phá thêm
                    </button>
                </div>
            </div>

            <div className='img-resort mx-auto w-full mt-20'>
                <Swiper
                    effect="coverflow" 
                    grabCursor={true}
                    spaceBetween={100}
                    slidesPerView={5} 
                    centeredSlides={true} 
                    // navigation={true} 
                    // pagination={{ clickable: true }} 
                    autoplay={{
                        delay: 3000, 
                        disableOnInteraction: false, 
                    }}
                    loop={true} // Lặp lại slider
                    modules={[Navigation, Pagination, Autoplay, EffectCoverflow]} 
                    coverflowEffect={{
                        rotate: 0, 
                        stretch: 180,
                        depth: 300,
                        modifier: -0.2,
                        slideShadows: false,
                    }}
                >
                    <SwiperSlide className='mx-auto'>
                        <div className="text-center text-white">
                            <h3 className='text-2xl'>Flamingo Đại Lải</h3>
                            <span>Vĩnh Phúc</span>
                        </div>
                        <img src="https://www.hilton.com/im/en/MLEONWA/16775979/mleonwa-f-b-nava.jpg?impolicy=crop&cw=4500&ch=3000&gravity=NorthWest&xposition=250&yposition=0&rw=1280&rh=856" alt="Resort 1" className=" h-discover-img-h object-cover rounded-3xl" />
                    </SwiperSlide>
                    <SwiperSlide className='mx-auto'>
                        <div className="text-center text-white">
                            <h3 className='text-2xl'>Victoria Hoi An Beach</h3>
                            <span>Hội An</span>
                        </div>
                        <img src="https://cdn.urlaubsguru.at/wp-content/uploads/2017/07/Tropical-resort-in-Maldives-iStock_11537596_XLARGE-2.jpg" alt="Resort 2" className=" h-discover-img-h object-cover rounded-3xl" />
                    </SwiperSlide>
                    <SwiperSlide className='mx-auto'>
                        <div className="text-center text-white">
                            <h3 className='text-2xl'>Six Senses Ninh Van Bay</h3>
                            <span>Khánh Hòa</span>
                        </div>
                        <img src="https://vntimetravel.com/media/wysiwyg/Intercontinantal-Phu-Quoc-r.jpg" alt="Resort 3" className=" h-discover-img-h object-cover rounded-3xl" />
                    </SwiperSlide>
                    <SwiperSlide className='mx-auto'>
                        <div className="text-center text-white">
                            <h3 className='text-2xl'>Banyan Tree Lang Co</h3>
                            <span>Huế</span>
                        </div>
                        <img src="https://media-cdn.tripadvisor.com/media/photo-s/28/fd/37/ed/pearl-farm-beach-resort.jpg" alt="Resort 4" className=" h-discover-img-h object-cover rounded-3xl" />
                    </SwiperSlide>
                    <SwiperSlide className='mx-auto'>
                        <div className="text-center text-white">
                            <h3 className='text-2xl'>The Nam Hai</h3>
                            <span>Hội An</span>
                        </div>
                        <img src="https://imageio.forbes.com/specials-images/imageserve/65280e381c5c81f747778687/Suite-exterior-at-Soneva-Jani-/0x0.jpg?crop=1350,899,x123,y0,safe&height=473&width=711&fit=bounds" alt="Resort 5" className=" h-discover-img-h object-cover rounded-3xl" />
                    </SwiperSlide>
                    <SwiperSlide className='mx-auto'>
                        <div className="text-center text-white">
                            <h3 className='text-2xl'>Melody</h3>
                            <span>Vũng Tàu</span>
                        </div>
                        <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/37/e8/6e/eden-nature-park.jpg?w=600&h=400&s=1" alt="Resort 4" className=" h-discover-img-h object-cover rounded-3xl" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}

export default Discovery;
