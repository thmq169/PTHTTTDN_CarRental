import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Payment from '../../pages/Payment'
import Login from '../authen/Login'
import Register from '../authen/Register'
import Banner from '../banner/Banner'
import './mainlayout.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

import { useNavigate } from 'react-router-dom'

import { MessageContext } from '../../contexts/MessageContext'
import { RentContext } from '../../contexts/RentContext'

function MainLayout({ props, route }) {
    let body

    const navigate = useNavigate()



    const { messageState: { show, messageType, messageContent }
        , notifyMessage, closeMessage } = useContext(MessageContext)

    const { rentState } = useContext(RentContext)

    useEffect(() => {
        if (rentState.paymentCode === '' && route === 'payment') {
            navigate("/")
        }
    }, [])

    if (route === 'login') {
        body = (<><Login /></>)
    }
    else if (route === 'register') {
        body = (<><Register /></>)
    } else if (route === 'payment') {
        if (rentState.paymentCode) {
            body = (<><Payment invoiceInfo={rentState} /></>)
        }

    }
    else if (route === 'home') {
        body = (
            <>
                <Navbar />
                <Banner />
                <div className='container main-layout'>
                    {props}
                </div>
                <Footer />
            </>
        )
    }
    else {
        body = (
            <>
                <Navbar />
                <div className='container main-layout'>
                    {props}
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            {body}

            <Row>
                <Col xs={6}>
                    <Toast
                        style={{ width: 'fit-content', position: 'fixed', bottom: '10%', left: '20px' }}
                        bg={messageType}
                        onClose={() => closeMessage()}
                        show={show}
                        delay={3000}
                        autohide>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Thông báo</strong>
                        </Toast.Header>
                        <Toast.Body>
                            {messageContent}
                        </Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </>
    )
}

export default MainLayout