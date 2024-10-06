import React from 'react'

const Utility = () => {
    return (
        <div className='px-6 py-32 mt-10 md:px-12 lg:px-24 lg:mt-20'>
            <div className='border-b-2 pb-14'>
                <h2 className='text-5xl w-1/2 font-medium text-custom-blue-text'>Tận hưởng trọn vẹn kì nghỉ với nhiều tiện ích đa dạng.</h2>
            </div>
            <div className='border-b-2 mt-4 py-6 flex flex-col lg:flex-row'>
                <div className='lg:w-1/3 w-full'>
                    <img
                        className='w-w-utility-image h-h-utility-image lg:w-full lg:h-auto object-cover'
                        src='https://noithatmanhhe.vn/media/24624/19-he-tu-bep-chu-l-dep.jpg?width=700&height=482.53333333333336&rmode=boxpad'
                        alt='outdoor pool'
                    />
                </div>
                <div className='flex lg:w-1/12 justify-center text-4xl font-medium text-gray-400 mt-4 lg:mt-0'>
                    <span>01</span>
                </div>
                <div className='lg:w-2/3 mt-4 lg:mt-0'>
                    <h3 className='text-xl md:text-2xl lg:text-3xl font-medium'>Nhà bếp</h3>
                    <p className='py-4 lg:py-8 text-gray-500'>
                        Không gian bếp thoáng mát cùng đẩy đủ tiện nghi các thiết bị gia dụng.
                    </p>
                </div>
            </div>
            <div className='border-b-2 mt-4 py-6 flex flex-col lg:flex-row'>
                <div className='lg:w-1/3 w-full'>
                    <img
                        className='w-w-utility-image h-h-utility-image lg:w-full lg:h-auto object-cover'
                        src='https://hanteco.vn/hinhanh/tintuc/ngay-ngat-voi-nhung-ngoi-nha-so-huu-be-boi-ngoai-troi-cuc-dep-2.jpg'
                        alt='outdoor pool'
                    />
                </div>
                <div className='flex lg:w-1/12 justify-center text-4xl font-medium text-gray-400 mt-4 lg:mt-0'>
                    <span>02</span>
                </div>
                <div className='lg:w-2/3 mt-4 lg:mt-0'>
                    <h3 className='text-xl md:text-2xl lg:text-3xl font-medium'>Bể bơi ngoài trời</h3>
                    <p className='py-4 lg:py-8 text-gray-500'>
                        Không gian thông thoáng gần gũi thiên nhiên, nhằm mang lại cảm giác thư giãn, nghỉ ngơi thoải mái.
                    </p>
                </div>
            </div>

            <div className='border-b-2 mt-4 py-6 flex flex-col lg:flex-row'>
                <div className='lg:w-1/3 w-full'>
                    <img
                        className='w-w-utility-image h-h-utility-image lg:w-full lg:h-auto object-cover'
                        src='https://static.vinwonders.com/production/nha-hang-nha-trang-topbanner.jpg'
                        alt='outdoor pool'
                    />
                </div>
                <div className='flex lg:w-1/12 justify-center text-4xl font-medium text-gray-400 mt-4 lg:mt-0'>
                    <span>03</span>
                </div>
                <div className='lg:w-2/3 mt-4 lg:mt-0'>
                    <h3 className='text-xl md:text-2xl lg:text-3xl font-medium'>Nhà hàng</h3>
                    <p className='py-4 lg:py-8 text-gray-500'>
                        Hệ thống nhà hàng đẹp cùng với thực đơn đa dạng, giúp bạn có những trải nghiệm thú vị trong kỳ nghỉ.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Utility
