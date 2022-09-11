import {get} from '../api/axiosConfig'

export const getAllCategory = async () =>{
    try {
        const response = await get('/categories');
        return response
    } catch (error) { console.log(error); };

}
