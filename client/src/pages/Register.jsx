import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../features/users/userSlice';
export default function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let userSchema = Yup.object().shape({
        name: Yup.string().required('Yêu cầu nhập tên'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        email: Yup.string().email('Email should be valid').required('Yêu cầu nhập địa chỉ email'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        address: Yup.string().required('Yêu cầu nhập địa chỉ'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        password: Yup.string().required('Yêu cầu nhập mật khẩu')
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            address: ""
        },
        validationSchema: userSchema,
        onSubmit: values => {
            console.log(values)
            dispatch(register(values))
            navigate('/login')
        },
    });
    return (
        <div className='container'>
            <div className="login mt-4 mb-4">
                <h5 className='py-4 text-center'>ĐĂNG KÝ</h5>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="">
                        <input
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange("name")}
                            onBlur={formik.handleBlur("name")}
                            placeholder="Nhập tên của bạn"
                            className="form-control" />
                    </div>
                    <div className="error">
                        {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="mt-3">
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")}
                            placeholder="Nhập địa chỉ email"
                            className="form-control" />
                    </div>
                    <div className="error">
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mt-3">
                        <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange("password")}
                            onBlur={formik.handleBlur("password")}
                            placeholder="Nhập mật khẩu"
                            className="form-control" />
                    </div>
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="mt-3">
                        <input
                            type="text"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange("address")}
                            onBlur={formik.handleBlur("address")}
                            placeholder="Nhập địa chỉ giao hàng"
                            className="form-control" />
                    </div>
                    <div className="error">
                        {formik.touched.address && formik.errors.address ? (
                            <div>{formik.errors.address}</div>
                        ) : null}
                    </div>
                    <div className="mt-3">
                        <div className="mt-3 d-flex justify-content-between gap-15 align-items-center">
                            <button className='btn btn-primary' type='submit'>Đăng ký</button>
                            <Link to='/login'>Đăng nhập</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
