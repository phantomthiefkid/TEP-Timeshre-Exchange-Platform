import React from 'react';
import Navigation from '../../components/Navbar/navigation';
import { SearchIcon } from '@heroicons/react/solid';
import Footer from '../../components/Footer/footer'
import { Link } from 'react-router-dom';
const TimeshareCompany = () => {

    const companies = [
        "Vinperl Resort Nha Trang 1",
        "Vinperl Resort Nha Trang 2",
        "Vinperl Resort Nha Trang 3",
        "Vinperl Resort Nha Trang 4",
        "Vinperl Resort Nha Trang 5",
        "Vinperl Resort Nha Trang 6",
        "Vinperl Resort Nha Trang 7",
        "Vinperl Resort Nha Trang 8"
    ];

    return (
        <>
            <Navigation />
            <div
                style={{
                    backgroundImage: "url('https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/461264804_1965790763833712_3625045724339746514_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHSbvO0imkv0UwNGpkAkMX7sL8keMoax1WwvyR4yhrHVe2crmTbS86_KO183YN41RMkN2djwHwfP6vZ0AM3Co6e&_nc_ohc=jwUgUEipcjwQ7kNvgGbTyW1&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=Awv0VGGMltnjplQrbRVCxkt&oh=00_AYCQ8RkGj8VQ7Lt93iDIOTVww7IjFzPCPlZGF5ep2DRYOg&oe=6709281E')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                className="min-h-[350px] flex flex-col items-center justify-center text-white text-center"
            >
                <div className='w-5/6 font-extralight flex justify-start'>
                    <h1 className="text-4xl font-bold text-left mb-4">Công ty timeshare</h1>
                </div>
                <div className="flex items-center h-[140px] bg-white p-2 rounded-md w-5/6 px-10">
                    <input
                        name="searchCompany"
                        type="search"
                        className="p-2 w-full h-1/2 border border-gray-300 rounded-l-lg text-black"
                        placeholder="Tìm kiếm công ty timeshare"
                    />
                    <button className="p-2 w-[230px] text-2xl flex justify-center items-center h-1/2 bg-blue-400 text-white rounded-r-lg">
                        <SearchIcon className='w-8' />
                        Tìm kiếm
                    </button>
                </div>
            </div>

            <div className='mt-10 px-4 md:px-4'>
                <div className="space-y-10">
                    <div className='flex justify-center'>
                        <div className='grid grid-cols-4 gap-8 max-w-7xl w-full'>
                            <Link to={`/timesharecompanydetail`}><img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 1" className='w-full h-auto object-contain border-2 border-gray-300 rounded-2xl shadow-xl' /></Link>
                            <Link to={`/timesharecompanydetail`}><img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 1" className='w-full h-auto object-contain border-2 border-gray-300 rounded-2xl shadow-xl' /></Link>
                            <Link to={`/timesharecompanydetail`}><img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 1" className='w-full h-auto object-contain border-2 border-gray-300 rounded-2xl shadow-xl' /></Link>
                            <Link to={`/timesharecompanydetail`}><img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 1" className='w-full h-auto object-contain border-2 border-gray-300 rounded-2xl shadow-xl' /></Link>
                        </div>
                    </div>

                    {/* Row 2 with 4 images, centered */}
                    <div className='flex justify-center'>
                        <div className='grid grid-cols-4 gap-8 max-w-7xl w-full'>
                        <Link to={`/timesharecompanydetail`}><img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 1" className='w-full h-auto object-contain border-2 border-gray-300 rounded-2xl shadow-xl' /></Link>
                        <Link to={`/timesharecompanydetail`}><img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 1" className='w-full h-auto object-contain border-2 border-gray-300 rounded-2xl shadow-xl' /></Link>
                        <Link to={`/timesharecompanydetail`}><img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 1" className='w-full h-auto object-contain border-2 border-gray-300 rounded-2xl shadow-xl' /></Link>
                        <Link to={`/timesharecompanydetail`}><img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 1" className='w-full h-auto object-contain border-2 border-gray-300 rounded-2xl shadow-xl' /></Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex justify-center'>
                <div className="mt-10 md:px-4 w-9/12">
                    {/* Another heading for the list of company names */}
                    <div className='flex justify-start'>
                        <h2 className="text-3xl font-bold mb-6 text-custom-blue-text">Danh sách Tên Công ty</h2>
                    </div>

                    {/* Grid layout for company names */}
                    <div className="grid grid-cols-2 w-full">
                        {companies.map((company, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-md flex justify-start text-blue-600 text-lg text-center"
                            >
                                <u>{company}</u>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className='mt-20 mb-24'
                style={{
                    backgroundImage: "url('https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/461281428_1965821687163953_5267050638982226489_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeELl4XMgFrRCu12B4b9nK7EQ6DfMR0_JzJDoN8xHT8nMjJZCg9a3xv_SGeBjwzBmT3qd8rQsuGkqiSr6LC152QE&_nc_ohc=9I4dsvJZtF4Q7kNvgHhGbbl&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AjiFG8ANqXED77Yf4yqp8bF&oh=00_AYCHZsW9ykup_zBBgCdlanbpH9OdTesUGjUMKRAGaW9Vpg&oe=6707231A')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '240px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    padding: '20px',
                    textAlign: 'center'
                }}
            >
                <p className="text-lg mb-4">
                    Mọi thắc mắc xin vui lòng liên hệ với chúng tôi qua email. Chúng tôi sẽ trả lời trong vòng 24 giờ làm việc.
                </p>
                <h2 className="text-3xl font-bold">Liên hệ</h2>
            </div>
            <Footer />


        </>
    );
}

export default TimeshareCompany;
