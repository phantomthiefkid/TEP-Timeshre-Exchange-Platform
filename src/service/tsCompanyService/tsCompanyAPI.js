import axiosConfig from "../../util/axiosCustomize/axiosConfig";

const getAllResort = async (pageNo = 0, pageSize = 10, resortName = "") => {
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

const createTimeshareStaff = async (data) => {
  try {
    return await axiosConfig.post(`timeshare-company/staff`, data);
  } catch (error) {
    return error;
  }
};

const createResortByTSC = async (data) => {
  try {
    return await axiosConfig.post(`timeshare-company/resort`, data);
  } catch (error) {
    throw error;
  }
};

const createResortUnitType = async (data) => {
  try {
    console.log("Data: ", data);
    return await axiosConfig.post(`timeshare-company/resort/unit-type`, data);
  } catch (error) {
    throw error;
  }
};

const getResortById = async (id) => {
  try {
    return await axiosConfig.get(`timeshare-company/resort/${id}`);
  } catch (error) {
    throw error;
  }
};

const updateResortBasic = async (data, resortId) => {
  try {
    console.log(data, "api");
    return await axiosConfig.put(`timeshare-company/resort/${resortId}`, data);
  } catch (error) {
    throw error;
  }
};

const updateResortUnitType = async (data, unitTypeId) => {
  try {
    return await axiosConfig.put(
      `timeshare-company/resort/unit-type/${unitTypeId}`,
      data
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deactiveUnitType = async (unitTypeId) => {
  try {
    return await axiosConfig.put(
      `timeshare-company/resort/unit-type/${unitTypeId}/deactivate`
    );
  } catch (error) {
    throw error;
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

const getTsStaffById = async (id = "") => {
  try {
    return await axiosConfig.get(`/timeshare-company/staff/${id}`, {});
  } catch (error) {
    console.error("Get Timeshare Staff Detail error:", error);
    return error;
  }
};

const updateTimeshareCompanystaff = async (staffId = "", data) => {
  try {
    return await axiosConfig.put(`/timeshare-company/staff/${staffId}`, data);
  } catch (error) {
    console.error("Update Timeshare Staff Detail error:", error);
    return error;
  }
};

const getProfileTsCompany = async () => {
  try {
    return await axiosConfig.get(`/timeshare-company/resort/profile`);
  } catch (error) {
    return error;
  }
};

const updateProfileTsCompany = async (data) => {
  try {
    return await axiosConfig.put(`/timeshare-company/resort/profile`, data);
  } catch (error) {
    return error;
  }
};

const getTotalMoney = async () => {
  try {
    return await axiosConfig.get(`timeshare-company/total-money`);
  } catch (error) {
    return error;
  }
};

const getTotalResort = async () => {
  try {
    return await axiosConfig.get(`timeshare-company/total-resorts`);
  } catch (error) {
    return error;
  }
};

const getTotalStaff = async () => {
  try {
    return await axiosConfig.get(`timeshare-company/total-staffs`);
  } catch (error) {
    return error;
  }
};

const getAllWalletTransactions = async (page, size) => {
  try {
    return await axiosConfig.get(
      `wallet/timeshare-company/wallet-transaction/money-received`,
      {
        params: {
          page,
          size,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

const getRevenueTSC = async () => {
  try {
    return await axiosConfig.get(`timeshare-company/total-money/month`);
  } catch (error) {
    return error;
  }
};

export {
  getAllResort,
  getAllTimeshareStaff,
  createTimeshareStaff,
  createResortByTSC,
  createResortUnitType,
  getTsStaffById,
  updateTimeshareCompanystaff,
  updateResortBasic,
  updateResortUnitType,
  getTimeshareCompanyById,
  getResortById,
  getProfileTsCompany,
  updateProfileTsCompany,
  getTotalMoney,
  getTotalResort,
  getTotalStaff,
  getAllWalletTransactions,
  getRevenueTSC,
  deactiveUnitType,
};
