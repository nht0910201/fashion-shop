import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addProductToCart, getProductByID } from '../../services/ProductService';
import { getUserFromLocalStorage } from '../../utils/userHanle';
import Grid2 from '@mui/material/Unstable_Grid2';
import { RadioGroup } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, FreeMode, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import {
    Badge,
    Button,
    Card,
    Col,
    Divider,
    Image,
    Row,
    Text,
    Pagination as Pagination2,
    Tooltip,
    User,
    Table,
} from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateSuccessReload } from '../../components/Alert/UpdateSuccessReload';
import { UpdateError } from '../../components/Alert/UpdateError';
import Review from './Review';
import { getReviewsByProduct } from '../../services/ReviewService';
import { Rating, Skeleton } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';
import SizeChoosing from './SizeChoosing';

function ProductDetail() {
    const [loading, SetLoad] = useState(false);
    let navigate = useNavigate();
    let userCur = getUserFromLocalStorage();
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    let [page, setPage] = useState(0);
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState({});
    const { id } = useParams();
    useEffect(() => {
        async function getData() {
            SetLoad(true);
            let res = await getProductByID(id);
            console.log(res);
            if (res.success) {
                setProduct(res.data);
                setProductOptionId(res.data.options[0].id);
                setColorList(res.data.options[0].variants);
                setColor(res.data.options[0].variants[0].color);
                setFee(res.data.options[0].extraFee);
                SetLoad(false);
            }
        }
        getData();
    }, [id]);
    useEffect(() => {
        async function getReviews() {
            let reviews = await getReviewsByProduct(id, page);
            if (reviews.success) {
                setReviews(reviews.data);
            }
        }
        getReviews();
    }, [id, page]);
    let curUser = getUserFromLocalStorage();
    const [colorList, setColorList] = useState([]);
    const [color, setColor] = useState('');
    const [extraFee, setFee] = useState(0);
    const [productOptionId, setProductOptionId] = useState('');
    const [loadMore, setLoadMore] = useState(false);
    const handleChangeSize = (e) => {
        setProductOptionId(e);
        product.options.forEach((option) => {
            if (option.id === e) {
                setColorList(option.variants);
                setColor(option.variants[0].color);
                setFee(option.extraFee);
            }
        });
    };
    const quantity = 1;
    const addToCart = async ({ productOptionId, color, quantity }) => {
        if (curUser?.id !== undefined) {
            const wait = toast.loading('Vui l??ng ch??? ...');
            let res = await addProductToCart({ productOptionId, color, quantity });
            if (res.data.success) {
                UpdateSuccessReload(wait, 'Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng', false);
            } else {
                UpdateError(wait, 'Th??m s???n ph???m v??o gi??? h??ng th???t b???i');
            }
        } else {
            toast.error('Vui l??ng ????ng nh???p', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light',
                onClose: () => {
                    navigate('/');
                },
            });
        }
    };
    const handleAddToCart = () => {
        addToCart({ productOptionId, color, quantity });
    };
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const handleLoadMore = () => {
        setLoadMore(!loadMore);
    };
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    return (
        <>
            <Grid2 container spacing={{ xs: 1, md: 1.5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid2 xs={7} padding={3}>
                    <Swiper
                        cssMode={true}
                        navigation={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: true,
                            stopOnLastSlide: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{ clickable: true }}
                        modules={[Autoplay, Navigation, Pagination, FreeMode, Thumbs]}
                        thumbs={{ swiper: thumbsSwiper }}
                        loop={true}
                        grabCursor={true}
                        style={{
                            marginBottom: 10,
                            '--swiper-navigation-color': '#f5a524',
                            '--swiper-pagination-color': '#f5a524',
                        }}
                    >
                        {loading ? (
                            <SwiperSlide>
                                <Skeleton variant="rounded" width={'100%'} height={'70vh'} sx={{ marginBottom: 2 }} />
                            </SwiperSlide>
                        ) : (
                            product?.images?.map((image) => (
                                <SwiperSlide key={`${image.imageId}`}>
                                    <Image height={500} src={`${image.url}`} alt="...Loading" objectFit="contain" />
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                    <Swiper
                        cssMode={true}
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >
                        {loading
                            ? Array.from(new Array(3)).map((index) => (
                                  <SwiperSlide key={index}>
                                      <Skeleton
                                          variant="rounded"
                                          width={'100%'}
                                          height={'15vh'}
                                          sx={{ marginBottom: 2 }}
                                      />
                                  </SwiperSlide>
                              ))
                            : product?.images?.map((image) => (
                                  <SwiperSlide key={`${image.imageId}`}>
                                      <Image
                                          height={150}
                                          src={`${image.url}`}
                                          css={{ cursor: 'pointer' }}
                                          alt="...Loading"
                                          objectFit="contain"
                                      />
                                  </SwiperSlide>
                              ))}
                    </Swiper>
                </Grid2>
                {loading ? (
                    <>
                        <Grid2 xs={5} padding={3}>
                            {Array.from(new Array(5)).map((index) => (
                                <Skeleton
                                    key={index}
                                    variant="rounded"
                                    sx={{ marginBottom: '3rem' }}
                                    width={'100%'}
                                    height={'3rem'}
                                />
                            ))}
                        </Grid2>
                        <Grid2 xs={12} sx={{ borderTop: 1, borderBlockColor: '#cfcfcf' }}>
                            <Skeleton variant="rounded" width={'100%'} height={'5rem'} />
                        </Grid2>
                    </>
                ) : (
                    <>
                        <Grid2 xs={5} padding={3}>
                            <Row>
                                <Text size={30}>{product.name}</Text>
                            </Row>
                            <Row justify="space-between" align="center">
                                <Row>
                                    {product.state === 'enable' ? (
                                        <Text color="success" size={20}>
                                            C??n h??ng
                                        </Text>
                                    ) : (
                                        <>
                                            <Text color="error" size={20}>
                                                H???t h??ng
                                            </Text>
                                        </>
                                    )}
                                </Row>
                                <Row align='center' justify='flex-end'>
                                    <Rating readOnly precision={0.1} sx={{mr:'0.3rem'}} size="small" value={product.rate} /> 
                                    {product.rateCount} ????nh gi??
                                </Row>
                            </Row>
                            <Row justify="space-between" align="center">
                                <Text b size={40}>
                                    {formatPrice(product.discountPrice + extraFee)}
                                </Text>
                                <Text b size={20} del hidden={product.discount > 0 ? false : true}>
                                    {formatPrice(product.price + extraFee)}
                                </Text>
                                <Badge color={'error'} hidden={product.discount <= 0 ? true : false}>
                                    -{product.discount}%
                                </Badge>
                            </Row>
                            <Row justify="space-between">
                                <RadioGroup className="mt-2" value={productOptionId} onChange={handleChangeSize}>
                                    <Text b>Ch???n size</Text>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                        {product?.options?.map((option) => (
                                            <Tooltip content={`Ph?? c???ng th??m: ${formatPrice(option.extraFee)}`}>
                                                <RadioGroup.Option
                                                    key={option.id}
                                                    value={option.id}
                                                    onClick={setProductOptionId}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            option.inStock > 0
                                                                ? 'cursor-pointer focus:outline-none'
                                                                : 'opacity-25 cursor-not-allowed',
                                                            // active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                                            checked
                                                                ? 'bg-black border-transparent text-white '
                                                                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                                            'border rounded-md py-3 px-5 flex items-center justify-center text-sm font-medium uppercase sm:flex-1',
                                                        )
                                                    }
                                                    disabled={option.inStock <= 0}
                                                >
                                                    <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
                                                </RadioGroup.Option>
                                            </Tooltip>
                                        ))}
                                    </div>
                                </RadioGroup>
                                {/* Button modal */}
                                <SizeChoosing />
                            </Row>
                            <Row css={{ marginTop: '$10' }}>
                                <RadioGroup className="mt-2" value={color} onChange={setColor}>
                                    <Text b>Ch???n m??u</Text>
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
                                                        '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none',
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
                                                        'z-10 h-8 w-8 border border-black border-opacity-10 rounded-full',
                                                    )}
                                                ></span>
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </Row>
                            <Row css={{ marginTop: '$10' }}>
                                <Text b>Chi ti???t s???n ph???m</Text>
                            </Row>
                            <Row>
                                <ReactQuill theme={'bubble'} readOnly value={product.description} />
                            </Row>
                            <Row css={{ marginTop: '$10' }}>
                                <Button
                                    color={'warning'}
                                    css={{ width: '100%' }}
                                    type="button"
                                    onClick={handleAddToCart}
                                >
                                    Th??m v??o gi??? h??ng
                                </Button>
                            </Row>
                            <Row css={{ marginTop: '$10' }} align="center">
                                <Card variant="flat">
                                    <Card.Body css={{ textAlign: 'center' }}>
                                        <Text>Giao ha??ng thu ti????n, thanh toa??n online nhi????u ph????ng th????c</Text>
                                    </Card.Body>
                                </Card>
                                <Card variant="flat" css={{ marginLeft: '$2' }}>
                                    <Card.Body css={{ textAlign: 'center' }}>
                                        <Text>Ch??nh h??ng 100% - ?????i tr??? trong 1 th??ng (v???i s???n ph???m m???i) </Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Grid2>
                        <Grid2 xs={12} sx={{ borderTop: 1, borderBlockColor: '#cfcfcf', margin: 2 }}>
                            {product?.attr?.length === 0 ? (
                                <Text>S???n ph???m ch??a c?? th??ng s???</Text>
                            ) : (
                                <>
                                    <Row justify="space-between" align="center">
                                        <Text css={{ marginLeft: '$10' }} size={30}>
                                            Th??ng s??? s???n ph???m
                                        </Text>
                                        <Button as={Text} light animated={false} auto onClick={handleLoadMore}>
                                            {loadMore ? 'Thu g???n' : 'Xem t???t c???'}
                                        </Button>
                                    </Row>
                                    <Table
                                        aria-label="Table Attribute"
                                        bordered
                                        shadow={false}
                                        width={'25%'}
                                        css={{
                                            height: '50%',
                                            minWidth: '25%',
                                        }}
                                        selectionMode={'single'}
                                        color={'warning'}
                                    >
                                        <Table.Header>
                                            <Table.Column>Th??ng s???</Table.Column>
                                            <Table.Column>Gi?? tr???</Table.Column>
                                        </Table.Header>
                                        <Table.Body>
                                            {loadMore
                                                ? product?.attr?.map((attr) => (
                                                      <Table.Row key={attr.id}>
                                                          <Table.Cell>{attr.name}</Table.Cell>
                                                          <Table.Cell>{attr.val}</Table.Cell>
                                                      </Table.Row>
                                                  ))
                                                : product?.attr?.slice(0, 2).map((attr) => (
                                                      <Table.Row key={attr.id}>
                                                          <Table.Cell>{attr.name}</Table.Cell>
                                                          <Table.Cell>{attr.val}</Table.Cell>
                                                      </Table.Row>
                                                  ))}
                                        </Table.Body>
                                    </Table>
                                </>
                            )}
                            {/* {product?.attr?.length !== 0 ? (
                                product?.attr?.map((attr) => (
                                    <Row key={attr.id} css={{ marginLeft: '$20' }}>
                                        <Col>
                                            <Text size={'$lg'}>{attr.name}</Text>
                                        </Col>
                                        <Col>
                                            <Text size={'$lg'}>{attr.val}</Text>
                                        </Col>
                                    </Row>
                                ))
                            ) : (
                                <Text>S???n ph???m ch??a c?? th??ng s???</Text>
                            )} */}
                        </Grid2>
                        <Grid2 xs={12} sx={{ borderTop: 1, borderBlockColor: '#cfcfcf' }}>
                            <Row>
                                <Col>
                                    <Text css={{ marginLeft: '$10' }} size={30}>
                                        ????nh gi?? s???n ph???m
                                    </Text>
                                </Col>
                                <Col
                                    hidden={userCur?.id ? false : true}
                                    css={{ display: 'flex', justifyContent: 'flex-end', marginRight: '$10' }}
                                >
                                    <Review productId={product.id} productName={product.name} />
                                </Col>
                            </Row>

                            {reviews?.list?.length !== 0 ? (
                                reviews?.list?.map((review) => (
                                    <>
                                    <Row key={review.id} css={{ marginLeft: '$18' }}>
                                        <Col>
                                            <Row>
                                                <User
                                                    css={{ p: 'unset' }}
                                                    text={review.reviewedBy}
                                                    color="warning"
                                                    bordered
                                                    name={review.reviewedBy}
                                                    description={review.createdDate}
                                                />
                                            </Row>
                                            <Row gap={4.5}>
                                                <Rating
                                                    value={review.rate}
                                                    readOnly
                                                    defaultValue={0}
                                                    precision={0.1}
                                                    max={5}
                                                />
                                            </Row>
                                            <Row gap={4.5}>
                                                <Text css={{ m: 'unset' }}>{review.content}</Text>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Divider css={{mt: '$1', mb:'$3'}}/>
                                    </>
                                ))
                            ) : (
                                <Text>S???n ph???m ch??a c?? ????nh gi??</Text>
                            )}
                            <Row hidden={reviews?.list?.length === 0 ? true : false} justify="center">
                                <Pagination2
                                    color="warning"
                                    loop
                                    onChange={(page) => {
                                        setPage(page - 1);
                                    }}
                                    total={reviews.totalPage}
                                    css={{ margin: '$5' }}
                                />
                            </Row>
                            <Divider />
                        </Grid2>
                    </>
                )}
                <ToastContainer />
            </Grid2>
        </>
    );
}

export default ProductDetail;
