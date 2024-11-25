import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Header.css'

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="title">
                <h1>Blue Bolt</h1> 
            </Link>
        </header>
    );
};

export default Header;
