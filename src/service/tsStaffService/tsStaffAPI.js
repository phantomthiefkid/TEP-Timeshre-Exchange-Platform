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
    return error;
  }
};

const getRentalPostingById = async (postingId) => {
  try {
    return await axiosConfig.get(`timeshare-staff/rental/posting/${postingId}`);
  } catch (error) {
    throw error;
  }
};

export { getAllRentalPosting, getRentalPostingById };
