import { RemoveRedEyeOutlined } from '@mui/icons-material';
import { Grid, Loading, Text, useAsyncList, useCollator } from '@nextui-org/react';
import { Table } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../services/UserService';
import { StyledBadge } from './StyledBadge';

export default function MyOrder() {
    let navigate = useNavigate();
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getData() {
            setLoading(true);
            let res = await getOrders();
            if (res.success) {
                let temp1 = res.data.filter((order) => order.state !== 'enable');
                setOrder(temp1);
                setLoading(false);
            } else {
                setLoading('404');
            }
        }
        getData();
    }, []);
    const collator = useCollator({ numeric: true });
    async function load() {
        return { items :order}
    }
    async function sort({ items, sortDescriptor }) {
        return {
            items: items.sort((a, b) => {
                let first = a[sortDescriptor.column];
                let second = b[sortDescriptor.column];
                let cmp = collator.compare(first, second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }),
        };
    }
    
    const state = {
        'enable': 'Hiện tại',
        'done': 'Hoàn tất',
        'process': 'Đang xử lý',
        'pending': 'Đang chờ xác nhận',
        'delivery': 'Đang giao hàng',
        'cancel': 'Đã hủy',
    }
    const list = useAsyncList({ load, sort });
    useEffect (()=>{
        list.reload()
    },[order])
    return (
        <>
            {loading === true ? (
                <Grid.Container wrap="wrap" justify="center" gap={2}>
                    <Grid xs={12} css={{ w: '100vw', h: '100vh' }} alignItems="center" justify="center">
                        <Loading size="xl" type="gradient" color={'warning'} />
                    </Grid>
                </Grid.Container>
            ) : (
                <>
                    {loading === '404' ? (
                        <Grid.Container wrap="wrap" justify="center" gap={2}>
                            <Grid xs={12} css={{ w: '100vw', h: '100vh' }} alignItems="center" justify="center">
                                <Text size={30} css={{ textAlign: 'center' }}>
                                    Bạn chưa có đơn hàng nào !!!
                                </Text>
                            </Grid>
                        </Grid.Container>
                    ) : (
                        <>
                            <Text size={30} css={{ textAlign: 'center' }}>
                                ĐƠN HÀNG
                            </Text>
                            <Table
                                aria-label='My Order'
                                css={{
                                    height: "calc($space$14 * 10)",
                                    minWidth: "100%",
                                }}
                                color={'warning'}
                                selectionMode={'single'}
                                sortDescriptor={list.sortDescriptor}
                                onSortChange={list.sort}
                            >
                                <Table.Header>
                                    <Table.Column key={'id'}>MÃ ĐƠN HÀNG</Table.Column>
                                    <Table.Column align='center' key={'createdDate'} allowsSorting>NGÀY ĐẶT</Table.Column>
                                    <Table.Column align='center' key={'userName'}>NGƯỜI ĐẶT</Table.Column>
                                    <Table.Column align='center' key={'totalPrice'} allowsSorting>TỔNG SỐ TIỀN*</Table.Column>
                                    <Table.Column align='center' key={'totalQuantity'} allowsSorting>SỐ LƯỢNG SẢN PHẨM*</Table.Column>
                                    <Table.Column align='center' key={'state'} allowsSorting>TRẠNG THÁI*</Table.Column>
                                    <Table.Column></Table.Column>
                                </Table.Header>

                                <Table.Body items={list.items} loadingState={list.loadingState}>
                                    {(row) => (
                                        <Table.Row key={row.id}>
                                            <Table.Cell>{row.id}</Table.Cell>
                                            <Table.Cell css={{textAlign:'center'}}>{row.createdDate}</Table.Cell>
                                            <Table.Cell css={{textAlign:'center'}}>{row.userName}</Table.Cell>
                                            <Table.Cell css={{textAlign:'center'}}>{formatPrice(row.totalPrice)}</Table.Cell>
                                            <Table.Cell css={{textAlign:'center'}}>{row.totalProduct}</Table.Cell>
                                            <Table.Cell css={{textAlign:'center'}}>
                                                <StyledBadge type={row.state}>{state[row.state]}</StyledBadge>
                                            </Table.Cell>
                                            <Table.Cell css={{ display: 'flex', justifyContent: 'center',h:'100%' }}>
                                                <button onClick={() => navigate(`/orderDetail/${row.id}`)}>
                                                    <RemoveRedEyeOutlined />
                                                </button>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                                <Table.Pagination
                                    total={Math.ceil(order?.length / 5)}
                                    shadow
                                    loop
                                    noMargin
                                    align="center"
                                    color={'warning'}
                                    rowsPerPage={5}
                                />
                            </Table>
                        </>
                    )}
                </>
            )}
        </>
    );
}
