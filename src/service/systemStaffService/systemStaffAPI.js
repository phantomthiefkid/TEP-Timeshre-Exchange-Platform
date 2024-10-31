import axiosConfig from "../../util/axiosCustomize/axiosConfig";

const getAllRentalPosting = async (pageNo = 0, pageSize = 10, resortName = "") => {
    try {
        return await axiosConfig.get(`system-staff/rental/postings`, {
            params: {
                pageNo,
                pageSize,
                resortName
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

export {
    getAllRentalPosting,
    getRentalPostingById
}