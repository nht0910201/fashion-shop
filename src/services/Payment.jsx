import { post} from '../api/axiosConfig'

export const makeAnOrder = async (type,id,data={}) =>{
    try {
        const response = await post(`/checkout/${type}/${id}`,data);
        return response
    } catch (error) { 
        return error.response
    };

}