import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/footer';
import Navigation from '../../components/Navbar/navigation';
import { HeartIcon, LocationMarkerIcon, StarIcon, XIcon } from '@heroicons/react/solid';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getResortById } from '../../service/public/resortService/resortAPI';
const ResortDetail = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const { id } = useParams();
    const [resort, setResort] = useState({});
    // Images array for the Swiper
    const images = [
        'https://media.architecturaldigest.com/photos/57e42de0fe422b3e29b7e78f/16:9/w_2560%2Cc_limit/JW_LosCabos_2015_MainExterior.jpg',
        'https://vntimetravel.com/media/wysiwyg/Intercontinantal-Phu-Quoc-r.jpg',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/460855827.jpg?k=8e640d1427c880873eb257ae5f314b8847fa2d54b83ad6f68a824c6bd2d5967c&o=&hp=1',
        'https://mettavoyage.com/wp-content/webp-express/webp-images/uploads/2023/05/1166_palm_garden_resort_hoi_an-1.jpeg.webp',
        'https://eholiday.vn/wp-content/uploads/2023/11/Bay-Resort-Hoi-An-Quang-Nam-1.jpg',
        'https://cafefcdn.com/203337114487263232/2023/4/29/440495612-1682757753771111360326-1682762017539-16827620176502127401821.jpg',
    ];

    const fetchResortById = async () => {

        try {
            let data = await getResortById(id);
            if (data && data.status === 200) {
                setResort(data.data)
                console.log(data.data)
            }
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        if (id) {
            fetchResortById();
        }

    }, [id])

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    return (
        <>
            <Navigation />
            <div className='lg:px-32 md:px-24 py-10'>
                {/* Back to Search Link */}

                


                {/* Resort Title and Favorite Button */}
                <div className='flex justify-between py-4'>
                    <h1 className='text-2xl md:text-3xl font-medium'>{resort ? resort.resortName : ""}</h1>
                   
                </div>

                {/* Location and Rating */}
                <div className='flex justify-between py-4'>
                    <p className='font-medium flex items-center gap-2'>
                        <LocationMarkerIcon className='w-8 h-8 text-red-500' />
                        {resort ? resort.address : ""}
                    </p>
                    <span className='flex gap-2 items-center'>
                        <StarIcon className='w-6 h-6' color='yellow' />
                        4.6 (16 đánh giá)
                    </span>
                </div>

                {/* Image Grid with 6:4 ratio */}
                <div className='flex flex-col lg:flex-row gap-6'>
                    {/* Large image on the left (75% width) */}
                    <div className='w-full lg:w-[75%]'>
                        <img
                            className='h-[550px] w-full object-cover rounded-lg'
                            src={images[0]}
                            alt='Resort Main'
                        />
                    </div>

                    {/* Stacked images on the right (25% width) */}
                    <div className='w-full lg:w-[25%] flex flex-col justify-between gap-2 mt-4 lg:mt-0'>
                        <img
                            className='h-[180px] w-full object-cover rounded-lg'
                            src={images[1]}
                            alt='Resort Image 1'
                        />
                        <img
                            className='h-[180px] w-full object-cover rounded-lg'
                            src={images[2]}
                            alt='Resort Image 2'
                        />
                        <div className='relative h-[180px] w-full'>
                            <img
                                className='h-full w-full object-cover rounded-lg opacity-60'
                                src={images[2]}
                                alt='Resort Image 3'
                            />
                            <div
                                className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg cursor-pointer'
                                onClick={openModal}
                            >
                                <span className='text-white font-semibold text-lg'>Xem thêm</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Popup with Swiper */}
                {isOpen && (
                    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
                        <div className=' p-2 rounded-lg max-w-5xl w-full relative'>
                            <button
                                className='absolute top-2 right-2 text-white p-1 rounded-full'
                                onClick={closeModal}
                            >
                                <XIcon className='w-8' />
                            </button>

                            {/* Large Image Display */}
                            <div className='mb-4'>
                                <img
                                    src={images[selectedImage]} // Display the selected image
                                    className='h-[500px] w-full object-cover rounded-lg'
                                    alt={`Slide ${selectedImage}`}
                                />
                            </div>

                            {/* Thumbnails Below */}
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={4}
                            // navigation={true}
                            // pagination={{ clickable: true }}
                            // modules={[Navigation]}
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={image}
                                            className={`h-[100px] w-full object-cover rounded-lg cursor-pointer ${selectedImage === index ? 'border-4 border-blue-500' : ''}`} // Highlight the selected image
                                            alt={`Thumbnail ${index}`}
                                            onClick={() => setSelectedImage(index)} // Set image on click
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                )}

                <div className='py-8 px-6 rounded-lg '>
                    <h3 className='text-4xl font-bold text-gray-800 mb-6'>Giới thiệu</h3>
                    {/* <p className=' leading-relaxed mb-4'>
                        Tọa lạc ở Hội An, cách Hội Quán Chi Hội Triều Châu Trung Quốc 12 km, New World Hoiana Hotel cung cấp chỗ nghỉ có xe đạp miễn phí, chỗ đậu xe riêng miễn phí, hồ bơi ngoài trời và trung tâm thể dục. Ngoài câu lạc bộ trẻ em, chỗ nghỉ này còn có nhà hàng, sòng bạc và sân hiên để phục vụ du khách. Chỗ nghỉ cung cấp lễ tân 24/24, dịch vụ đưa đón sân bay, dịch vụ phòng và Wi-Fi miễn phí.
                    </p>
                    <p className=' leading-relaxed mb-4'>
                        Khách sạn sẽ cung cấp cho khách các phòng có điều hòa, tủ quần áo, két an toàn, TV màn hình phẳng và phòng tắm riêng với vòi sen. Các phòng đều có minibar.
                    </p>
                    <p className=' leading-relaxed'>
                        Chỗ nghỉ có phục vụ bữa sáng hằng ngày, gồm các lựa chọn thực đơn buffet, kiểu lục địa và kiểu Anh/ Ai-len.
                    </p>
                    <p className=' leading-relaxed mb-4'>
                        New World Hoiana Hotel có sân chơi trẻ em.
                    </p>
                    <p className=' leading-relaxed'>
                        Chỗ nghỉ cách Bảo tàng lịch sử Hội An 13 km và Chùa Cầu 13 km. Sân bay gần nhất là Sân bay Quốc tế Đà Nẵng, cách New World Hoiana Hotel 40 km.
                    </p> */}
                    <p className=' leading-relaxed mb-4'>
                        {resort ? resort.description : ""}
                    </p>
                </div>
                <div className='py-2 px-6 rounded-lg space-y-4'>
                    <h3 className='text-3xl font-bold text-gray-800 mb-6'>Loại phòng</h3>
                    {resort && resort.unitTypeDtoList && resort.unitTypeDtoList.map((item, index) => 
                        ((<div className="grid grid-cols-2 gap-4 border px-4">

                            <div className="p-2 grid grid-cols-2 gap-6">
                                <img src='https://storage.timviec365.vn/timviec365/pictures/images/phong-doi-la-gi.jpg' className='w-full' alt='phòng đôi' />
                                <div className='py-4 relative space-y-4'>
                                    <span className='text-2xl font-medium'>Thông tin phòng</span>
                                    <h3 className='text-4xl  text-gray-700 font-bold'>{item.title}</h3>
                                    <a href='#' className='bottom-2 absolute hover:text-gray-600'><p><u>Xem chi tiết phòng</u></p></a>
                                </div>
                            </div>


                            <div className="p-4 py-6 space-y-6 font-medium text-xl">

                                <div className="text-xl font-medium">
                                    Đặc điểm phòng
                                </div>

                                <div className="flex justify-left text-left">
                                    <div className='w-full'><span>Phòng ngủ: {item.bedrooms}</span></div>
                                    <div className='w-full'><span>Số người: 4</span></div>
                                </div>

                                <div>
                                    Phòng tắm: {item.bathrooms}
                                </div>

                                <div>
                                    Nhà bếp: {item.kitchen}
                                </div>
                            </div>
                        </div>))
                    )}


                </div>
                <div className='py-10 w-2/3'>
                    <h3 className='text-3xl font-bold text-gray-800 mb-6'>Các tính năng và tiện nghi tại chỗ</h3>
                    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1'>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 1</li>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 2</li>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 3</li>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 4</li>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 5</li>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 6</li>
                        {/* Add more items here */}
                    </ul>
                </div>
                <div className='py-10 w-2/3'>
                    <h3 className='text-3xl font-bold text-gray-800 mb-6'>Các tính năng và tiện nghi tại chỗ</h3>
                    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1'>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 1</li>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 2</li>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 3</li>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 4</li>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 5</li>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 6</li>
                        {/* Add more items here */}
                    </ul>
                </div>
                <div className='py-10 w-2/3'>
                    <h3 className='text-3xl font-bold text-gray-800 mb-6'>Chính sách</h3>
                    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1'>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 1</li>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 2</li>
                        <li className='p-4 rounded-md shadow-sm'>Tiện ích 3</li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-3xl font-bold text-gray-800 mb-6'>Đánh giá</h3>
                    <span className='text-2xl flex items-center gap-2 font-semibold'><StarIcon className='w-12' color='yellow' /> <span className='text-3xl'>4,6</span>/5 <span className='text-gray-400 text-xl mt-1 font-light'>16 đánh giá</span></span>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 py-8'>
                        <div className='border-b-4 w-full p-4 flex justify-between'>
                            <div className='flex flex-col justify-start gap-4 w-2/3'>
                                <div className='flex items-center gap-4'>
                                    <div className=''>
                                        <img src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=F6oiiDryLdsQ7kNvgEHPYkK&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=ADV7XBC3ClWBEMeXTZeUvo9&oh=00_AYDH0uBD5Zb54idOcvKsuiEnLn08MtKV5iQNTg9ppTQzNA&oe=66EC9B59"
                                            alt="Avatar" className='w-20 h-20 border-gray-600 border rounded-full' />
                                    </div>
                                    <div className=''>
                                        <div className='mb-2'>
                                            <p className='text-md'>Ngày: 15/09/2024</p>
                                        </div>
                                        <div>
                                            <p className='text-md'>Khách hàng: Nguyễn Văn A</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-4 p-4'>
                                    <p className='text-md'>Tôi rất hài lòng với dịch vụ ở đây</p>
                                </div>
                            </div>
                            <div className='w-1/3 text-left'>
                                <span className='font-medium text-lg'>Đánh giá</span>
                                <div className='flex justify-start items-center gap-2'>
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                </div>
                            </div>
                        </div>
                        <div className='border-b-4 w-full p-4 flex justify-between'>
                            <div className='flex flex-col justify-start gap-4 w-2/3'>
                                <div className='flex items-center gap-4'>
                                    <div className=''>
                                        <img src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=F6oiiDryLdsQ7kNvgEHPYkK&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=ADV7XBC3ClWBEMeXTZeUvo9&oh=00_AYDH0uBD5Zb54idOcvKsuiEnLn08MtKV5iQNTg9ppTQzNA&oe=66EC9B59"
                                            alt="Avatar" className='w-20 h-20 border-gray-600 border rounded-full' />
                                    </div>
                                    <div className=''>
                                        <div className='mb-2'>
                                            <p className='text-md'>Ngày: 15/09/2024</p>
                                        </div>
                                        <div>
                                            <p className='text-md'>Khách hàng: Nguyễn Văn A</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-4 p-4'>
                                    <p className='text-md'>Tôi rất hài lòng với dịch vụ ở đây</p>
                                </div>
                            </div>
                            <div className='w-1/3 text-left'>
                                <span className='font-medium text-lg'>Đánh giá</span>
                                <div className='flex justify-start items-center gap-2'>
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                </div>
                            </div>
                        </div>
                        <div className='border-b-4 w-full p-4 flex justify-between'>
                            <div className='flex flex-col justify-start gap-4 w-2/3'>
                                <div className='flex items-center gap-4'>
                                    <div className=''>
                                        <img src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=F6oiiDryLdsQ7kNvgEHPYkK&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=ADV7XBC3ClWBEMeXTZeUvo9&oh=00_AYDH0uBD5Zb54idOcvKsuiEnLn08MtKV5iQNTg9ppTQzNA&oe=66EC9B59"
                                            alt="Avatar" className='w-20 h-20 border-gray-600 border rounded-full' />
                                    </div>
                                    <div className=''>
                                        <div className='mb-2'>
                                            <p className='text-md'>Ngày: 15/09/2024</p>
                                        </div>
                                        <div>
                                            <p className='text-md'>Khách hàng: Nguyễn Văn A</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-4 p-4'>
                                    <p className='text-md'>Tôi rất hài lòng với dịch vụ ở đây</p>
                                </div>
                            </div>
                            <div className='w-1/3 text-left'>
                                <span className='font-medium text-lg'>Đánh giá</span>
                                <div className='flex justify-start items-center gap-2'>
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                </div>
                            </div>
                        </div>
                        <div className='border-b-4 w-full p-4 flex justify-between'>
                            <div className='flex flex-col justify-start gap-4 w-2/3'>
                                <div className='flex items-center gap-4'>
                                    <div className=''>
                                        <img src="https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=F6oiiDryLdsQ7kNvgEHPYkK&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=ADV7XBC3ClWBEMeXTZeUvo9&oh=00_AYDH0uBD5Zb54idOcvKsuiEnLn08MtKV5iQNTg9ppTQzNA&oe=66EC9B59"
                                            alt="Avatar" className='w-20 h-20 border-gray-600 border rounded-full' />
                                    </div>
                                    <div className=''>
                                        <div className='mb-2'>
                                            <p className='text-md'>Ngày: 15/09/2024</p>
                                        </div>
                                        <div>
                                            <p className='text-md'>Khách hàng: Nguyễn Văn A</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-4 p-4'>
                                    <p className='text-md'>Tôi rất hài lòng với dịch vụ ở đây</p>
                                </div>
                            </div>
                            <div className='w-1/3 text-left'>
                                <span className='font-medium text-lg'>Đánh giá</span>
                                <div className='flex justify-start items-center gap-2'>
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                    <StarIcon className='w-8' color='yellow' />
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                <div className='py-10 w-full'>
                    <h3 className='text-3xl font-bold text-gray-800 mb-6'>Địa chỉ</h3>
                    <img src="https://preview.redd.it/zj23e4w876p81.png?width=1080&crop=smart&auto=webp&s=b8be04cdcdee17d074c441bb7d663d5023dc82b9" alt="Map" className='w-full h-[50vh] object-cover' />
                </div>


            </div>
            <Footer />
        </>
    );
}

export default ResortDetail;
