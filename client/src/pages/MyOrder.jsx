import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyorder } from '../features/users/userSlice';
import { Table } from 'antd';
// import Breadcrumd from '../components/Breadcrumd';

export default function MyOrder() {
    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalprice',
        },
        {
            title: "Phương thức đặt hàng",
            dataIndex: 'paymentMethod',
        },
        {
            title: "Trạng thái",
            dataIndex: 'status',
        }
    ];
    const dispath = useDispatch()

    useEffect(() => {
        dispath(getMyorder())
    }, [])
    const orderState = useSelector(state => state?.auth?.myOrder?.orders)
    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
        data1.push({
            key: i + 1,
            products: (
                orderState[i]?.orderItems && orderState[i]?.orderItems?.map((e, index) => (
                    <div key={index} className='mb-4'>
                        <p>Tên sản phẩm : {e?.productId?.title}</p>
                        <p>Số lượng đặt hàng : {e?.productId?.quantity}</p>
                        <p>Giá : {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.price)}
                        </p>
                    </div>
                ))
            ),
            totalprice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderState[i]?.totalPrice),
            paymentMethod: (
                <>
                    <p className='mb-0'>{orderState[i]?.paymentMethod}</p>
                </>
            ),
            status: (
                <>
                    <p className='mb-0'>{orderState[i]?.status}</p>
                </>
            ),
        });
    }
    return (
        <>
            {/* <Breadcrumd title="Đơn hàng của bạn"/> */}
            <div className='container py-4'>
                <h3 className='mb-4 title'>
                    ĐƠN HÀNG CỦA TÔI
                </h3>
                <div className="">
                    <Table className='d-flex flex-column gap-3' columns={columns} dataSource={data1} />
                </div>
            </div>
        </>
    )
}
