import { createSlice } from "@reduxjs/toolkit";
import { addToLocalStorage,clearFromLocalStorage } from "../../utils/tokenHandle";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:{
            email:"",
            name:"",
            avatar:null,
            gender:"",
            role:"",
            accessToken:""
        }
    },
    reducers:{
        login(state,action){
            const {email,name,avatar,gender,role,accessToken} = action.payload.data
            addToLocalStorage(accessToken)
            state.user.email = email || state.user.email
            state.user.name = name || state.user.name
            state.user.avatar = avatar
            state.user.gender = gender || state.user.gender
            state.user.role = role || state.user.role
        },
        logout(state,action){
            state.user.email = ""
            state.user.name = ""
            state.user.avatar = null
            state.user.gender = ""
            state.user.role = ""
            clearFromLocalStorage();
        }
    }
})
export const { login, logout } = authSlice.actions;

export const userSelector = state => state.auth.user;
export const accessToken = state => state.auth.user.accessToken;

export default authSlice.reducer;
