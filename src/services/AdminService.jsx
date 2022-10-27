import { get,post,postImage,put } from "../api/axiosConfig";


export const getUsersByAdmin = async (page) =>{
    try {
        const response = await get(`/admin/manage/users?size=10&page=${page}`);
        return response
    } catch (error) { 
        return error.response.data 
    };

}
export const getCatgoriesByAdmin = async () =>{
    try {
        const response = await get('/admin/manage/categories');
        return response
    } catch (error) { 
        return error.response.data 
    };

}
export const getAllBrandsByAdmin = async () =>{
    try {
        const response = await get('admin/manage/brands');
        return response
    } catch (error) { console.log(error); };

}
export const getBrandByAdmin = async (id)=>{
    try{
        const response = await get(`/brands/${id}`);
        return response
    }catch(error){
        return error.response
    }
}

export const addUserByAdmin = async (data={}) =>{
    try {
        const response = await post('/admin/manage/users',data);
        return response
    } catch (error) { 
        return error.response
    };
}
export const updateUserByAdmin = async (data,id) =>{
    try{
        const response = await put(`/admin/manage/users/${id}`,data);
        return response
    }catch(error){
        return error.response
    }
}
export const addBrandByAdmin = async (data={}) =>{
    try {
        const response = await postImage('/admin/manage/brands',data);
        return response
    } catch (error) { 
        return error.response
    };
}
export const updateBrandByAdmin = async (data={},id) =>{
    try {
        const response = await postImage(`/admin/manage/brands/${id}`,data);
        return response
    } catch (error) { 
        return error.response
    };
}

export const addCategoryByAdmin = async (data={}) =>{
    try {
        const response = await postImage('/admin/manage/categories',data);
        return response
    } catch (error) { 
        return error.response
    };
}
export const updateCategoryByAdmin = async (data={},id) =>{
    try {
        const response = await put(`/admin/manage/categories/${id}`,data);
        return response
    } catch (error) { 
        return error.response
    };
}
