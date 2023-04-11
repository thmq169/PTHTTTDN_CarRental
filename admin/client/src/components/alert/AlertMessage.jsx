import React from 'react'
import Alert from 'react-bootstrap/Alert'

function AlertMessage({ message }) {
    return (
        message !== null ? <Alert variant={message.type}>
            {message.content}</Alert> : null
    )
}

export default AlertMessage