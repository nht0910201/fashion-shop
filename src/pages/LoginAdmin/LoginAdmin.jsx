import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as authAction from '../../redux/auth/authSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from '../../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Loading } from '@nextui-org/react';

const theme = createTheme();

function LoginAdmin() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [loading, setLoad] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const handleChangUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleChangePass = (e) => {
        setPassword(e.target.value)
    }
    const login = async ({ username, password }) => {
        const res = await userLogin({ username, password })
        if (res.data.success) {
            await dispatch(authAction.login(res.data));
            if (res.data.data.role === 'ROLE_ADMIN' || res.data.data.role === 'ROLE_STAFF') {
                window.location.href = '/admin'
            } else {
                navigate('/')
            }
        }
        else {
            toast.error('Sai tài khoản hoặc mật khẩu', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const handleLogin = () => {
        setLoad(true)
        login({ username, password })
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        NHÂN VIÊN & QUẢN TRỊ VIÊN
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoFocus
                            value={username}
                            onChange={handleChangUsername}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleChangePass}
                        />
                        <Button ghost auto disabled={loading} onClick={handleLogin} color='warning' css={{ width: '100%', marginTop: '$2' }}>
                            {loading ?
                                <Loading color={'currentColor'} type='points-opacity' />
                                : "Đăng nhập"}
                        </Button>
                    </Box>
                </Box>
            </Container>
            <ToastContainer />
        </ThemeProvider>
    );
}

export default LoginAdmin;