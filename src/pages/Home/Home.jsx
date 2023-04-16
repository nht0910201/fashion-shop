import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Badge, Button, Card, Col, Divider, Grid, Image, Row, Spacer, Text } from '@nextui-org/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getSortProducts } from '../../services/ProductService';
import { Rating, Skeleton, Tooltip, Typography } from '@mui/material';
import { getRecommendProducts } from '../../services/UserService';
import { getFromLocalStorage } from '../../utils/tokenHandle';
import { getUserFromLocalStorage } from '../../utils/userHanle';

const slider = [
    'https://file.hstatic.net/1000184601/file/banner_d63b88808e864ec4a5174b34be8a029c.jpg',
    'https://file.hstatic.net/1000184601/collection/essential2_cb462794e7e84a9cbf5400f5f8bc73f0.jpg',
    'https://file.hstatic.net/1000184601/collection/banner_men_bdabcc70837a405389d87942821ff2e6.jpg',
    'https://file.hstatic.net/1000184601/collection/banner_women_71d0e5bced414bdc9d1ecc2fedd924a7.jpg',
    'https://file.hstatic.net/1000184601/collection/banner_outerwear_776b99c3343c45a79d9f0782c2b8bbb8.jpg',
    'https://file.hstatic.net/1000184601/file/cover_pc_53d8b9fe80db4553a3a748cb20b5f9d2.jpg',
];

