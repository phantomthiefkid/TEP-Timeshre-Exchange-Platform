import axiosConfig from "../../util/axiosCustomize/axiosConfig";

const getAllRentalPosting = async (pageNo, pageSize, resortName) => {
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
        console.log(error)
        return error
    }
}

export {
    getAllRentalPosting,
    getRentalPostingById,
    acceptNewPriceValuation
}