import axiosConfig from "../../util/axiosCustomize/axiosConfig";

const getAllUser = async (
  pageNo = 0,
  pageSize = 3,
  roleId = "",
  userName = ""
) => {
  try {
    // Passing query params for pagination, filter, and search
    return await axiosConfig.get(`admin/users`, {
      params: {
        pageNo,
        pageSize,
        roleId, // Filter by role
        userName, // Search by username
      },
    });
  } catch (error) {
    console.error("Get all user error:", error);
    return error;
  }
};

const createUser = async (data) => {
  try {
    return await axiosConfig.post(`admin/users`, data);
  } catch (error) {
    console.error("Get all user error:", error);
    return error;
  }
};

const getAllTimeshareCompany = async (
  pageNo = 0,
  pageSize = 3,
  timeshareCompanyName = ""
) => {
  try {
    return await axiosConfig.get(`admin/timeshare-company`, {
      params: {
        pageNo,
        pageSize,
        timeshareCompanyName,
      },
    });
  } catch (error) {
    console.error("Get all Timeshare Company error:", error);
    return error;
  }
};

const getTimeshareCompanyById = async (tsId = "") => {
  try {
    return await axiosConfig.get(`admin/timeshare-company/${tsId}`, {});
  } catch (error) {
    console.error("Get Timeshare Company Detail error:", error);
    return error;
  }
};

const getAllTimeshareCompanyAccount = async () => {};

const creatTimeshareCompany = async () => {};

const updateTimeshareCompany = async () => {};
export {
  getAllUser,
  createUser,
  getAllTimeshareCompany,
  getTimeshareCompanyById,
  getAllTimeshareCompanyAccount,
  creatTimeshareCompany,
  updateTimeshareCompany,
};
