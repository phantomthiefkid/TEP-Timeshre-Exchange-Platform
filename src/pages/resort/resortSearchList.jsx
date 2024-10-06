import React, { useState } from 'react';
import Footer from '../../components/Footer/footer';
import Navigation from '../../components/Navbar/navigation';
import { AdjustmentsIcon, LocationMarkerIcon, HeartIcon, StarIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import FilterModal from '../../components/Modal/filterModal';

const ResortSearchList = () => {
    const [openFilter, setOpenFilter] = useState(false);

    const toggleOpenFilter = () => {
        setOpenFilter(!openFilter);
    }

    return (
        <div>
            <Navigation />
            <div>
                <div className='py-6 md:py-12 px-4 md:px-12 lg:px-28 grid grid-cols-1 lg:grid-cols-4 gap-6 border-b-4'>
                    <img
                        className='w-full md:w-auto rounded-xl col-span-1'
                        src='https://media.cntraveler.com/photos/53da60a46dec627b149e66f4/master/pass/hilton-moorea-lagoon-resort-spa-moorea-french-poly--110160-1.jpg'
                        alt='resort'
                    />
                    <div className='col-span-1 lg:col-span-3 py-6 relative p-4 md:p-6'>
                        <span className='font-semibold text-base md:text-lg'>Danh sách resort</span>
                        <h3 className='text-xl md:text-2xl lg:text-3xl font-bold'>Hoiana</h3>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl absolute bottom-4 lg:bottom-0">
                            Thông tin chi tiết
                        </button>
                    </div>
                </div>


                {/* Sorting and Filtering Section */}
                <div className='flex flex-col lg:flex-row justify-between items-center px-4 md:px-12 lg:px-28 py-6 md:py-10'>
                    <div className='flex items-center mb-4 lg:mb-0'>
                        <span className='font-semibold mr-4'>Xếp theo:</span>
                        <select className='border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                            <option value='default'>Nổi bật</option>
                            <option value='price-asc'>Giá: Thấp đến Cao</option>
                            <option value='price-desc'>Giá: Cao đến Thấp</option>
                            <option value='rating'>Đánh giá</option>
                        </select>
                    </div>
                    <button onClick={toggleOpenFilter} className='text-gray-900 border-2 py-2 px-6 flex justify-center items-center rounded-lg gap-4'>
                        <AdjustmentsIcon className='w-5 h-5' />
                        Bộ lọc
                    </button>
                    {
                        openFilter && (<FilterModal isOpen={openFilter} onClose={toggleOpenFilter}></FilterModal>)
                    }
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-10 px-4 md:px-12 lg:px-28 py-6 md:py-10 gap-6'>
                    {/* List of Resorts */}
                    <div className='col-span-6'>
                        <div className='grid grid-cols-1 gap-6'>
                            {/* Resort Item */}
                            <div className='border border-gray-300 flex flex-col md:flex-row items-start gap-4 relative shadow-lg hover:shadow-xl'>
                                <img className='h-auto md:w-1/3 object-cover' src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/97/92/24/kumarakom-lake-resort.jpg?w=700&h=-1&s=1' alt='Resort 1' />
                                <div className='relative h-full md:w-2/3'>
                                    <div className='absolute top-4 right-4'>
                                        <button> <HeartIcon className='w-6 h-6 text-gray-400' /></button>
                                    </div>
                                    <div className='md:ml-4 flex flex-col justify-between py-4'>
                                       <Link to={`/resortdetail/${1}`}><h3 className='text-xl md:text-2xl font-bold mb-2'>New World Hoiana</h3></Link>
                                        <p className='text-gray-600 mb-4 flex gap-2'>
                                            <LocationMarkerIcon className='w-5 h-5' color='red' />Hội An, Việt Nam
                                        </p>
                                        <div className='flex items-center absolute bottom-4 left-4'>
                                            <StarIcon className='w-5 h-5 text-yellow-500' />
                                            <span className='ml-1'>4.6</span>
                                            <span className='text-gray-500 ml-2'>(16 đánh giá)</span>
                                        </div>
                                        <div className='absolute bottom-4 right-4'>
                                            <span className='font-normal text-lg'>Chỉ từ <span className='text-2xl'>3,520,000</span> VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='border border-gray-300 flex flex-col md:flex-row items-start gap-4 relative shadow-lg hover:shadow-xl'>
                                <img className='h-auto md:w-1/3 object-cover' src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/97/92/24/kumarakom-lake-resort.jpg?w=700&h=-1&s=1' alt='Resort 1' />
                                <div className='relative h-full md:w-2/3'>
                                    <div className='absolute top-4 right-4'>
                                        <button> <HeartIcon className='w-6 h-6 text-gray-400' /></button>
                                    </div>
                                    <div className='md:ml-4 flex flex-col justify-between py-4'>
                                        <Link to={`/resortdetail/${1}`}><h3 className='text-xl md:text-2xl font-bold mb-2'>New World Hoiana</h3></Link>
                                        <p className='text-gray-600 mb-4 flex gap-2'>
                                            <LocationMarkerIcon className='w-5 h-5' color='red' />Hội An, Việt Nam
                                        </p>
                                        <div className='flex items-center absolute bottom-4 left-4'>
                                            <StarIcon className='w-5 h-5 text-yellow-500' />
                                            <span className='ml-1'>4.6</span>
                                            <span className='text-gray-500 ml-2'>(16 đánh giá)</span>
                                        </div>
                                        <div className='absolute bottom-4 right-4'>
                                            <span className='font-normal text-lg'>Chỉ từ <span className='text-2xl'>3,520,000</span> VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div> <div className='border border-gray-300 flex flex-col md:flex-row items-start gap-4 relative shadow-lg hover:shadow-xl'>
                                <img className='h-auto md:w-1/3 object-cover' src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/97/92/24/kumarakom-lake-resort.jpg?w=700&h=-1&s=1' alt='Resort 1' />
                                <div className='relative h-full md:w-2/3'>
                                    <div className='absolute top-4 right-4'>
                                        <button> <HeartIcon className='w-6 h-6 text-gray-400' /></button>
                                    </div>
                                    <div className='md:ml-4 flex flex-col justify-between py-4'>
                                       <Link to={`/resortdetail/${1}`}><h3 className='text-xl md:text-2xl font-bold mb-2'>New World Hoiana</h3></Link>
                                        <p className='text-gray-600 mb-4 flex gap-2'>
                                            <LocationMarkerIcon className='w-5 h-5' color='red' />Hội An, Việt Nam
                                        </p>
                                        <div className='flex items-center absolute bottom-4 left-4'>
                                            <StarIcon className='w-5 h-5 text-yellow-500' />
                                            <span className='ml-1'>4.6</span>
                                            <span className='text-gray-500 ml-2'>(16 đánh giá)</span>
                                        </div>
                                        <div className='absolute bottom-4 right-4'>
                                            <span className='font-normal text-lg'>Chỉ từ <span className='text-2xl'>3,520,000</span> VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div> <div className='border border-gray-300 flex flex-col md:flex-row items-start gap-4 relativeshadow-lg hover:shadow-xl'>
                                <img className='h-auto md:w-1/3 object-cover' src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/97/92/24/kumarakom-lake-resort.jpg?w=700&h=-1&s=1' alt='Resort 1' />
                                <div className='relative h-full md:w-2/3'>
                                    <div className='absolute top-4 right-4'>
                                        <button> <HeartIcon className='w-6 h-6 text-gray-400' /></button>
                                    </div>
                                    <div className='md:ml-4 flex flex-col justify-between py-4'>
                                       <Link to={`/resortdetail/${1}`}><h3 className='text-xl md:text-2xl font-bold mb-2'>New World Hoiana</h3></Link>
                                        <p className='text-gray-600 mb-4 flex gap-2'>
                                            <LocationMarkerIcon className='w-5 h-5' color='red' />Hội An, Việt Nam
                                        </p>
                                        <div className='flex items-center absolute bottom-4 left-4'>
                                            <StarIcon className='w-5 h-5 text-yellow-500' />
                                            <span className='ml-1'>4.6</span>
                                            <span className='text-gray-500 ml-2'>(16 đánh giá)</span>
                                        </div>
                                        <div className='absolute bottom-4 right-4'>
                                            <span className='font-normal text-lg'>Chỉ từ <span className='text-2xl'>3,520,000</span> VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div> <div className='border border-gray-300 flex flex-col md:flex-row items-start gap-4 relative shadow-lg hover:shadow-xl'>
                                <img className='h-auto md:w-1/3 object-cover' src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/97/92/24/kumarakom-lake-resort.jpg?w=700&h=-1&s=1' alt='Resort 1' />
                                <div className='relative h-full md:w-2/3'>
                                    <div className='absolute top-4 right-4'>
                                        <button> <HeartIcon className='w-6 h-6 text-gray-400' /></button>
                                    </div>
                                    <div className='md:ml-4 flex flex-col justify-between py-4'>
                                       <Link to={`/resortdetail/${1}`}><h3 className='text-xl md:text-2xl font-bold mb-2'>New World Hoiana</h3></Link>
                                        <p className='text-gray-600 mb-4 flex gap-2'>
                                            <LocationMarkerIcon className='w-5 h-5' color='red' />Hội An, Việt Nam
                                        </p>
                                        <div className='flex items-center absolute bottom-4 left-4'>
                                            <StarIcon className='w-5 h-5 text-yellow-500' />
                                            <span className='ml-1'>4.6</span>
                                            <span className='text-gray-500 ml-2'>(16 đánh giá)</span>
                                        </div>
                                        <div className='absolute bottom-4 right-4'>
                                            <span className='font-normal text-lg'>Chỉ từ <span className='text-2xl'>3,520,000</span> VNĐ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* Map View */}
                    <div className='col-span-4'>
                        <div className='border border-gray-300 rounded-lg h-full'>
                            <h4 className='text-xl font-semibold p-4 border-b'>Bản đồ</h4>
                            <div className='h-[300px] md:h-[400px]'>
                                {/* Replace with actual map */}
                                <p className='text-center pt-16'>Đây là map view</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResortSearchList;
