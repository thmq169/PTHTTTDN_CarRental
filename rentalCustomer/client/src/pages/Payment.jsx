import React from 'react'

function Payment({ invoiceInfo }) {
    return (
        <>
            <h2 className="section-title mb-4">Thông tin thanh toán</h2>
            <div className="profile-detail rounded p-4 fs-5 d-flex ">
                <div className="m-auto">
                    <p className='text-center'>Quý khách vui lòng chuyển khoản để hoàn thành việc thuê xe</p>
                    <p className='text-center'>Thông tin tài khoản chuyển khoản</p>
                    <p className='text-center'>Số tài khoản:  <strong>7411205147773</strong></p>
                    <p className='text-center'>Ngân hàng:  <strong>Agribank</strong></p>
                    <p className='text-center'>Nội dung chuyển khoản:  <strong>Thanh toán hóa đơn thuê {invoiceInfo.paymentCode}</strong></p>
                    <p className='text-center'>Số tiền:  <strong> {new Intl.NumberFormat().format(invoiceInfo.paymentTotal)} VNĐ</strong></p>
                </div>
            </div>
        </>
    )
}

export default Payment