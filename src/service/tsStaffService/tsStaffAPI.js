import axiosConfig from "../../util/axiosCustomize/axiosConfig";

const getAllRentalPosting = async (
  pageNo = 0,
  pageSize = 3,
  roomInfoCode = ""
) => {
  try {
    return await axiosConfig.get(`timeshare-staff/rental/postings`, {
      params: {
        pageNo,
        pageSize,
        roomInfoCode,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getRentalPostingById = async (postingId) => {
  try {
    return await axiosConfig.get(`timeshare-staff/rental/posting/${postingId}`);
  } catch (error) {
    throw error;
  }
};

const rejectRentalPostingById = async (data, postingId) => {
  try {
    return await axiosConfig.post(
      `timeshare-staff/rental/posting/reject/${postingId}`,
      { data }
    );
  } catch (error) {
    throw error;
  }
};

const approveRentalPostingById = async (postingId, data) => {
  try {
    return await axiosConfig.post(
      `timeshare-staff/rental/posting/approval/${postingId}`,
      data
    );
  } catch (error) {
    throw error;
  }
};

export {
  getAllRentalPosting,
  getRentalPostingById,
  rejectRentalPostingById,
  approveRentalPostingById,
};
