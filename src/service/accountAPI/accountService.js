import { baseURL } from "../../config/config";
import axios from "axios";
import axiosConfig from "../../util/axiosCustomize/axiosConfig";
const postLogin = async (userCredentials) => {
  try {
    return await axios.post(`${baseURL}auth/login`, userCredentials);
  } catch (error) {
    return error;
  }
};

const getAccountInfo = async (userId) => {
  try {
    console.log("Redux", userId);
    return await axiosConfig.get(`/admin/users/${userId}`);
  } catch (error) {
    console.error("Login error:", error);
    return error.response;
  }
};

const staffLogin = async (userCredentials) => {
  try {
    return await axios.post(
      `${baseURL}auth/timeshare-company-staff/login`,
      userCredentials
    );
  } catch (error) {
    return error;
  }
};

export { postLogin, getAccountInfo, staffLogin };
