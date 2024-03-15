import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/components.css";

export default function MainNavbar() {
    const { pathname } = useLocation();

    function isLinkActive(pathname: string, linkTo: string): string {
        return pathname === linkTo ? " bg-body-tertiary" : ""
    }

    return (
        <Navbar expand="lg" className="bg-body-secondary">
            <div className="navbar">
                <Navbar.Brand><Link className="brand" to="/">Achievement Site</Link></Navbar.Brand>
                <Nav className="main-nav">
                    <Link className={`link ${isLinkActive(pathname, "/achievement-list")}`} to="/achievement-list">Achievements</Link>
                    <Link className={`link ${isLinkActive(pathname, "/achievement-open")}`} to="/achievement-open">Open Achievements</Link>
                    <Link className={`link ${isLinkActive(pathname, "/achievement-new")}`} to="/achievement-new">Create Achievement</Link>
                </Nav>
                <Link className={`link ${isLinkActive(pathname, "/profile")}`} to="/profile">Sign In</Link>
            </div>
        </Navbar>
    );
};
