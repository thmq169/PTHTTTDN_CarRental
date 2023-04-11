import React, { useContext } from 'react'
import Sidebar from '../sidebar/Sidebar'
import './mainlayout.css'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

import Login from '../auth/Login'
import Register from '../auth/Register'

import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { MessageContext } from '../../contexts/MessageContext'

function MainLayout({ props, route }) {

    const { authState: { isAuthenticated, authLoading } } = useContext(AuthContext)
    const { messageState: { show, messageType, messageContent }, notifyMessage, closeMessage } = useContext(MessageContext)

    let body

    console.log(isAuthenticated)

    if (authLoading) {
        body = (<></>)
    } else {
        if (isAuthenticated) {
            body = (
                <div className={`layout`}>
                    <Sidebar route={route} />
                    <div className="layout__content">
                        <div className="layout__content-main">
                            {props}
                        </div>
                    </div>
                </div>
            )
        } else {
            body = (<><Navigate replace to='/login' /></>)
        }
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