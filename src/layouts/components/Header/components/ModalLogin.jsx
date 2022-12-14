import React from "react";
import { Modal, Button, Text, Input, Row, Link, Loading } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import * as authAction from '../../../../redux/auth/authSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userLogin } from "../../../../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Facebook, Google, Pin } from "@mui/icons-material";

export default function ModalLogin() {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const[otpInput, setOtp] = useState({hidden: true, otp:''})
    const closeHandler = () => {
        setUsername('')
        setPassword('')
        setOtp({hidden: true, otp:''})
        setLoading(false)
        setVisible(false);
    };
    const login = async ({ username, password, otp }) => {
        const res = await userLogin({ username, password, otp })
        if (res.data.success) {
            if(res.data.data.role==='ROLE_ADMIN' || res.data.data.role==='ROLE_STAFF')
            {
                toast.error('Sai tài khoản hoặc mật khẩu', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            } else{
                if (res.data.data.accessToken === 'unverified') {
                    toast.info('Vui lòng điền mã xác minh được gửi về email để hoàn thành xác thực!', {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    setLoading(false)
                    setOtp({...otp,hidden: false})
                } else {
                    await dispatch(authAction.login(res.data));
                    navigate('/')
                }
            }
        }
        else {
            let message = "Sai tài khoản hoặc mật khẩu";
            setLoading(false)
            if (otpInput.otp !== undefined && otpInput.otp !== '' ) {
                if (res.data.message === 'Expired') {
                    message = "OTP đã hết hạn!";
                    setOtp({hidden: true, otp: ''})
                }
                message = "OTP không chính xác!";
            }
            toast.error(message, {
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
    const onChangeUsernameHanle = (e) => {
        setUsername(e.target.value)
    }
    const onChangePasswordHanle = (e) => {
        setPassword(e.target.value)
    }
    const onChangeOtpHandle = (e) => {
        setOtp({...otpInput, otp: e.target.value})
    }
    const handleLogin = () => {
        setLoading(true)
        let otp = otpInput.otp
        login({ username, password, otp })
    }

    return (
        <div>
            <Button auto color='warning' onClick={handler} css={{ display: "flex", justifyContent: "flex-start" }}>
                Đăng nhập
            </Button>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        <Text b size={24} color={'warning'}>
                            ĐĂNG NHẬP
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        autoFocus
                        bordered
                        fullWidth
                        tabIndex={1}
                        color="warning"
                        size="lg"
                        placeholder="Tài khoản"
                        value={username}
                        type='email'
                        onChange={onChangeUsernameHanle}
                        contentLeft={<Mail fill="currentColor" />}
                    />
                    <Input.Password
                        clearable
                        tabIndex={2}
                        bordered
                        fullWidth
                        color="warning"
                        size="lg"
                        placeholder="Mật khẩu"
                        value={password}
                        type="password"
                        onChange={onChangePasswordHanle}
                        contentLeft={<Password fill="currentColor" />}
                    />
                    {!otpInput.hidden ? 
                        <Input
                        clearable
                        bordered
                        fullWidth
                        color="warning"
                        size="lg"
                        placeholder="OTP"
                        value={otpInput.otp}  
                        type="number"
                        onChange={onChangeOtpHandle}
                        contentLeft={<Pin/>}
                    /> : ''
                    }
                    <Row justify="end" css={{ borderBottom: "$black", width: 'auto' }}>
                        <Link href="/forgotPassword">
                            <Text size={14} color='error'>Quên mật khẩu?</Text>
                        </Link>
                    </Row>
                </Modal.Body>
                <Modal.Footer justify="center">
                    <Button ghost disabled={(loading || username === '' || password === '' || (!otpInput.hidden && (otpInput.otp === '' || otpInput.otp === undefined))) ? true : false} color="warning" onClick={handleLogin}>
                        {loading ? 
                        <Loading color={'currentColor'} type='points-opacity' />
                         : "Đăng nhập" }
                    </Button>
                    <Row justify="center">
                        <Link css={{ marginRight: '$5' }} href="http://fashion.up.railway.app/oauth2/authorization/google"><Google /></Link>
                        <Link href="http://fashion.up.railway.app/oauth2/authorization/facebook"><Facebook /></Link>
                    </Row>
                </Modal.Footer>
                <ToastContainer />
            </Modal>
        </div>
    );
}