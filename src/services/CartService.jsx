import { get } from "../api/axiosConfig";

export const getCart = async () =>{
    try {
        const response = await get('/cart');
        return response
    } catch (error) { 
        return error.response.data 
    };

}