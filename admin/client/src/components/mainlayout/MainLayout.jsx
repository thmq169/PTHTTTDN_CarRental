import React, { useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import Login from '../authen/Login'
import { useNavigate } from 'react-router-dom'
import './mainlayout.css'
import { useStore } from '../../store'

function MainLayout({ props, route }) {
    const [state, dispatch] = useStore()
    const navigate = useNavigate()
    let body
    let role = localStorage.getItem('role')


    if (!role) {
        navigate('/login')
        // return
    }
    // else if (route === 'register') {
    //     body = (<><Register /></>)
    // }
    else {
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
    }


    return (
        <>
            {body}
        </>
    )
}

export default MainLayout