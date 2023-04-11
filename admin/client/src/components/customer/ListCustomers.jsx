import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from '../table/Table'
import Button from 'react-bootstrap/Button'
import { useStore, actions } from "../../store";
import { URL_BACKEND } from '../../store/actions/constants'
// import customerList from '../../assets/JsonData/customers-list.json'

const customerTableHead = [
    'fullname',
    'email',
    'phone',
    'address',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

function ListCustomers() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const data = axios.get(URL_BACKEND + "/api/staff/customers")
            .then((response) =>
                response.data
            ).then(data => {
                console.log(data.customer)
                setUsers(data.customer)
            })
    }, [])


    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.fullname}</td>
            <td>{item.email}</td>
            <td>{item.phone_number}</td>
            <td>{item.address}</td>
            {/* <td>
                <Link to={`delete/` + item.id}>
                    <Button variant="danger" className='me-2' onClick={() => handleDelete(item.id)}>Delete</Button>
                </Link>
                <Link to={`/customers/` + item.id}>
                    <Button variant="success">Detail</Button>
                </Link>
            </td> */}
        </tr>
    )

    return (
        <div>
            <h2 className="page-header">
                customers
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                // limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={users}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                            {/* {
                                open && <ModalEdit
                                    dataUserEdit={dataUserEdit}
                                    users={users}
                                    callback={callback}
                                />
                            } */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCustomers