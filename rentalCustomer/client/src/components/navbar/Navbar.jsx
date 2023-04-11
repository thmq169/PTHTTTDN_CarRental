import React, { useContext } from 'react'
import NavbarItem from './NavbarItem'
import './navbar.css'
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext'
import { AccountContext } from '../../contexts/AccountContext'
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar() {
    const { authState: { user } }
        = useContext(AuthContext)

    const { accountState, updateWishlist } = useContext(AccountContext)
    
    let wishlistCount = 0

    if (accountState.wishlist) {
        wishlistCount = accountState.wishlist.cars.length
    }

    return (
        <div className='bg-light navbar-wrapper'>
            <div className='container h-100'>
                <nav className="navbar navbar-expand-lg navbar-light h-100">
                    <div className="d-flex justify-content-between align-items-center flex-grow-1">
                        <div className="logo">
                            <NavbarItem
                                name="HiringCars"
                                path="/home"
                            />
                        </div>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <NavbarItem
                                    name="Trang chủ"
                                    path="/home"
                                />
                                <NavbarItem
                                    name="Giới thiệu"
                                    path="/about"
                                />
                                <NavbarItem
                                    name="Đăng kí chủ xe"
                                    path="/register-owner"
                                />
                            </ul>

                            <form className="d-flex input-group w-auto me-3">
                                <input type="search" className="form-control" placeholder="Nhập từ khóa..." aria-label="Search" />
                                <button className="btn btn-outline-success" type="button" data-mdb-ripple-color="dark">
                                    Tìm kiếm
                                </button>
                            </form>


                            {
                                !user && (<ul className="navbar-nav mb-2 mb-lg-0">
                                    <NavbarItem
                                        name="Login"
                                        path="/login"
                                    />
                                    <NavbarItem
                                        name="Register"
                                        path="/register"
                                    />
                                </ul>)
                            }{
                                user && (
                                    <Link className="text-reset mx-3 position-relative" to="/user-account/favourite" >
                                        <span className='fs-3'><i className='bx bxs-heart'></i></span>
                                        <span className="badge rounded-circle badge-notification bg-danger bage-quantity">{wishlistCount}</span>
                                    </Link>
                                )
                            }

                            {
                                user && (
                                    <ul className="navbar-nav mb-2 mb-lg-0">
                                        <Dropdown>
                                            <Link to={'/user-account/account'}>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    <span className='fw-bold ms-2 disable-select'>{user.fullname}</span>
                                                </Dropdown.Toggle>
                                            </Link>
                                        </Dropdown>
                                    </ul>
                                )
                            }

                            <Outlet />
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar