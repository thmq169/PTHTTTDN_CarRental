import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import DetailHistory from './DetailHistory'
import { AccountContext } from '../../contexts/AccountContext'

import moment from 'moment'

function History() {
    const { accountState: { rentalHistory } } = useContext(AccountContext)

    const { code } = useParams()

    console.log(code)

    if (code) {
        return <DetailHistory rentalInvoiceID={code} />
    }

    return (
        rentalHistory && (
            <div className="border rounded p-4 shadow">
                <h2 className="section-title mb-4">Lịch Sử Thuê</h2>
                <table className='w-100 table-profile'>
                    <thead>
                        <tr>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Chung</th>
                            <th>Thanh toán</th>
                            <th>Vận chuyển</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody className=''>
                        {
                            rentalHistory.map((history, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{moment(history.start_day).format('MM/DD/YYYY')}</td>
                                        <td>{moment(history.end_day).format('MM/DD/YYYY')}</td>
                                        <td>{history.general_status}</td>
                                        <td>{history.payment_status}</td>
                                        <td>{history.transportation_status}</td>
                                        <td>
                                            <Link to={'history/' + history._id} >
                                                Xem chi tiết
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        ))
}

export default History