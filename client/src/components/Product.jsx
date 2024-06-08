import React from 'react'
import { Link } from 'react-router-dom'
export default function Product({ product }) {
    return (
        <div className='product mb-4 position-relative'>
            <Link to={`/${product?.slug}`}>
                <div className="product_img">
                    <img src={product?.images[0]?.url} width="100%" height={328} alt="" />
                </div>
                <div className="position-absolute tag">
                    <p className='mb-0'>{product?.tags}</p>
                </div>
                <div className="text-dark p-2 pb-4 text-center">
                    <h6 className='mb-0 py-2' style={{ color: "#000" }}>{product?.title}</h6>
                    <p className='mb-0 price'>{product ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.price) : "231.000 đ"}</p>

                </div>
            </Link>
        </div>
    )
}
