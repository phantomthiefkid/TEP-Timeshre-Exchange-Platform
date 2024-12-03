import axios from "axios";
import { baseURL } from "../../../config/config";

const getAllFaqs = async () => {
    try {
        return await axios.get(`${baseURL}public/faq/all`)
    } catch (error) {
        throw error
    }
}

export {
    getAllFaqs
}