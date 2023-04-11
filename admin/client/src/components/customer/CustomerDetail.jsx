import React from 'react'
import './customer.css'

function CustomerDetail({ customer }) {
    return (
        <div>
            <h2 className="page-header">
                customer detail
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Personal ID</td>
                                        <td><input type="text" value={customer.id} readOnly /></td>
                                    </tr>
                                    <tr>
                                        <td>Username</td>
                                        <td>{customer.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Full Name</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{customer.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>{customer.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>{customer.location}</td>
                                    </tr>
                                    <tr>
                                        <td>License ID</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Type</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerDetail