import React from 'react'
import { useSelector } from 'react-redux'
import Product from '../components/Product'

export default function ItemsSearch() {
    const ItemsProductSearch = useSelector(state => state?.product?.search)
    console.log(ItemsProductSearch)
    return (
        <div className='container'>
            <div className="py-4">
                <h3 className='text-center'>Sản phẩm tìm được</h3>
            </div>
            <div className="d-flex flex-wrap align-items-center justify-content-between py-5">
                {
                    ItemsProductSearch?.length > 0 ? (
                        ItemsProductSearch?.map((e, index) => (
                            <Product key={index} product={e} />
                        ))
                    ) : (
                        <div className="py-5 w-100">
                            <p className='text-center'>Không tìm thấy sản phẩm liên quan</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
