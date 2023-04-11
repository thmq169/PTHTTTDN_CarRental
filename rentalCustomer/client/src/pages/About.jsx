import React from 'react'

function About() {
    return (
        <div className="about py-4">
            <h1 className="section-title my-5">Giới thiệu</h1>
            <div className="about-content fs-3">
                <p>
                    Công ty cổ phần Hiring Car là công ty cho thuê xe tự lái tại Việt Nam
                </p>
                <p>
                    Người đứng đầu: <b>Nguyễn Nhựt Huy</b>  & <b>Tô Hoàng Minh Quân</b>
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
            </div>
        </div>
    )
}

export default About