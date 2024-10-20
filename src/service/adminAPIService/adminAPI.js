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

const editUser = async (data) => {
  try {
    return await axiosConfig.put(`admin/users/${data.id}`, {
      roleId: data.roleId,
      isActive: data.isActive,
    });
  } catch (error) {
    console.error("editUser error!");
    return error;
  }
};

const getAllTimeshareCompany = async (
  pageNo = 0,
  pageSize = 3,
  tsName = ""
) => {
  try {
    return await axiosConfig.get(`admin/timeshare-company`, {
      params: {
        pageNo,
        pageSize,
        tsName,
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

const getAllTimeshareCompanyAccount = async () => {
  try {
    return await axiosConfig.get(`admin/users/timeshare-company`, {});
  } catch (error) {
    console.error("Get Timeshare Company Account error:", error);
    return error;
  }
};

const createTimeshareCompany = async (data) => {
  try {
    return await axiosConfig.post(`admin/timeshare-company`, data);
  } catch (error) {
    console.error("Create TS Company error:", error);
    return error;
  }
};

const updateTimeshareCompany = async () => {};

export {
  getAllUser,
  createUser,
  editUser,
  getAllTimeshareCompany,
  getTimeshareCompanyById,
  getAllTimeshareCompanyAccount,
  createTimeshareCompany,
  updateTimeshareCompany,
};
