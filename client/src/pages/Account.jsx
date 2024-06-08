import React from 'react'
import { useSelector } from 'react-redux'
// import Breadcrumd from '../components/Breadcrumd'

export default function Account() {
    const userState = useSelector(state => state.auth.user)
    return (
        <>
            {/* <Breadcrumd title="Tài khoản của bạn"/> */}
            <div className='container py-5'>
                <h3>TÀI KHOẢN CỦA BẠN</h3>
                <div className="py-3">
                    <p>Tên : {userState?.name}</p>
                    <p>Email : {userState?.email}</p>
                    <p>Địa chỉ : {userState?.address}</p>
                    {/* <p>Số điện thoại : {userState?.mobile}</p> */}
                </div>
            </div>
        </>
    )
}
