import { Edit } from '@mui/icons-material';
import { Button, Row, Table, Text, Radio, Modal, Input, Dropdown } from '@nextui-org/react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategoryByAdmin, updateCategoryByAdmin } from '../../../services/AdminService';
import { UpdateSuccessReload } from '../../../components/Alert/UpdateSuccessReload';
import { UpdateError } from '../../../components/Alert/UpdateError';

export function AddModal({categories}) {
    const root = categories.filter((category)=>{
        return category.root===true
    })
    const [name, setName] = useState('');
    const [parent_category, setParentCategory] = useState('');
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };
    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const addCategory = async()=>{
        const data = new FormData();
        data.append('name',name)
        data.append('parent_category',parent_category)
        const wait = toast.loading('Vui lòng chờ...!')
        let res = await addCategoryByAdmin(data)
        if(res.data.success){
            UpdateSuccessReload(wait,'Thêm danh mục thành công',true)
        }else{
            UpdateError(wait,'Thêm danh mục thất bại')
        }
    }
    const handleAddCategory = () => {
        addCategory()
    }
    return (
        <div>
            <Button auto ghost onClick={handler} color={'warning'}>
                Thêm danh mục
            </Button>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={20} b>
                        THÊM DANH MỤC
                    </Text>
                </Modal.Header>
                <Modal.Body css={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <Input size='lg' placeholder="Tên danh mục" type={'text'} value={name} onChange={handleChangeName} />
                    <Dropdown>
                        <Dropdown.Button light color="default" css={{ tt: "capitalize" }}>
                            {categories.filter((cat)=>{
                                return (cat.id===parent_category)
                            })[0]?.name || 'Không'}
                        </Dropdown.Button>
                        <Dropdown.Menu
                            aria-label="Single selection actions"
                            color="secondary"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={parent_category}
                            onAction={(key)=>setParentCategory(key)}
                        >
                            <Dropdown.Item key=''>Không</Dropdown.Item>
                            {root.map((item)=>(
                                <Dropdown.Item key={item.id}>{item.name}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Huỷ
                    </Button>
                    <Button auto onClick={handleAddCategory}>
                        Lưu
                    </Button>
                </Modal.Footer>
                <ToastContainer/>
            </Modal>
        </div>
    );
}
export function EditModal({ category }) {
    const [visible, setVisible] = useState(false);
    const [categoryNew, setCategoryNew] = useState(category)
    const handler = async () => {
        setVisible(true)
    };
    const handleChangeName = (e) => {
        setCategoryNew({ ...categoryNew, name: e.target.value })
    }
    const handleChangeState = (e) => {
        setCategoryNew({ ...categoryNew, state: e })
    }
    const closeHandler = () => {
        setVisible(false);
    };
    const updateCategory = async (data,id) =>{
        const w = toast.loading('Vui lòng chờ ...!')
        let res = await updateCategoryByAdmin(data,id)
        console.log(res)
        if(res.success){
            UpdateSuccessReload(w,'Cập nhật danh mục thành công',true)
        }else{
            UpdateError(w,'Cập nhật danh mục thất bại')
        }
    }
    const handleUpdateCategory = () => {
        updateCategory(categoryNew,categoryNew.id)
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
                        CHÌNH SỬA DANH MỤC
                    </Text>
                </Modal.Header>
                <Modal.Body css={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <Input size='lg' value={categoryNew.name} onChange={handleChangeName} />
                    <Radio.Group label="Trạng thái" value={categoryNew.state} onChange={handleChangeState} orientation='horizontal'>
                        <Radio value="enable">Kích hoạt</Radio>
                        <Radio value="disable">Vô hiệu hoá</Radio>
                    </Radio.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Huỷ
                    </Button>
                    <Button auto onClick={handleUpdateCategory}>
                        Lưu
                    </Button>
                </Modal.Footer>
                <ToastContainer/>
            </Modal>
        </div>
    );
}
function TableCategories({ categories }) {
    return (
        <div id='category' hidden>
            <Row justify='space-between' align='center' css={{ marginTop: '$5', marginBottom: '$5' }}>
                <Text b size={20}>DANH MỤC</Text>
                {/* <Button auto ghost color={'warning'} onClick={() => navigate('/admin/addCategory')}>Thêm Danh Mục</Button> */}
                <AddModal categories={categories}/>
            </Row>
            <Table
                aria-label='Table Category'
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}
                selectionMode='single'
            >
                <Table.Header>
                    <Table.Column>NAME</Table.Column>
                    <Table.Column>ROOT</Table.Column>
                    <Table.Column>STATE</Table.Column>
                    <Table.Column>Chỉnh sửa / Xoá</Table.Column>
                </Table.Header>
                <Table.Body>
                    {categories.map((category) => (
                        <Table.Row key={category.id}>
                            <Table.Cell>{category.name}</Table.Cell>
                            <Table.Cell >{category.root ? 'true' : 'false'}</Table.Cell>
                            <Table.Cell >{category.state}</Table.Cell>
                            <Table.Cell css={{ display: 'flex' }}>
                                <EditModal category={category}/>
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

export default TableCategories;