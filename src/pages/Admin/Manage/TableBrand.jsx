import { Edit, FileUpload } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Button, Image, Row, Table, Text, Radio, Modal, Input } from '@nextui-org/react'
import { useState } from 'react';
import {  UpdateSuccessReload } from '../../../components/Alert/UpdateSuccessReload';
import { addBrandByAdmin,updateBrandByAdmin } from '../../../services/AdminService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateError } from '../../../components/Alert/UpdateError';
import { UpdateSuccessNavigate } from '../../../components/Alert/UpdateSuccessNavigate';

export function AddModal() {
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState('')
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };
    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const handleUploadFile = (e) => {
        setFile(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }
    const addBrand = async () =>{
        const data = new FormData();
        data.append('file', file)
        data.append('name',name)
        const w = toast.loading("Vui lòng chờ ...")
        let res = await addBrandByAdmin(data)
        if (res.data.success) {
            UpdateSuccessNavigate(w,'Thêm nhãn hàng thành công','/admin?page=brand')
        } else {
            UpdateError(w,'Thêm nhãn hàng thất bại thất bại')
        }
    }
    const handleAddBrand = () =>{
        addBrand()
    }
    return (
        <div>
            <Button auto ghost onClick={handler} color={'warning'}>
                Thêm nhãn hàng
            </Button>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={20} b>
                        THÊM NHÃN HÀNG
                    </Text>
                </Modal.Header>
                <Modal.Body css={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <Input size='lg' placeholder="Tên nhãn hàng" type={'text'} value={name} onChange={handleChangeName} />
                    <Image
                        alt="...Loading"
                        css={{borderRadius:'$2xl'}}
                        hidden={preview === '' ? true : false}
                        src={preview === '' ? '' : preview}
                    />
                    <IconButton
                        color="primary"
                        component="label"
                        sx={{ borderRadius: 10 }}
                    >
                        <Text size={16} color='blue'>Tải ảnh logo lên</Text>
                        <FileUpload sx={{ marginLeft: 1 }} />
                        <input
                            type="file"
                            hidden
                            onChange={handleUploadFile}
                            accept=".jpg,.png"
                        />
                    </IconButton>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Huỷ
                    </Button>
                    <Button auto onClick={handleAddBrand}>
                        Lưu
                    </Button>
                </Modal.Footer>
                <ToastContainer/>
            </Modal>
        </div>
    );
}
export function EditModal({ brand }) {
    const [visible, setVisible] = useState(false);
    const [brandNew, setBrandNew] = useState(brand)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState('')
    const handler = () => {
            setVisible(true)
    };
    const handleChangeName = (e) => {
        setBrandNew({ ...brandNew, name: e.target.value })
    }
    const handleChangeState = (e) => {
        setBrandNew({ ...brandNew, state: e })
    }
    const handleUploadFile = (e) => {
        setFile(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]))
    }
    const closeHandler = () => {
        setVisible(false);
    };
    const updateBrand = async () => {
        const wait = toast.loading('Vui lòng chờ ...!')
        const data = new FormData();
        data.append('file', file)
        data.append('name',brandNew.name)
        data.append('state',brandNew.state)
        let res = await updateBrandByAdmin(data,brandNew.id)
        if(res.data.success){
            UpdateSuccessNavigate(wait,'Cập nhật nhãn hàng thành công','/admin?page=brand');
        }else{
            UpdateError(wait,'Cập nhật nhãn hàng thất bại')
        }
    }
    const handleUpdateBrand = () =>{
        updateBrand()
    }
    return (
        <div>
            <Button auto light onClick={handler}>
                <Edit />
            </Button>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={20} b>
                        CHÌNH SỬA NHÃN HIỆU
                    </Text>
                </Modal.Header>
                <Modal.Body css={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <Input size='lg' value={brandNew.name} onChange={handleChangeName} />
                    <Radio.Group label="Trạng thái" value={brandNew.state} onChange={handleChangeState} orientation='horizontal'>
                        <Radio value="enable">Kích hoạt</Radio>
                        <Radio value="disable">Vô hiệu hoá</Radio>
                    </Radio.Group>
                    <Image
                        alt="...Loading"
                        css={{borderRadius:'$2xl'}}
                        hidden={brandNew.image === null ? true : false }
                        src={preview === '' ? brandNew.image : preview}
                    />
                    <IconButton
                        color="primary"
                        component="label"
                        sx={{ borderRadius: 10 }}
                    >
                        <Text size={16} color='blue'>Tải ảnh logo lên</Text>
                        <FileUpload sx={{ marginLeft: 1 }} />
                        <input
                            type="file"
                            hidden
                            onChange={handleUploadFile}
                            accept=".jpg,.png"
                        />
                    </IconButton>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Huỷ
                    </Button>
                    <Button auto onClick={handleUpdateBrand}>
                        Lưu
                    </Button>
                </Modal.Footer>
                <ToastContainer/>
            </Modal>
        </div>
    );
}
function TableBrand({ brands,show }) {
    return (
        <div hidden = {show} id='brand'>
            <Row justify='space-between' align='center' css={{ marginTop: '$5', marginBottom: '$5' }}>
                <Text b size={20}>THƯƠNG HIỆU</Text>
                <AddModal />
            </Row>
            <Table
                bordered
                striped
                css={{
                    height: "auto",
                }}
                selectionMode={'single'}
            >
                <Table.Header>
                    <Table.Column></Table.Column>
                    <Table.Column>TÊN THƯƠNG HIỆU</Table.Column>
                    <Table.Column>TRẠNG THÁI</Table.Column>
                    <Table.Column>Chỉnh sửa / Xoá</Table.Column>
                </Table.Header>

                <Table.Body>
                    {brands.map((brand) => (
                        <Table.Row key={brand.id}>
                            <Table.Cell>
                                <Image src={brand.image} width={80} />
                            </Table.Cell>
                            <Table.Cell>{brand.name}</Table.Cell>
                            <Table.Cell >{brand.state}</Table.Cell>
                            <Table.Cell css={{ display: 'flex', height: 80 }}>
                                <EditModal brand={brand} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    color={'warning'}
                    rowsPerPage={5}
                    onPageChange={(page) => console.log({ page })}
                />
            </Table>
        </div>
    );
}

export default TableBrand;