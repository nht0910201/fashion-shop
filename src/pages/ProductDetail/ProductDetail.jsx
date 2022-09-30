import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addProductToCart, getProductByID } from "../../services/ProductService";
import { getUserFromLocalStorage } from "../../utils/userHanle";
import Grid2 from '@mui/material/Unstable_Grid2';
import { RadioGroup } from '@headlessui/react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Mousewheel, Keyboard, FreeMode, Thumbs} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Badge, Button, Card, Image, Row, Text } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateSuccessReload } from "../../components/Alert/UpdateSuccessReload";
import { UpdateError } from '../../components/Alert/UpdateError'
import { UpdateSuccessNavigate } from "../../components/Alert/UpdateSuccessNavigate";

function ProductDetail() {
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    const [product, setProduct] = useState({})
    const { id } = useParams();
    useEffect(() => {
        async function getData() {
            let res = await getProductByID(id)
            if (res.success) {
                setProduct(res.data)
                setProductOptionId(res.data.options[0].id)
                setColorList(res.data.options[0].variants)
                setColor(res.data.options[0].variants[0].color)
            }
        }
        getData()
    }, [id])
    let curUser = getUserFromLocalStorage()
    const [colorList, setColorList] = useState([])
    const [color, setColor] = useState('')
    const [productOptionId, setProductOptionId] = useState('')
    const handleChangeSize = (e) => {
        setProductOptionId(e)
        product.options.forEach((option) => {
            if(option.id === e){
                setColorList(option.variants)
                setColor(option.variants[0].color) 
            }
        })
    }

    const quantity = 1
    const addToCart = async ({ productOptionId, color, quantity }) => {
        const wait = toast.loading("Vui lòng chờ ...")
        if (curUser?.id !== undefined) {
            let res = await addProductToCart({ productOptionId, color, quantity })
            if (res.data.success) {
                UpdateSuccessReload(wait, 'Thêm sản phẩm vào giỏ hàng thành công', false)
            } else {
                UpdateError(wait, 'Thêm sản phẩm vào giỏ hàng thất bại')
            }
        } else {
            let url = '/'
            UpdateSuccessNavigate(wait, 'Vui lòng Đăng nhập', url)
        }

    }
    const handleAddToCart = () => {
        addToCart({ productOptionId, color, quantity })

    }
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <Grid2 container spacing={{ xs: 1, md: 1.5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid2 xs={7} padding={3}>
                <Swiper
                    cssMode={true}
                    navigation={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard, FreeMode, Thumbs]}
                    className="mySwiper"
                    thumbs={{ swiper: thumbsSwiper }}
                    loop={true}
                    grabCursor={true}
                    style={{marginBottom: 10,
                        "--swiper-navigation-color": "#f5a524",
                        "--swiper-pagination-color": "#f5a524",
                    }}
                >
                    {product?.options?.map((option) =>
                        option.variants.map((variant) =>
                            variant.images.map((image) => {
                                return <SwiperSlide>
                                        <Image
                                            key={`${image.id}`}
                                            height={500}
                                            src={`${image.url}`}
                                            alt="...Loading"
                                            objectFit="contain"
                                        />
                                </SwiperSlide>
                            })
                        )
                    )}
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                >
                    {product?.options?.map((option) =>
                        option.variants.map((variant) =>
                            variant.images.map((image) => {
                                return <SwiperSlide>
                                    <Image
                                        key={`${image.id}`}
                                        height={150}
                                        css={{ cursor: 'pointer' }}
                                        src={`${image.url}`}
                                        alt="...Loading"
                                        objectFit="contain"
                                    />
                                </SwiperSlide>
                            })
                        )
                    )}
                </Swiper>
            </Grid2>
            <Grid2 xs={5} padding={3}>
                <Row>
                    <Text size={30}>{product.name}</Text>
                </Row>
                <Row>
                    {product.state === 'enable' ?
                        <Text color='success' size={20}>
                            Còn hàng
                        </Text>
                        :
                        <>
                            <Text color='error' size={20}>
                                Hết hàng
                            </Text>
                        </>
                    }
                </Row>
                <Row justify="space-between" align="center">
                    <Text b size={40}>{formatPrice(product.discountPrice)}</Text>
                    <Text b size={20} del hidden={product.discount > 0 ? false : true}>
                        {formatPrice(product.price)}
                    </Text>
                    <Badge color={'error'} hidden={product.discount <= 0 ? true : false}>-{product.discount}%</Badge>
                </Row>
                <Row justify="space-between">
                    <RadioGroup className="mt-2" value={productOptionId} onChange={handleChangeSize}>
                        <Text b>Chọn size</Text>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                            {product?.options?.map((option) => (
                                <RadioGroup.Option
                                    key={option.id}
                                    value={option.id}
                                    onClick={setProductOptionId}
                                    className={({ active, checked }) =>
                                        classNames(
                                            option.inStock > 0 ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                                            // active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                            checked
                                                ? 'bg-black border-transparent text-white '
                                                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                            'border rounded-md py-3 px-5 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                                        )
                                    }
                                    disabled={option.inStock <= 0}
                                >
                                    <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                    {/* Button modal */}
                    <Button light>Cách chọn size</Button>
                </Row>
                <Row css={{ marginTop: '$10' }}>
                    <RadioGroup className="mt-2" value={color} onChange={setColor}>
                        <Text b>Chọn màu</Text>
                        <div className="flex items-center space-x-3">
                            {colorList.map((variant) => (
                                <RadioGroup.Option
                                    key={variant.id}
                                    value={variant.color}
                                    className={({ active, checked }) =>
                                        classNames(
                                            // variant.color.selectedColor,
                                            active && checked ? 'ring ring-offset-1' : '',
                                            !active && checked ? 'ring-2' : '',
                                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                        )
                                    }
                                    disabled={variant.stock <= 0}
                                    style={{ marginTop: 10 }}
                                >
                                    <RadioGroup.Label as="p" className="sr-only">
                                        {variant.color}
                                    </RadioGroup.Label>
                                    <span
                                        style={{ backgroundColor: variant.color }}
                                        className={classNames(
                                            'z-10 h-8 w-8 border border-black border-opacity-10 rounded-full'
                                        )}
                                    ></span>
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                </Row>
                <Row css={{ marginTop: '$10' }}>
                    <Text b>Chi tiết sản phẩm</Text>
                </Row>
                <Row>
                    <Text>{product.description}</Text>
                </Row>
                <Row css={{ marginTop: '$10' }}>
                    <Button
                        color={'warning'}
                        css={{ width: '100%' }}
                        type="button" onClick={handleAddToCart}                    >
                        Add to cart
                    </Button>
                </Row>
                <Row css={{ marginTop: '$10' }} align="center">
                    <Card variant="flat">
                        <Card.Body css={{ textAlign: 'center' }}>
                            <Text >
                                Bảo hành trong vòng 90 ngày
                            </Text>
                        </Card.Body>
                    </Card>
                    <Card variant="flat" css={{ marginLeft: '$2' }}>
                        <Card.Body css={{ textAlign: 'center' }}>
                            <Text>
                                Miễn phí đổi trả trong 30 ngày nếu có lỗi
                            </Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Grid2>
            <Grid2 xs={12} sx={{ borderTop: 1, borderBlockColor: '#cfcfcf' }}>
                <h2>c</h2>
            </Grid2>
            <ToastContainer />
        </Grid2>
    );
}

export default ProductDetail;