function Home() {
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    let curUser = getUserFromLocalStorage();
    let curToken = getFromLocalStorage();
    const [hotProduct, setHotProduct] = useState([]);
    const [newProduct, setNewProduct] = useState([]);
    const [recommends, setRecommends] = useState([]);
    useEffect(() => {
        async function getHotProduct() {
            let [resHot, resNew, recommends] = await Promise.all([
                getSortProducts('discount,desc'),
                getSortProducts('createdDate,desc'),

            ]);
            if (resHot.success && resNew.success) {
                setHotProduct(resHot.data.list);
                setNewProduct(resNew.data.list);
            }
        }
        async function getRecommend() {
            if (curUser.id !== undefined && curToken !== undefined) {
                let res = await getRecommendProducts()
                if (res.success) {
                    setRecommends(res.data)
                }
            }
        }
        getHotProduct();
        getRecommend() 
    }, []);
    return (
        <>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                style={{
                    '--swiper-navigation-color': '#f5a524',
                    '--swiper-pagination-color': '#f5a524',
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {slider.map((img, index) => (
                    <SwiperSlide key={index}>
                        <Image src={img} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Spacer y={1} />
            <Grid.Container gap={1}>
                <Grid xs={12} sm={6} direction="column">
                    <Image
                        autoResize
                        src="https://file.hstatic.net/1000184601/file/banner-chang-trai-phong-cach-2_3ab47ea32b494c49b31a4213620efafa.jpg"
                    />
                    <Text css={{ textAlign: 'center' }} size={35} b>
                        ÁO
                    </Text>
                    <Row justify="center">
                        <Button
                            as={'a'}
                            css={{ width: '50%', backgroundColor: '$black' }}
                            href={'/productList/630f3e661fbd7419759f5d71'}
                        >
                            XEM NGAY
                        </Button>
                    </Row>
                </Grid>
                <Grid xs={12} sm={6} direction="column">
                    <Image src="https://file.hstatic.net/1000184601/file/banner-chang-trai-phong-cach_4442b04c22a9445b8f12212386978bda.jpg" />
                    <Text css={{ textAlign: 'center' }} size={35} b>
                        QUẦN
                    </Text>
                    <Row justify="center">
                        <Button
                            as={'a'}
                            css={{ width: '50%', backgroundColor: '$black' }}
                            href={'/productList/630f3e9d1fbd7419759f5d73'}
                        >
                            XEM NGAY
                        </Button>
                    </Row>
                </Grid>
            </Grid.Container>
            <Spacer y={1} />
            <Divider />
            <Grid.Container gap={1}>
                <Row justify="center">
                    <Text size={35} b color="warning">
                        SẢN PHẨM HOT
                    </Text>
                </Row>
                <Grid lg={12} xs>
                    <Swiper
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 0,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 0,
                            },
                        }}
                        // slidesPerView={4}
                        spaceBetween={0}
                        loop={true}
                        // pagination={{
                        //     clickable: true,
                        // }}
                        style={{
                            '--swiper-navigation-color': '#f5a524',
                        }}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                    >
                        {hotProduct.length === 0
                            ? Array.from(new Array(3)).map((index) => (
                                <SwiperSlide key={index}>
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
                                </SwiperSlide>
                            ))
                            : hotProduct.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <Card
                                        css={{
                                            filter: 'none',
                                            w: '90%',
                                            h: '90%',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            margin: '$8',
                                        }}
                                        isHoverable
                                        isPressable
                                        onPress={(e) => {
                                            window.location.href = `/productDetail/${product.id}`;
                                        }}
                                    >
                                        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
                                            <Badge
                                                disableOutline
                                                enableShadow
                                                color={'error'}
                                                hidden={product.discount <= 0 ? true : false}
                                            >
                                                -{product.discount}%
                                            </Badge>
                                        </Card.Header>
                                        <Card.Body css={{ p: 0 }}>
                                            <Card.Image
                                                src={product.images[0]?.url}
                                                objectFit="cover"
                                                width="100%"
                                                height="100%"
                                                onMouseOver={e => (e.currentTarget.src = product.images[1]?.url ?
                                                    product.images[1]?.url : product.images[0]?.url)}
                                                onMouseOut={e => (e.currentTarget.src = product.images[0]?.url)}
                                                alt={product.name}
                                            />
                                        </Card.Body>

                                        <Card.Footer css={{ marginTop: '$2', zIndex: 1, overflow: 'unset' }}>
                                            <Row>
                                                <Col>
                                                    <Tooltip title={product.name}>
                                                        <Typography noWrap variant="subtitle1" component="div">
                                                            {product.name}
                                                        </Typography>
                                                    </Tooltip>
                                                    <Row justify="space-between">
                                                        <Text
                                                            color="black"
                                                            b
                                                            size={14}
                                                            del={product.discount > 0 ? true : false}
                                                        >
                                                            {product.discount > 0 ? formatPrice(product.price) : ''}
                                                        </Text>
                                                        <Text color="black" b size={18}>
                                                            {formatPrice(product.discountPrice)}
                                                        </Text>
                                                    </Row>
                                                    <Row justify="space-between">
                                                        <Col>
                                                            {product.images.map((image) => (
                                                                <Badge
                                                                    isPressable
                                                                    borderWeight={'black'}
                                                                    variant={'dot'}
                                                                    size="xl"
                                                                    style={{
                                                                        backgroundColor: image.color,
                                                                        border: '1px solid black',
                                                                        marginRight: 3,
                                                                    }}
                                                                ></Badge>
                                                            ))}
                                                        </Col>
                                                        <Rating precision={0.1} size="small" value={product.rate} readOnly />
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </Grid>
            </Grid.Container>
            <Divider />
            <Grid.Container gap={1}>
                <Row justify="center">
                    <Text size={35} b color="warning">
                        SẢN PHẨM MỚI
                    </Text>
                </Row>
                <Grid lg={12} xs>
                    <Swiper
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 0,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 0,
                            },
                        }}
                        // slidesPerView={4}
                        spaceBetween={0}
                        loop={true}
                        // pagination={{
                        //     clickable: true,
                        // }}
                        style={{
                            '--swiper-navigation-color': '#f5a524',
                        }}
                        navigation={true}
                        modules={[Autoplay, Navigation]}
                    >
                        {newProduct.length === 0
                            ? Array.from(new Array(3)).map((index) => (
                                <SwiperSlide key={index}>
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
                                </SwiperSlide>
                            ))
                            : newProduct.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <Card
                                        css={{
                                            filter: 'none',
                                            w: '90%',
                                            h: '90%',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            margin: '$8',
                                        }}
                                        isHoverable
                                        isPressable
                                        onPress={(e) => {
                                            window.location.href = `/productDetail/${product.id}`;
                                        }}
                                    >
                                        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
                                            <Badge disableOutline enableShadow color={'error'}>
                                                Mới
                                            </Badge>
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

                                        <Card.Footer css={{ marginTop: '$2', zIndex: 1, overflow: 'unset' }}>
                                            <Row>
                                                <Col>
                                                    <Tooltip title={product.name}>
                                                        <Typography noWrap variant="subtitle1" component="div">
                                                            {product.name}
                                                        </Typography>
                                                    </Tooltip>
                                                    <Row justify="space-between">
                                                        <Text
                                                            color="black"
                                                            b
                                                            size={14}
                                                            del={product.discount > 0 ? true : false}
                                                        >
                                                            {product.discount > 0 ? formatPrice(product.price) : ''}
                                                        </Text>
                                                        <Text color="black" b size={18}>
                                                            {formatPrice(product.discountPrice)}
                                                        </Text>
                                                    </Row>
                                                    <Row justify="space-between">
                                                        <Col>
                                                            {product.images.map((image) => (
                                                                <Badge
                                                                    enableShadow
                                                                    isPressable
                                                                    variant={'dot'}
                                                                    size="xl"
                                                                    style={{
                                                                        backgroundColor: image.color,
                                                                        border: '1px solid black',
                                                                        marginRight: 3,
                                                                    }}
                                                                ></Badge>
                                                            ))}
                                                        </Col>
                                                        <Rating precision={0.1} size="small" value={product.rate} readOnly />
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </Grid>
            </Grid.Container>
            {curUser.id !== undefined && curToken !== undefined ?
                <Grid.Container gap={1}>
                    <Row justify="center">
                        <Text size={35} b color="warning">
                            SẢN PHẨM GỢI Ý CHO BẠN
                        </Text>
                    </Row>
                    <Grid lg={12} xs>
                        <Swiper
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 0,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 0,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 0,
                                },
                            }}
                            // slidesPerView={4}
                            spaceBetween={0}
                            loop={true}
                            style={{
                                '--swiper-navigation-color': '#f5a524',
                            }}
                            navigation={true}
                            modules={[Autoplay, Navigation]}
                        >
                            {recommends.length === 0
                                ? Array.from(new Array(3)).map((index) => (
                                    <SwiperSlide key={index}>
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
                                    </SwiperSlide>
                                ))
                                : recommends.map((product) => (
                                    <SwiperSlide key={product.id}>
                                        <Card
                                            css={{
                                                filter: 'none',
                                                w: '90%',
                                                h: '90%',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                margin: '$8',
                                            }}
                                            isHoverable
                                            isPressable
                                            onPress={(e) => {
                                                window.location.href = `/productDetail/${product.id}`;
                                            }}
                                        >
                                            <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
                                                <Badge disableOutline enableShadow color={'error'}>
                                                    Mới
                                                </Badge>
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

                                            <Card.Footer css={{ marginTop: '$2', zIndex: 1, overflow: 'unset' }}>
                                                <Row>
                                                    <Col>
                                                        <Tooltip title={product.name}>
                                                            <Typography noWrap variant="subtitle1" component="div">
                                                                {product.name}
                                                            </Typography>
                                                        </Tooltip>
                                                        <Row justify="space-between">
                                                            <Text
                                                                color="black"
                                                                b
                                                                size={14}
                                                                del={product.discount > 0 ? true : false}
                                                            >
                                                                {product.discount > 0 ? formatPrice(product.price) : ''}
                                                            </Text>
                                                            <Text color="black" b size={18}>
                                                                {formatPrice(product.discountPrice)}
                                                            </Text>
                                                        </Row>
                                                        <Row justify="space-between">
                                                            <Col>
                                                                {product.images.map((image) => (
                                                                    <Badge
                                                                        enableShadow
                                                                        isPressable
                                                                        variant={'dot'}
                                                                        size="xl"
                                                                        style={{
                                                                            backgroundColor: image.color,
                                                                            border: '1px solid black',
                                                                            marginRight: 3,
                                                                        }}
                                                                    ></Badge>
                                                                ))}
                                                            </Col>
                                                            <Rating precision={0.1} size="small" value={product.rate} readOnly />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </Grid>
                </Grid.Container>
                : <></>}
            <Grid.Container gap={1} css={{ marginTop: 5, marginBottom: 20 }}>
                <Row justify="center">
                    <Text size={30} b i>
                        #REALESTCOMMUNITY
                    </Text>
                </Row>
                <Row justify="center" css={{ marginTop: 20, marginBottom: 10 }}>
                    <Text size={24} i >
                        "Thời trang có thể phai tàn nhưng phong cách sẽ tồn tại mãi mãi"
                    </Text>
                </Row>
            </Grid.Container>
            <Divider />
        </>
    );
}

export default Home;
