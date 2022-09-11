import { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import { CurrencyDollarIcon, GlobeIcon } from '@heroicons/react/outline'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { addProductToCart, getProductByID } from '../../services/ProductService';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { userSelector } from '../../redux/auth/authSlice';
import Swal from 'sweetalert2'
import { getUserFromLocalStorage } from '../../utils/userHanle';
// const product = {
//     name: 'Basic Tee',
//     price: '$35',
//     rating: 3.9,
//     reviewCount: 512,
//     href: '#',
//     breadcrumbs: [
//         { id: 1, name: 'Women', href: '#' },
//         { id: 2, name: 'Clothing', href: '#' },
//     ],
//     images: [
//         {
//             id: 1,
//             imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
//             imageAlt: "Back of women's Basic Tee in black.",
//             primary: true,
//         },
//         {
//             id: 2,
//             imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg',
//             imageAlt: "Side profile of women's Basic Tee in black.",
//             primary: false,
//         },
//         {
//             id: 3,
//             imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg',
//             imageAlt: "Front of women's Basic Tee in black.",
//             primary: false,
//         },
//     ],
//     colors: [
//         { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
//         { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' },
//     ],
//     sizes: [
//         { name: 'XXS', inStock: true },
//         { name: 'XS', inStock: true },
//         { name: 'S', inStock: true },
//         { name: 'M', inStock: true },
//         { name: 'L', inStock: true },
//         { name: 'XL', inStock: false },
//     ],
//     description: `
//     <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
//     <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
//   `,
//     details: [
//         'Only the best materials',
//         'Ethically and locally made',
//         'Pre-washed and pre-shrunk',
//         'Machine wash cold with similar colors',
//     ],
// }
const reviews = [
    {
        id: 1,
        title: "Can't say enough good things",
        rating: 5,
        content: `
      <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
      <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
    `,
        author: 'Risako M',
        date: 'May 16, 2021',
        datetime: '2021-01-06',
    },
    // More reviews...
]
const relatedProducts = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
        imageAlt: "Front of men's Basic Tee in white.",
        price: '$35',
        color: 'Aspen White',
    },
    // More products...
]
const policies = [
    { name: 'International delivery', icon: GlobeIcon, description: 'Get your order in 2 years' },
    { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function DetailProduct() {

    const [product, setProduct] = useState({})
    const { id } = useParams();
    useEffect(() => {
        async function getData() {
            let res = await getProductByID(id)
            if (res.success) {
                setProduct(res.data)
            }
        }
        getData()
    }, [id])
    // const [selectedColor, setSelectedColor] = useState(product.colors[0])
    // const [selectedSize, setSelectedSize] = useState(product.sizes[2])
    let curUser = getUserFromLocalStorage()
    const [productOptionId, setProductOptionId] = useState('')
    const [color, setColor] = useState('')
    const quantity = 1
    const addToCart = async ({ productOptionId, color, quantity }) => {
        if (curUser?.id !== undefined) {
            let res = await addProductToCart({ productOptionId, color, quantity })
            console.log(res)
            if (res.data.success) {
                Swal.fire({
                    title: 'ADD PRODUCT TO CART',
                    text: "SUCCESSFULLY",
                    icon: 'success',
                    confirmButtonColor: '#32CD32',
                    confirmButtonText: 'Home'
                })
            } else {
                Swal.fire({
                    title: 'ERROR',
                    text: "PLEASE CHOOSE SIZE AND COLOR",
                    icon: 'error',
                    showConfirmButton: false,
                    showCancelButton: true,
                    cancelButtonColor: '#DC143C'
                })
            }

        } else {
            Swal.fire({
                title: 'ERROR',
                text: "PLEASE LOGIN TO SYSTEM",
                icon: 'error',
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonColor: '#DC143C'
            })
        }
        
    }
    const handleAddToCart = () => {
        addToCart({ productOptionId, color, quantity })

    }
    return (
        <div className="bg-white">
            <div className="pt-3 pb-4 sm:pb-6">
                <div className="mt-1 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                        <div className="lg:col-start-8 lg:col-span-5">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-medium text-blue-600">{product.name}</h1>
                                <div className='flex-col justify-between'>
                                    <h2 className="text-xl font-medium text-black">Giá gốc: {product.price}</h2>
                                    <h2 className="text-xl font-medium text-black">Giảm giá: {product.discount}</h2>
                                    <h2 className="text-xl font-medium text-red-600">Giá hiện tại: {product.discountPrice}</h2>
                                </div>

                            </div>
                            {/* Reviews */}
                            {/* <div className="mt-4">
                                <h2 className="sr-only">Reviews</h2>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-700">
                                        {product.rating}
                                        <span className="sr-only"> out of 5 stars</span>
                                    </p>
                                    <div className="ml-1 flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                                        ·
                                    </div>
                                    <div className="ml-4 flex">
                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            See all {product.reviewCount} reviews
                                        </a>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        {/* Image gallery */}
                        <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                            <h2 className="sr-only">Images</h2>
                            {/* <Carousel>
                                {product?.options?.map((option) =>
                                    option.variants.map((variant) =>
                                        variant.images.map((image) => {
                                            return <Carousel.Item interval={2000}>
                                                <img
                                                    key={`${image.id}`}
                                                    className="d-block w-"
                                                    src={`${image.url}`}
                                                    alt="image"
                                                />
                                            </Carousel.Item>
                                        })
                                    )
                                )}

                            </Carousel> */}
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
                                modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
                                className="mySwiper"
                                loop={true}
                                grabCursor={true}
                            >
                                {product?.options?.map((option) =>
                                    option.variants.map((variant) =>
                                        variant.images.map((image) => {
                                            return <SwiperSlide>
                                                <img
                                                    key={`${image.id}`}
                                                    className="d-block w-100"
                                                    src={`${image.url}`}
                                                    alt="image"
                                                />
                                            </SwiperSlide>
                                        })
                                    )
                                )}
                            </Swiper>

                            {/* <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                                {product?.options?.map((option) =>
                                    option.variants.map((variant) =>
                                        variant.images.map((image) => {
                                            return <img
                                                key={`${image.id}`}
                                                src={`${image.url}`}
                                                //  alt={image.url}
                                                className={classNames(
                                                    image.thumbnail ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                                                    'rounded-lg'
                                                )}
                                            />
                                            console.log(image.url)
                                        })
                                    )
                                )}
                            </div> */}
                        </div>

                        <div className="mt-8 lg:col-span-5">
                            <form>
                                {/* Color picker */}
                                <div>
                                    <h2 className="text-sm font-medium text-gray-900">Color</h2>

                                    <RadioGroup className="mt-2" value={color} onChange={setColor}>
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                        <div className="flex items-center space-x-3">
                                            {product?.options?.length > 0 && product.options.map((option) =>
                                                option.variants.map((variant) => (
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
                                                ))
                                            )}

                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Size picker */}
                                <div className="mt-8">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm font-medium text-gray-900">Size</h2>
                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            See sizing chart
                                        </a>
                                    </div>

                                    <RadioGroup className="mt-2" value={productOptionId} onChange={setProductOptionId}>
                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                            {product?.options?.map((option) => (
                                                <RadioGroup.Option
                                                    key={option.id}
                                                    value={option.id}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            option.inStock > 0 ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                                                            active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                                            checked
                                                                ? 'bg-white border-transparent text-black hover:bg-indigo-700'
                                                                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                                            'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                                                        )
                                                    }
                                                    disabled={option.inStock <= 0}
                                                >
                                                    <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                <button
                                    type="button" onClick={handleAddToCart}
                                    className="mt-8 w-full bg-blue-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add to cart
                                </button>
                            </form>

                            {/* Product details */}
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Description</h2>

                                <div
                                    className="mt-4 prose prose-sm text-gray-500"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            </div>

                            {/* <div className="mt-8 border-t border-gray-200 pt-8">
                                <h2 className="text-sm font-medium text-gray-900">Fabric &amp; Care</h2>

                                <div className="mt-4 prose prose-sm text-gray-500">
                                    <ul role="list">
                                        {product.details.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div> */}

                            {/* Policies */}
                            <section aria-labelledby="policies-heading" className="mt-10">
                                <h2 id="policies-heading" className="sr-only">
                                    Our Policies
                                </h2>

                                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                    {policies.map((policy) => (
                                        <div key={policy.name} className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                                            <dt>
                                                <policy.icon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </section>
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="max-w-2xl mx-auto py-1 px-1 sm:py-2 sm:px-1 lg:max-w-full lg:px-0">
                            <h2 className="text-lg font-medium text-gray-900">Recent reviews</h2>
                            <div className="mt-2 pb-3 border-t border-b border-gray-200 divide-y divide-gray-200 space-y-10">
                                {reviews.map((review) => (
                                    <div key={review.id} className="pt-3 lg:grid lg:grid-cols-12 lg:gap-x-8">
                                        <div className="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
                                            <div className="flex items-center xl:col-span-1">
                                                <div className="flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                review.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                                                'h-5 w-5 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                                <p className="ml-3 text-sm text-gray-700">
                                                    {review.rating}
                                                    <span className="sr-only"> out of 5 stars</span>
                                                </p>
                                            </div>

                                            <div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
                                                <h3 className="text-sm font-medium text-gray-900">{review.title}</h3>

                                                <div
                                                    className="mt-3 space-y-6 text-sm text-gray-500"
                                                    dangerouslySetInnerHTML={{ __html: review.content }}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-3">
                                            <p className="font-medium text-gray-900">{review.author}</p>
                                            <time
                                                dateTime={review.datetime}
                                                className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                                            >
                                                {review.date}
                                            </time>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <section aria-labelledby="related-heading" className="mt-1 pb-8 sm:mt-4 border-b border-gray-200">
                        <h2 id="related-heading" className="text-lg font-medium text-gray-900">
                            Customers also purchased
                        </h2>

                        <div className="mt-2 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {relatedProducts.map((relatedProduct) => (
                                <div key={relatedProduct.id} className="group relative">
                                    <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                        <img
                                            src={relatedProduct.imageSrc}
                                            alt={relatedProduct.imageAlt}
                                            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href={relatedProduct.href}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {relatedProduct.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{relatedProduct.color}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{relatedProduct.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}