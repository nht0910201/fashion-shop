import { Modal, useModal, Button, Text, Image} from "@nextui-org/react";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateAvatarUserByID } from "../../services/UserService";
import { PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { UpdateSuccessReload } from '../../components/Alert/UpdateSuccessReload';
import { UpdateError } from "../../components/Alert/UpdateError";


export default function ModalChangeAvatar({ user }) {
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
            UpdateSuccessReload(w,'Đổi ảnh đại diện thành công',true)
            setVisible(false)
        } else {
            UpdateError(w,'Đổi ảnh đại diện thất bại')
        }
    }
    const handleSaveAvatar = () => {
        updateAvatar()
    }
    return (
        <div>
            <Button auto size={50} light onClick={() => setVisible(true)}>
                <PhotoCamera/>
            </Button>
            <Modal
                width='700px'
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        CHỌN ẢNH ĐẠI DIỆN
                    </Text>
                </Modal.Header>
                <Modal.Body autoMargin>
                    <Image
                        alt="...Loading"
                        css={{borderRadius:'$2xl'}}
                        src={preview === '' ? user.avatar : preview}
                    />
                    <IconButton
                        color="primary"
                        component="label"
                        sx={{borderRadius:10}}
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
