import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Table from '../table/Table'
import Button from 'react-bootstrap/Button'
import Badge from '../badge/Badge'
import { useStore, actions } from "../../store";
// import listOwners from '../../assets/JsonData/owner-list.json'

import { URL_BACKEND } from '../../store/actions/constants'

const ownerTableHead = [
    'User Name',
    'Email',
    'Phone Number',
    'Address',
]

const ownerStatus = {
    'PENDING': "warning",
    'WAITING UPDATE': "primary",
    'VERIFIED': "success",
}

const renderHead = (item, index) => <th key={index}>{item}</th>

function ListOwner() {
    // const [state, dispatch] = useStore()
    // const listOwners = state.owners 

    const [owners, setOwners] = useState([])


    useEffect(() => {
        axios.get(URL_BACKEND + "/api/staff/carowner")
            .then((response) =>
                response.data
            ).then(data => {
                setOwners(data.owner)
            })
        // axios.get("../../api/owner-document.json")
        //     .then((response) =>
        //         response.data
        //     ).then(data => {

        //         dispatch(actions.setOwnersDocument(data))
        //     })

        // axios.get("../../api/car-list-owner.json")
        //     .then((response) =>
        //         response.data
        //     ).then(data => {
        //         dispatch(actions.setOwnersCar(data))
        //     })
    }, [])

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.fullname}</td>
            <td>{item.email}</td>
            <td>{item.phone_number}</td>
            <td>{item.address}</td>
        </tr>
    )
    return (
        <div>
            <h2 className="page-header">
                Owners Car
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                // limit='10'
                                headData={ownerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={owners}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListOwner