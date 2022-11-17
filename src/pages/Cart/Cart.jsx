import Grid2 from '@mui/material/Unstable_Grid2';
import { Button, Col, Image, Input, Row, Text, Divider, Loading } from '@nextui-org/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCart, removeItemFromCart } from '../../services/CartService';
import { addProductToCart } from '../../services/ProductService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateSuccessReload } from '../../components/Alert/UpdateSuccessReload';
import { UpdateError } from '../../components/Alert/UpdateError';
import { UpdateSuccessNavigate } from '../../components/Alert/UpdateSuccessNavigate';
import { getUserFromLocalStorage } from '../../utils/userHanle';
import { DeleteForeverOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
function Cart() {
    let navigate = useNavigate();
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    const [cart, setCart] = useState({});
    useEffect(() => {
        async function getData() {
            let res = await getCart();
            console.log(res)
            if (res.success) {
                if(res.data.totalProduct === 0)
                {
                    setCart('404')
                }else{
                    setCart(res.data);
                }
                
            }
            else {
                setCart('404')
            }
        }
        getData();
    }, [cart]);
    let curUser = getUserFromLocalStorage();
    const updateChangeCart = (productOptionId, color, quantity) => {
        if (quantity !== 0 && typeof quantity === 'number') {
            updateCart({ productOptionId, color, quantity });
        }
    };

    const updateCart = async ({ productOptionId, color, quantity }) => {
        const wait = toast.loading('Vui lòng chờ ...');
        if (curUser?.id !== undefined) {
            let res = await addProductToCart({ productOptionId, color, quantity });
            if (res.data.success) {
                cart.items.forEach((item) => {
                    if (item.itemId === res.data.data.itemId) item.quantity = res.data.data.quantity;
                });
                setCart(cart);
                UpdateSuccessReload(wait, 'Cập nhật giỏ hàng thành công', false);
            } else {
                UpdateError(wait, 'Cập nhật giỏ hàng thất bại');
            }
        } else {
            let url = '/';
            UpdateSuccessNavigate(wait, 'Vui lòng Đăng nhập', url);
        }
    };
    const handleRemoveCartItem = async (id) => {
        const w = toast.loading('Vui lòng chờ ...');
        let res = await removeItemFromCart(id);
        if (res.success) {
            UpdateSuccessReload(w, 'Xoá sản phẩm khỏi giỏ hàng thành công', false);
        } else {
            UpdateError(w, 'Xoá sản phẩm khỏi giỏ hàng thất bại');
        }
    };
    const handleClickOrder = () => {
        navigate('/order');
    };
    return (
        <Grid2 container spacing={3}>
            <Grid2 xs={6} md={8}>
                <Row
                    align="center"
                    justify="space-between"
                    css={{ padding: '$2', marginTop: '$2', marginBottom: '$2' }}
                >
                    <Text size={30}>Giỏ hàng của bạn</Text>
                    <Text size={25}> {cart?.totalProduct || 0} sản phẩm</Text>
                </Row>

                {!cart ? (
                    <Row css={{ width: 'auto', height: '80%' }} justify='center' align='center' >
                        <Loading size='xl' type='gradient' color={'warning'} />
                    </Row>
                )
                    : cart === '404' ?
                        <Row css={{ width: '100vw', height: '100vh' }} justify='center' align='center' >
                            <Text size={'$2xl'}>Không có sản phẩm</Text>
                        </Row> :
                        cart?.items?.map((cartItem) => (
                            <Row css={{ width: 'auto' }}>
                                <Grid2 xs={5} md={4} lg={3}>
                                    <Image
                                        src={cartItem.image}
                                        css={{ marginLeft: '$0', marginRight: '$0' }}
                                        width="60%"
                                        heigh="60%"
                                        objectFit="contain"
                                        autoResize
                                    />
                                </Grid2>
                                <Grid2 xs>
                                    <Row justify="space-between" align="center">
                                        <Text size={20} transform={'uppercase'}>
                                            {cartItem.name}
                                        </Text>
                                        <Button
                                            css={{ marginRight: '$32' }}
                                            onClick={() => handleRemoveCartItem(cartItem.itemId)}
                                            light
                                            size={'xs'}
                                            color={'error'}
                                        >
                                            <DeleteForeverOutlined />
                                        </Button>
                                    </Row>
                                    <Row>
                                        <div className="mt-2 flex text-sm">
                                            <span
                                                className={classNames(
                                                    'z-10 h-8 w-8 border border-black border-opacity-20 rounded-full',
                                                )}
                                                style={{ backgroundColor: cartItem.color }}
                                            ></span>
                                            {cartItem.size ? (
                                                <Text css={{ marginLeft: '$10' }}>Size: {cartItem.size}</Text>
                                            ) : null}
                                        </div>
                                    </Row>

                                    <Row align="center" css={{ marginTop: '$2' }}>
                                        <Text css={{ marginRight: '$10' }} size={30} b color="error">
                                            {formatPrice(cartItem.subPrice)}
                                        </Text>
                                        <Text size={20} del>
                                            {formatPrice(cartItem.price * cartItem.quantity)}
                                        </Text>
                                    </Row>
                                    <Row css={{ marginTop: '$2', marginLeft: '$0' }} align="center">
                                        <Button.Group>
                                            <Button
                                                clickable
                                                css={{ backgroundColor: '$gray500' }}
                                                onPress={() => updateChangeCart(cartItem.productOptionId, cartItem.color, -1)}
                                            >
                                                -
                                            </Button>
                                            <Input
                                                width="50px"
                                                type={'tel'}
                                                shadow={false}
                                                underlined
                                                value={cartItem.quantity}
                                                onBlur={(e) =>
                                                    updateChangeCart(
                                                        cartItem.productOptionId,
                                                        cartItem.color,
                                                        e.target.value - cartItem.quantity,
                                                    )
                                                }
                                            />
                                            <Button
                                                clickable
                                                css={{ backgroundColor: '$gray500' }}
                                                onPress={() => updateChangeCart(cartItem.productOptionId, cartItem.color, 1)}
                                            >
                                                +
                                            </Button>
                                        </Button.Group>
                                    </Row>
                                </Grid2>
                                <Divider css={{ position: 'absolute', inset: '0p', left: '0', mt: '$5' }} />
                            </Row>
                        ))}
            </Grid2>
            {cart === '404' ? <></> :
                <Grid2 xs={6} md={4} width={'100%'}>
                    <Col css={{ shadow: '$lg', padding: '$15', marginTop: '$20', border: '$black', borderRadius: '$md' }}>
                        <Row>
                            <Text b size={30}>
                                ĐƠN HÀNG
                            </Text>
                        </Row>
                        {cart?.totalPrice !== undefined ? (
                            <>
                                <Row justify="space-between" css={{ marginTop: '$10' }}>
                                    Tổng số tiền:{' '}
                                    <Text b size={20}>
                                        {' '}
                                        {formatPrice(cart?.items.reduce((total,cur)=>total+(cur.price * cur.quantity),0)) || 0}
                                    </Text>
                                </Row>
                                <Row justify="space-between" css={{ marginTop: '$10' }}>
                                    Giảm giá:{' '}
                                    <Text b size={20}>
                                        {' '}
                                        {formatPrice(cart?.items.reduce((total,cur)=>total+(cur.price * cur.quantity),0) - cart?.totalPrice) || 0 }
                                    </Text>
                                </Row>
                                <Row justify="space-between" css={{ marginTop: '$10' }}>
                                    Thanh toán:{' '}
                                    <Text b size={20}>
                                        {' '}
                                        {formatPrice(cart?.totalPrice || 0)}
                                    </Text>
                                </Row>
                                <Row css={{ marginTop: '$10' }}>
                                    <Button disabled={cart === '404'} onClick={handleClickOrder} css={{ width: '100%' }} color={'default'}>
                                        ĐẶT HÀNG
                                    </Button>
                                </Row>
                            </>
                        ) : (
                            Array.from(new Array(5)).map((index) => (
                                <Row key={index} css={{ marginTop: '$10' }}>
                                    <Skeleton width={'100%'} />
                                </Row>
                            ))
                        )}
                    </Col>
                </Grid2>
            }

            <ToastContainer />
        </Grid2>
    );
}

export default Cart;
