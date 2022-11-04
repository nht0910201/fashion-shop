import { get,post,postImage,put,del } from "../api/axiosConfig";


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
export const getProductsByAdmin = async (page) =>{
    try {
        const response = await get(`/manage/products?size=20&page=${page}`);
        return response
    } catch (error) { 
        return error.response.data 
    };

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

export const addProductByAdmin = async (data={}) =>{
    try {
        const response = await post('/manage/products',data);
        return response
    } catch (error) { 
        return error.response
    };
}
export const addProductOptionByAdmin = async (data={},id) =>{
    try {
        const response = await postImage(`/manage/products/option/${id}`,data);
        return response
    } catch (error) { 
        return error.response
    };
}
export const addProductAttrByAdmin = async (data={},id) =>{
    try {
        const response = await post(`/manage/products/attribute/${id}`,data);
        return response
    } catch (error) { 
        return error.response
    };
}
export const updateProductByAdmin = async (data={},id) =>{
    try {
        const response = await put(`/manage/products/${id}`,data);
        return response
    } catch (error) { 
        return error.response
    };
}
export const updateAttrByAdmin = async (data={},id) =>{
    try {
        const response = await put(`/manage/products/attribute/${id}`,data);
        return response
    } catch (error) { 
        return error.response
    };
}
export const delProductAttrByAdmin = async (data={},id) =>{
    try {
        const response = await del(`/manage/products/attribute/${id}`,data);
        return response
    } catch (error) { 
        return error.response.data 
    };
}
export const updateProducOptionByAdmin = async (data={},id,oldColor) =>{
    try {
        const response = await put(`/manage/products/option/${id}?variantColor=${oldColor}`,data);
        return response
    } catch (error) { 
        return error.response
    };
}
export const uploadImageByAdmin = async (data={},id) =>{
    try {
        const response = await postImage(`/manage/products/images/${id}`,data);
        return response
    } catch (error) { 
        return error.response
    };
}
export const delImagePooductByAdmin = async (data={},id) =>{
    try {
        const response = await del(`/manage/products/images/${id}`,data);
        return response
    } catch (error) { 
        return error.response.data 
    };
}
export const delProductByAdmin = async (id) =>{
    try {
        const response = await del(`/manage/products/${id}`);
        return response
    } catch (error) { 
        return error.response.data 
    };
}