import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file

const Header = ({ onSearch }) => {
    // Handler to capture search input changes
    const handleSearchChange = (e) => {
        onSearch(e.target.value); // Update the search term
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">FIXIE'S DECK</Link>
                </div>
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/checkout">Checkout</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    {/* Add search input */}
                    <input 
                        type="text" 
                        placeholder="Search menu..." 
                        className="search-bar"
                        onChange={handleSearchChange} // Capture user input
                    />
                </nav>
            </div>
        </header>
    );
};

export default Header;







