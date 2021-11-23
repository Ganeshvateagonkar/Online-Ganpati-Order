import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions'



const Header = () => {

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header >
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Link to="/">
                        <Navbar.Brand >ONLINE GANPATTI ORDER</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse className="justify-content-end" id="navbarScroll">
                        <Nav >
                            <Link style={{ textDecoration: 'none' }} to="/cart">

                                <Nav.Link href='/cart' ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            </Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <Link to='/profile'>
                                        <NavDropdown.Item href='/profile' >Profile</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Link style={{ textDecoration: 'none' }} to="/login">
                                    <Nav.Link href='/login' ><i className="fas fa-user"></i>Sign In</Nav.Link>
                                </Link>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id="adminmenu">
                                    <Link to='/admin/userlist'>
                                        <NavDropdown.Item href='/admin/userlist'>Users</NavDropdown.Item>
                                    </Link>
                                    <Link to='/admin/orderlist'>
                                        <NavDropdown.Item href='/admin/orderlist'>Orders</NavDropdown.Item>
                                    </Link>


                                </NavDropdown>
                            )}

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;

