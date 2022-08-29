import axiosConfig from '../api'

export const userLogin = async (data={}) =>{
    try {
        const response = await axiosConfig.post('/auth/login',data);
        return console.log(response);
    } catch (error) { console.log(error); };

}
