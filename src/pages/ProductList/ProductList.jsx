import {
    Grid,
    Card,
    Text,
    Row,
    Col,
    Badge,
    Pagination,
    Dropdown,
    Popover,
    Button,
    Checkbox,
} from "@nextui-org/react";
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProductByCategory, searchProduct } from "../../services/ProductService";
import { Rating, Tooltip, Skeleton, Slider } from "@mui/material";
import { filter } from 'smart-array-filter'
import { Filter, FilterAlt } from "@mui/icons-material";
export default function ProductList() {
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    function valuetext(value) {
        return `${formatPrice(value)}`;
    }
    const [value, setValue] = useState([100000, 5000000]);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };
    const [gender, setGender] = useState([])
    const [col,setCol] = useState([])
    const [loading, setLoad] = useState(false)
    const [filterProduct, setFilter] = useState([])
    const [products, setProducts] = useState([])
    let [page, setPage] = useState(0)
    let { id } = useParams();
    const locate = useLocation()
    let keySearch = new URLSearchParams(locate.search).get('q')
    async function getData(sort = '') {
        setLoad(true)
        let res
        switch (locate.pathname) {
            case '/search':
                res = await searchProduct(keySearch, sort)
                break;
            default:
                res = await getProductByCategory(id, page, sort)
                break;
        }
        if (res.success) {
            setProducts(res.data)
            setFilter(res.data.list)
            setLoad(false)
            filterPrice(res.data.list)
        }
    }
    const [sortPro,setSortPro] = useState('')
    useEffect(() => {
        getData(sortPro)
    }, [keySearch, id, page,sortPro])
    const sortArr = [
        { name: '', val: 'Nổi bật' },
        { name: 'new', val: 'Mới nhất' },
        { name: 'discount', val: "% giảm giá" },
        { name: 'priceAsc', val: 'Giá thấp đến cao' },
        { name: 'priceDesc', val: 'Giá cao đến thấp' }
    ]
    
    const [sort, setSort] = useState('')
    const sortProduct = (key) => {
        switch (key) {
            case 'discount':
                setSortPro('discount,desc')
                break;
            case 'priceAsc':
                setSortPro('price,asc')
                break;
            case 'priceDesc':
                setSortPro('price,desc')
                break;
            case 'new':
                setSortPro('createdDate,desc')
                break;
            default:
                setSortPro('')
                break;
        }
    }

    const filterPrice = (list = []) => {
        let arr = products.list
        if(list.length > 0){
            arr = list
        }
        
        arr = filter(arr, {
            keywords: `price:${value[0]}..${value[1]}`
        });
        if (gender.length > 0) {
            arr = filter(arr, {
                keywords: `attr.val:${gender}`
            })
        }
        if (col.length > 0) {
            arr = filter(arr, {
                keywords: `images.color:${col}`
            })
        }

        if (arr.length > 0) {
            setFilter(arr)
        }
    }
    const resetFilter = () => {
        setCol([])
        setValue([100000,5000000])
        setGender([])
        setFilter(products.list)
    }
    return (

        <Grid.Container gap={1}>
            <Grid xs={12} justify='space-between'>
                <Popover placement="bottom-right">
                    <Popover.Trigger>
                        <Button auto light animated={false}>
                            <FilterAlt/>
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content css={{marginRight:'$0',width:'50%'}}>
                        <Grid.Container
                            css={{ borderRadius: "14px", padding: "$10" }}
                        >
                            <Row align="center">
                                <Text b>Giá: {formatPrice(value[0])} - {formatPrice(value[1])}</Text>
                            </Row>
                            <Row css={{ margin:'$10' }}>
                                <Slider
                                    getAriaLabel={() => 'Price range'}
                                    value={value}
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                    step={50000}
                                    max={5000000}
                                    min={100000}
                                    disableSwap
                                    valueLabelFormat={value =>formatPrice(value)}
                                />
                            </Row>
                            <Row align="center">
                                <Text b>Giới tính</Text>
                            </Row>
                            <Row css={{ marginBottom: '$5' }}>
                                <Checkbox.Group
                                    orientation="horizontal"
                                    color="warning"
                                    value={gender}
                                    onChange={setGender}
                                >
                                    <Checkbox value="nam">Nam</Checkbox>
                                    <Checkbox value="nữ">Nữ</Checkbox>
                                </Checkbox.Group>
                            </Row>
                            <Row align="center">
                                <Text b>Màu</Text>
                            </Row>
                            <Row css={{ marginBottom: '$5' }}>
                                <Checkbox.Group
                                    orientation="horizontal"
                                    color="warning"
                                    value={col}
                                    onChange={setCol}
                                >
                                    <Checkbox value="#000000">
                                        <Badge variant={'dot'} size="xl" style={{ backgroundColor: '#000000', border: '1px solid black', marginRight: 3 }}>
                                        </Badge>
                                    </Checkbox>
                                    <Checkbox value="#ffffff">
                                    <Badge variant={'dot'} size="xl" style={{ backgroundColor: '#ffffff', border: '1px solid black', marginRight: 3 }}>
                                        </Badge>
                                    </Checkbox>
                                </Checkbox.Group>
                            </Row>
                            <Grid.Container justify="space-around" alignContent="center">
                                <Grid>
                                    <Button size="sm" bordered color={'error'} onClick={resetFilter}>
                                        Xoá bộ lọc
                                    </Button>
                                </Grid>
                                <Grid>
                                    <Button size="sm" color="warning" onClick={filterPrice}>
                                        Xem kết quả
                                    </Button>
                                </Grid>
                            </Grid.Container>

                        </Grid.Container>
                    </Popover.Content>
                </Popover>

                <Dropdown>
                    <Dropdown.Button light color="default" css={{ tt: "capitalize" }}>
                        Sắp xếp: {sortArr.filter((item) => {
                            return item.name === sort
                        })[0].val}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="warning"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={sort}
                        onAction={(key) => { setSort(key); sortProduct(key) }}

                    >
                        {sortArr.map((sort) => (
                            <Dropdown.Item key={sort.name}>{sort.val}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Grid>
            {loading ?
                Array.from(new Array(6)).map(() => (
                    <Grid xs={6} sm={3} lg={2} justify={"center"}>
                        <Card
                            css={{
                                filter: 'none',
                                w: '90%',
                                h: '90%',
                                backgroundColor: 'transparent',
                                border: 'none',
                                margin: '$8',
                            }}
                        >
                            <Card.Body css={{ p: 0 }}>
                                <Skeleton variant="rectangular" height={300} />
                                <Skeleton />
                                <Skeleton width="50%" />
                            </Card.Body>
                        </Card>
                    </Grid>

                ))
                : filterProduct?.map((product) => (
                    <Grid xs={6} sm={3} lg={2} justify={"center"}>
                        <Card css={{ filter: 'none', w: "100%", h: "400px", backgroundColor: 'transparent', border: 'none' }} isHoverable isPressable onPress={(e) => { window.location.href = `/productDetail/${product.id}` }} >
                            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                                <Badge disableOutline enableShadow color={'error'} hidden={product.discount <= 0 ? true : false}>-{product.discount}%</Badge>
                            </Card.Header>

                            <Card.Body css={{ p: 0 }}>
                                <Card.Image
                                    src={product.images[0]?.url}
                                    onMouseOver={e => (e.currentTarget.src = product.images[1]?.url ?
                                        product.images[1]?.url : product.images[0]?.url)}
                                    onMouseOut={e => (e.currentTarget.src = product.images[0]?.url)}
                                    objectFit="cover"
                                    width="100%"
                                    height="100%"
                                    alt={product.name}
                                />
                            </Card.Body>

                            <Card.Footer
                                css={{ marginTop: "$2", zIndex: 1, overflow: 'unset' }}
                            >
                                <Row>
                                    <Col>
                                        <Tooltip title={product.name}>
                                            <Typography noWrap variant="subtitle1" component="div">
                                                {product.name}
                                            </Typography>
                                        </Tooltip>
                                        <Row justify="space-between">
                                            <Text color="black" b size={14} del={product.discount > 0 ? true : false}>
                                                {product.discount > 0 ? formatPrice(product.price) : ''}
                                            </Text>
                                            <Text color="black" b size={18} >
                                                {formatPrice(product.discountPrice)}
                                            </Text>
                                        </Row>
                                        <Row justify="space-between">
                                            <Col>
                                                {product.images.map((image) => (
                                                    <Badge isPressable variant={'dot'} size="xl" style={{ backgroundColor: image.color, border: '1px solid black', marginRight: 3 }}>
                                                    </Badge>
                                                ))}
                                            </Col>
                                            <Rating size="small" precision={0.1} value={product.rate} readOnly />

                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </Grid>
                ))}
            <Grid xs={12}>
                <Row justify="center">
                    <Pagination color='warning' loop onChange={(page) => { setPage(page - 1) }} total={products.totalPage} />
                </Row>
            </Grid>
        </Grid.Container>
    );
}