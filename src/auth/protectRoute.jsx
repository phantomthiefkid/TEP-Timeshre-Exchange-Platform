import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectRoute = ({ isAllowed, redirectPath }) => {
  const { isLogin } = useSelector((state) => state.isLogin);
  
  if (typeof isAllowed === 'undefined' || !isLogin) {
    return <Navigate to={redirectPath} />;
  }

  if (!isAllowed) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />; 
};

export default ProtectRoute;
