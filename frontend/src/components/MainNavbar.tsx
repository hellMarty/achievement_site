import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/components.css";

export default function MainNavbar() {
    return (
        <div className="navbar">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand><Link className="nav link" to="/">Achievement Site</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="me-auto">
                        <Link className="nav link" to="/achievement-list">Achievements</Link>
                        <Link className="nav link" to="/achievement-open">Open Achievements</Link>
                        <Link className="nav link" to="/achievement-new">Create Achievement</Link>
                        <Link className="nav link" to="/profile">Sign In</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};
