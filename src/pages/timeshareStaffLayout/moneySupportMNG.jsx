import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaChevronLeft, FaChevronRight, FaDotCircle } from "react-icons/fa";
import { FaArrowsRotate, FaEllipsisVertical } from "react-icons/fa6";

const moneySupportMNG = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const transactions = [
    {
      name: "Wilson Rhiel Madsen",
      checkin_date: "08 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$66.00",
      status: "Từ chối",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      statusColor: "bg-red-100 text-red-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Wilson Rhiel Madsen",
      phoneNumber: "0375977644"
    },
    {
      name: "Adobe CC",
      checkin_date: "02 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$49.00",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      status: "Đang chờ",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Adobe CC logo",
      phoneNumber: "0375977644"
    },
    {
      name: "Ashlynn Stanton",
      checkin_date: "30 Aug 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$580.00",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      status: "Đã duyệt",
      statusColor: "bg-green-100 text-green-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Ashlynn Stanton",
      phoneNumber: "0375977644"
    },
    {
      name: "Wilson Rhiel Madsen",
      checkin_date: "08 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$66.00",
      status: "Từ chối",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      statusColor: "bg-red-100 text-red-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Wilson Rhiel Madsen",
      phoneNumber: "0375977644"
    },
    {
      name: "Adobe CC",
      checkin_date: "02 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$49.00",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      status: "Đang chờ",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Adobe CC logo",
      phoneNumber: "0375977644"
    },
    {
      name: "Ashlynn Stanton",
      checkin_date: "30 Aug 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$580.00",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      status: "Đã duyệt",
      statusColor: "bg-green-100 text-green-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Ashlynn Stanton",
      phoneNumber: "0375977644"
    },
    {
      name: "Wilson Rhiel Madsen",
      checkin_date: "08 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$66.00",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      status: "Từ chối",
      statusColor: "bg-red-100 text-red-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Wilson Rhiel Madsen",
      phoneNumber: "0375977644"
    },
    {
      name: "Adobe CC",
      checkin_date: "02 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$49.00",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      status: "Đang chờ",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Adobe CC logo",
      phoneNumber: "0375977644"
    },
    {
      name: "Ashlynn Stanton",
      checkin_date: "30 Aug 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$580.00",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      status: "Đã duyệt",
      statusColor: "bg-green-100 text-green-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Ashlynn Stanton",
      phoneNumber: "0375977644"
    },
    {
      name: "Wilson Rhiel Madsen",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      checkin_date: "08 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$66.00",
      status: "Từ chối",
      statusColor: "bg-red-100 text-red-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Wilson Rhiel Madsen",
      phoneNumber: "0375977644"
    },
    {
      name: "Adobe CC",
      checkin_date: "02 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      amount: "$49.00",
      status: "Đang chờ",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Adobe CC logo",
      phoneNumber: "0375977644"
    },
    {
      name: "Ashlynn Stanton",
      checkin_date: "30 Aug 2024 ",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      checkout_date: "02 Sep 2024 ",
      amount: "$580.00",
      status: "Đã duyệt",
      statusColor: "bg-green-100 text-green-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Ashlynn Stanton",
      phoneNumber: "0375977644"
    },
    {
      name: "Wilson Rhiel Madsen",
      checkin_date: "08 Sep 2024 ",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      checkout_date: "02 Sep 2024 ",
      amount: "$66.00",
      status: "Từ chối",
      statusColor: "bg-red-100 text-red-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Wilson Rhiel Madsen",
      phoneNumber: "0375977644"
    },
    {
      name: "Adobe CC",
      checkin_date: "02 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$49.00",
      status: "Đang chờ",
      statusColor: "bg-blue-100 text-blue-500",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Adobe CC logo",
      phoneNumber: "0375977644"
    },
    {
      name: "Ashlynn Stanton",
      checkin_date: "30 Aug 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$580.00",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      status: "Đã duyệt",
      statusColor: "bg-green-100 text-green-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Ashlynn Stanton",
      phoneNumber: "0375977644"
    },
    {
      name: "Wilson Rhiel Madsen",
      checkin_date: "08 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      amount: "$66.00",
      status: "Từ chối",
      statusColor: "bg-red-100 text-red-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Wilson Rhiel Madsen",
      phoneNumber: "0375977644"
    },
    {
      name: "Adobe CC",
      checkin_date: "02 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$49.00",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      status: "Đang chờ",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Adobe CC logo",
      phoneNumber: "0375977644"
    },
    {
      name: "Ashlynn Stanton",
      checkin_date: "30 Aug 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$580.00",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      status: "Đã duyệt",
      statusColor: "bg-green-100 text-green-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Ashlynn Stanton",
      phoneNumber: "0375977644"
    },
    {
      name: "Wilson Rhiel Madsen",
      checkin_date: "08 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$66.00",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      status: "Từ chối",
      statusColor: "bg-red-100 text-red-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Wilson Rhiel Madsen",
      phoneNumber: "0375977644"
    },
    {
      name: "Adobe CC",
      checkin_date: "02 Sep 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$49.00",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      status: "Đang chờ",
      statusColor: "bg-blue-100 text-blue-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Adobe CC logo",
      phoneNumber: "0375977644"
    },
    {
      name: "Ashlynn Stanton",
      checkin_date: "30 Aug 2024 ",
      checkout_date: "02 Sep 2024 ",
      amount: "$580.00",
      status: "Đã duyệt",
      roomImage: "https://vinhtuong.com/sites/default/files/2023-10/mau-phong-ngu-dep-7.png",
      statusColor: "bg-green-100 text-green-500",
      image: "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/464377284_1753130825502957_4666790708009908586_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEKTeHhLXgZ7idnnM783UyE_aVxxdgfDdb9pXHF2B8N1vFo0oZMrYp0rCNhu6hcL8uKsc48406PkMMbzoZiu7yI&_nc_ohc=4qHtbYuVbaEQ7kNvgFM9wI7&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AkK-wyO5xQgiBZOTqzPEqo5&oh=00_AYD-5_3zUk99_GrcxH8CqKRA1w01M4Z6m4EprAoPwvfHqA&oe=6721CFB6",
      postId: "Profile picture of Ashlynn Stanton",
      phoneNumber: "0375977644"
    },
  ];

  const filteredTransactions = filterStatus
    ? transactions.filter((transaction) => transaction.status === filterStatus)
    : transactions;
  return (
    <>
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

        <div className="flex items-center space-x-4 mb-5">
          <button
            onClick={() => setFilterStatus("")} // Reset filter
            className={`px-4 py-2 rounded-md ${filterStatus === ""
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterStatus("Đang chờ")}
            className={`px-4 py-2 rounded-md ${filterStatus === "Đang chờ"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
          >
            Đang chờ
          </button>
          <button
            onClick={() => setFilterStatus("Đã duyệt")}
            className={`px-4 py-2 rounded-md ${filterStatus === "Đã duyệt"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
          >
            Đã duyệt
          </button>
          <button
            onClick={() => setFilterStatus("Từ chối")}
            className={`px-4 py-2 rounded-md ${filterStatus === "Từ chối"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
          >
            Từ chối
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-200 ">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="p-4 text-left ml-3">Thông tin phòng</th>
              <th className="p-4 text-left">Ngày đăng</th>
              <th className="p-4 text-left">Đăng bởi</th>

              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-4 flex items-center w-72">
                  <img
                    src={transaction.roomImage}
                    className="w-12 h-12 rounded-2xl mr-5"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{transaction.name}</h3>
                    <p className="text-sm text-blue-400">
                      {transaction.postId}
                    </p>
                  </div>
                </td>

                <td className="p-4">{transaction.checkin_date}</td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Hình ảnh đại diện */}
                    <img
                      src={transaction.image}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    {/* Thông tin người dùng */}
                    <div>
                      <p className="text-sm font-medium">{transaction.name}</p>
                      <p className="text-xs text-gray-500">{transaction.phoneNumber}</p>
                    </div>
                  </div>
                </td>


                <td className="p-4">
                  <span
                    className={`flex items-center px-2 py-1 rounded-full w-32 ${transaction.statusColor}`}
                  >
                    <FaDotCircle className="mr-2" />
                    {transaction.status}
                  </span>
                </td>
                <td className="p-4">
                  <FaEllipsisVertical />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
              37
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
              38
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
              39
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500">
              40
            </button>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default moneySupportMNG;
