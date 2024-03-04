import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link to="/">Achievement Site</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="me-auto">
                    <Nav.Link><Link to="/about">About</Link></Nav.Link>
                    <Nav.Link><Link to="/achievementList">Achievements</Link></Nav.Link>
                    <Nav.Link><Link to="/createAchievement">CreateAchievement</Link></Nav.Link>
                    <Nav.Link><Link to="/contact">Contact</Link></Nav.Link>
                    <Nav.Link><Link to="/user">Sign In</Link></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;