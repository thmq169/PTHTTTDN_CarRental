import React from 'react'
import SidebarItem from './SidebarItem'
import { Link } from 'react-router-dom'
import sidebar_items from '../../assets/JsonData/sidebar_routes.json'
import setAuthToken from '../../utils/setAuthToken'
import { LOCAL_STORAGE_TOKEN_NAME } from '../../store/actions/constants'
import { useAuth, actions, useStore } from '../../store'
import './sidebar.css'

function Sidebar({ route }) {
    const [authState, authDispatch] = useAuth()
    const [state, dispatch] = useStore()
    const role = localStorage.getItem('role')

    let sidebars


    switch (role) {
        case "HR":
            sidebars = ["Dashboard", "Staffs"]
            break
        case "INFORMATION MANAGEMENT STAFF":
            sidebars = ["Dashboard", "Customers", "Owners", "Cars"]
            break
        case "SALES STAFF":
            sidebars = ["Dashboard", "Rental Invoice"]
            break
        case "TRANSPORTATION STAFF":
            sidebars = ["Dashboard", "Activity", "Transportation", "History"]
            break
        default:
            console.log("Role is not accessed");
    }

    const activeItem = sidebar_items.findIndex(item => item.route === route)

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        localStorage.removeItem('role')
        setAuthToken(null);
        authDispatch(actions.setAuth(false))
        authDispatch(actions.setUser(null))

    }

    return (
        <>
            <div style={{ position: 'absolute', top: '50px', right: '100px' }}>
                {localStorage.getItem("role")}
            </div>
            <div className='sidebar'>
                <div className="sidebar__logo">
                    <h1>HiringCar</h1>
                </div>

                <div className="sidebar__item">
                    <div className={`sidebar__item-inner off `}>
                        <i className='bx bx-group'></i>
                        <span>
                            {localStorage.getItem("fullnameStaff")}
                        </span>
                    </div>
                </div>
                {
                    sidebar_items.map((item, index) => {
                        if (sidebars.indexOf(item.display_name) >= 0) {
                            return (
                                <Link to={item.route} key={index} className={item.status}>
                                    <SidebarItem
                                        title={item.display_name}
                                        icon={item.icon}
                                        active={index === activeItem}
                                        status={item.status}
                                    />
                                </Link>
                            )
                        }

                    })
                }
                <Link onClick={logoutUser} to="/login">
                    <SidebarItem
                        title="Logout"
                        icon="bx bx-log-out-circle"
                    />
                </Link>
            </div>
        </>

    )
}

export default Sidebar
