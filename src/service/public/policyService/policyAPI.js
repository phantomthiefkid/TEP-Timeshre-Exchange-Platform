import axios from "axios";
import { baseURL } from "../../../config/config";

const getAllPolicies = async () => {
    try {
        return await axios.get(`${baseURL}public/policy/all`)
    } catch (error) {
        throw error
    }
}

export {
    getAllPolicies
}