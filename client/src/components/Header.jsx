import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { searchInput } from '../features/products/productSlice';
import { udCartLocal, getCart } from '../features/users/userSlice';
const Header = () => {
	const [searchToggle, setSearchToggle] = useState(true)
	const navigate = useNavigate()
	const [values, setValues] = useState();
	const [user, setUser] = useState("")
	const userState = useSelector(state => state.auth.user)
	const dispath = useDispatch()
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispath(searchInput(values?.keyword))
		navigate('/search')
	};
	const cartState = useSelector(state => state.auth?.cartUser)
	const cartItems = JSON.parse(localStorage.getItem("carts"));
	useEffect(() => {
		setUser(userState)
		try {
			if (cartItems && cartItems.length >= 1) {
				dispath(udCartLocal(cartItems));
			} else {
			}
		} catch (error) {
			console.error('Error updating cart:', error);
		}
	}, [user])
	useEffect(() => {
		dispath(getCart())
	}, [cartState?.length])
	return (
		<>
			<header className="header-container">
				<div className="container-xxl">
					<div className="d-flex align-items-center justify-content-center">
						<div className="">
							<Link to='/'>
								<img
									height="80px"
									src="https://phuongnam24h.com/img_data/images/cac-mau-logo-shop-quan-ao-thoi-trang-dep-va-tinh-te.jpg"
									alt="logo" />
							</Link>
						</div>
						<div className="" style={{ margin: "0 auto" }}>
							{
								searchToggle ? (
									<div className="">
										<ul className='d-flex py-2 align-items-center justify-content-between mb-0'>
											<li className='list-li-header'>
												<Link
													className="fs-5 p-4 pt-2 pb-2 text-dark"
													to="/"
													style={{ fontWeight: "600", cusor: "pointer" }}
												>
													HOME
												</Link>
											</li>
											<li className='list-li-header'>
												<Link
													className="fs-5 p-4 pt-2 pb-2 text-dark"
													to="/products"
													style={{ fontWeight: "600", cusor: "pointer" }}
												>
													PRODUCTS
												</Link>
											</li>
											<li className='list-li-header'>
												<Link
													className="fs-5 p-4 pt-2 pb-2 text-dark"
													to="/contact"
													style={{ fontWeight: "600", cusor: "pointer" }}
												>
													CONTACT
												</Link>
											</li>
											<li className='list-li-header'>
												<Link
													className="fs-5 p-4 pt-2 pb-2 text-dark"
													to="/about"
													style={{ fontWeight: "600", cusor: "pointer" }}
												>
													ABOUT
												</Link>
											</li>
										</ul>
									</div>
								) : (
									<div className="d-flex align-items-center">
										<div className="search">
											<form action="" onSubmit={handleSubmit}>
												<input
													placeholder='Tìm kiếm sản phẩm...'
													type="text"
													className='search_input'
													onChange={(e) => setValues({ ...values, keyword: e.target.value })}
												/>
												<button type="submit">
													<CiSearch className='fs-2 btn-search bg-dark text-white' />
												</button>
											</form>
										</div>
										<IoCloseSharp className='fs-5 btn-close' onClick={() => setSearchToggle(true)} />
									</div>
								)
							}
						</div>
						<div className=" d-flex align-items-center justify-content-between">
							{
								searchToggle && (
									<CiSearch className='fs-2 me-3' onClick={() => setSearchToggle(false)} />
								)
							}
							<Link to='/cart' className="position-relative">
								<HiOutlineShoppingCart className='fs-2 me-3 text-dark' style={{ cursor: "pointer" }} />
								{cartState && cartState.length >= 1 ? (
									<span className="position-absolute length-cart">{cartState.length}</span>
								) : (
									<span className="position-absolute length-cart">{cartItems && cartItems.length ? cartItems.length : "0"}</span>
								)}
							</Link>

							{
								user !== null && (
									<div className="dropdown">
										<button
											className="dropdown-toggle bg-white"
											type="button"
											style={{ border: "none", fontWeight: "600" }}
											data-bs-toggle="dropdown"
											aria-expanded="false">
											{
												user?.name
											}
										</button>
										<ul className="dropdown-menu">
											<li><Link className="dropdown-item" to="/account">Tài khoản</Link></li>
											<li><Link className="dropdown-item" to="/my-order">Đơn hàng của bạn</Link></li>
											<li><a
												className="dropdown-item"
												onClick={() => {
													sessionStorage.clear()
													window.location.reload()
												}}>
												Đăng xuất
											</a></li>
										</ul>
									</div>
								)
							}
							{
								user === null && (
									(
										<Link to='/login'>
											<FaRegUserCircle className='fs-3 text-dark' style={{ cursor: "pointer" }} />
										</Link>
									)
								)
							}
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

export default Header;
