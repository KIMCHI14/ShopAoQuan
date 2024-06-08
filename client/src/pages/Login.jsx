import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../features/users/userSlice';
export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let userSchema = Yup.object().shape({
        email: Yup.string().email('Email should be valid').required('Email không được để trống'), //required là hiển thị dòng lỗi phía dưới của input khi dữ liệu trống
        password: Yup.string().required('Mật khẩu không được để trống')
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: userSchema,
        onSubmit: async values => {
            dispatch(login(values))
        },
    });
    const user = useSelector(state => state.auth?.loginUser)
    useEffect(() => {
        if (user !== "") {
            navigate('/')
            window.location.reload()
        }
        if (user === null) {
            navigate('/login')
        }
    }, [user])
    return (
        <div className='container'>
            <div className="login mt-4 mb-4">
                <h5 className='py-4 text-center'>ĐĂNG NHẬP</h5>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="">
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
                        <div className="mt-3 d-flex justify-content-between gap-15 align-items-center">
                            <button className='btn btn-primary' type='submit'>Đăng nhập</button>
                            <Link to='/register'>Đăng ký</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
