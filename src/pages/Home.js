import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from React Router
import './Home.css';  // Import the CSS file

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Our Restaurant</h1>
                    <p>Discover delicious meals and experience exceptional service!</p>
                    <Link to="/menu">  {/* Link to the /menu route */}
                        <button className="cta-button">Explore Menu</button>
                    </Link>
                </div>
            </section>
            <section className="about-section">
                <h2>About Us</h2>
                <p>We offer a variety of dishes made with fresh ingredients and love. Our team is dedicated to providing you with a memorable dining experience.</p>
            </section>
        </div>
    );
};

export default Home;














