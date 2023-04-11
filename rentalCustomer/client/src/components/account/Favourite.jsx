import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AccountContext } from '../../contexts/AccountContext'
import { MessageContext } from '../../contexts/MessageContext'

import Button from 'react-bootstrap/Button'

function Favourite() {


    const { accountState, updateWishlist } = useContext(AccountContext)
    const { notifyMessage } = useContext(MessageContext)

    const handleUpdateWishlist = async (id_car) => {
        await updateWishlist(id_car)
        notifyMessage('success', 'cập nhật danh sách yêu tích thành công')
    }

    return (
        <div className=" border rounded p-4 shadow">
            <h2 className="section-title mb-4">Danh Sách Yêu Thích</h2>
            <table className='w-100 table-profile'>
                <thead>
                    <tr>
                        <th>Tên Xe</th>
                        <th>Giá thuê</th>
                        <th>Loại</th>
                        <th>Tình trạng</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        accountState.wishlist && (
                            accountState.wishlist.cars.map((favorite, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{favorite.name}</td>
                                        <td>{new Intl.NumberFormat().format(favorite.price)} VNĐ/ngày</td>
                                        <td>{favorite.type}</td>
                                        <td>{favorite.rental_status}</td>
                                        <td>
                                            <Link to={'/detail/' + favorite._id} className="btn btn-success my-3">
                                                Xem chi tiết
                                            </Link>
                                        </td>
                                        {
                                            !accountState.accountLoading && (
                                                <td>
                                                    <Button onClick={() => handleUpdateWishlist(favorite._id)} className="btn btn-danger my-3">
                                                        Xóa
                                                    </Button>
                                                </td>
                                            )
                                        }

                                        {
                                            accountState.accountLoading && (
                                                <td>
                                                    <Button onClick={() => handleUpdateWishlist(favorite._id)} disabled className="btn btn-danger my-3">
                                                        Loading
                                                    </Button>
                                                </td>
                                            )
                                        }

                                    </tr>
                                )
                            })
                        )
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Favourite