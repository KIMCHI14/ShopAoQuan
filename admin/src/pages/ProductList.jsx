import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePr, getProducts } from '../features/product/productSlice';
import { toast } from "react-toastify";
const { Search } = Input;

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price.length - b.price.length
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector(state => state.product.products);
  const [searchText, setSearchText] = useState("");

  const handleDeleteProduct = (id) => {
    dispatch(deletePr(id));
    toast.success("Deleted product successfully");
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  }
  const filteredData = productState.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category.toLowerCase().includes(searchText.toLowerCase()) ||
    item.price.toString().includes(searchText.toLowerCase())
  );

  const data1 = [];
  for (let i = 0; i < filteredData.length; i++) {
    const truncatedTitle = filteredData[i].title.length > 20 ? filteredData[i].title.slice(0, 50) + '...' : filteredData[i].title;
    data1.push({
      key: i + 1,
      title: truncatedTitle,
      brand: filteredData[i].brand,
      category: filteredData[i].category,
      price: (
        <>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(filteredData[i].price)}
        </>
      ),
      action: (
        <>
          <Link to={`/admin/update-product/${filteredData[i]._id}`}><FaEdit className='fs-5 text-secondary' /></Link>
          <button
            style={{ border: "none" }}
            className='bg-white'
            onClick={() => handleDeleteProduct(filteredData[i]._id)}>
            <MdDelete className='ms-3 fs-5 text-danger' />
          </button>
        </>
      )
    });
  }

  return (
    <div>
      <h3 className='mb-4 title'>
        Products List
      </h3>
      <div className="row">
        <div className="col-4">
          <button className='btn btn-primary mt-2 mb-2'>
            <Link to='/admin/product' className='text-decoration-none text-white'>
              Add product
            </Link>
          </button>
        </div>
        <div className="col-8">
          <Search
            placeholder="Search product"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="">
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
}

export default ProductList;
