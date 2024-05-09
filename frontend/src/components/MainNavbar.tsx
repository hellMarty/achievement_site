import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/components.css";
import "../styles/external.css";

export default function MainNavbar() {
    const { pathname } = useLocation();
    const [showDropdown, setShowDropdown] = useState(false)

    function isLinkActive(pathname: string, linkTo: string): string {
        return pathname === linkTo ? " bg-body-tertiary" : ""
    }

    return (
        <Navbar expand="lg" className="bg-body-secondary">
            <div className="navbar">
                <Navbar.Brand><Link className="brand" to="/">Achievement Site</Link></Navbar.Brand>
                <Nav className="main-nav">
                    <Link className={`link ${isLinkActive(pathname, "/achievement-list")}`} onClick={() => setShowDropdown(false)} to="/achievement-list">Achievements</Link>
                    <Link className={`link ${isLinkActive(pathname, "/achievement-open")}`} onClick={() => setShowDropdown(false)} to="/achievement-open">Open Achievements</Link>
                    <Link className={`link ${isLinkActive(pathname, "/achievement-new")}`} onClick={() => setShowDropdown(false)} to="/achievement-new">Create Achievement</Link>
                    <Link className={`link ${isLinkActive(pathname, "/themes")}`} onClick={() => setShowDropdown(false)} to="/themes">Themes</Link>
                </Nav>
                <div className="dropdown">
                    <button onClick={() => setShowDropdown(!showDropdown)} className={`${showDropdown ? "active_btn" : ""} dropdown_button`}>Profile</button>
                    {showDropdown ?
                        <div className="dropdown_content">
                            <Link className={`link ${isLinkActive(pathname, "/editor")}`} onClick={() => setShowDropdown(false)} to="/editor">Editor</Link>
                            <Link className={`link ${isLinkActive(pathname, "/profile")}`} onClick={() => setShowDropdown(false)} to="/profile">Sign In</Link>
                        </div>
                        :
                        ""
                    }
                </div>
            </div>
        </Navbar>
    );
};
