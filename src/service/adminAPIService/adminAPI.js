import axiosConfig from "../../util/axiosCustomize/axiosConfig"

const getAllUser = async (pageNo = 0, pageSize = 3, roleId = '', userName = '') => {
    try {
        // Passing query params for pagination, filter, and search
        return await axiosConfig.get(`admin/users`, {
            params: {
                pageNo,
                pageSize,
                roleId, // Filter by role
                userName, // Search by username
            },
        });
    } catch (error) {
        console.error("Get all user error:", error);
        return error;
    }
};

const createUser = async (data) => {
    try {
        return await axiosConfig.post(`admin/users`, data)
    } catch (error) {
        console.error("Get all user error:", error);
        return error;
    }
}

export {
    getAllUser,
    createUser
}