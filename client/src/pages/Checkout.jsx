import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Paypal from '../components/Paypal';
import { getCart } from '../features/users/userSlice';
const Checkout = () => {
    const dispatch = useDispatch()
    const cartState = useSelector(state => state.auth?.cartUser)

    const [totalAmount, setTotalAmount] = useState(null)
    const [shippingInfo, setShippingInfo] = useState(null)
    const [touch, setTouch] = useState(false)
    useEffect(() => {
        dispatch(getCart())
    }, [])
    useEffect(() => {
        let sum = 0
        for (let i = 0; i < cartState?.length; i++) {
            sum += (Number(cartState[i]?.quantity * cartState[i]?.price))
            setTotalAmount(sum)
        }
    }, [cartState])

    let userSchema = Yup.object().shape({
        name: Yup.string().required('firstName is Required'),
        email: Yup.string().required('firstName is Required'),
        address: Yup.string().required('address is Required'),
        mobile: Yup.string().required('address is Required'),
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            address: "",
            mobile: "",
        },
        validationSchema: userSchema,
        onSubmit: values => {
            setShippingInfo(values)
        },
    });

    return (
        <>
            <section class="container py-5">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h4 className='mb-3'>Điền thông tin</h4>
                            <form onSubmit={formik.handleSubmit} className='d-flex gap-15 flex-wrap justify-content-between' action="">
                                <div className="w-100">
                                    <input
                                        type="text"
                                        placeholder='Nhập tên ...'
                                        name=""
                                        className='form-control'
                                        id=""
                                        onChange={formik.handleChange("name")}
                                        onBlur={formik.handleBlur("name")}
                                        value={formik.values.name}
                                    />
                                    <div className="error">
                                        {formik.touched.name && formik.errors.name ? (
                                            <div>{formik.errors.name}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="email"
                                        placeholder='Nhập Email ...'
                                        name=""
                                        className='form-control'
                                        id=""
                                        onChange={formik.handleChange("email")}
                                        onBlur={formik.handleBlur("email")}
                                        value={formik.values.email}
                                    />
                                    <div className="error">
                                        {formik.touched.email && formik.errors.email ? (
                                            <div>{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text" name=""
                                        placeholder='Nhập địa chỉ'
                                        className='form-control'
                                        id=""
                                        onChange={formik.handleChange("address")}
                                        onBlur={formik.handleBlur("address")}
                                        value={formik.values.address}
                                    />
                                    <div className="error">
                                        {formik.touched.address && formik.errors.address ? (
                                            <div>{formik.errors.address}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        name=""
                                        placeholder='Nhập số điện thoại'
                                        className='form-control'
                                        id=""
                                        onChange={formik.handleChange("mobile")}
                                        onBlur={formik.handleBlur("mobile")}
                                        value={formik.values.mobile}
                                    />
                                    <div className="error">
                                        {formik.touched.mobile && formik.errors.mobile ? (
                                            <div>{formik.errors.mobile}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <div className="d-flex mb-4 align-items-center justify-content-between">
                                        <Link className='text-dark' to='/cart'><IoMdArrowBack className='me-2' />
                                            Quay về giỏ hàng
                                        </Link>

                                        <button className='btn btn-primary' type="submit" onClick={() => {
                                            setTouch(true)
                                        }}>Đặt hàng</button>
                                    </div>
                                    {
                                        touch == true && (
                                            <div className='mt-4'>
                                                <Paypal amount={totalAmount + 5} payload={{
                                                    shippingInfo: shippingInfo,
                                                    orderItems: cartState, totalPrice: totalAmount + 5
                                                }} />
                                            </div>
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            {
                                cartState && cartState?.map((e, index) => (
                                    <div key={index} className="d-flex gap-10 mb-2 align-items-center">
                                        <div className="w-75 d-flex align-items-center gap-15">
                                            <div className="w-30 position-relative">
                                                <span style={{ top: "-10px", right: "0px", padding: "6px 9px" }}
                                                    className='badge bg-secondary position-absolute text-white rounded-circle'>
                                                    {e?.quantity ? e?.quantity : 0}
                                                </span>
                                                <img className='img-fluid'
                                                    width={80} src={e?.productId?.images[0]?.url}
                                                    alt="Product" />
                                            </div>
                                            <div className="w-50" style={{ paddingLeft: "12px" }}>
                                                <h6 className="total-price" style={{ fontSize: "13px" }}>{e?.productId?.title}</h6>
                                                <p className="total-price">
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.price)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 w-20">
                                            <h5 className='total'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.price * e?.quantity)}
                                            </h5>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='total'>Tạm tính :</p>
                                <p className='total-price'>
                                    {totalAmount ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount) : 0}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='mb-0 total'>Phí Ship:</p>
                                <p className='mb-0 total-price'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(20000)}
                                </p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                            <h4 className='total'>Tổng tiền:</h4>
                            <h5 className='total-price'>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount + 20000)}
                            </h5>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Checkout;
