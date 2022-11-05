import { Visibility } from "@mui/icons-material";
import { Button, Col, Divider, Grid, Image, Modal, Row, Spacer, Table, Text } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { getOrderByIDByAdmin } from "../../../services/AdminService";
import { getDistrict, getProvince, getWard } from "../../../services/AuthService";
import { cancelOrderByAdmin, confirmOrderByAdmin } from "../../../services/Payment";
import { UpdateSuccessReload } from "../../../components/Alert/UpdateSuccessReload";
import { UpdateSuccessNavigate } from "../../../components/Alert/UpdateSuccessNavigate";
import { UpdateError } from "../../../components/Alert/UpdateError";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export function OrderModal({ orderId }) {
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [order, SetOrder] = useState({})
    useEffect(() => {
        async function getOrder() {
            let res = await getOrderByIDByAdmin(orderId)
            if (res.success) {
                SetOrder(res.data)
            }
        }
        getOrder()
    }, [])
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
    const confirmOrder = async () => {
        const wait = toast.loading('Vui lòng chờ ... !')
        let res = await confirmOrderByAdmin(orderId)
        if (res.success) {
            UpdateSuccessNavigate(wait, 'Xác nhận đơn hàng thành công', '/admin?page=order')
        }
    }
    const handleConfirm = () => {
        confirmOrder()
    }
    const cancelOrder = async () => {
        const wait = toast.loading('Vui lòng chờ ... !')
        let res = await cancelOrderByAdmin(orderId)
        console.log(res)
        if (res.success) {
            UpdateSuccessNavigate(wait, 'Huỷ đơn hàng thành công', '/admin?page=order')
        } else {
            UpdateError(wait, 'Huỷ đơn hàng không thành công')
        }
    }
    const handleCancel = () => {
        cancelOrder()
    }
    return (
        <div>
            <Button light auto onClick={handler}>
                <Visibility />
            </Button>
            <Modal
                width="60%"
                scroll
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Đơn hàng:  <Text b>{order.id}</Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Grid.Container wrap="wrap" gap={1} justify={'center'}>
                        <Grid xs={12} lg={8} direction='column' justify="center">
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
                                <Col>
                                    <Text size={'$3xl'}>
                                        {formatPrice(order.totalPrice)}
                                    </Text>
                                </Col>
                            </Row>
                        </Grid>
                    </Grid.Container>
                </Modal.Body>
                <Modal.Footer justify="center">
                    {order?.state === 'pending' ?
                        <>
                            <Button auto flat color="error" onClick={handleCancel}>
                                Huỷ đơn hàng
                            </Button>
                            <Button auto onClick={handleConfirm}>
                                Xác nhân đơn hàng
                            </Button>
                        </> : <></>}

                </Modal.Footer>
                <ToastContainer />
            </Modal>
        </div>
    );
}
function TableOrder({ orders, show }) {
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    return (
        <span hidden={show} id='order'>
            <Row justify='space-between' align='center' css={{ marginTop: '$5', marginBottom: '$5' }}>
                <Text b size={20}>ĐƠN HÀNG</Text>
                {/* <AddModal /> */}
            </Row>
            <Table
                bordered
                striped
                shadow={false}
                css={{
                    height: "auto",
                }}
                selectionMode={'single'}
            >
                <Table.Header>
                    <Table.Column allowsSorting>MÃ ĐƠN HÀNG</Table.Column>
                    <Table.Column allowsSorting>NGƯỜI ĐẶT </Table.Column>
                    <Table.Column allowsSorting>SỐ LƯỢNG SẢN PHẨM</Table.Column>
                    <Table.Column allowsSorting>TỔNG SỐ TIỀN</Table.Column>
                    <Table.Column allowsSorting>TRẠNG THÁI</Table.Column>
                    <Table.Column></Table.Column>
                </Table.Header>

                <Table.Body>
                    {orders.list.map((order) => (
                        <Table.Row key={order.id}>
                            <Table.Cell>{order.id}</Table.Cell>
                            <Table.Cell>{order.userName}</Table.Cell>
                            <Table.Cell >{order.totalProduct}</Table.Cell>
                            <Table.Cell>{formatPrice(order.totalPrice)}</Table.Cell>
                            <Table.Cell>{order.state}</Table.Cell>
                            <Table.Cell>
                                <OrderModal orderId={order.id} />
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
        </span>
    );
}

export default TableOrder;