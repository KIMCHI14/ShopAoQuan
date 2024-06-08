import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePrCart, getCart, updateQuantity } from '../features/users/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

export default function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cartState = useSelector(state => state.auth?.cartUser)

    const userState = useSelector(state => state.auth.user)

    const [totalAmount, setTotalAmount] = useState(null)
    const [productUpdateDetail, setProductUpdateDetail] = useState(null)
    const cartItems = JSON.parse(localStorage.getItem("carts"));
    const [updatedCartItems, setUpdatedCartItems] = useState(cartItems);

    useEffect(() => {
        // setUpdatedCartItems(cartItems);
    }, [cartItems?.length]);

    useEffect(() => {
        dispatch(getCart())
    }, [userState])
    useEffect(() => {
        if (productUpdateDetail !== null) {
            let cartDetail = { cartItemId: productUpdateDetail?.cartItemId, newQuantity: productUpdateDetail?.quantity }
            dispatch(updateQuantity(cartDetail))
            setTimeout(() => {
                dispatch(getCart())
            }, 300)
        }
    }, [productUpdateDetail])
    const deleteCartItem = (cartItemId) => {
        const updatedCartItems = cartItems?.filter(item => item?.productId._id !== cartItemId);
        console.log(updatedCartItems)
        if (updatedCartItems?.length < 1) {
            localStorage.removeItem('carts');
            window.location.reload()
        } else {
            localStorage.setItem("carts", JSON.stringify(updatedCartItems));
            window.location.reload()
        }
    };

    const deleteCart = (cartItemId) => {
        dispatch(deletePrCart(cartItemId))
        setTimeout(() => {
            dispatch(getCart())
        }, 100)
    }
    const cong = (id) => {
        if (!cartItems || !Array.isArray(cartItems)) {
            console.error("cartItems is not valid");
            return;
        }
        // Tạo một bản sao của mảng cartItems để thay đổi
        const updatedCartItems = [...cartItems];

        // Tìm kiếm và cập nhật số lượng của sản phẩm với id tương ứng
        for (let i = 0; i < updatedCartItems.length; i++) {
            if (updatedCartItems[i]?.productId?._id === id) {
                updatedCartItems[i].quantity++; // Tăng số lượng lên 1
            }
        }
        // Lưu cập nhật vào localStorage
        localStorage.setItem("carts", JSON.stringify(updatedCartItems));
        window.location.reload()
    }
    const tru = (id) => {
        if (!cartItems || !Array.isArray(cartItems)) {
            console.error("cartItems is not valid");
            return;
        }
        // Tạo một bản sao của mảng cartItems để thay đổi
        const updatedCartItems = [...cartItems];

        // Tìm kiếm và cập nhật số lượng của sản phẩm với id tương ứng
        for (let i = 0; i < updatedCartItems.length; i++) {
            if (updatedCartItems[i]?.productId?._id === id) {
                if (updatedCartItems[i].quantity > 1) {
                    updatedCartItems[i].quantity--; // Giảm số lượng đi 1
                } else {
                    // Nếu số lượng đã là 1, không cần giảm nữa
                    console.warn("Cannot decrease quantity below 1.");
                }
            }
        }
        // Lưu cập nhật vào localStorage
        localStorage.setItem("carts", JSON.stringify(updatedCartItems));
        window.location.reload()
    }
    useEffect(() => {
        let sum = 0
        for (let i = 0; i < cartState?.length; i++) {
            sum += (Number(cartState[i]?.quantity * cartState[i]?.price))
        }
        if (cartState?.length === 0 && cartItems?.length > 0) {
            for (let i = 0; i < cartItems?.length; i++) {
                sum += (Number(cartItems[i]?.quantity * cartItems[i]?.price))
            }
        }
        setTotalAmount(sum)
    }, [cartState, cartItems])

    return (
        <div className='container' style={{ marginBottom: "150px" }}>
            <div className="row">
                <div className="col-12">
                    <h3 className='text-center py-5'>GIỎ HÀNG</h3>
                </div>
                <div className="col-12">
                    <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                        <h4 className='cart-col-1'>Sản phẩm</h4>
                        <h4 className='cart-col-2'>Giá tiền</h4>
                        <h4 className='cart-col-3'>Số lượng</h4>
                        <h4 className='cart-col-4'>Tổng tiền</h4>
                    </div>
                    {
                        cartState?.length > 0 && cartState?.map((e, index) => (
                            <div key={index} className="cart-data py-3 d-flex justify-content-between align-items-center">
                                <div className="cart-col-1 gap-15 d-flex align-items-center">
                                    <div className="w-25">
                                        <img src={e?.productId?.images[0]?.url} width={80} className='img-fluid' alt="product img" />
                                    </div>
                                    <div className="w-75">
                                        <p >{e?.productId?.title}</p>

                                        <p >Size: {e?.size}</p>
                                    </div>
                                </div>
                                <div className="cart-col-2 gap-15">
                                    <h5 className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.price)} VNĐ</h5>
                                </div>
                                <div className="cart-col-3 gap-15 d-flex align-items-center">
                                    <div className="">
                                        <input
                                            type="number"
                                            name=""
                                            id=""
                                            min={1}
                                            value={e?.quantity}
                                            onChange={(c) => setProductUpdateDetail({ cartItemId: e?._id, quantity: c.target.value })}
                                        />
                                    </div>
                                    <div className="">
                                        <MdDelete className='text-danger fs-5 '
                                            onClick={() => { deleteCart(e?._id) }}
                                        />
                                    </div>
                                </div>
                                <div className="cart-col-4">
                                    <h5 className="total"> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.price * e?.quantity)}</h5>
                                </div>
                            </div>
                        ))
                    }
                    {
                        updatedCartItems?.length > 0 && updatedCartItems?.map((e, index) => (
                            <div key={index} className="cart-data py-3 d-flex justify-content-between align-items-center">
                                <div className="cart-col-1 gap-15 d-flex align-items-center">
                                    <div className="w-25">
                                        <img src={e?.productId?.images[0]?.url} width={80} className='img-fluid' alt="product img" />
                                    </div>
                                    <div className="w-75">
                                        <p >{e?.productId?.title}</p>

                                        <p >Size: {e?.size}</p>
                                    </div>
                                </div>
                                <div className="cart-col-2 gap-15">
                                    <h5 className="price">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.price)}</h5>
                                </div>
                                <div className="cart-col-3 gap-15 d-flex align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="tru" onClick={() => tru(e?.productId?._id)}>-</div>
                                        <div className="number">{e?.quantity}</div>
                                        <div className="cong" onClick={() => cong(e?.productId?._id)}>+</div>
                                    </div>
                                    <div className="">
                                        <MdDelete className='text-danger fs-5 '
                                            onClick={() => { deleteCartItem(e?.productId?._id) }}
                                        />
                                    </div>
                                </div>
                                <div className="cart-col-4">
                                    <h5 className="total">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.price * e?.quantity)}</h5>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-12 py-2 mt-4">
                    <div className="d-flex justify-content-between align-items-baseline">
                        <Link className='btn btn-primary' to='/'>Tiếp tục mua hàng</Link>

                        {
                            (totalAmount !== null || totalAmount !== 0) && (
                                <div className="d-flex flex-column align-items-end">
                                    <h4 className=''>Tổng tiền tạm tính
                                        <span className=''>
                                            : {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                                        </span>
                                    </h4>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <Link className='btn btn-primary' to='/checkout'>Thanh toán</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
