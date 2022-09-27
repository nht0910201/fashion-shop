import { useLocation, useNavigate } from "react-router-dom";
import { addToLocalStorage } from "../../utils/tokenHandle";
import { decodeToken } from "react-jwt";
import { getUserByID } from "../../services/UserService";
import { addUserToLocalStorage } from "../../utils/userHanle";
import { toast, ToastContainer } from "react-toastify";
function Oauth2() {
    let locate = useLocation()
    let navigate = useNavigate()
    let params = new URLSearchParams(locate.search);
    if (params.get('success')===true) {
        let oauth2 = decodeToken(params.get('token'))
        let userId = oauth2.sub.split(',')[0]
        addToLocalStorage(params.get('token'))
        let user = async () =>{
            let res = await getUserByID(userId)
            return res
        }
        user().then((res)=>{
            if(res.success)
            {
                let curUser = res.data
                addUserToLocalStorage(curUser.id,curUser.email,curUser.name,curUser.avatar,curUser.gender,curUser.role);
                navigate('/')
            }
        })
    }
    else {
        toast.error('Tài khoản đã tồn tại', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            onClose:()=> navigate('/')
            })
    }
    return (
        <>
            <ToastContainer/>
        </>
    );
}

export default Oauth2;