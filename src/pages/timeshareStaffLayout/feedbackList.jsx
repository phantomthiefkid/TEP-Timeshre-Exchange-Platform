import React from 'react';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { FaArrowsRotate } from 'react-icons/fa6';
const feedbackData = [
  {
    id: 1,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019', // Replace with actual avatar URLs
    name: 'Nguyen Van A',
    date: '2023-10-24',
    time: '14:30',
    feedback: 'Rất hài lòng với dịch vụ!',
    rating: 5,
  },
  {
    id: 2,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Cuộc đời tôi năm nay hơn 60 tuổi rồi chưa thấy cái resort nào tốt như thế này cả!',
    rating: 3,
  },
  {
    id: 3,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Cuộc đời tôi năm nay hơn 60 tuổi rồi chưa thấy cái resort nào tốt như thế này cả!',
    rating: 3,
  },
  {
    id: 4,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Cuộc đời tôi năm nay hơn 60 tuổi rồi chưa thấy cái resort nào tốt như thế này cả!',
    rating: 3,
  },
  {
    id: 5,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Cuộc đời tôi năm nay hơn 60 tuổi rồi chưa thấy cái resort nào tốt như thế này cả!',
    rating: 3,
  },
  {
    id: 6,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Cuộc đời tôi năm nay hơn 60 tuổi rồi chưa thấy cái resort nào tốt như thế này cả!',
    rating: 3,
  },
  {
    id: 7,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Cuộc đời tôi năm nay hơn 60 tuổi rồi chưa thấy cái resort nào tốt như thế này cả!',
    rating: 3,
  },
  {
    id: 8,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Cuộc đời tôi năm nay hơn 60 tuổi rồi chưa thấy cái resort nào tốt như thế này cả!',
    rating: 3,
  },
  {
    id: 9,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Dịch vụ cần cải thiện thêm!',
    rating: 3,
  },
  {
    id: 10,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Dịch vụ cần cải thiện thêm!',
    rating: 3,
  },
  {
    id: 11,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Dịch vụ cần cải thiện thêm!',
    rating: 3,
  },
  {
    id: 12,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Dịch vụ cần cải thiện thêm!',
    rating: 3,
  },
  {
    id: 13,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Dịch vụ cần cải thiện thêm!',
    rating: 3,
  },
  {
    id: 14,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Dịch vụ cần cải thiện thêm!',
    rating: 3,
  },
  {
    id: 15,
    avatarUrl: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=mUP1E-7Y2w8Q7kNvgGXxi7O&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AlF0Z132dgOK2q8waug-KlH&oh=00_AYA-kA6Ft0Bcuj8TLVSDc46Wr159E6LpXhdCmgLkjAlycA&oe=67220019',
    name: 'Tran Thi B',
    date: '2023-10-22',
    time: '10:15',
    feedback: 'Dịch vụ cần cải thiện thêm!',
    rating: 3,
  },

  // Add more feedback data as needed
];

const FeedbackList = () => {
  return (
    <div className="container mx-auto p-4 bg-white rounded-xl shadow-xl">
      <div className="flex items-center justify-between p-2 mt-3">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">Yêu cầu hỗ trợ</h1>
          <h3 className="text-xl text-gray-500">
            Quản lí các yêu cầu và hỗ trợ định giá ở đây
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center bg-blue-500 text-white rounded-md px-4 py-2">
            <FaArrowsRotate className="mr-3" />
            Làm mới
          </button>
        </div>
      </div>

      {/* Feedback List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbackData.map((feedback) => (
          <div className="p-5 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-2xl hover:scale-105 transition transform duration-200 ease-in-out">
            {/* Avatar and Name */}
            <div className="flex items-center mb-3">
              <img
                src={feedback.avatarUrl}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border border-gray-200 mr-3"
              />
              <div>
                <h4 className="text-base font-semibold text-gray-700">{feedback.name}</h4>
                <p className="text-xs text-gray-400">{feedback.date} | {feedback.time}</p>
              </div>
            </div>

            {/* Feedback Content */}
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              {feedback.feedback}
            </p>

            {/* Star Rating */}
            <div className="flex justify-center mt-4 space-x-1">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`${index < feedback.rating ? 'text-yellow-500' : 'text-gray-200'
                    }`}
                />
              ))}
            </div>
          </div>


        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-5 w-full">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-500">
          <FaChevronLeft />
        </button>
        <div className="flex space-x-2 bg-gray-200 rounded-full px-2 py-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
            4
          </button>
          <span className="flex items-center justify-center text-gray-500">
            ...
          </span>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
            40
          </button>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default FeedbackList;
