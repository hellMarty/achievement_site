import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/components.css";

export default function MyNavbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link className="nav link" to="/">Achievement Site</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="me-auto">
                    <Link className="nav link" to="/about">About</Link>
                    <Link className="nav link" to="/achievement-list">Achievements</Link>
                    <Link className="nav link" to="/achievement-new">CreateAchievement</Link>
                    <Link className="nav link" to="/contact">Contact</Link>
                    <Link className="nav link" to="/profile">Sign In</Link>
                </Nav>
            </Container>
        </Navbar>
    );
};