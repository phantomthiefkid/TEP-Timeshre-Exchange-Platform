import axios from "axios";
import { baseURL } from "../../../config/config";

const getAllBlog = async (title, page, size) => {
    try {
        return await axios.get(`${baseURL}public/blog/postings`, {
            params: {
                title,
                page,
                size
            }
        })
    } catch (error) {
        throw error
    }
}

const getDetailBlogById = async (id) => {
    try {
        return await axios.get(`${baseURL}public/blog/${id}`)
    } catch (error) {
        throw error
    }
}

export {
    getAllBlog,
    getDetailBlogById
}