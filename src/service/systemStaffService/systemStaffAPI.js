import axiosConfig from "../../util/axiosCustomize/axiosConfig";

const getAllRentalPosting = async (pageNo, pageSize, resortName, status) => {
    try {
        return await axiosConfig.get(`system-staff/rental/postings`, {
            params: {
                pageNo,
                pageSize,
                resortName,
                status
            },
        })
    } catch (error) {
        return error
    }
}

const getAllRentalPackagePosting = async (pageNo, pageSize, resortName, packageId, status) => {
    try {
        return await axiosConfig.get(`system-staff/rental/package/postings`, {
            params: {
                pageNo,
                pageSize,
                resortName,
                packageId,
                status
            },
        })
    } catch (error) {
        return error
    }
}

const getRentalPostingById = async (postingId) => {
    try {
        return await axiosConfig.get(`system-staff/rental/posting/${postingId}`)
    } catch (error) {
        return error
    }
}

const acceptNewPriceValuation = async (postingId, newPriceValuation) => {
    try {
        console.log(postingId, newPriceValuation)
        return await axiosConfig.post(`system-staff/rental/posting/approval/${postingId}`, {}, {
            params: {
                postingId: postingId,
                newPriceValuation: newPriceValuation
            }
        })

    } catch (error) {
        return error
    }
}

const getAllFeedbackResortListST = async (isReport, pageNo, pageSize, resortId) => {
    try {
        return await axiosConfig.get(`system-staff/feedback/resort/${resortId}`, {
            params: {
                isReport: isReport,
                pageNo: pageNo,
                pageSize: pageSize
            }
        })

    } catch (error) {
        return error
    }
}

const deactiveFeedback = async (feedbackId) => {
    try {
        return await axiosConfig.put(`system-staff/feedback/deActive/${feedbackId}`);

    } catch (error) {
        return error
    }
}

const createBlog = async (blog) => {
    try {
        return await axiosConfig.post(`system-staff/blog`, blog);
    } catch (error) {
        throw error
    }
}

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
        const response = await axiosConfig.get(`system-staff/blog/${id}`,);
        return response;
    } catch (error) {
        throw error;
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
    getAllRentalPackagePosting
}