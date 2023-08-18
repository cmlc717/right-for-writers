import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-default">
        <div className="container">
            <Link to="/login">Log In/Sign Up</Link>
        </div>
    </nav>
  );
}

export default Navbar;