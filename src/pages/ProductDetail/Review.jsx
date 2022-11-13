import { Rating } from "@mui/material";
import { Modal, Button, Text, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { review } from "../../services/ReviewService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateSuccessReload } from './../../components/Alert/UpdateSuccessReload';
import { UpdateError } from './../../components/Alert/UpdateError';
import { getUserFromLocalStorage } from "../../utils/userHanle";

export default function Review({ productId, productName }) {
    let userCur = getUserFromLocalStorage()
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const [content, setContent] = useState('')
    const [rate, setRate] = useState(0.0)
    const closeHandler = () => {
        setVisible(false);
    };
    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }
    const handleChangeRate = (e) => {
        setRate(e.target.value)
    }
    const sendReview = async ({ content, productId, rate }) => {
        if (userCur?.id === undefined) {
            toast.error('Vui lòng đăng nhập', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } else {
            const wait = toast.loading("Vui lòng chờ ...")
            let res = await review({ content, productId, rate })
            if (res.data.success) {
                UpdateSuccessReload(wait, 'Gửi nhận xét đánh giá thành công', true);
            } else {
                UpdateError(wait, 'Bạn đã đánh giá sản phẩm này')
            }
        }
    }
    const handleClickSend = () => {
        sendReview({ content, productId, rate })
    }
    return (
        <div>
            <Button
                color={'success'}
                css={{ width: '50%' }}
                ghost
                type="button" onClick={handler}>
                Đánh giá
            </Button>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" b size={18}>
                        ĐÁNH GIÁ SẢN PHẨM
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Text css={{ textAlign: 'center' }} size={25}>{productName}</Text>
                    <Rating sx={{ marginLeft: 'auto', marginRight: 'auto' }} value={rate} onChange={handleChangeRate} defaultValue={0} precision={0.5} max={5} />
                    <Textarea
                        label="Nhận xét"
                        placeholder="Vui lòng nhập ý kiến của bạn"
                        value={content}
                        onChange={handleChangeContent}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Huỷ
                    </Button>
                    <Button auto onClick={handleClickSend}>
                        Gửi
                    </Button>
                </Modal.Footer>
                <ToastContainer />
            </Modal>
        </div>
    );
}