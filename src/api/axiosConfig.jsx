import axios from 'axios';
import { getFromLocalStorage } from '../utils/tokenHandle';

const axiosConfig = axios.create({
    baseURL: 'https://fashion-store-capstone.herokuapp.com/api'
    // baseURL:'http://localhost:8080/api'
});
axiosConfig.interceptors.request.use(
    function (req) {
        const token = getFromLocalStorage()
        if (token) 
            req.headers['authorization'] =`Bearer ${token}` ;
        return req;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export const get = async (path, params = {}) => {
    const response = await axiosConfig.get(path, params);
    return response.data;
};
export const post = async (path, params = {}) => {
    const response = await axiosConfig.post(path, params);
    return response;
};
export const put = async (path, params = {}) => {
    const response = await axiosConfig.put(path, params);
    return response.data;
};
export const patch = async (path, params = {}) => {
    const response = await axiosConfig.patch(path, params);
    return response.data;
};
export const del = async (path, params = {}) => {
    const response = await axiosConfig.delete(path, params);
    return response.data;
};
export const postImage = async (path, params) => {
    const response = await axiosConfig.post(path, params,{headers:{"Content-Type": "multipart/form-data" }});
    return response;
};

export default axiosConfig;

