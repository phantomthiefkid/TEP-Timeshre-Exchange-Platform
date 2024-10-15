import axiosConfig from "../../util/axiosCustomize/axiosConfig";

const getAllResort = async (pageNo = 0, pageSize = 3, resortName = "") => {
  try {
    return await axiosConfig.get(`timeshare-company/resort`, {
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

const getAllTimeshareStaff = async (
  pageNo = 0,
  pageSize = 3,
  StaffName = ""
) => {
  try {
    return await axiosConfig.get(`timeshare-company/staff`, {
      params: {
        pageNo,
        pageSize,
        StaffName,
      },
    });
  } catch (error) {
    return error;
  }
};

export { getAllResort, getAllTimeshareStaff };