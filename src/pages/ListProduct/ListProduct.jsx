import { Link, useParams } from "react-router-dom"
import { useState } from 'react';
import { useEffect } from "react";
import { getProductByCategory } from "../../services/ProductService";

export default function ListProduct() {
    const [products,setProducts] = useState([])
    const {id}= useParams();
    useEffect(()=>{
        async function getData () {
            let res = await getProductByCategory(id)
        if(res.success)
            {
                setProducts(res.data)
            }
        }
        getData()
    },[id])
    return (
        <div className="bg-white">
            <div className="py-4 sm:py-8 lg:max-w-7xl lg:mx-auto lg:px-8">

                <div className="mt-8 relative">
                    <div className="relative w-full pb-6 -mb-6 overflow-x-auto">
                        <ul
                            role="list"
                            className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8"
                        >
                            {products.map((product) => (
                                <li key={product.id} className="w-64 inline-flex flex-col text-center lg:w-auto">
                                    <Link to={`/detailProduct/${product.id}`}>
                                        <div className="group relative">
                                            <div className="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
                                                
                                                <img
                                                    src={product.images[0]?.url || 'https://i1.sndcdn.com/artworks-uYhZ8klDRg0o0q2b-ThJo0w-t500x500.jpg'}
                                                    // alt={product.imageAlt}
                                                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                                                />
                                                
                                            </div>
                                            <div className="mt-6">
                                                <p className="text-sm text-gray-500">{product.color}</p>
                                                <h3 className="mt-1 font-semibold text-gray-900">
                                                    <a href={product.id}>
                                                        <span className="absolute inset-0" />
                                                        {product.name}
                                                    </a>
                                                </h3>
                                                {/* format price */}
                                                <p className="mt-1 text-gray-900">{product.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <h4 className="sr-only">Available colors</h4>
                                    <ul role="list" className="mt-auto pt-6 flex items-center justify-center space-x-3">
                                        {product.images.map((image) => (
                                            <li
                                                key={image.id}
                                                className="w-4 h-4 rounded-full border border-black border-opacity-10"
                                                style={{ backgroundColor: image.color }}
                                            >
                                                <span className="sr-only">{image.color}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {/* <div className="mt-3">
                                        <a
                                            href={product.href}
                                            className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-green-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                            </svg><span className="sr-only">, {product.name}</span>
                                        </a>
                                    </div> */}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex px-4 sm:hidden">
                    <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                        See everything<span aria-hidden="true"> &rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
