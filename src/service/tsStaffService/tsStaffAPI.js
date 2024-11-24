import axiosConfig from "../../util/axiosCustomize/axiosConfig";

const getAllRentalPosting = async (
  pageNo = 0,
  pageSize = 3,
  roomInfoCode = "",
  packageId = null
) => {
  try {
    return await axiosConfig.get(`timeshare-staff/rental/postings`, {
      params: {
        pageNo,
        pageSize,
        roomInfoCode,
        packageId,
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

const getAllBooking = async (
  pageNo = 0,
  pageSize = 3,
  isComing = false,
  willGo = false
) => {
  try {
    return await axiosConfig.get(`timeshare-staff/booking`, {
      params: {
        pageNo,
        pageSize,
        isComing,
        willGo,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getAllExchangePosting = async (
  pageNo = 0,
  pageSize = 3,
  roomInfoCode = ""
) => {
  try {
    return await axiosConfig.get(`timeshare-staff/exchange/postings`, {
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

const getExchangePostingById = async (postingId) => {
  try {
    return await axiosConfig.get(
      `timeshare-staff/exchange/posting/${postingId}`
    );
  } catch (error) {
    throw error;
  }
};

const rejectExchangePostingById = async (data, postingId) => {
  try {
    return await axiosConfig.post(
      `timeshare-staff/exchange/posting/reject/${postingId}`,
      { data }
    );
  } catch (error) {
    throw error;
  }
};

const approveExchangePostingById = async (postingId, data) => {
  try {
    return await axiosConfig.post(
      `timeshare-staff/exchange/posting/approval/${postingId}`,
      data
    );
  } catch (error) {
    throw error;
  }
};

const getRentalBookingById = async (bookingId) => {
  try {
    return await axiosConfig.get(`timeshare-staff/booking/rental/${bookingId}`);
  } catch (error) {
    throw error;
  }
};

const getExchangeBookingById = async (bookingId) => {
  try {
    return await axiosConfig.get(
      `timeshare-staff/booking/exchange/${bookingId}`
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
        pageSize,
      },
    });
  } catch (error) {
    return error;
  }
};

const getAllFeedbacksResortForRating = async () => {
  try {
    return await axiosConfig.get(`timeshare-staff/feedback/resort`, {
      params: {
        pageNo: 0,
        pageSize: 200,
      },
    });
  } catch (error) {
    return error;
  }
};

const sendReportFeedbackResort = async (feedbackId, data) => {
  try {
    console.log(feedbackId, data);
    return await axiosConfig.put(
      `timeshare-staff/feedback/report/${feedbackId}`,
      { note: data }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const onChangeRentalBookingById = async (bookingId, data) => {
  try {
    return await axiosConfig.post(
      `timeshare-staff/booking/rental/${bookingId}`,
      data
    );
  } catch (error) {
    throw error;
  }
};

const onChangeExchangeBookingById = async (bookingId, data) => {
  try {
    return await axiosConfig.post(
      `timeshare-staff/booking/exchange/${bookingId}`,
      data
    );
  } catch (error) {
    throw error;
  }
};

const getAllExchangeRequest = async (
  pageNo = 0,
  pageSize = 3,
  roomInfoCode = ""
) => {
  try {
    return await axiosConfig.get(`timeshare-staff/exchange/request`, {
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

const getExchangeRequestById = async (requestId) => {
  try {
    return await axiosConfig.get(
      `timeshare-staff/exchange/request/${requestId}`
    );
  } catch (error) {
    throw error;
  }
};

const rejectExchangeRequestById = async (data, requestId) => {
  try {
    return await axiosConfig.post(
      `timeshare-staff/exchange/request/reject/${requestId}`,
      { data }
    );
  } catch (error) {
    throw error;
  }
};

const approveExchangeRequestById = async (requestId, data) => {
  try {
    return await axiosConfig.post(
      `timeshare-staff/exchange/request/approval/${requestId}`,
      data
    );
  } catch (error) {
    throw error;
  }
};

const updateRoomAmenities = async (roomId, data) => {
  try {
    return await axiosConfig.put(`customer/room/room-amenity/${roomId}`, {
      roomInfoAmenities: data,
    });
  } catch (error) {
    return error;
  }
};

export {
  getAllRentalPosting,
  getRentalPostingById,
  rejectRentalPostingById,
  approveRentalPostingById,
  getFeedbackResort,
  getAllFeedbacksResortForRating,
  sendReportFeedbackResort,
  getAllBooking,
  getAllExchangePosting,
  getExchangePostingById,
  rejectExchangePostingById,
  approveExchangePostingById,
  getRentalBookingById,
  getExchangeBookingById,
  onChangeRentalBookingById,
  onChangeExchangeBookingById,
  getAllExchangeRequest,
  getExchangeRequestById,
  rejectExchangeRequestById,
  approveExchangeRequestById,
  updateRoomAmenities,
};
