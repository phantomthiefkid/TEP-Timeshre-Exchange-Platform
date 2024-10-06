import React from 'react';
import Footer from '../../components/Footer/footer';
import Navigation from '../../components/Navbar/navigation';
import { ArrowRightIcon, StarIcon, LocationMarkerIcon } from '@heroicons/react/solid';

// Hardcoded resort data
const resorts = [
    {
        id: 1,
        name: 'Nha Trang Vinpearl Resort',
        location: 'Đảo Hòn Tre, Nha Trang, Khánh Hòa',
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1',
        rating: 4.6,
        reviews: 16
    },
    {
        id: 2,
        name: 'Phú Quốc Vinpearl Resort',
        location: 'Phú Quốc, Kiên Giang',
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1',
        rating: 4.8,
        reviews: 24
    },
    {
        id: 3,
        name: 'Đà Nẵng Vinpearl Resort',
        location: 'Ngũ Hành Sơn, Đà Nẵng',
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1',
        rating: 4.7,
        reviews: 18
    },
    {
        id: 4,
        name: 'Hạ Long Vinpearl Resort',
        location: 'Hạ Long, Quảng Ninh',
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1',
        rating: 4.5,
        reviews: 14
    },
    {
        id: 5,
        name: 'Sapa Vinpearl Resort',
        location: 'Sapa, Lào Cai',
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1',
        rating: 4.4,
        reviews: 12
    },
    {
        id: 6,
        name: 'Hội An Vinpearl Resort',
        location: 'Hội An, Quảng Nam',
        imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1',
        rating: 4.6,
        reviews: 20
    },
];

const TimeshareCompanyDetail = () => {
    return (
        <>
            <Navigation />
            <section className='grid grid-cols-10 px-32 py-14 gap-4'>
                <div className='col-span-6 relative'>
                    <a className='text-blue-500' href='#'><u>Danh sách công ty Timeshare</u></a>
                    <h1 className='text-4xl font-bold text-custom-blue-text py-12'>Nha Trang Vinpearl Resort</h1>
                    <p className='mt-2 w-full text-lg'>
                        Vinpearl Resort Nha Trang sở hữu vẻ đẹp Á Đông thuần khiết với kiến trúc Indochine sang trọng. Khu nghỉ dưỡng tọa lạc trên đảo Hòn Tre cạnh bãi biển tự nhiên với cát trắng nắng vàng. Tại đây bạn có thể đắm mình trong làn nước xanh mát của hồ bơi rộng lớn, lặn ngắm san hô và chiêm ngưỡng vẻ đẹp muôn sắc của các loài cá.
                    </p>
                    <button className='bg-blue-500 w-[500px] h-[50px] absolute bottom-10 rounded-xl text-white font-medium flex justify-center items-center gap-4'>Đi đến danh sách Resort <ArrowRightIcon className='w-6' /></button>
                </div>
                <div className='col-span-4 py-12'>
                    <img src='https://cf.bstatic.com/xdata/images/hotel/max1024x768/412885850.jpg?k=1c59b8496696665b9c5869a729bbdc3646e5a1936ab1e7ba70694c547656b0b8&o=&hp=1' alt='resort name' />
                </div>
            </section>

            <section className='px-32 py-14'>
                <h2 className='text-gray-800 font-bold text-3xl mb-8'>Gợi ý Resort</h2>

                <div className='grid grid-cols-2 gap-20'>
                    {resorts.map((resort) => (
                        <div key={resort.id} className='space-y-6'>
                            <div className='border grid grid-cols-12 h-[260px] rounded-lg'>
                                {/* Left Side with Image */}
                                <div className='col-span-4 h-full'>
                                    <img className='object-cover h-full rounded-l-lg' src={resort.imageUrl} alt={resort.name} />
                                </div>

                                {/* Right Side with Resort Details */}
                                <div className='col-span-8 p-4 flex flex-col justify-between'>
                                    {/* Resort Name */}
                                    <div>
                                        <h3 className='text-2xl font-serif font-bold'>{resort.name}</h3>
                                        <p className='text-gray-600 flex gap-3'><LocationMarkerIcon className='w-6' color='red' />{resort.location}</p>
                                    </div>

                                    {/* Rating Section */}
                                    <div className='flex justify-end items-center'>
                                        <StarIcon color='yellow' className='w-6' />
                                        <p className='text-lg font-semibold mr-2'>{resort.rating}</p>
                                        <p className='font-thin text-gray-500'>({resort.reviews} đánh giá)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='text-center mt-12'>
                    <button className='bg-sky-500 text-lg text-white px-6 py-2 w-72 rounded-xl'>Xem thêm</button>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default TimeshareCompanyDetail;
