const resorts = [
    {
        id: 1,
        name: 'Vinpearl Resort Nha Trang',
        img: 'https://media.cntraveler.com/photos/53da60a46dec627b149e66f4/master/pass/hilton-moorea-lagoon-resort-spa-moorea-french-poly--110160-1.jpg',
        location: 'Nha Trang, Khánh Hòa',
    },
    {
        id: 2,
        name: 'InterContinental Danang Sun Peninsula Resort',
        img: 'https://modalabeachresort.com/wp-content/uploads/2024/06/rooms_tawhay_6.jpg',
        location: 'Đà Nẵng'
    },
    {
        id: 3,
        name: 'The Grand Ho Tram Strip',
        img: 'https://modalabeachresort.com/wp-content/uploads/2024/06/rooms_hayahay_6.jpg',
        location: 'Bà Rịa - Vũng Tàu'
    },
    {
        id: 4,
        name: 'Six Senses Ninh Van Bay',
        img: 'https://modalabeachresort.com/wp-content/uploads/2024/06/Lantaw-Sunset-Carousel.png',
        location: 'Ninh Vân Bay, Khánh Hòa'
    },
    {
        id: 5,
        name: 'Fusion Resort Cam Ranh',
        img: 'https://modalabeachresort.com/wp-content/uploads/2024/06/Lantaw-Ocean-1-e1649727785617.jpg',
        location: 'Cam Ranh, Khánh Hòa'
    }
];

export const userData = [
    {
        name: "Nguyễn Văn A",
        avatar: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=sn2hUT6WZQYQ7kNvgEnBOzi&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AJpnrIAWt1bwxm9T36Xvn7b&oh=00_AYC1078xiwcw_mU2hHE6PC0jqktb7VqIYlHcWPcK1z7t6g&oe=67041E19",
        phone: "0901234567",
        email: "nguyenvana@gmail.com",
        role: "Admin",
        state: true
    },
    {
        name: "Trần Thị B",
        avatar: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=sn2hUT6WZQYQ7kNvgEnBOzi&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AJpnrIAWt1bwxm9T36Xvn7b&oh=00_AYC1078xiwcw_mU2hHE6PC0jqktb7VqIYlHcWPcK1z7t6g&oe=67041E19",
        phone: "0912345678",
        email: "tranthib@gmail.com",
        role: "Customer",
        state: false
    },
    {
        name: "Lê Minh C",
        avatar: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=sn2hUT6WZQYQ7kNvgEnBOzi&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AJpnrIAWt1bwxm9T36Xvn7b&oh=00_AYC1078xiwcw_mU2hHE6PC0jqktb7VqIYlHcWPcK1z7t6g&oe=67041E19",
        phone: "0923456789",
        email: "leminhc@gmail.com",
        role: "Staff",
        state: true
    },
    {
        name: "Phạm Thị D",
        avatar: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=sn2hUT6WZQYQ7kNvgEnBOzi&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AJpnrIAWt1bwxm9T36Xvn7b&oh=00_AYC1078xiwcw_mU2hHE6PC0jqktb7VqIYlHcWPcK1z7t6g&oe=67041E19",
        phone: "0934567890",
        email: "phamthid@gmail.com",
        role: "Customer",
        state: true
    },
    {
        name: "Đặng Văn E",
        avatar: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/457790295_1947970998949022_3066255129954259156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFoY4GYNi_qQDgWWYTVmkUJddJ_WJqplOh10n9YmqmU6A-DFFr1-u1kpgPXw4WLuc3ejG4XhxS9QWj-l3PSn8tF&_nc_ohc=sn2hUT6WZQYQ7kNvgEnBOzi&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AJpnrIAWt1bwxm9T36Xvn7b&oh=00_AYC1078xiwcw_mU2hHE6PC0jqktb7VqIYlHcWPcK1z7t6g&oe=67041E19",
        phone: "0945678901",
        email: "dangvane@gmail.com",
        role: "Admin",
        state: false
    }
];


export default resorts;