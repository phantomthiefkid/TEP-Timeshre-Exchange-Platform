import axios from "axios";
import { baseURL } from "../../../config/config";
const getResortById = async (id) => {
  try {
    console.log(id);
    return await axios.get(`${baseURL}public/resort/${id}`);
  } catch (error) {
    return error;
  }
};

const getAllResortByName = async (pageNo = 0, pageSize = 20, resortName) => {
  try {
    return await axios.get(`${baseURL}public/resort`, {
      params: {
        pageNo,
        pageSize,
        resortName,
      },
    });
  } catch (error) {
    return error;
  }
};

const getDetailUnitType = async (unitTypeId) => {
  try {
    return await axios.get(`${baseURL}public/unit-type/${unitTypeId}`);
  } catch (error) {
    return error;
  }
};

const getAllTimeshareCompany = async (
  pageNo = 0,
  pageSize = 20,
  timeshareCompanyName
) => {
  try {
    return await axios.get(`${baseURL}public/timeshare-company`, {
      params: {
        pageNo,
        pageSize,
        timeshareCompanyName,
      },
    });
  } catch (error) {
    return error;
  }
};

export {
  getResortById,
  getAllResortByName,
  getAllTimeshareCompany,
  getDetailUnitType,
};
