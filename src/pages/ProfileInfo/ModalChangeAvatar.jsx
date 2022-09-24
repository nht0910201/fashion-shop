import { Modal, useModal, Button, Text} from "@nextui-org/react";
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateAvatarUserByID } from "../../services/UserService";
import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ModalChangeAvatar({ user }) {
    console.log(user)
    const { setVisible, bindings } = useModal();
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState('')
    const handleUploadFile = (e) => {
        setFile(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }
    const updateAvatar = async () => {
        const data = new FormData();
        data.append('file', file)
        const w = toast.loading("Vui lòng chờ ...")
        let res = await updateAvatarUserByID(data, user.id)
        if (res.data.success) {
            window.localStorage.setItem('avatar', JSON.stringify(res.data.data.avatar));
            toast.update(w, {
                render: "Đổi ảnh đại diện thành công",
                type: "success",
                isLoading: false,
                autoClose: 1500,
                pauseOnHover: false,
                draggable: true,
                onClose: () => window.location.reload()
            });
            setVisible(false)
        } else {
            toast.update(w, {
                render: "Đổi ảnh đại diện thất bại",
                type: "error",
                isLoading: false,
                pauseOnHover: false,
                draggable: true,
                autoClose: 1500,
            });
        }
    }
    const handleSaveAvatar = () => {
        updateAvatar()
    }
    return (
        <div>
            <Button auto light color="secondary" onClick={() => setVisible(true)}>
                ĐỔI ẢNH
            </Button>
            <Modal
                scroll
                width="700px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        CHỌN ẢNH ĐẠI DIỆN
                    </Text>
                </Modal.Header>
                <Modal.Body style={{ marginLeft: 'auto', marginRight: 'auto' }}  >
                    <Avatar
                        alt="...Loading"
                        src={preview === '' ? user.avatar : preview}
                        sx={{ width: 340, height: 340, justifyItems: 'center' }}
                    />
                    <IconButton
                        color="primary"
                        component="label"
                    >
                        <Text size={16} color='blue'>Tải ảnh lên</Text>
                        <PhotoCamera sx={{marginLeft:1}}/>
                        <input
                            type="file"
                            hidden
                            onChange={handleUploadFile}
                            accept=".jpg,.png"
                        />
                    </IconButton>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={() => { setVisible(false); setPreview('') }}>
                        HUỶ
                    </Button>
                    <Button auto onClick={handleSaveAvatar}>
                        LƯU
                    </Button>
                </Modal.Footer>
                <ToastContainer />
            </Modal>
        </div>
    );
}
