import {
    Grid,
    Card,
    Text,
    Row,
    Col,
    Badge,
    Pagination,
    Dropdown,
} from "@nextui-org/react";
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProductByCategory, searchProduct } from "../../services/ProductService";
import { Rating, Tooltip, Skeleton } from "@mui/material";

export default function ProductList() {
    const [loading, setLoad] = useState(false)
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
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
                res = await getProductByCategory(id, page - 1, sort)
                break;
        }
        if (res.success) {
            setProducts(res.data)
            setLoad(false)
        }
    }
    useEffect(() => {
        getData()
    }, [keySearch, id, page])
    const sortArr = [
        { name: 'new', val: 'Mới nhất' },
        { name: 'discount', val: "% giảm giá" },
        { name: 'priceAsc', val: 'Giá thấp đến cao' },
        { name: 'priceDesc', val: 'Giá cao đến thấp' }

    ]
    const [sort, setSort] = useState('new')
    const sortProduct = (key) => {
        switch (key) {
            case 'discount':
                getData('discount,desc')
                break;
            case 'priceAsc':
                getData('price,asc')
                break;
            case 'priceDesc':
                getData('price,desc')
                break;
            default:
                getData('createdDate,desc')
                break;
        }
    }
    return (

        <Grid.Container gap={1}>
            <Grid xs={12} justify='space-between'>
                <Text>Fiter</Text>
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
                : products.list?.map((product) => (
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
                                            <Rating size="small" value={product.rate} readOnly />

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