import { baseURL } from "../../config/config";

const postLogin = async (userCredentials) => {
    return await axios.post(`${baseURL}auth/login`, userCredentials)
};


export {
    postLogin
}