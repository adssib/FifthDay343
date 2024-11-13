import React from 'react';
import { Link } from 'react-router-dom'; 

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="title">
                <h1>App Name</h1> 
            </Link>
        </header>
    );
};

export default Header;
