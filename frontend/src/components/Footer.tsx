import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/components.css";

export default function Footer() {
    return (
        <div className="footer">
            <Navbar expand="lg" className="bg-body-tertiary center">
                <Link className="nav link" to="/about">About</Link>
                <Link className="nav link" to="/contact">Contact</Link>
            </Navbar>
        </div>
    );
};
