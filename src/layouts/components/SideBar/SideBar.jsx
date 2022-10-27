import { Avatar, Button, Collapse } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../../utils/userHanle";
import * as authAction from '../../../redux/auth/authSlice'

function SideBar() {
    let userCur = getUserFromLocalStorage()
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const handleProductManage = () => {
        let user = document.getElementById('user')
        let product = document.getElementById('product')
        let category = document.getElementById('category');
        let brand = document.getElementById('brand');
        let order = document.getElementById('order')

        product.removeAttribute('hidden')
        user.setAttribute('hidden', true)
        category.setAttribute('hidden', true)
        brand.setAttribute('hidden', true)
        order.setAttribute('hidden', true)
    }
    const handleUserManage = () => {
        let user = document.getElementById('user')
        let product = document.getElementById('product')
        let category = document.getElementById('category');
        let brand = document.getElementById('brand');
        let order = document.getElementById('order')

        user.removeAttribute('hidden')
        product.setAttribute('hidden', true)
        category.setAttribute('hidden', true)
        brand.setAttribute('hidden', true)
        order.setAttribute('hidden', true)
    }
    const handleCategoryManage = () => {
        let user = document.getElementById('user')
        let product = document.getElementById('product')
        let category = document.getElementById('category');
        let brand = document.getElementById('brand');
        let order = document.getElementById('order')

        category.removeAttribute('hidden')
        product.setAttribute('hidden', true)
        user.setAttribute('hidden', true)
        brand.setAttribute('hidden', true)
        order.setAttribute('hidden', true)
    }
    const handleBrandManage = () => {
        let user = document.getElementById('user')
        let product = document.getElementById('product')
        let category = document.getElementById('category');
        let brand = document.getElementById('brand');
        let order = document.getElementById('order')

        brand.removeAttribute('hidden')
        product.setAttribute('hidden', true)
        user.setAttribute('hidden', true)
        category.setAttribute('hidden', true)
        order.setAttribute('hidden', true)
    }
    const handleOrderManage = () => {
        let user = document.getElementById('user')
        let product = document.getElementById('product')
        let category = document.getElementById('category');
        let brand = document.getElementById('brand');
        let order = document.getElementById('order')

        order.removeAttribute('hidden')
        product.setAttribute('hidden', true)
        user.setAttribute('hidden', true)
        category.setAttribute('hidden', true)
        brand.setAttribute('hidden', true)
    }
    const handleLogout = () => {
        navigate('/')
        dispatch(authAction.logout())
    }
    return (
        <Collapse.Group css={{ width: '100%' }}>
            <Collapse title={userCur.name} contentLeft={<Avatar
                size="lg"
                src={userCur.avatar}
                color="secondary"
                bordered
                squared
            />}>
                <Button onClick={()=>navigate(`/profile/${userCur?.id}`)} light auto color={'warning'}>Thông tin cá nhân</Button>
                <Button onClick={handleLogout} light auto color={'warning'}>Đăng xuất</Button>
            </Collapse>
            <Collapse title="Tài khoản">
                <Button onClick={handleUserManage} light auto color={'warning'}>Quản lý tài khoản </Button>
            </Collapse>
            <Collapse title="Sản phẩm">
                <Button css={{ marginBottom: '$2' }} light auto color={'warning'}>Thêm sản phẩm </Button>
                <Button onClick={handleProductManage} light auto color={'warning'}>Quản lý sản phẩm </Button>
            </Collapse>
            <Collapse title="Danh mục">
                {/* <Button css={{ marginBottom: '$2' }} light auto color={'warning'} onClick={()=>navigate('/admin/addCategory')}>Thêm danh mục </Button> */}
                <Button onClick={handleCategoryManage} light auto color={'warning'}>Quản lý danh mục </Button>
            </Collapse>
            <Collapse title="Nhãn hàng">
                {/* <Button css={{ marginBottom: '$2' }} light auto color={'warning'} onClick={()=>navigate('/admin/addBrand')}>Thêm nhãn hàng </Button> */}
                <Button onClick={handleBrandManage} light auto color={'warning'}>Quản lý nhãn hàng </Button>
            </Collapse>
            <Collapse title="Đơn hàng">
                <Button onClick={handleOrderManage} light auto color={'warning'}>Quản lý đơn hàng</Button>
            </Collapse>
            
        </Collapse.Group>
    );
}

export default SideBar;