import { Button, Grid, Input, Loading, Row, Text } from "@nextui-org/react";
import moment from "moment/moment";
import { useState } from "react";
import { getStatsByAdmin } from "../../../services/AdminService";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function Statistic({ show }) {
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);

    const [loading, setLoad] = useState(false)
    const [data, setData] = useState([])
    const [type, setType] = useState('day')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const handleChangeType = (e) => {
        setType(e.target.value)
    }
    const handleChangeFrom = (e) => {
        setFrom(e.target.value)
    }
    const handleChangeTo = (e) => {
        setTo(e.target.value)
    }
    const getStats = async (from, to, type) => {
        setLoad(true)
        let stats = await getStatsByAdmin(moment(from).format('DD-MM-YYYY'), moment(to).format('DD-MM-YYYY'), type);
        if (stats.success) {
            setData(stats.data)
            setLoad(false)
        }
    }
    const hanleClickStats = () => {
        getStats(from, to, type)
    }
    return (
        <div hidden={show} id='stats'>
            <Row justify='center' align='center' css={{ marginTop: '$5', marginBottom: '$5' }}>
                <Text b size={20}>THỐNG KÊ</Text>
            </Row>
            <Row align="center" justify="space-around" wrap="wrap">
                <div>
                    <label for="type">Xem thống kê theo:</label>
                    <select id="type" value={type} onChange={handleChangeType}>
                        <option value="day">Ngày</option>
                        <option value="month">Tháng</option>
                        <option value="year">Năm</option>
                    </select>
                </div>
                <Input underlined shadow={false} type={'date'} label='Từ ngày' value={from} onChange={handleChangeFrom} />
                <Input underlined shadow={false} type={'date'} label='Đến ngày' value={to} onChange={handleChangeTo} />
                <Button disabled = {(from === '' || to === '') ? true : false} css={{ marginTop: '$2' }} auto ghost color={'warning'} onClick={hanleClickStats}>Xem thống kê</Button>
            </Row>
            {loading ? <>
                <Grid.Container wrap="wrap" justify="center" gap={2} >
                    <Grid xs={12} css={{ w: '100vw', h: '100vh' }} alignItems='center' justify="center">
                        <Loading size='xl' type='gradient' color={'warning'} />
                    </Grid>
                </Grid.Container>
            </> :
                <div hidden = {data.length === 0 ? true : false}>
                    <ResponsiveContainer width={'100%'} aspect={3}>
                        <LineChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" width={70} tickFormatter={formatPrice} />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line yAxisId="right" type="monotone" dataKey="quantity" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            }
        </div>
    );
}

export default Statistic;