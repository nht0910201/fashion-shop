export const addUserToLocalStorage = (id,email,name,avatar,gender,role) => {
    const curId = window.localStorage.getItem('id');
    const curEmail = window.localStorage.getItem('email');
    const curName = window.localStorage.getItem('name');
    const curAvatar = window.localStorage.getItem('avatar');
    const curGender = window.localStorage.getItem('gender');
    const curRole = window.localStorage.getItem('role');
    if ((curId !== id && id)&&(curEmail !== email && email)&&(curName !==name && name)&&(curAvatar !==avatar && avatar)&&(curGender !==gender && gender)&&(curRole !==role && role)) {
        // store user in local storage
        window.localStorage.setItem('id', JSON.stringify(id));
        window.localStorage.setItem('email', JSON.stringify(email));
        window.localStorage.setItem('name', JSON.stringify(name));
        window.localStorage.setItem('avatar', JSON.stringify(avatar));
        window.localStorage.setItem('gender', JSON.stringify(gender));
        window.localStorage.setItem('role', JSON.stringify(role));
    } else {
        console.log("Add user failed")
        return null;
    }
}

export const getUserFromLocalStorage = () => {
    let user = {
        id:"",
        email:"",
        name:"",
        avatar:null,
        gender:"",
        role:""
    }
    const curId = window.localStorage.getItem('id');
    const curEmail = window.localStorage.getItem('email');
    const curName = window.localStorage.getItem('name');
    const curAvatar = window.localStorage.getItem('avatar');
    const curGender = window.localStorage.getItem('gender');
    const curRole = window.localStorage.getItem('role');
    let id = '';
    let email='';
    let name ='';
    let avatar = '';
    let gender = '';
    let role = '';
    if (curId && curEmail && curName && curAvatar && curGender && curRole) {
        id = JSON.parse(curId);
        email = JSON.parse(curEmail)
        name = JSON.parse(curName)
        avatar = JSON.parse(curAvatar)
        gender = JSON.parse(curGender)
        role = JSON.parse(curRole)
        user= {id:id,email:email,name:name,avatar:avatar,gender:gender,role:role}
        return user
    } 
    else {
        console.log("Get user failed")
        // return null
    }
}
export const clearUserFromLocalStorage = () => {
    const curId = JSON.parse(window.localStorage.getItem('accessToken'));
    const curEmail = JSON.parse(window.localStorage.getItem('accessToken'));
    const curName = JSON.parse(window.localStorage.getItem('accessToken'));
    const curAvatar = JSON.parse(window.localStorage.getItem('accessToken'));
    const curGender = JSON.parse(window.localStorage.getItem('accessToken'));
    const curRole = JSON.parse(window.localStorage.getItem('accessToken'));
    if (curId && curEmail && curName && curAvatar && curGender && curRole) {
        // store access token in local storage
        window.localStorage.removeItem('id');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('name');
        window.localStorage.removeItem('avatar');
        window.localStorage.removeItem('gender');
        window.localStorage.removeItem('role');
    } else {
        console.log("Clear user failed")
        return null
    }
}