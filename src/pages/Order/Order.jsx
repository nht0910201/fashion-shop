import { Button, Col, Divider, Grid, Image, Input, Radio, Row, Spacer, Text } from '@nextui-org/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../../services/CartService';
import { getUserFromLocalStorage } from '../../utils/userHanle';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function Order() {
    let navigate = useNavigate()
    let curUser = getUserFromLocalStorage()
    const [name, setName] = useState(curUser?.name)
    const [email, setEmail] = useState(curUser?.email)
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
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
    if (curUser?.id === undefined) {
        navigate('/')
    }
    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const backCart = () => {
        navigate('/cart')
    }
    return (
        <Grid.Container gap={2} >
            <Grid xs={12} sm={7} direction='column' justify="center">
                <Row gap={1} justify='center'>
                    <Text size={'$4xl'}>THÔNG TIN GIAO HÀNG</Text>
                </Row>
                <Row gap={1} css={{ marginTop: '$5' }}>
                    <Input bordered size='xl' width='90%' label="Tên" placeholder="Nguyễn Văn A" value={name} onChange={handleChangeName} />
                </Row>
                <Row gap={1} css={{ marginTop: '$5' }}>
                    <Input bordered size='xl' width='90%' label="Email" placeholder="abc@gmail.com" value={email} onChange={handleChangeEmail} />
                </Row>
                <Row gap={1} css={{ marginTop: '$5' }}>
                    <Input bordered size='xl' width='90%' label="Số điện thoại" placeholder="Số điện thoại" value={phone} onChange={handleChangePhone} />
                </Row>
                <Row gap={1} css={{ marginTop: '$5', marginBottom: '$5' }}>
                    <Input bordered size='xl' width='90%' label="Địa chỉ" placeholder="Địa chỉ" value={address} onChange={handleChangeAddress} />
                </Row>
                <Spacer y={1} />
                <Row gap={1}>
                    <Text size={'$xl'}>Chọn phương thức thanh toán</Text>
                </Row>
                <Row gap={1}>
                    <Radio.Group size='lg' defaultValue="1">
                        <Radio value="1">
                            <Image width={40} height={40} autoResize objectFit='contain' src=' https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=1' />
                            <Spacer />
                            COD
                        </Radio>
                        <Radio value="2">
                            <Image width={40} height={40} autoResize objectFit='contain' src='https://hstatic.net/0/0/global/design/seller/image/payment/vnpay_new.svg?v=1' />
                            <Spacer />
                            VN-PAY
                        </Radio>
                        <Radio value="3">
                            <Image width={40} height={40} autoResize objectFit='contain' src='https://www.paypalobjects.com/webstatic/icon/pp258.png' />
                            <Spacer />
                            PAYPAL
                        </Radio>
                    </Radio.Group>
                </Row>
                <Spacer y={1} />
                <Row>
                    <Button size={'lg'} color={'warning'}>
                        Đặt hàng
                    </Button>
                </Row>
            </Grid>
            <Grid xs={12} sm={5} direction='column' css={{ backgroundColor: '#fafafa' }}>
                <Row justify='flex-end'>
                    <Button onClick={backCart} size={'lg'} light color={'primary'}>
                        Quay lại giỏ hàng
                    </Button>
                </Row>
                <Divider />
                {cart.items?.map((cartItem) => (
                    <Row key={cartItem.itemId} justify='space-between'>
                        <Grid>
                            <Image autoResize objectFit='contain' width={100} height={100} src={cartItem.image} />
                        </Grid>

                        <Col>
                            <Row css={{ marginTop: '$5' }}>
                                {cartItem.name}
                            </Row>
                            <Row align='center'>
                                <Text size={18}>SL: {cartItem.quantity} /</Text>
                                <Text size={18} css={{ marginLeft: '$2', marginRight: '$2' }}>{cartItem.size} / </Text>
                                <span className={classNames(
                                    'z-10 h-5 w-5 border border-black border-opacity-10 rounded-full'
                                )} style={{ backgroundColor: cartItem.color }}></span>


                            </Row>
                            <Row>
                                <Text css={{ marginRight: '$10' }} size={20} >{formatPrice(cartItem.subPrice)}</Text>
                            </Row>
                        </Col>
                    </Row>
                ))}
                <Divider />
                <Row gap={2}>
                    <Col>
                        <Text size={'$2xl'}>
                            Tạm tính:
                        </Text>
                    </Col>
                    <Col offset={5}>
                        <Text size={'$2xl'}>
                            {formatPrice(cart.totalPrice)}
                        </Text>
                    </Col>

                </Row>
                <Row gap={2} justify='center'>
                    <Col>
                        <Text size={'$xl'}>
                            Phí vận chuyển:
                        </Text>
                    </Col>
                    <Col offset={5}>
                        <Text size={'$xl'}>
                            Miễn phí
                        </Text>
                    </Col>
                </Row>
                <Divider />
                <Row gap={2}>
                    <Col>
                        <Text size={'$3xl'}>
                            Tổng cộng:
                        </Text>
                    </Col>
                    <Col offset={5}>
                        <Text size={'$3xl'}>
                            {formatPrice(cart.totalPrice)}
                        </Text>
                    </Col>
                </Row>
            </Grid>
        </Grid.Container>
    );
}
export default Order;