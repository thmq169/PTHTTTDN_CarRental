import React, { useContext } from 'react'

import { Link, Outlet, useParams } from 'react-router-dom'

import Account from '../components/account/Account'
import History from '../components/account/History'
import Favourite from '../components/account/Favourite'

import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Profile({ props, route }) {
    const accountEvents = [
        {
            event: "tài khoản",
            icon: "bx bx-user",
            path: "account"
        },
        {
            event: "danh sách yêu thích",
            icon: "bx bx-heart",
            path: "favourite"
        },
        {
            event: "lịch sử thuê",
            icon: "bx bx-history",
            path: "history"
        },

    ]
    const navigate = useNavigate()

    const { authState: { user }, logoutUser } = useContext(AuthContext)

    if (!user) {
        navigate('/login')
    }

    const logout = (e) => {
        e.preventDefault()
        logoutUser()
        navigate('/login')
    }

    const { slug } = useParams()

    let body

    if (window.location.pathname === "/user-account") {
        body = (<>{<Account />}</>)
    }

    switch (slug) {
        case "history":
            body = (<>{<History />}</>)
            break
        case "account":
            body = (<>{<Account />}</>)
            break
        case "favourite":
            body = (<>{<Favourite />}</>)
            break
        default:
            body = (<><div>PAGE NOT FOUND</div></>)
    }

    return (
        user && (
            <div className="profile py-5">
                <div className="row">
                    <div className="col col-lg-4 col-md-12 col-sm-12">
                        <div className="profile-account text-center shadow border rounded py-4">
                            <img src="../images/avatar.jpg" className='' alt="" />
                            <h1 className="section-title my-4">
                                {user.username}
                            </h1>
                            <ul className="nav flex-column bg-white mb-0 user-account-buttons">
                                {
                                    accountEvents.map((accountEvent, index) => {

                                        return (
                                            <li key={index} className="nav-item mb-2">
                                                <Link to={accountEvent.path} className={`nav-link text-dark font-italic d-flex align-items-baseline ms-5 ps-4 ${accountEvent.path}`}>
                                                    <i className={accountEvent.icon + ' me-3 bx-fw'}></i>
                                                    <span className="text-capitalize">{accountEvent.event}</span>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }

                                <li className="nav-item mb-2">
                                    <a onClick={logout} className='nav-link text-dark font-italic d-flex align-items-baseline ms-5 ps-4'>
                                        <i className={'bx bx-log-out-circle me-3 bx-fw'}></i>
                                        <span className="text-capitalize">đăng xuất</span>
                                    </a>
                                </li>
                            </ul>
                            <Outlet />
                        </div>
                    </div>
                    <div className="col col-lg-8 col-md-12 col-sm-12">
                        {body}
                    </div>
                </div>
            </div >)
    )
}

export default Profile