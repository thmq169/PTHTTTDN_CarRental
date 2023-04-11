import React, { useEffect, useContext, useState } from 'react'
import { CarContext } from '../contexts/CarContext'
import { AuthContext } from '../contexts/AuthContext'
import { AccountContext } from '../contexts/AccountContext'
import { MessageContext } from '../contexts/MessageContext'
import { useParams } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router-dom'

import isFavouriteCar from '../utils/isFavouriteCar'
import Button from 'react-bootstrap/Button'
import RentingForm from '../components/rentingForm/RentingForm'

function Detail() {
    const { carState: { car, carsLoading, dayRentalOfCar }, getCar }
        = useContext(CarContext)

    const { accountState: { wishlist, accountLoading }, updateWishlist }
        = useContext(AccountContext)

    const { notifyMessage } = useContext(MessageContext)

    const { id } = useParams();
    const [isFavourite, setIsFavourite] = useState(isFavouriteCar(wishlist.cars, id)) 

    useEffect(() => {
        getCar(id)
        setIsFavourite(isFavouriteCar(wishlist.cars, id))
    }, [id])

    
    useEffect(() => {
        setIsFavourite(isFavouriteCar(wishlist.cars, id))
    }, [wishlist])

    const handleUpdateWishlist = async (id_car) => {
        await updateWishlist(id_car)
        notifyMessage('success', 'cập nhật danh sách yêu tích thành công')
    }

    return (
        car && (
            <div className='detail pb-5'>
                <div className="detail-title py-5">
                    <h1 className="section-title">
                        {car.name}
                    </h1>
                </div>
                <div className="row">
                    <div className="col col-lg-7 col-md-12 col-sm-12 ">
                        <div className="detail-infor py-5 me-5">
                            <div className="detail-img w-100">
                                <img className="d-block w-100" src={car.image} alt="" />
                            </div>
                            <div className="detail-content">
                                <table className='detail-content-table text-secondary w-100'>
                                    <tbody>
                                        <tr>
                                            <td>Tên xe</td>
                                            <td>{car.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Loại xe</td>
                                            <td>{car.type}</td>
                                        </tr>
                                        <tr>
                                            <td>Hãng xe</td>
                                            <td>{car.manufacturer}</td>
                                        </tr>
                                        <tr>
                                            <td>Giá thuê</td>
                                            <td>{new Intl.NumberFormat().format(car.price)} VNĐ/ngày</td>
                                        </tr>
                                        <tr>
                                            <td>Biển số</td>
                                            <td>{car.license_plates}</td>
                                        </tr>
                                        <tr>
                                            <td>Đặc điểm</td>
                                            <td>
                                                <p>Số ghế: {car.seat}</p>
                                                <p>Truyền động: {car.transmission}</p>
                                                <p>Nhiên liệu: {car.fuel}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            {
                                                !isFavourite && !accountLoading && (
                                                    <Button onClick={() => handleUpdateWishlist(id)} className='my-3 w-100' variant='success' type='button'>Thêm vào yêu thích</Button>
                                                )
                                            }

                                            {
                                                !isFavourite && accountLoading && (
                                                    <Button onClick={() => handleUpdateWishlist(id)} className='my-3 w-100' variant='success' type='button' disabled>Loading</Button>
                                                )
                                            }


                                            {
                                                isFavourite && !accountLoading && (
                                                    <Button onClick={() => handleUpdateWishlist(id)} className='my-3 w-100' variant='danger' type='button'>Xóa khỏi yêu thích</Button>
                                                )
                                            }

                                            {
                                                isFavourite && accountLoading && (
                                                    <Button onClick={() => handleUpdateWishlist(id)} className='my-3 w-100' variant='danger' type='button' disabled>Loading</Button>
                                                )
                                            }   
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-5 col-md-12 col-sm-12">
                        <div className="detail-form border p-4 rounded bg-light text-dark w-100 shadow">
                            <div className="detail-price text-center pb-2">
                                <span className="section-title">{new Intl.NumberFormat().format(car.price)} VNĐ</span><span> / ngày</span>
                            </div>

                            <RentingForm carInfor={{ id, price: car.price, dayRentalOfCar }} />
                        </div>
                    </div>
                </div>
            </div>
        )
    )

}

export default Detail