import {
    Grid,
    Card,
    Text,
    Row,
    Image,
    Button,
    Link,
} from "@nextui-org/react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProductByCategory, searchProduct } from "../../services/ProductService";

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
        <Grid.Container>
            <Grid.Container>
                <Text>Filter</Text>
            </Grid.Container>
            <Grid.Container gap={1} >
                {products.map((product) => (
                    <Grid xs lg={2} md={4} alignItems={'center'}>
                        <Link href={`/detailProduct/${product.id}`}>
                            <Card color="black">
                                <Card.Body>
                                    <Row justify="center" align="center">
                                        <Image
                                            objectFit="cover"
                                            src={product.images[0]?.url}
                                        // src='https://www.converse.com/dw/image/v2/BJJF_PRD/on/demandware.static/-/Sites-cnv-master-catalog-we/default/dw22670114/images/d_08/162050C_D_08X1.jpg?sw=406'
                                        ></Image>
                                    </Row>
                                    <Row justify="center" align="center">
                                        <Text h4 size={14} css={{ m: 0 }}>
                                            {product.name}
                                        </Text>
                                    </Row>
                                    <Row justify="center" align="center">
                                        <Text h4 size={16} color={'red'} css={{ m: 0, textDecorationLine: 'line-through' }}>
                                            Giá: {product.price}
                                        </Text>
                                    </Row>
                                    <Row justify="center" align="center">
                                        <Text h4 size={15} color={'blue'} css={{ m: 0 }}>
                                            Giảm: {product.discount} %
                                        </Text>
                                    </Row>
                                    <Row justify="center" align="center">
                                        <Text h4 size={15} color={'green'} css={{ m: 0 }}>
                                            Còn: {product.price - product.price * product.discount / 100}
                                        </Text>
                                    </Row>
                                    {/* <Row justify="center" align="center">
                                <Button css={{ mt: 10 }}>Add to Cart</Button>
                            </Row> */}
                                </Card.Body>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid.Container>
        </Grid.Container>

    );
}