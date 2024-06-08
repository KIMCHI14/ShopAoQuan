import React from 'react';
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithub, FaYoutube, FaInstagram, } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className='text-dark'>
            <footer className="" style={{ background: "#f3f3f3" }}>
                <div className="container py-4">
                    <div className="d-flex align-items-center justify-content-start">
                        <FaPhoneAlt className='me-2' />
                        <span className='me-2'>Hỗ trợ</span>
                        <span className='me-2'>/ Mua hàng:</span>
                        <span style={{ color: "red", fontWeight: "600" }}> 0933 800 190</span>
                    </div>
                </div>
            </footer>
            <footer className='py-3'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-4">
                            <h4 className='text-dark mb-4'>Contact Us</h4>
                            <div className="">
                                <address className='text-dark fs-6'>
                                    Hno: 277 Near Vill chopal, <br /> Sonipat, Haryna <br />
                                    Pincode: 131103
                                </address>
                                <a href="tel:+84 379661878" className='mt-3 d-block mb-1 text-dark'>tel:+84 379661878</a>
                                <a href="Email: minmaxtuan@gmail.com" className='mt-2 d-block mb-0 text-dark'>minmaxtuan@gmail.com</a>
                                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                                    <a className='text-dark' href="#">
                                        <FaLinkedin className='fs-4' />
                                    </a>
                                    <a className='text-dark' href="#">
                                        <FaInstagram className='fs-4' />
                                    </a>
                                    <a className='text-dark' href="#">
                                        <FaGithub className='fs-4' />
                                    </a>
                                    <a className='text-dark' href="#">
                                        <FaYoutube className='fs-4' />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className='text-dark mb-4'>Infomation</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link to='/privacy-policy' className='text-dark py-2 mb-1'>Privacy Policy</Link>
                                <Link to='/refund-policy' className='text-dark py-2 mb-1'>Refund Policy</Link>
                                <Link to='/shipping-policy' className='text-dark py-2 mb-1'>Shipping Policy</Link>
                                <Link to='/term-conditions' className='text-dark py-2 mb-1'>Terms & Conditions</Link>
                                <Link to='/blogs' className='text-dark py-2 mb-1'>Blogs</Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <h4 className='text-dark mb-4'>Account</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className='text-dark py-2 mb-1'>About Us</Link>
                                <Link className='text-dark py-2 mb-1'>Faq</Link>
                                <Link className='text-dark py-2 mb-1'>Contact</Link>
                            </div>
                        </div>
                        <div className="col-2">
                            <h4 className='text-dark mb-4'>Quick Links</h4>
                            <div className="footer-links d-flex flex-column">
                                <Link className='text-dark py-2 mb-1'>Laptops</Link>
                                <Link className='text-dark py-2 mb-1'>HeadPhones</Link>
                                <Link className='text-dark py-2 mb-1'>Tablets</Link>
                                <Link className='text-dark py-2 mb-1'>Watch</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className='py-4' style={{ borderTop: "1px solid #ccc" }}>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <p className='text-center mb-0'>
                                &copy;{new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </footer>
    );
}

export default Footer;
