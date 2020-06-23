import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';

const AdminNavbar = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Regisztráció admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Beállítások</Nav.Link>
                        <Nav.Link as={Link} to="/golyak">Gólyák</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default AdminNavbar;