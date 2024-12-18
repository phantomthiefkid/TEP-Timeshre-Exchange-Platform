import axiosConfig from "../../util/axiosCustomize/axiosConfig";

const getAllRentalPosting = async (pageNo, pageSize, resortName, status) => {
  try {
    return await axiosConfig.get(`system-staff/rental/postings`, {
      params: {
        pageNo,
        pageSize,
        resortName,
        status,
      },
    });
  } catch (error) {
    return error;
  }
};

const getAllRentalPackagePosting = async (
  pageNo,
  pageSize,
  resortName,
  packageId,
  status
) => {
  try {
    return await axiosConfig.get(`system-staff/rental/package/postings`, {
      params: {
        pageNo,
        pageSize,
        resortName,
        packageId,
        status,
      },
    });
  } catch (error) {
    return error;
  }
};

const getRentalPostingById = async (postingId) => {
  try {
    return await axiosConfig.get(`system-staff/rental/posting/${postingId}`);
  } catch (error) {
    return error;
  }
};

const acceptNewPriceValuation = async (postingId, newPriceValuation) => {
  try {
    console.log(postingId, newPriceValuation);
    return await axiosConfig.post(
      `system-staff/rental/posting/approval/${postingId}`,
      {},
      {
        params: {
          postingId: postingId,
          newPriceValuation: newPriceValuation,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

const getAllFeedbackResortListST = async (
  isReport,
  pageNo,
  pageSize,
  resortId
) => {
  try {
    return await axiosConfig.get(`system-staff/feedback/resort/${resortId}`, {
      params: {
        isReport: isReport,
        pageNo: pageNo,
        pageSize: pageSize,
      },
    });
  } catch (error) {
    return error;
  }
};

const deactiveFeedback = async (feedbackId) => {
  try {
    return await axiosConfig.put(
      `system-staff/feedback/deActive/${feedbackId}`
    );
  } catch (error) {
    return error;
  }
};

const createBlog = async (blog) => {
  try {
    return await axiosConfig.post(`system-staff/blog`, blog);
  } catch (error) {
    throw error;
  }
};

const getAllBlog = async (title, page, size) => {
  try {
    const response = await axiosConfig.get(`system-staff/blog`, {
      params: {
        page,
        size,
        title,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const getBlogById = async (id) => {
  try {
    const response = await axiosConfig.get(`system-staff/blog/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const deActivateBlog = async (id) => {
  try {
    const response = await axiosConfig.put(
      `system-staff/blog/${id}/deactivate`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const getTotalResorts = async () => {
  try {
    return await axiosConfig.get(`/system-staff/total-resorts`);
  } catch (error) {
    return error;
  }
};

const getTotalPackages = async () => {
  try {
    return await axiosConfig.get(`system-staff/total-packages`);
  } catch (error) {
    return error;
  }
};

const getTotalCustomers = async () => {
  try {
    return await axiosConfig.get(`system-staff/total-customers`);
  } catch (error) {
    return error;
  }
};

const getTotalCompany = async () => {
  try {
    return await axiosConfig.get(`system-staff/total-company`);
  } catch (error) {
    return error;
  }
};

const getTotalRevenue = async () => {
  try {
    return await axiosConfig.get(`system-staff/dashboard/revuenue`);
  } catch (error) {
    return error;
  }
};

const getAllTransaction = async (page, size, walletTransactionEnum) => {
  try {
    return await axiosConfig.get(`wallet/system-staff/wallet-transaction`, {
      params: {
        page,
        size,
        walletTransactionEnum,
      },
    });
  } catch (error) {
    return error;
  }
};

const getAllFAQs = async () => {
  try {
    return await axiosConfig.get(`system-staff/faq/all`);
  } catch (error) {
    return error;
  }
};

const updateFAQById = async (data) => {
  try {
    const updateData = {
      title: data.title,
      description: data.description,
      type: data.type,
    };
    return await axiosConfig.put(`system-staff/faq/${data.faqId}`, updateData);
  } catch (error) {
    return error;
  }
};

const getAllPolicies = async () => {
  try {
    return await axiosConfig.get(`system-staff/policy/all`);
  } catch (error) {
    return error;
  }
};
const createFaq = async (data) => {
  try {
    return await axiosConfig.post(`system-staff/faq`, data);
  } catch (error) {
    return error;
  }
};

const updatePolicyById = async (data) => {
  try {
    console.log(data);
    const updateData = {
      title: data.title,
      description: data.description,
      type: data.type,
    };
    return await axiosConfig.put(
      `system-staff/policy/${data.policyId}`,
      updateData
    );
  } catch (error) {
    return error;
  }
};

const createPolicy = async (data) => {
  try {
    return await axiosConfig.post(`system-staff/policy`, data);
  } catch (error) {
    return error;
  }
};

const getPackageByDate = async (startDate, endDate) => {
  try {
    return await axiosConfig.get(`system-staff/total-packages/date`, {
      params: {
        startDate,
        endDate,
      },
    });
  } catch (error) {
    return error;
  }
};

export {
  getAllRentalPosting,
  getRentalPostingById,
  acceptNewPriceValuation,
  getAllFeedbackResortListST,
  deactiveFeedback,
  createBlog,
  getAllBlog,
  getBlogById,
  getAllRentalPackagePosting,
  getTotalResorts,
  getTotalPackages,
  getTotalCustomers,
  getTotalCompany,
  getAllTransaction,
  getAllFAQs,
  updateFAQById,
  getAllPolicies,
  updatePolicyById,
  createPolicy,
  createFaq,
  deActivateBlog,
  getPackageByDate,
  getTotalRevenue,
};
