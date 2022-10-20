import { RemoveRedEyeOutlined } from '@mui/icons-material';
import { Divider, Text } from '@nextui-org/react';
import { Table } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { getOrders } from '../../services/UserService';
import { StyledBadge } from './StyledBadge'

export default function MyOrder() {
    let navigate = useNavigate()
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    const [now, setNow] = useState([])
    const [last, setLast] = useState([])
    useEffect(() => {
        async function getData() {
            let res = await getOrders()
            if (res.success) {
                let temp1 = res.data.filter((order) => order.state !== 'paid')
                let temp2 = res.data.filter((order) => order.state === 'paid')
                setNow(temp1)
                setLast(temp2)
            }
        }
        getData()
    }, [])

    if (now.length === 0 && last.length === 0) {
        return <Loading />
    }
    return (
        <>
            <Text size={30} css={{ textAlign: 'center' }}>
                Đơn hàng hiện tại
            </Text>
            <Table
                aria-label="Example table with dynamic content"
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}
            >
                <Table.Header>
                    <Table.Column>MÃ ĐƠN HÀNG</Table.Column>
                    <Table.Column>NGƯỜI ĐẶT</Table.Column>
                    <Table.Column>TỔNG SỐ TIỀN</Table.Column>
                    <Table.Column>SỐ LƯỢNG SẢN PHẨM</Table.Column>
                    <Table.Column>TRẠNG THÁI</Table.Column>
                    <Table.Column></Table.Column>
                </Table.Header>

                <Table.Body>
                    {now.map((row) => (
                        <Table.Row key={row.id}>
                            <Table.Cell>{row.id}</Table.Cell>
                            <Table.Cell >{row.userName}</Table.Cell>
                            <Table.Cell >{formatPrice(row.totalPrice)}</Table.Cell>
                            <Table.Cell >{row.totalProduct}</Table.Cell>
                            <Table.Cell>
                                <StyledBadge type={row.state}>{row.state}</StyledBadge>
                            </Table.Cell>
                            <Table.Cell css={{ display: 'flex', justifyContent: 'center' }}>
                                <button onClick={()=>navigate(`/orderDetail/${row.id}`)}>
                                    <RemoveRedEyeOutlined />
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
                <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    color={'warning'}
                    rowsPerPage={3}
                    onPageChange={(page) => console.log({ page })}
                />
            </Table>
            <Divider />
            <Text size={30} css={{ textAlign: 'center' }}>
                Đơn hàng hoàn tất
            </Text>
            <Table
                aria-label="Example table with dynamic content"
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}
            >
                <Table.Header>
                    <Table.Column>MÃ ĐƠN HÀNG</Table.Column>
                    <Table.Column>NGƯỜI ĐẶT</Table.Column>
                    <Table.Column>TỔNG SỐ TIỀN</Table.Column>
                    <Table.Column>SỐ LƯỢNG SẢN PHẨM</Table.Column>
                    <Table.Column>TRẠNG THÁI</Table.Column>
                    <Table.Column></Table.Column>
                </Table.Header>

                <Table.Body>
                    {last.map((row) => (
                        <Table.Row key={row.id}>
                            <Table.Cell >{row.id}</Table.Cell>
                            <Table.Cell >{row.userName}</Table.Cell>
                            <Table.Cell >{formatPrice(row.totalPrice)}</Table.Cell>
                            <Table.Cell >{row.totalProduct}</Table.Cell>
                            <Table.Cell>
                                <StyledBadge type={row.state}>{row.state}</StyledBadge>
                            </Table.Cell>
                            <Table.Cell css={{ display: 'flex', justifyContent: 'center' }}>
                                <button>
                                    <RemoveRedEyeOutlined />
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
                <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    color={'warning'}
                    rowsPerPage={3}
                    onPageChange={(page) => console.log({ page })}
                />
            </Table>
        </>
    );
}