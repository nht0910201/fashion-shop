import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Button, Col, Divider, Grid, Image, Input, Loading, Radio, Row, Spacer, Text } from '@nextui-org/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calShipingFee, getDistrict, getProvince, getWard } from '../../services/AuthService';
import { getCart } from '../../services/CartService';
import { makeAnOrder } from '../../services/Payment';
import { getUserByID } from '../../services/UserService';
import { getUserFromLocalStorage } from '../../utils/userHanle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateError } from '../../components/Alert/UpdateError';
import { UpdateSuccessNavigate } from '../../components/Alert/UpdateSuccessNavigate';
import validator from 'validator';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
function Order() {
    let navigate = useNavigate();
    let curUser = getUserFromLocalStorage();
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);

    const [cart, setCart] = useState({});
    useEffect(() => {
        async function getData() {
            let res = await getCart();
            setCart(res.data);
        }
        getData();
    }, [cart]);

    const [user, setUser] = useState({});
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
    const [shippingFee, setShippingFee] = useState(0);

    useEffect(() => {
        async function getData() {
            let res = await getUserByID(curUser.id);
            if (res.success) {
                setUser(res.data);
            }
        }
        getData();
    }, [curUser.id]);
    useEffect(() => {
        async function getProvinceAPI(data) {
            let provinces = await getProvince({ data });
            if (provinces.message === 'Success') {
                setProvinces(provinces.data);
            }
        }
        getProvinceAPI({});
    }, []);
    useEffect(() => {
        async function getDistrictAPI(province_id) {
            let districts = await getDistrict({ province_id });
            if (districts.message === 'Success') {
                setDistricts(districts.data);
            }
        }
        if (province !== undefined) {
            getDistrictAPI(province);
        }
    }, [province]);

    useEffect(() => {
        async function getWardAPI(district_id) {
            let wards = await getWard({ district_id });
            if (wards.message === 'Success') {
                setWards(wards.data);
            }
        }
        if (district !== undefined) {
            getWardAPI(district);
        }
    }, [province, district]);

    useEffect(() => {
        async function calShippingFeeAPI() {
            if (district && ward && cart.totalProduct) {
                let fee = await calShipingFee({
                    service_type_id: 2,
                    to_district_id: district,
                    to_ward_code: ward,
                    weight: 10 * cart.totalProduct,
                });
                if (fee.code === 200) {
                    setShippingFee(fee.data.total);
                }
            } else setShippingFee(0);
        }
        calShippingFeeAPI();
    }, [district, cart.totalProduct, ward]);

    const handleChangeWard = (e) => {
        setUser({ ...user, ward: e.target.value });
        setWard(e.target.value);
    };
    const handleChangeDistrict = (e) => {
        setUser({ ...user, district: e.target.value });
        setDistrict(e.target.value);
        setWard(undefined);
        setWards([]);
    };
    const handleChangeProvince = (e) => {
        setUser({ ...user, province: e.target.value });
        setProvince(e.target.value);
        setDistrict(undefined);
        setWard(undefined);
        setDistricts([]);
        setWards([]);
    };
    const handleChangeName = (e) => {
        setUser({ ...user, name: e.target.value });
    };
    const handleChangePhone = (e) => {
        setUser({ ...user, phone: e.target.value });
    };
    const handleChangeEmail = (e) => {
        setUser({ ...user, email: e.target.value });
    };
    const handleChangeAddress = (e) => {
        setUser({ ...user, address: e.target.value });
    };

    if (curUser?.id === undefined) {
        navigate('/');
    }
    const backCart = () => {
        navigate('/cart');
    };
    const [paymentType, setPaymentType] = useState('cod');

    const makeOrder = async (paymentType, orderId, user) => {
        if (
            province !== undefined &&
            district !== undefined &&
            ward !== undefined &&
            user.name !== '' &&
            user.phone !== '' &&
            validator.isMobilePhone(user.phone,"vi-VN") &&
            user.address !== '' &&
            validator.isEmail(user.email)
        ) {
            const wait = toast.loading('Vui lòng chờ ...');
            let res = await makeAnOrder(paymentType, orderId, { ...user, shippingFee: shippingFee });
            if (res.data.success) {
                if (paymentType === 'cod') {
                    UpdateSuccessNavigate(wait, 'Đặt hàng thành công', '/redirect/payment?success=true&cancel=false');

                } else {
                    window.location.href = res.data.data;
                }
            } else {
                UpdateError(wait, 'Đặt hàng không thành công');
            }
        } else {
            toast.error('Vui lòng kiểm tra lại các thông tin', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        }
    };
    const handleClickOrder = () => {
        makeOrder(paymentType, cart.id, user);
    };
    return (
        <Grid.Container gap={2}>
            <Grid xs={12} sm={7} direction="column" justify="center">
                <Row gap={1} justify="center">
                    <Text size={'$4xl'}>THÔNG TIN GIAO HÀNG</Text>
                </Row>
                <Row gap={1} css={{ marginTop: '$5' }}>
                    <Input
                        bordered
                        size="xl"
                        width="90%"
                        label="Tên"
                        placeholder="Nguyễn Văn A"
                        value={user.name}
                        onChange={handleChangeName}
                    />
                </Row>
                <Row gap={1} css={{ marginTop: '$5' }}>
                    <Input
                        bordered
                        size="xl"
                        width="90%"
                        type={'email'}
                        label="Email"
                        placeholder="abc@gmail.com"
                        value={user.email}
                        onChange={handleChangeEmail}
                    />
                </Row>
                <Row gap={1} css={{ marginTop: '$5' }}>
                    <Input
                        bordered
                        size="xl"
                        width="90%"
                        type={'number'}
                        label="Số điện thoại"
                        placeholder="Số điện thoại"
                        value={user.phone}
                        onChange={handleChangePhone}
                    />
                </Row>
                <Row gap={1}>
                    <FormControl id="province" sx={{ width: '90%', m: 'unset'  }} margin="normal">
                        {/* <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel> */}
                        <Text css={{p: 'unset', lineHeight: '$md', marginTop: '0.5rem', mb: '6px'}} color='black' weight='normal' size={'1.125rem'}>Tỉnh/Thành phố</Text>
                        <Select
                            labelId="province-label"
                            displayEmpty
                            // label="Tỉnh/Thành phố"
                            sx={{ borderRadius: '1rem' }}
                            value={province||''}
                            onChange={handleChangeProvince}
                        >
                            <MenuItem disabled value="">
                                <Text css={{p: 'unset', lineHeight: '$md'}} color='black' weight='normal' size={'1.125rem'}>Tỉnh/Thành phố</Text>
                            </MenuItem>
                            {provinces.map((provinceItem) => (
                                <MenuItem key={provinceItem.ProvinceID} value={provinceItem.ProvinceID}>
                                    {provinceItem.ProvinceName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Row>
                <Row gap={1}>
                    <FormControl sx={{ width: '90%', m: 'unset' }} margin="normal">
                        {/* <InputLabel id="district-label">Quận/Huyện</InputLabel> */}
                        <Text css={{p: 'unset', lineHeight: '$md', marginTop: '0.5rem', mb: '6px'}} color='black' weight='normal' size={'1.125rem'}>Quận/Huyện</Text>
                        <Select
                            labelId="district-label"
                            displayEmpty
                            // label="Quận/Huyện"
                            disabled={province === undefined ? true : false}
                            id="district"
                            sx={{ borderRadius: '1rem' }}
                            value={district||''}
                            onChange={handleChangeDistrict}
                        >
                            <MenuItem disabled value="">
                                <Text css={{p: 'unset', lineHeight: '$md'}} color='black' weight='normal' size={'1.125rem'}>Quận/Huyện</Text>
                            </MenuItem>
                            {districts.map((districtItem) => (
                                <MenuItem key={districtItem.DistrictID} value={districtItem.DistrictID}>
                                    {districtItem.DistrictName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Row>
                <Row gap={1}>
                    <FormControl sx={{ width: '90%', m:'unset' }} margin="normal">
                        {/* <InputLabel id="ward-label">Phường/Xã</InputLabel> */}
                        <Text css={{p: 'unset', lineHeight: '$md', marginTop: '0.5rem', mb: '6px'}} color='black' weight='normal' size={'1.125rem'}>Phường/Xã</Text>
                        <Select
                            labelId="ward-label"
                            displayEmpty
                            // label="Phường/Xã"
                            disabled={district === undefined ? true : false}
                            id="ward"
                            sx={{ borderRadius: '1rem' }}
                            value={ward||''}
                            onChange={handleChangeWard}
                        >
                            <MenuItem disabled value="">
                            <Text css={{p: 'unset', lineHeight: '$md'}} color='black' weight='normal' size={'1.125rem'}>Phường/Xã</Text>
                            </MenuItem>
                            {wards.map((wardItem) => (
                                <MenuItem key={wardItem.WardCode} value={wardItem.WardCode}>
                                    {wardItem.WardName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Row>
                <Row gap={1} css={{ marginTop: '$5' }}>
                    <Input
                        bordered
                        size="xl"
                        width="90%"
                        required
                        label="Địa chỉ"
                        placeholder="Địa chỉ"
                        value={user.address}
                        onChange={handleChangeAddress}
                    />
                </Row>
                <Spacer y={1} />
                <Row gap={1}>
                    <Text size={'$xl'}>Chọn phương thức thanh toán</Text>
                </Row>
                <Row gap={1}>
                    <Radio.Group size="lg" value={paymentType} onChange={setPaymentType}>
                        <Radio value="cod">
                            <Image
                                width={40}
                                height={40}
                                autoResize
                                objectFit="contain"
                                src=" https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=1"
                            />
                            <Spacer />
                            Thanh toán khi nhận hàng
                        </Radio>
                        <Radio value="vnpay">
                            <Image
                                width={40}
                                height={40}
                                autoResize
                                objectFit="contain"
                                src="https://hstatic.net/0/0/global/design/seller/image/payment/vnpay_new.svg?v=1"
                            />
                            <Spacer />
                            VN-PAY
                        </Radio>
                        <Radio value="paypal">
                            <Image
                                width={40}
                                height={40}
                                autoResize
                                objectFit="contain"
                                src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                            />
                            <Spacer />
                            PAYPAL
                        </Radio>
                    </Radio.Group>
                </Row>
                <Spacer y={1} />
                <Row justify="center">
                    <Button color={'warning'} onClick={handleClickOrder}>
                        Đặt hàng
                    </Button>
                </Row>
            </Grid>
            {!cart.id ? (
                <Grid
                    xs={12}
                    sm={5}
                    css={{ backgroundColor: '#fafafa', h: '100vh' }}
                    alignItems="center"
                    justify="center"
                >
                    <Loading size="xl" type="gradient" color={'warning'} />
                </Grid>
            ) : (
                <Grid xs={12} sm={5} direction="column" css={{ backgroundColor: '#fafafa' }}>
                    <Row justify="flex-end">
                        <Button onClick={backCart} size={'lg'} light color={'primary'}>
                            Quay lại giỏ hàng
                        </Button>
                    </Row>
                    <Divider />
                    {cart.items?.map((cartItem) => (
                        <Row key={cartItem.itemId} justify="space-between">
                            <Grid>
                                <Image autoResize objectFit="contain" width={100} height={100} src={cartItem.image} />
                            </Grid>

                            <Col>
                                <Row css={{ marginTop: '$5' }}>{cartItem.name}</Row>
                                <Row align="center">
                                    <Text size={18}>SL: {cartItem.quantity} /</Text>
                                    <Text size={18} css={{ marginLeft: '$2', marginRight: '$2' }}>
                                        {cartItem.size} /{' '}
                                    </Text>
                                    <span
                                        className={classNames(
                                            'z-10 h-5 w-5 border border-black border-opacity-10 rounded-full',
                                        )}
                                        style={{ backgroundColor: cartItem.color }}
                                    ></span>
                                </Row>
                                <Row>
                                    <Text css={{ marginRight: '$10' }} size={20}>
                                        {formatPrice(cartItem.subPrice)}
                                    </Text>
                                </Row>
                            </Col>
                        </Row>
                    ))}
                    <Divider />
                    <Row gap={2}>
                        <Col>
                            <Text size={'$2xl'}>Tạm tính:</Text>
                        </Col>
                        <Col offset={5}>
                            <Text size={'$2xl'}>{formatPrice(cart.totalPrice)}</Text>
                        </Col>
                    </Row>
                    <Row gap={2} justify="center">
                        <Col>
                            <Text size={'$xl'}>Phí vận chuyển:</Text>
                        </Col>
                        <Col offset={5}>
                            <Text size={'$xl'}>{formatPrice(shippingFee)}</Text>
                        </Col>
                    </Row>
                    <Divider />
                    <Row gap={2}>
                        <Col>
                            <Text size={'$3xl'}>Tổng cộng:</Text>
                        </Col>
                        <Col offset={5}>
                            <Text size={'$3xl'}>{formatPrice(cart.totalPrice)}</Text>
                        </Col>
                    </Row>
                </Grid>
            )}
            <ToastContainer />
        </Grid.Container>
    );
}
export default Order;
