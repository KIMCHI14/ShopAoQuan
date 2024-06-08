
import React, { useEffect, useState } from 'react';
import { BsCart } from 'react-icons/bs';
import Product from '../components/Product';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAProduct, getAllProduct, getSlugProduct, ratingProduct } from '../features/products/productSlice';
import ProductDescription from '../components/ProductDescription';
import { cart, getCart } from '../features/users/userSlice';
import ReactStars from "react-rating-stars-component";


const ProductDetail = () => {
    const [count, setCount] = useState(1)
    const [alrealAdd, setAlrealAdd] = useState(false)
    const [comment, setComment] = useState('');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [sizeValue, setSizeValue] = useState("");
    const [pr, setPr] = useState([]);
    // lay slug
    const navigate = useNavigate()

    const { slug } = useParams()
    useEffect(() => {
        window.scroll(0, 0)
    }, [slug])
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const cartState = useSelector(state => state.auth?.cartUser)
    const products = useSelector(state => state?.product?.slugProduct)
    const productsAll = useSelector(state => state?.product?.products)
    useEffect(() => {
        dispatch(getSlugProduct(slug))
        dispatch(getAllProduct())
        dispatch(getCart())
    }, [slug])
    useEffect(() => {
        if (cartState?.find(e => e?.productId?.slug === slug)) {
            setAlrealAdd(true);
        }
    }, [cartState, slug]);
    useEffect(() => {
        if (products?.sizes?.length > 0) {
            setSizeValue(products.sizes[0]);
        }
    }, [products]);
    useEffect(() => {
        if (productsAll) {
            const prFound = productsAll.filter(e => e.category === products?.category);
            setPr(prFound);
        }
        const cartItems = JSON.parse(localStorage.getItem("carts"));
    }, [productsAll, slug]);
    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    }
    const handleAddToCart = () => {
        if (user !== null) {
            if (sizeValue === "") {
                toast.warning("Vui lòng chọn size !");
            } else {
                dispatch(cart({ productId: products, quantity: count, price: products?.price, size: sizeValue }));
                // window.location.reload()
                // navigate('/cart')
            }
        } else {
            if (sizeValue === "") {
                toast.warning("Vui lòng chọn size !");
            } else {
                const existingCart = JSON.parse(localStorage.getItem("carts")) || [];
                const existingItemIndex = existingCart.findIndex(item => item.productId?._id === products?._id);
                const quantityToAdd = parseInt(count, 10);
                if (isNaN(quantityToAdd)) {
                    toast.error("Số lượng không hợp lệ!");
                    return;
                }
                if (existingItemIndex !== -1) {
                    existingCart[existingItemIndex].quantity += quantityToAdd;
                } else {
                    const newCartItem = { productId: products, quantity: count, price: products?.price, size: sizeValue };
                    existingCart.push(newCartItem);
                }
                localStorage.setItem("carts", JSON.stringify(existingCart));
                toast.success("Đã thêm vào giỏ hàng !");
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user !== null) {
            const data = { star: count, prodId: products?._id, comment: comment };
            dispatch(ratingProduct(data)).then(() => {
                dispatch(getSlugProduct(slug));
                toast.success("Đánh giá thành công");
                setComment('');
                setCount(1);
            });
        } else {
            toast.warning("Vui lòng đăng nhập để đánh giá !");
        }
    };
    return (
        <>
            <section className='py-4 container'>
                <div className="row">
                    <div className="col-5">
                        <div className="bak-collec">
                            <div style={{ height: "415px", border: "1px solid #ccc", borderRadius: "10px", overflow: "hidden" }} className='text-center'>
                                {products && products.images && products.images.length > 0 && products.images[selectedImageIndex] && (
                                    <img width={413} height={413} src={products.images[selectedImageIndex].url} alt="product-dec" />
                                )}
                            </div>
                        </div>
                        <div className="mt-4 d-flex align-items-center">
                            {products && products.images && products.images.map((e, index) => (
                                <div key={index} onClick={() => handleImageClick(index)} className='me-2 d-flex align-items-center justify-content-center' style={{ height: "90px", width: "80px", borderRadius: "10px", overflow: "hidden", border: "1px solid #ccc", cursor: 'pointer' }}>
                                    <img height={79} width={79} src={e.url} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h4 className='title'>{products?.title}</h4>
                            </div>
                            <div className="border-bottom py-3">
                                <h3 className="price"> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(products?.price)}</h3>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={products?.totalrating}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <p className='mb-0 t-review'>( 2 Reviews )</p>
                                </div>

                            </div>
                            <div className="border-bottom py-3">
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h6 className='mb-0 product-heading me-3'>Type: </h6>
                                    <p className='mb-0 product-data'>{products?.category}</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h6 className='mb-0 product-heading me-3'>Brand:</h6>
                                    <p className='mb-0 product-data'>{products?.brand}</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h6 className='mb-0 product-heading me-3'>Category:</h6>
                                    <p className='mb-0 product-data'>{products?.category}</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h6 className='mb-0 product-heading me-3'>Tags:</h6>
                                    <p className='mb-0 product-data'>{products?.tags}</p>
                                </div>

                                <div className="my-3">
                                    <h6 className='mb-2  product-heading'>Mô tả sản phẩm</h6>
                                    <p className='mb-0 product-data'>
                                        <ProductDescription description={products?.description} />
                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <h6 className='me-3'>Chọn size</h6>
                                    <select
                                        className="form-select"
                                        style={{ width: "100px" }}
                                        aria-label="Default select example"
                                        onChange={(e) => setSizeValue(e.target.value)}
                                    >
                                        {
                                            products?.sizes?.map((e, index) => (
                                                <option key={index} value={e}>{e}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="d-flex gap-10 flex-row align-items-center gap-15 my-2">
                                    <input
                                        type="number"
                                        name=""
                                        id=""
                                        min={1}
                                        value={count}
                                        className=''
                                        onChange={(e) => setCount(e.target.value)}
                                    />
                                </div>

                                <button className='btn btn-primary' onClick={() => handleAddToCart()}>
                                    {/* {alrealAdd ? "Quay về giỏ hàng": "Thêm vào giỏ hàng"} */}
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <h4 id='review' >ĐÁNH GIÁ</h4>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div className="">
                                    <div className="d-flex gap-10 align-items-center">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={5}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className='mb-0'>Có 2 đánh giá</p>
                                    </div>
                                </div>
                            </div>
                            <div className="review-form py-4">
                                <h4>Viết đánh giá</h4>
                                <form action="" className='d-flex flex-column gap-20' onSubmit={handleSubmit}>
                                    <div className="">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={count}
                                            edit={true}
                                            activeColor="#ffd700"
                                            onChange={(e) => setCount(e)}
                                        />
                                    </div>
                                    <div className="m-2">
                                        <textarea
                                            placeholder='Comments'
                                            name=""
                                            id=""
                                            className='w-100 form-control'
                                            cols="30"
                                            rows="4"
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="d-flex justify-content-end mt-3">
                                        <button className='button w-25' type='submit'>
                                            Gửi
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="reviews mt-4">
                                <div className="review">
                                    <h4>Danh sách đánh giá</h4>
                                    {
                                        products && products?.ratings?.map((e, index) => (
                                            <div key={index}>
                                                <div className="d-flex gap-10 align-items-center">
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        value={e?.star}
                                                        edit={false}
                                                        activeColor="#ffd700"
                                                    />
                                                </div>
                                                <p className='mt-3'>{e?.comment}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="py-5">
                        <h5>Sản phẩm liên quan</h5>
                    </div>
                    <div className="d-flex align-items-center gap-30">
                        {
                            pr?.length > 0 ? pr?.map((e, index) => (
                                <Product key={index} product={e} />
                            )) : (
                                <div className="text-center py-4">
                                    <p>Không có sản phẩm liên quan </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>

        </>
    );
}

export default ProductDetail;
