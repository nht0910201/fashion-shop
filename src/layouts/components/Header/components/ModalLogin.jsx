import React from "react";
import { Modal, Button, Text, Input, Row, Link } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import * as authAction from '../../../../redux/auth/authSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userLogin } from "../../../../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Facebook, Google } from "@mui/icons-material";

export default function ModalLogin() {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const closeHandler = () => {
        setVisible(false);
    };
    const login = async ({ username, password }) => {
        const res = await userLogin({ username, password })
        if (res.data.success) {
            await dispatch(authAction.login(res.data));
            if(res.data.data.role==='ROLE_ADMIN' || res.data.data.role==='ROLE_STAFF')
            {
                window.location.href = '/admin'
            }else{
                navigate('/')
            }
        }
        else {
            toast.error('Incorrect Username or Password', {
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
    const handleLogin = () => {
        login({ username, password })
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
                        bordered
                        fullWidth
                        color="warning"
                        size="lg"
                        placeholder="Email"
                        value={username}
                        onChange={onChangeUsernameHanle}
                        contentLeft={<Mail fill="currentColor" />}
                    />
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="warning"
                        size="lg"
                        placeholder="Password"
                        value={password}
                        type="password"
                        onChange={onChangePasswordHanle}
                        contentLeft={<Password fill="currentColor" />}
                    />
                    <Row justify="end" css={{ borderBottom: "$black", width: 'auto' }}>
                        <Link href="/forgotPassword">
                            <Text size={14} color='error'>Quên mật khẩu?</Text>
                        </Link>
                    </Row>
                </Modal.Body>
                <Modal.Footer justify="center">
                    {/* <Button auto flat color="error" onClick={closeHandler}>
                        Close
                    </Button> */}
                    <Button ghost color="warning" onClick={handleLogin}>
                        Đăng nhập
                    </Button>
                    <Row justify="center">
                        <Link css={{ marginRight: '$5' }} href="http://fashion-store-capstone.herokuapp.com/oauth2/authorization/google"><Google /></Link>
                        <Link href="http://fashion-store-capstone.herokuapp.com/oauth2/authorization/facebook"><Facebook /></Link>
                    </Row>
                </Modal.Footer>
                <ToastContainer />
            </Modal>
        </div>
    );
}