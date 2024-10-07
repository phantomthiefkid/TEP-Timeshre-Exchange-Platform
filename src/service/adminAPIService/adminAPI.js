import axiosConfig from "../../util/axiosCustomize/axiosConfig"

const getAllUser = async () => {
    try {
        return await axiosConfig.get(`admin/users`)
    } catch (error) {
        console.error("Get all user error:", error);
        return error
    }
}

export {
    getAllUser
}