import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

function NavbarItem(props) {
    return (
        <div className="nav-item me-3">
            <Link className="nav-link" to={props.path}>
                <span className="nav-link_item">
                    {props.name}
                </span>
            </Link>
        </div>
    )
}

export default NavbarItem