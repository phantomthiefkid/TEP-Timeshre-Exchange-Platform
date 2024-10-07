import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLogin, setRoleName } from "../redux/UserSlice/SignIn";


export const handleLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    localStorage.removeItem('token');
    localStorage.removeItem('roleName');
    dispatch(setIsLogin(false))
    dispatch(setRoleName(""))
    navigate("/signin")
};


