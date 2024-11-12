import axiosConfig from "../../util/axiosCustomize/axiosConfigUpload";

const uploadFileImage = async (data) => {
    try {
        const response = await axiosConfig.post(`s3/file/upload`, data);
        return response;
    } catch (error) {
        return error;
    }
};

export {
    uploadFileImage
}