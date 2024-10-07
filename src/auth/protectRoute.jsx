import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = ({ isAllowed, redirectPath }) => {
  console.log(isAllowed)
  if (!isAllowed) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />; // Outlet giúp render các component con được bảo vệ
};

export default ProtectRoute;
