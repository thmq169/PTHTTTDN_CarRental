import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
function Footer() {
    return (
        <div className="bg-dark">
            <div className="container footer">
                <div className="row">
                    <div className="col col-8 col-md-6 col-sm-12 text-light">
                        <div className="footer-column text-light">
                            <Link to="/" className="footer-logo logo">
                                HiringCar
                            </Link>
                            <p className="footer-description">
                                Công ty cổ phần Hiring Car là công ty cho thuê xe tự lái tại Việt Nam
                            </p>
                            <p className="footer-description">
                                Địa chỉ: Số 19, Nguyễn Hữu Thọ, phường Tân Phong, Quận 7, TP Hồ Chí Minh, Việt Nam
                            </p>
                            <p className="footer-description">
                                Email: hiringcar@gmail.com
                            </p>
                            <p className="footer-description">
                                Tổng đài: 0987654321
                            </p>
                            <ul className="footer-social text-light">
                                <li className="footer-social-items">
                                    <Link to="https://www.facebook.com/"><i className='bx bxl-facebook-circle'></i></Link>
                                </li>
                                <li className="footer-social-items"> <Link to="https://www.twitter.com/"><i className='bx bxl-twitter'></i></Link></li>
                                <li className="footer-social-items"> <Link to="https://www.youtube.com/"><i className='bx bxl-youtube' ></i></Link> </li>
                            </ul>

                        </div>
                    </div>
                    <div className="col col-4 col-md-6 col-sm-12 text-light">
                        <div className="footer-column">
                            <h6 className="footer-contact-title">
                                Đăng kí nhận tin
                            </h6>
                            <p className="footer-description">
                                Hãy đăng ký với chúng tôi để cập nhật thông tin mới nhất, thông tin khuyến mãi, các sản phẩm xe mới hoặc các sự kiện miễn phí
                            </p>
                            <div className="footer-submit-form d-flex">
                                <input className="input rounded" type="email" placeholder="Nhập địa chỉ email..." />
                                <button type="submit" className="btn btn-success ms-2 ">Theo dõi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer