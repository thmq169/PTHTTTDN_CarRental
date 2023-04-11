import React, { useContext } from 'react'

import SidebarItem from './SidebarItem'

import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo.png'

import sidebar_items from '../../assets/JsonData/sidebar_routes.json'

import './sidebar.css'

import { AuthContext } from '../../contexts/AuthContext'

function Sidebar({ route }) {
    const { logoutUser } = useContext(AuthContext)

    const activeItem = sidebar_items.findIndex(item => item.route === route)

    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <h1>HiringCar</h1>
            </div>
            {
                sidebar_items.map((item, index) => (
                    <Link to={item.route} key={index} className={item.status}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                            status={item.status}
                        />
                    </Link>
                ))
            }

            <Link onClick={(e) => {
                e.preventDefault()
                logoutUser()
            }}>
                <SidebarItem
                    title={'Đăng xuất'}
                    icon={'bx bx-log-out'}
                />
            </Link>
        </div>
    )
}

export default Sidebar
