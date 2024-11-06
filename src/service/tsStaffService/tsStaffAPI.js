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

const getFeedbackResort = async (pageNo, pageSize) => {
  try {
    return await axiosConfig.get(`timeshare-staff/feedback/resort`, {
      params: {
        pageNo,
        pageSize
      },
    });
  } catch (error) {
    return error;
  }
}

const getAllFeedbacksResortForRating = async () => {
  try {
    return await axiosConfig.get(`timeshare-staff/feedback/resort`, {
      params: {
        pageNo : 0,
        pageSize : 200
      },
    });
  } catch (error) {
    return error;
  }
}

const sendReportFeedbackResort = async (feedbackId, data) => {
  try {
    console.log(feedbackId, data)
    return await axiosConfig.put(`timeshare-staff/feedback/report/${feedbackId}`, {note: data})
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  getAllRentalPosting,
  getRentalPostingById,
  rejectRentalPostingById,
  approveRentalPostingById,
  getFeedbackResort,
  getAllFeedbacksResortForRating,
  sendReportFeedbackResort
};
