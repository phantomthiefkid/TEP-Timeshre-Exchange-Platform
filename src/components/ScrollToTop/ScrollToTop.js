import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation(); // Lấy pathname của route hiện tại

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    }, [pathname]); // Gọi lại mỗi khi route thay đổi

    return null;
};

export default ScrollToTop;
