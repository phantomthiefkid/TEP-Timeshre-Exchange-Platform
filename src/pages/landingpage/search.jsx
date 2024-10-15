import React, { useEffect, useState } from 'react'
import logoUnwind from '../../assets/Unwind.png'
import { Link } from 'react-router-dom'
import { getAllResortByName } from '../../service/public/resortService/resortAPI'

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [resort, setResort] = useState([]);
    const [debounceTimeout, setDebounceTimeout] = useState(null); // Dùng để lưu timeout của debounce

    const handleSearch = (e) => {
        const searchInput = e.target.value;
        setKeyword(searchInput);

        // Nếu không có từ khóa thì reset kết quả tìm kiếm
        if (!searchInput) {
            setResort([]);
            clearTimeout(debounceTimeout); // Dừng timeout nếu không có từ khóa
        }

        // Nếu có từ khóa, dùng debounce để chờ trước khi gọi API
        if (debounceTimeout) {
            clearTimeout(debounceTimeout); // Xóa timeout trước đó nếu có
        }

        const timeout = setTimeout(() => {
            fetchResortList(searchInput);
        }, 300); // Chờ 300ms sau khi người dùng dừng nhập

        setDebounceTimeout(timeout); // Lưu timeout mới
    };

    const fetchResortList = async (searchInput) => {
        if (searchInput) { // Chỉ fetch khi có keyword
            try {
                let data = await getAllResortByName(0, 20, searchInput);
                if (data.status) {
                    setResort(data.data.content);
                    console.log(data.data.content);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setResort([]);
        }
    }

    return (
        <div className='h-h-landing-child-1'>
            <div className='flex w-full justify-around'>
                <div className='w-2/5'>
                    <img className='h-logo-300-h w-logo-300-w' src={logoUnwind} alt="Unwind Logo" />
                </div>
                <div className='w-2/5 py-20'>
                    <h2 className='text-5xl font-medium text-right text-custom-blue-text'>Tìm kiếm nơi tốt nhất cho kỳ nghỉ của bạn.</h2>
                </div>
            </div>
            <div className='bg-ninhvan bg-cover h-[820px] relative'>
                <div className="font-sans w-full text-black px-20 flex justify-end absolute top-10 right-4">
                    <div className="border rounded-lg overflow-hidden flex shadow-md">
                        <div>
                            <input
                                type="text"
                                className="px-4 py-2 w-w-search h-h-search"
                                placeholder="Search..."
                                value={keyword}
                                onChange={handleSearch}
                            />
                        </div>
                        <button className="flex items-center bg-blue-500 justify-center px-4 border-l w-14">
                            <Link to={'/resortsearchlist'}>
                                <svg className="h-4 w-4 text-grey-dark" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                </svg>
                            </Link>
                        </button>
                    </div>
                    {resort && resort.length > 0 && (
                        <div className="absolute top-14 right-40 w-1/3 bg-gray-100 border shadow-xl rounded-lg z-10">
                            <ul>
                                {resort.map((item) => (
                                    <li key={item.id} className="px-4 py-2 border-b hover:bg-gray-300">
                                        <Link to={`/resortdetail/${item.id}`}>
                                            {item.resortName} - {item.address}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Search;
