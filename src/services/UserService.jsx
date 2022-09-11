import {get,put,postImage} from '../api/axiosConfig'

export const getUserByID = async (id) =>{
    try{
        const response = await get(`/users/${id}`);
        return response
    }catch(error){
        return error.response
    }
}

export const updateUserByID = async (data,id) =>{
    try{
        const response = await put(`/users/${id}`,data);
        return response
    }catch(error){
        return error.response
    }
}
export const updateAvatarUserByID = async (data,id) =>{
    try{
        const response = await postImage(`/users/avatar/${id}`,data);
        return response
    }catch(error){
        return error.response
    }
}