import {
    Grid,
    Card,
    Text,
    Row,
    Col,
    Badge,
    Spacer,
} from "@nextui-org/react";
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProductByCategory, searchProduct } from "../../services/ProductService";
import { Tooltip } from "@mui/material";

export default function ProductList() {
    const [products, setProducts] = useState([])
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
                    res = await getProductByCategory(id)
                    break;
            }
            if (res.success) {
                setProducts(res.data)
            }
        }
        getData()
    }, [keySearch, id])
    return (
        <Grid.Container gap={1}>
            {products.map((product) => (
                <Grid xs md={3} lg={2} sm={3} justify={"center"}>
                    <Card css={{ w: "100%", h: "400px", backgroundColor: 'transparent', border: 'none' }} isHoverable isPressable onPress={(e) => { window.location.href = `/detailProduct/${product.id}` }} >
                        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                            <Badge hidden={product.discount <= 0 ? true : false}>New</Badge>
                            {/* <Col>
                                <Text h3 color="red">
                                    {product.discount}
                                </Text>
                            </Col> */}
                        </Card.Header>

                        <Card.Body css={{ p: 0, overflow: 'hidden' }}>
                            <Card.Image
                                src={product.images[0]?.url}
                                objectFit="cover"
                                width="100%"
                                height="100%"
                                alt="Relaxing app background"
                            />
                        </Card.Body>

                        <Card.Footer
                            css={{ marginTop: "$2" }}
                        >
                            <Row>
                                <Col>
                                    <Tooltip title={product.name}>
                                        <Typography noWrap variant="subtitle1" component="div">
                                            {product.name}
                                        </Typography>
                                    </Tooltip>
                                    <Row>
                                        <Text color="black" b size={18} >
                                            {product.discountPrice}
                                        </Text>
                                    </Row>
                                    <Row justify="space-between" >
                                        <Text color="black" b size={14} del={product.discount > 0 ? true : false}>
                                            {product.discount > 0 ? product.price : ''}
                                        </Text>
                                        <Spacer hidden={product.discount > 0 ? true : false} y={1.3} />
                                        <Badge isSquared color="error" hidden={product.discount <= 0 ? true : false}>
                                            -{product.discount}%
                                        </Badge>
                                    </Row>
                                    <Row>
                                        {product.images.map((image) => (
                                            <Badge isPressable variant={'dot'} size="xl" style={{ backgroundColor: image.color }}>
                                            </Badge>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Grid>
            ))}
        </Grid.Container>

    );
}