import axiosConfig from "../../util/axiosCustomize/axiosConfig"

const getAllResort = async (pageNo = 0, pageSize = 3, resortName = "") => {
    try {
        return await axiosConfig.get(`timeshare-company/resort`, {
            params: {
                pageNo,
                pageSize,
                resortName
            }
        })
    } catch (error) {
        return error
    }
}

const createResortByTSC = async (data) => {
    try {
        return await axiosConfig.post(`timeshare-company/resort`, data)
    } catch (error) {
        throw error
    }
}
const createResortUnitType = async (data) => {
    try {
        return await axiosConfig.post(`timeshare-company/resort/unit-type`, data)
    } catch (error) {
        throw error
    }
}

const getResortById = async (id) => {
    try {
        return await axiosConfig.get(`timeshare-company/resort/${id}`)
    } catch (error) {
        throw error
    }
}

const updateResortBasic = async (data, resortId) => {
    try {
        return await axiosConfig.put(`timeshare-company/resort/${resortId}`, data)
    } catch (error) {
        throw error
    }
}

const updateResortUnitType = async (data, unitTypeId) => {
    try {
        return await axiosConfig.put(`timeshare-company/resort/unit-type/${unitTypeId}`, data)
    } catch (error) {
        throw error
    }
}

export {
    getAllResort,
    createResortByTSC,
    createResortUnitType,
    getResortById,
    updateResortBasic,
    updateResortUnitType
}