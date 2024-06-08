import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../features/products/productSlice';

export default function HomeProduct() {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({ priceRange: '', name: '' });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        dispatch(getAllProduct());
        window.scroll(0, 0)
    }, [dispatch]);

    const productState = useSelector(state => state?.product?.products);
    const categories = [...new Set(productState && productState?.map(product => product.category))]; // Get unique categories

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            [name]: value,
        }));
    };

    const handlePriceRangeChange = (e) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            priceRange: e.target.value,
        }));
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategories(prevSelected =>
            prevSelected.includes(value)
                ? prevSelected.filter(category => category !== value)
                : [...prevSelected, value]
        );
    };

    const priceRanges = [
        { label: 'Tất cả', value: '' },
        { label: 'Dưới 1 triệu', value: '0-1000000' },
        { label: '1 triệu - 5 triệu', value: '1000000-5000000' },
        { label: '5 triệu - 10 triệu', value: '5000000-10000000' },
        { label: 'Trên 10 triệu', value: '10000000-' },
    ];

    const filterProducts = (products) => {
        let filtered = products && products?.filter(product => {
            const matchesName = product.title.toLowerCase().includes(filter.name.toLowerCase());
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);

            let matchesPrice = true;
            if (filter.priceRange) {
                const [minPrice, maxPrice] = filter.priceRange.split('-').map(p => parseFloat(p));
                matchesPrice = product.price >= minPrice && (isNaN(maxPrice) || product.price <= maxPrice);
            }

            return matchesPrice && matchesName && matchesCategory;
        });

        if (sortOrder === 'asc') {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            filtered = filtered.sort((a, b) => b.price - a.price);
        }

        return filtered;
    };

    const filteredProducts = filterProducts(productState);

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-2">
                    <h4 className='my-4'>Lọc sản phẩm</h4>
                    <div>
                        <h6 className="mb-2">Tên sản phẩm</h6>
                        <input
                            type="text"
                            name="name"
                            placeholder="Filter by name"
                            value={filter.name}
                            onChange={handleFilterChange}
                            className="form-control mb-3"
                        />
                    </div>
                    <div>
                        <h6 className="mb-2">Giá tiền</h6>
                        {priceRanges.map(range => (
                            <div key={range.value} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="priceRange"
                                    value={range.value}
                                    checked={filter.priceRange === range.value}
                                    onChange={handlePriceRangeChange}
                                />
                                <label className="form-check-label">
                                    {range.label}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h6 className="mb-2">Danh mục</h6>
                        {categories.map(category => (
                            <div key={category} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={category}
                                    checked={selectedCategories.includes(category)}
                                    onChange={handleCategoryChange}
                                />
                                <label className="form-check-label">
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-10">
                    <div className="filter-sort-grid mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-10">
                                <p className='mb-0 d-block' style={{ width: "100px" }}>Lọc theo:</p>
                                <select
                                    name="sort_by"
                                    className='form-control form-select'
                                    value={sortOrder}
                                    onChange={handleSortOrderChange}
                                >
                                    <option value="">Mặc định</option>
                                    <option value="asc">Giá thấp đến cao</option>
                                    <option value="desc">Giá cao đến thấp</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-center gap-10 grid">
                                <p className="totalproducts mb-0">{filteredProducts?.length} Sản phẩm</p>
                            </div>
                        </div>
                    </div>
                    <div className="products-list pd-5">
                        <div className="d-flex gap-10 flex-wrap justify-content-between">
                            {filteredProducts && filteredProducts.map((e, index) => (
                                <Product product={e} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
