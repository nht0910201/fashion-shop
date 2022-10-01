import Grid2 from '@mui/material/Unstable_Grid2';
import { Button, Col, Image, Input, Row, Text, Divider } from '@nextui-org/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCart, removeItemFromCart } from '../../services/CartService';
import { addProductToCart } from '../../services/ProductService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateSuccessReload } from "../../components/Alert/UpdateSuccessReload";
import { UpdateError } from '../../components/Alert/UpdateError'
import { UpdateSuccessNavigate } from "../../components/Alert/UpdateSuccessNavigate";
import { getUserFromLocalStorage } from '../../utils/userHanle';
import { DeleteForeverOutlined } from '@mui/icons-material';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function Cart() {
    let navigate = useNavigate()
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    const [cart, setCart] = useState({})
    useEffect(() => {
        async function getData() {
            let res = await getCart()
            setCart(res.data)
        }
        getData()
    }, [cart])
    let curUser = getUserFromLocalStorage()
    const updateChangeCart = (productOptionId, color, quantity) => {
        if (quantity !== 0 && typeof (quantity) === 'number') {
            updateCart({ productOptionId, color, quantity })
        }
    }

    const updateCart = async ({ productOptionId, color, quantity }) => {
        const wait = toast.loading("Vui lòng chờ ...")
        if (curUser?.id !== undefined) {
            let res = await addProductToCart({ productOptionId, color, quantity })
            if (res.data.success) {
                cart.items.forEach((item) => {
                    if (item.itemId === res.data.data.itemId)
                        item.quantity = res.data.data.quantity
                })
                setCart(cart)
                UpdateSuccessReload(wait, 'Cập nhật giỏ hàng thành công', false)
            } else {
                UpdateError(wait, 'Cập nhật giỏ hàng thất bại')
            }
        } else {
            let url = '/'
            UpdateSuccessNavigate(wait, 'Vui lòng Đăng nhập', url)
        }
    }
    const handleRemoveCartItem = async (id) => {
        const w = toast.loading("Vui lòng chờ ...")
        let res = await removeItemFromCart(id)
        if (res.success) {
            UpdateSuccessReload(w, 'Xoá sản phẩm khỏi giỏ hàng thành công', true)
        } else {
            UpdateError(w, 'Xoá sản phẩm khỏi giỏ hàng thất bại')
        }
    }
    const handleClickOrder = () => {
        navigate('/order')
    }
    // if (Object.values(cart).length === 0) {
    //     return <Grid2 xs={12} sx={{ textAlign: 'center' }}>
    //         <Text b size={20} > Không có sản phẩm trong giỏ hàng</Text>
    //     </Grid2>
    // }
    if (cart === undefined) {
        return <Loading />
    }
    let vat = 23000
    return (
        <Grid2 container spacing={3}>
            <Grid2 xs={6} md={8}>
                <Row align='center' justify='space-between' css={{padding:'$2',marginTop:'$2',marginBottom:'$2'}}>
                    <Text size={30} >
                        Giỏ hàng của bạn
                    </Text>
                    <Text size={25}> {cart.totalProduct} sản phẩm</Text>
                </Row>

                {cart.items?.map((cartItem) => (
                    <Row css={{ width: 'auto' }}>
                        <Grid2 xs={5} md={4} lg={3}>
                            <Image
                                src={cartItem.image}
                                css={{ marginLeft: '$0', marginRight: '$0' }}
                                width='60%'
                                heigh='60%'
                                objectFit='contain'
                                autoResize
                            />
                        </Grid2>
                        <Grid2 xs>
                            <Row justify='space-between' align='center'>
                                <Text size={20} transform={'uppercase'}>{cartItem.name}</Text>
                                <Button css={{ marginRight: '$32' }} onClick={() => handleRemoveCartItem(cartItem.itemId)} light size={'xs'} color={'error'}><DeleteForeverOutlined /></Button>
                            </Row>
                            <Row>
                                <div className="mt-2 flex text-sm">
                                    <span className={classNames(
                                        'z-10 h-8 w-8 border border-black border-opacity-20 rounded-full'
                                    )} style={{ backgroundColor: cartItem.color }}></span>
                                    {cartItem.size ? (
                                        <Text css={{ marginLeft: '$10' }}>Size: {cartItem.size}</Text>
                                    ) : null}
                                </div>
                            </Row>

                            <Row align='center' css={{ marginTop: '$2' }}>
                                <Text css={{ marginRight: '$10' }} size={30} b color='error'>{formatPrice(cartItem.subPrice)}</Text>
                                <Text size={20} del>{formatPrice(cartItem.price * cartItem.quantity)}</Text>
                            </Row>
                            <Row css={{ marginTop: '$2', marginLeft: '$0' }} align='center'>
                                <Button.Group>
                                    <Button clickable css={{ backgroundColor: '$gray500' }} onPress={() => updateChangeCart(cartItem.productOptionId, cartItem.color, -1)}>-</Button>
                                    <Input
                                        width='50px'
                                        type={'tel'}
                                        shadow={false}
                                        underlined
                                        value={cartItem.quantity}
                                        onBlur={(e) => updateChangeCart(cartItem.productOptionId, cartItem.color, e.target.value - cartItem.quantity)}
                                    />
                                    <Button clickable css={{ backgroundColor: '$gray500' }} onPress={() => updateChangeCart(cartItem.productOptionId, cartItem.color, 1)}>+</Button>
                                </Button.Group>

                            </Row>
                        </Grid2>
                        <Divider
                            css={{ position: 'absolute', inset: '0p', left: '0', mt: '$5' }}
                        />
                    </Row>
                ))}
            </Grid2>
            <Grid2 xs={6} md={4} width={'100%'}>
                <Col css={{ shadow: '$lg', padding: '$15', marginTop: '$20', border: '$black', borderRadius: '$md' }}>
                    <Row >
                        <Text b size={30}>ĐƠN HÀNG</Text>
                    </Row>
                    <Row justify='space-between' css={{ marginTop: '$10' }}>
                        Tổng số tiền: <Text b size={20}> {formatPrice(cart.totalPrice)}</Text>
                    </Row>
                    <Row justify='space-between' css={{ marginTop: '$10' }}>
                        VAT: <Text b size={20}> {formatPrice(vat)}</Text>
                    </Row>
                    <Row justify='space-between' css={{ marginTop: '$10' }}>
                        Thanh toán: <Text b size={20}>  {formatPrice(cart.totalPrice)}</Text>
                    </Row>
                    <Row css={{ marginTop: '$10' }}>
                        <Button onClick={handleClickOrder} css={{ width: '100%' }} color={'default'}>ĐẶT HÀNG</Button>
                    </Row>
                </Col>
            </Grid2>
            <ToastContainer />
        </Grid2>
    );
}

export default Cart;