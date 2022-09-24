import {post} from '../api/axiosConfig'

export const userLogin = async (data={}) =>{
    try {
        const response = await post('/auth/login',data);
        return response
    } catch (error) { 
        return error.response
    };

}
export const userRegister = async (data={}) =>{
    try {
        const response = await post('/auth/register',data);
        return response
    } catch (error) {
         return error.response
    };

}
export const verifyUser = async (data={}) =>{
    try {
        const response = await post('/auth/verify',data);
        return response
    } catch (error) {
         return error.response
    };
}
export const resetPassword = async (data={}) =>{
    try {
        const response = await post('/auth/reset',data);
        return response
    } catch (error) {
         return error.response
    };
}
