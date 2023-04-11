import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import './card.css'

function Card(props) {

    return (
        <div className="card p-4 shadow h-100">
            <div className="card-wrapper d-flex flex-column h-100">
                <div className="card-image">
                    <img src={props.children.image} alt="" />
                </div>
                <div className="card-title">
                    <h3 className="pe-5 d-block">{props.children.name}</h3>
                    <div className="card-cost fs-7 text-success">
                        <p className="text-end">{new Intl.NumberFormat().format(props.children.price)} VNĐ/ngày</p>
                    </div>
                </div>
                <div className="card-button mt-auto">
                    <Link to={`detail/${props.children._id}`}>
                        <Button variant='success' className='fw-bold w-100'>Chi tiết</Button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Card