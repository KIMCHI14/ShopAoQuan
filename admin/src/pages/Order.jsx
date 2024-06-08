import React, { useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { getAllOrder, getOrder } from '../features/auth/authSlice';
import { updateOrder } from '../features/order/orderSlice';

const columns = [
    {
        title: 'STT',
        dataIndex: 'key',
    },
    {
        title: 'User',
        dataIndex: 'user',
        sorter: (a, b) => a.title.length - b.title.length
    },
    {
        title: 'Products',
        dataIndex: 'products',
    },
    {
        title: 'Total Price',
        dataIndex: 'totalprice',
    },
    {
        title: "Status",
        dataIndex: 'status',
    },
    {
        title: "Action",
        dataIndex: 'action',
    }
];

const Order = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllOrder())
    }, [])

    const orderState = useSelector(state => state?.auth?.orders)
    const clonedOrders = [...orderState];
    const mapOrder = clonedOrders.slice().reverse();
    const handleOnchangeOrder = (id, e) => {
        const data = { _id: id, status: e.target.value }
        dispatch(updateOrder(data))
        toast.success("Update order success !")
        setTimeout(() => {
            dispatch(getOrder())
        }, 300);
    }
    const data1 = [];
    for (let i = 0; i < mapOrder?.length; i++) {
        data1.push({
            key: i + 1,
            user: (
                <div>
                    <p>Tên : {mapOrder[i]?.shippingInfo?.name}</p>
                    <p>Email : {mapOrder[i]?.shippingInfo?.email}</p>
                    <p>Số điện thoại : {mapOrder[i]?.shippingInfo?.mobile}</p>
                    <p>Địa chỉ : {mapOrder[i]?.shippingInfo?.address}</p>
                </div>
            ),
            products: (
                mapOrder[i]?.orderItems && mapOrder[i]?.orderItems?.map((e, index) => (
                    <div key={index} className='mb-4'>
                        <p>Tên sản phẩm : {e?.productId?.title}</p>
                        <p>Số lượng đặt hàng : {e?.quantity}</p>
                        <p>Giá : {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(e?.productId?.price)}
                        </p>
                    </div>
                ))
            ),

            totalprice: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(mapOrder[i]?.totalPrice),
            status: mapOrder[i]?.orderStatus === "COMPLETED" ?
                (<p className='mb-0'>Đã thanh toán</p>) : (<p>Thanh toán khi nhận hành</p>),
            action: (
                <>
                    <select
                        name=""
                        defaultValue={mapOrder[i]?.status}
                        className='form-control form-select'
                        id=""
                        onChange={(e) => handleOnchangeOrder(mapOrder[i]?._id, e)}
                    >
                        <option value="Đang xử lý">Đang xử lý</option>
                        <option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Giao hàng thành công">Giao hàng thành công</option>
                    </select>
                </>
            ),
        });
    }
    return (
        <div>
            <h3 className='mb-4 title'>
                List Orders
            </h3>
            <div className="">
                <Table className='d-flex flex-column gap-3' columns={columns} dataSource={data1} />
            </div>
        </div>
    );
}

export default Order;
