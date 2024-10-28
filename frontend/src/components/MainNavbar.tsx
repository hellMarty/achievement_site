import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/components.css";
import "../styles/external.css";


export default function MainNavbar() {
    const { pathname } = useLocation();
    const [showDropdown, setShowDropdown] = useState(false)
    const [topPosition, setTopPosition] = useState(0)

    function activeClassName(pathname: string, linkTo: string): string {
        return pathname === linkTo ? " bg-body-tertiary" : ""
    }

    let prevScrollPos = window ? window.scrollY : 0
    window.onscroll = function () {
        let currentScrollPos = window.scrollY;
        if (prevScrollPos > currentScrollPos) {
            if (prevScrollPos - currentScrollPos > 4) {
                setTopPosition(0)
            }
        } else {
            if (-100 < topPosition) {
                setTopPosition(topPosition + (prevScrollPos - currentScrollPos))
            }
        }
        prevScrollPos = currentScrollPos;
    }

    return (
        <div className="navbar" style={{ position: "fixed", background: "rgb(183 182 182)", top: topPosition + "px", transition: "top 0.3s" }}>
            <Navbar.Brand><Link className="brand" to="/">Achievement Site</Link></Navbar.Brand>
            <Nav className="main-nav">
                <Link className={`link ${activeClassName(pathname, "/achievement-list")}`} onClick={() => setShowDropdown(false)} to="/achievement-list">Achievements</Link>
                <Link className={`link ${activeClassName(pathname, "/achievement-open")}`} onClick={() => setShowDropdown(false)} to="/achievement-open">Open Achievements</Link>
                <Link className={`link ${activeClassName(pathname, "/achievement-new")}`} onClick={() => setShowDropdown(false)} to="/achievement-new">Create Achievement</Link>
                <Link className={`link ${activeClassName(pathname, "/themes")}`} onClick={() => setShowDropdown(false)} to="/themes">Themes</Link>
            </Nav>
            <div className="dropdown">
                <button onClick={() => setShowDropdown(!showDropdown)} className={`${showDropdown ? "active_btn" : ""} dropdown_button`}>Profile</button>
                {showDropdown ?
                    <div className="dropdown_content">
                        <Link className={`link ${activeClassName(pathname, "/editor")}`} onClick={() => setShowDropdown(false)} to="/editor">Editor</Link>
                        <Link className={`link ${activeClassName(pathname, "/profile")}`} onClick={() => setShowDropdown(false)} to="/profile">Sign In</Link>
                    </div>
                    :
                    ""
                }
            </div>
        </div>
    );
};
