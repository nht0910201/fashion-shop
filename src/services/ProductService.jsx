import { get,post } from "../api/axiosConfig";

export const getProductByCategory = async (id) =>{
    try {
        const response = await get(`/products/category/${id}`);
        return response
    } catch (error) { 
        return error.response.data 
    };

}
export const getProductByID = async (id) =>{
    try {
        const response = await get(`/products/${id}`);
        return response
    } catch (error) { 
        return error.response.data 
    };

}
export const addProductToCart = async (data={}) => {
    try {
        const response = await post('/cart',data);
        return response
    } catch (error) { 
        return error.response.data 
    };
}
