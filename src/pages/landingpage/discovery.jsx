import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { getResortRandom } from '../../service/public/resortService/resortAPI';

const Discovery = ({ onExploreClick }) => {

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
                    {randomList &&
                        randomList.map((item, index) => (
                            <SwiperSlide className="mx-auto" key={index}>
                                <div className="text-center text-white py-2">
                                    <h3 className="text-xl">{item.resortName}</h3>
                                    {/* <span>{item.locationDisplay}</span> */}
                                </div>
                                <div className="w-full h-[460px] overflow-hidden">
                                    <img
                                        src={
                                            item.logo ||
                                            "https://media-cdn.tripadvisor.com/media/photo-s/28/fd/37/ed/pearl-farm-beach-resort.jpg"
                                        }
                                        alt={item.resortName}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}


                </Swiper>
            </div>
        </div>
    );
}

export default Discovery;
