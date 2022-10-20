import {
    Grid,
    Card,
    Text,
    Row,
    Col,
    Badge,
    Pagination,
} from "@nextui-org/react";
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProductByCategory, searchProduct } from "../../services/ProductService";
import { Rating, Tooltip } from "@mui/material";

export default function ProductList() {
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
    useEffect(() => {
        async function getData() {
            let res
            switch (locate.pathname) {
                case '/search':
                    res = await searchProduct(keySearch)
                    break;
                default:
                    res = await getProductByCategory(id,page-1)
                    break;
            }
            console.log(res)
            if (res.success) {
                setProducts(res.data)
            }
        }

        getData()
    }, [keySearch,id,page])
    return (
        <Grid.Container gap={1}>
            {products.list?.map((product) => (
                <Grid xs={6} sm={3} lg={2} justify={"center"}>
                    <Card css={{ filter: 'none', w: "100%", h: "400px", backgroundColor: 'transparent', border: 'none' }} isHoverable isPressable onPress={(e) => { window.location.href = `/productDetail/${product.id}` }} >
                        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                            <Badge disableOutline enableShadow color={'error'} hidden={product.discount <= 0 ? true : false}>-{product.discount}%</Badge>
                        </Card.Header>

                        <Card.Body css={{ p: 0 }}>
                            <Card.Image
                                src={product.images[0]?.url}
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
                                                <Badge isPressable variant={'dot'} size="xl" style={{ backgroundColor: image.color }}>
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
                <Pagination color='warning' loop onChange={(page)=>{setPage(page-1)}} total={products.totalPage} />
                </Row>
                
            </Grid>
        </Grid.Container>
    );
}