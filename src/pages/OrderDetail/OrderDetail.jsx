import { useEffect, useState } from "react";
import { cancelOrder, finishOrder, getOrder } from "../../services/UserService";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Divider, Grid, Image, Loading, Row, Text } from "@nextui-org/react";
import { getDistrict, getProvince, getWard } from "../../services/AuthService";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { UpdateSuccessNavigate } from "../../components/Alert/UpdateSuccessNavigate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateError } from "../../components/Alert/UpdateError";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const status = [
    { key: 0, step: 'enable', value: 'Bắt đầu' },
    { key: 1, step: 'process', value: 'Đang xử lý' },
    { key: 2, step: 'pending', value: 'Chờ xác nhận' },
    { key: 3, step: 'prepare', value: 'Đang chuẩn bị hàng' },
    { key: 4, step: 'delivery', value: 'Đang giao hàng' },
    { key: 5, step: 'delivered', value: 'Đã giao hàng' },
    { key: 6, step: 'done', value: 'Hoàn tất' },
]
function OrderDetail() {
    let navigate = useNavigate()
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [order, setOrder] = useState({});
    const { id } = useParams();
    useEffect(() => {
        async function getOrderDetail() {
            let res = await getOrder(id)
            console.log(res)
            setOrder(res.data)
        }
        getOrderDetail()
    }, [id])
    useEffect(() => {
        async function getProvinceAPI(data) {
            let provinces = await getProvince({ data })
            if (provinces.message === 'Success') {
                setProvinces(provinces.data)
            }
        }
        getProvinceAPI({})
    }, [])
    useEffect(() => {
        async function getDistrictAPI(province_id) {
            let districts = await getDistrict({ province_id })
            if (districts.message === 'Success') {
                setDistricts(districts.data)
            }
        }
        getDistrictAPI(+order.deliveryDetail?.receiveProvince)
    }, [order])
    useEffect(() => {
        async function getWardAPI(district_id) {
            let wards = await getWard({ district_id })
            if (wards.message === 'Success') {
                setWards(wards.data)
            }
        }
        getWardAPI(+order.deliveryDetail?.receiveDistrict)
    }, [order])
    const cancel = async (id) => {
        const wait = toast.loading("Vui lòng chờ ...")
        let res = await cancelOrder(id)
        if (res.success) {
            UpdateSuccessNavigate(wait, 'Hủy đơn hàng thành công', '/myOrder')
        } else {
            UpdateError(wait, 'Hủy đơn hàng thất bại')
        }

    }
    const handleCancel = () => {
        cancel(order.id)
    }

    const finish = async (id) => {
        const wait = toast.loading("Vui lòng chờ ...")
        let res = await finishOrder(id)
        console.log(res)
        if (res.success) {
            UpdateSuccessNavigate(wait, 'Xác nhận đã nhận hàng thành công', '/myOrder')
        } else {
            UpdateError(wait, 'Xác nhận đã nhận hàng thất bại')
        }

    }
    const handleFinish = () => {
        finish(order.id)
    }
    return (
        <Grid.Container wrap="wrap" justify="center" gap={2} >
            {!order.id ? 
                <Grid xs={12} css={{w:'100vw', h:'100vh'}} alignItems='center' justify="center">
                    <Loading size='xl' type='gradient' color={'warning'}/>
                </Grid>
            :
            <Grid xs={12} lg={8} direction='column' justify="center">
                <Row justify="space-between" align="center">
                    <Text hideIn={'xs'} size={'$2xl'}>Mã đơn hàng: {order.id}</Text>
                    <div>
                        <Button onClick={() => navigate('/myOrder')} light color={'primary'}>
                            Đơn hàng của tôi
                        </Button>
                        
                    </div>
                </Row>
                <Divider />
                {order.items?.map((item) => (
                    <Row key={item.id} justify='space-between'>
                        <Grid>
                            <Image autoResize objectFit='contain' width={100} height={100} src={item.image} alt="...Loading" />
                        </Grid>

                        <Col>
                            <Row css={{ marginTop: '$5' }}>
                                {item.name}
                            </Row>
                            <Row align='center'>
                                <Text size={18}>SL: {item.quantity} /</Text>
                                <Text size={18} css={{ marginLeft: '$2', marginRight: '$2' }}>Size: {item.size}/ Màu:</Text>
                                <span className={classNames(
                                    'z-10 h-5 w-5 border border-black border-opacity-10 rounded-full'
                                )} style={{ backgroundColor: item.color }}></span>
                            </Row>
                            <Row>
                                <Text css={{ marginRight: '$10' }} size={20} >{formatPrice(item.subPrice)}</Text>
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
                    <Col>
                        <Text size={'$2xl'}>
                            {formatPrice(order?.totalPrice)}
                        </Text>
                    </Col>

                </Row>
                <Row gap={2} justify='center'>
                    <Col>
                        <Text size={'$xl'}>
                            Hình thức thanh toán:
                        </Text>
                    </Col>
                    <Col >
                        <Text size={'$xl'}>
                            {order?.paymentType}
                        </Text>
                    </Col>
                </Row>
                <Row gap={2} justify='center'>
                    <Col>
                        <Text size={'$xl'}>
                            Tình trạng thanh toán:
                        </Text>
                    </Col>
                    <Col >
                        <Text size={'$xl'}>
                            {order?.paymentInfo.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </Text>
                    </Col>
                </Row>
                <Row gap={2} justify='center'>
                    <Col>
                        <Text size={'$xl'}>
                            Người nhận:
                        </Text>
                    </Col>
                    <Col>
                        <Text size={'$xl'}>
                            {order.deliveryDetail?.receiveName}
                        </Text>
                    </Col>
                </Row>
                <Row gap={2} justify='center'>
                    <Col>
                        <Text size={'$xl'}>
                            Số điện thoại:
                        </Text>
                    </Col>
                    <Col>
                        <Text size={'$xl'}>
                            {order.deliveryDetail?.receivePhone}
                        </Text>
                    </Col>
                </Row>
                <Row gap={2} justify='center'>
                    <Col>
                        <Text size={'$xl'}>
                            Địa chỉ:
                        </Text>
                    </Col>
                    <Col>
                        <Text size={'$xl'}>
                            {order.deliveryDetail?.receiveAddress}/
                            {wards.map((ward) => (ward.WardCode === order.deliveryDetail?.receiveWard ? ward.WardName : ""))}/
                            {districts.map((district) => (district.DistrictID === +order.deliveryDetail?.receiveDistrict ? district.DistrictName : ""))}/
                            {provinces.map((province) => (province.ProvinceID === +order.deliveryDetail?.receiveProvince ? province.ProvinceName : ""))}
                        </Text>
                    </Col>
                </Row>
                <Row gap={2} justify='center'>
                    <Col>
                        <Text size={'$xl'}>
                            Phí vận chuyển:
                        </Text>
                    </Col>
                    <Col>
                        <Text size={'$xl'}>
                            {order.deliveryDetail.deliveryInfo?.fee ? 
                                formatPrice(order.deliveryDetail.deliveryInfo?.fee) 
                                :'Miễn phí'}
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
                    <Col>
                        <Text size={'$3xl'}>
                            {formatPrice(order.totalPrice + order.deliveryDetail.deliveryInfo?.fee || order.totalPrice)}
                        </Text>
                    </Col>
                </Row>
                <Row gap={2}>
                    <Box sx={{ width: '100%', marginTop: 5 }}>
                        <Stepper activeStep={status.filter((state) =>
                            state.step === order.state
                        ).map((a) => a.key)} alternativeLabel>
                            {order.state==='cancel' ?
                                <Step active >
                                <StepLabel error>ĐÃ HUỶ</StepLabel>
                                </Step> 
                                : status.map((state) => (
                                    state.step === order.state ?
                                        <Step active key={state.key}>
                                            <StepLabel>{state.value}</StepLabel>
                                        </Step> :
                                        <Step key={state.key}>
                                            <StepLabel>{state.value}</StepLabel>
                                        </Step>
                                ))
                            }
                        </Stepper>
                    </Box>
                </Row>
                <Row gap={2} css={{mt: '$8', mb: '$5'}} justify='center'>
                    {order.state === 'pending' ?
                                <Button onClick={handleCancel} rounded color={'error'}>
                                    Huỷ đơn hàng
                                </Button>    
                                : order.state === 'delivered' ?
                                <Button onClick={handleFinish} rounded color={'gradient'}>
                                    Đã nhận hàng
                                </Button>    
                                :
                                <></>
                        }
                </Row>
            </Grid>
            }
            <ToastContainer />
        </Grid.Container>
    );
}

export default OrderDetail;