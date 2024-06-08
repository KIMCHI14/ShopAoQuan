import React from 'react';
import { FaHome } from "react-icons/fa";
import { IoIosCall, IoIosMail, IoMdInformationCircleOutline } from "react-icons/io";
const Contact = () => {

    return (
        <>
            <section class="container py-5">
                <div className="row">
                    <div className="col-12">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31352.804492545703!2d106.6195895!3d10.8036096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1717330198846!5m2!1svi!2s"
                            width="600" className='border-0 w-100' height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                    </div>
                    <div className="col-12 mt-5">
                        <div className="contact-inner-wrapper d-flex justify-content-between">
                            <div className="">
                                <h3 className="contact-title mb-4">
                                    Địa chỉ của chúng tôi
                                </h3>
                                <div className="">
                                    <ul className="list-title ps-0">
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <FaHome className='fs-5 me-2' />
                                            <address className='mb-0'>TP - HCM</address>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <IoIosCall className='fs-5 me-2' />
                                            <a href="tel: +84 379661878">Tel: +84 379661878 </a>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <IoIosMail className='fs-5 me-2' />
                                            <a href="Email : Minmaxtuan@gmail.com">Email : kimchi@gmail.com</a>
                                        </li>
                                        <li className='mb-3 d-flex gap-15 align-items-center'>
                                            <IoMdInformationCircleOutline className='fs-5 me-2' />
                                            <p className='mb-0'>6/1/2025 - 10 Giờ</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;
