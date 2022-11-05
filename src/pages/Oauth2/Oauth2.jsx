import { useNavigate, useSearchParams } from "react-router-dom";
import { addToLocalStorage } from "../../utils/tokenHandle";
import { decodeToken } from "react-jwt";
import { getUserByID } from "../../services/UserService";
import { addUserToLocalStorage } from "../../utils/userHanle";
import { toast, ToastContainer } from "react-toastify";
import { Home } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
function Oauth2() {
    const [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate()
    if (searchParams.get('success') === 'true') {
        let oauth2 = decodeToken(searchParams.get('token'))
        let userId = oauth2.sub.split(',')[0]
        addToLocalStorage(searchParams.get('token'))
        window.history.replaceState(null, null, window.location.pathname);
        let user = async () => {
            let res = await getUserByID(userId)
            return res
        }
        user().then((res) => {
            if (res.success) {
                let curUser = res.data
                addUserToLocalStorage(curUser.id, curUser.email, curUser.name, curUser.avatar, curUser.gender, curUser.role);
                navigate('/')
            }
        })
    }
    else {
        window.history.replaceState(null, null, window.location.pathname);
        toast.error('Vui lòng đăng nhập bằng tài khoản đã đăng ký trên hệ thống', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }
    return (
        <div hidden={searchParams.get('success') === 'true' ? true : false}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h4" color={'red'}>
                    ĐĂNG NHẬP KHÔNG THÀNH CÔNG
                </Typography>
                <Typography variant="h6" color={'black'}>
                    Vui lòng đăng nhập với tài khoản đã có trong hệ thống
                </Typography>
                <Button variant="contained" onClick={() => navigate('/')}><Home /></Button>
            </Box>
            <ToastContainer />
        </div>
    );
}

export default Oauth2;