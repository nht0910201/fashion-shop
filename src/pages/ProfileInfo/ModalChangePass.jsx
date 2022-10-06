import React from "react";
import { Modal, Button, Text, Input } from "@nextui-org/react";
import { Password } from "./Password";
import { useState } from "react";
import { changePassword } from "../../services/UserService";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearUserFromLocalStorage } from './../../utils/userHanle';
import { clearFromLocalStorage } from './../../utils/tokenHandle';
import { UpdateSuccessNavigate } from "../../components/Alert/UpdateSuccessNavigate";
import { UpdateError } from '../../components/Alert/UpdateError'
import validator from 'validator';

export default function ModalChangePass() {
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const { id } = useParams()
    const closeHandler = () => {
        setVisible(false);
    };
    const [oldPassword, setoldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const handleChangeoldPassword = (e) => {
        setoldPassword(e.target.value)
    }
    const handleChangenewPassword = (e) => {
        setnewPassword(e.target.value)
    }
    const handleChangeConfirmPass = (e) => {
        setConfirmPass(e.target.value)
    }
    const changePass = async () => {
        let oldPass = validator.isEmpty(oldPassword)
        let newPass = validator.isEmpty(newPassword)
        let confirm = validator.isEmpty(confirmPass)
        if (oldPass && newPass && confirm) {
            if (newPass !== oldPass) {
                if (newPass === confirmPass) {
                    const wait = toast.loading("Vui lòng chờ ...")
                    let res = await changePassword({ oldPassword, newPassword }, id)
                    if (res.success) {
                        clearUserFromLocalStorage()
                        clearFromLocalStorage()
                        console.log('success')
                        let url = '/'
                        UpdateSuccessNavigate(wait, 'Đổi mật khẩu thành công', url)
                    } else {
                        UpdateError(wait, 'Đổi mật khẩu không thành công')
                    }
                } else {
                    toast.error('Mật khẩu nhập lại không chính xác', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }

            } else {
                toast.error('Vui lòng nhập mật khẩu mới khác mật khẩu cũ', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.error('Vui lòng nhập đủ thông tin', {
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
    const handleClickChange = () => {
        changePass()
    }

    return (
        <div>
            <Button auto color={'error'} css={{ borderRadius: '$xs', marginTop: '$4' }} onClick={handler}>
                Đổi mật khẩu
            </Button>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text b id="modal-title" size={18}>
                        ĐỔI MẬT KHẨU
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        type={'password'}
                        placeholder="Mật khẫu cũ"
                        value={oldPassword}
                        onChange={handleChangeoldPassword}
                        contentLeft={<Password fill="currentColor" />}
                    />
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        type={'password'}
                        value={newPassword}
                        onChange={handleChangenewPassword}
                        placeholder="Mật khẩu mới"
                        contentLeft={<Password fill="currentColor" />}
                    />
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        type={'password'}
                        value={confirmPass}
                        onChange={handleChangeConfirmPass}
                        placeholder="Nhập lại mật khẩu mới"
                        contentLeft={<Password fill="currentColor" />}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Đóng
                    </Button>
                    <Button auto onClick={handleClickChange}>
                        Lưu
                    </Button>
                </Modal.Footer>
                <ToastContainer />
            </Modal>
        </div>
    );
}
