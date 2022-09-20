import React from "react";
import { Modal, Button, Text, Input, Row } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";
import * as authAction from '../../../redux/auth/authSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userLogin } from "../../../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            dispatch(authAction.login(res.data));
            navigate('/')
        }
        else {
            toast.error('Incorrect Username or Password', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover:false,
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
            <Button auto light onClick={handler} css={{ display: "flex", justifyContent: "flex-start", padding: "$0" }}>
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
                        <Text b size={24} css={{ color: 'Blue' }}>
                            SIGN IN
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                        value={username}
                        onChange={onChangeUsernameHanle}
                        contentLeft={<Mail fill="currentColor" />}
                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Password"
                        value={password}
                        type="password"
                        onChange={onChangePasswordHanle}
                        contentLeft={<Password fill="currentColor" />}
                    />
                    <Row justify="space-between">
                        <Text size={14}>Forgot password?</Text>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Close
                    </Button>
                    <Button auto onClick={handleLogin}>
                        Sign in
                    </Button>
                </Modal.Footer>
                <ToastContainer />
            </Modal>
        </div>
    );
}