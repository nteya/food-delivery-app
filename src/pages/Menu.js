import React, { useState, useEffect } from 'react';
import Cart from './Cart'; // Import the Cart component
import menuData from '../menuData'; // Correct import for the default export
import './Menu.css';

const Menu = ({ searchTerm }) => {
    const [cart, setCart] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState(menuData);

    // Load saved cart from local storage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Function to add an item to the cart
    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    // Filter the menu items based on the search term
    useEffect(() => {
        console.log('Search Term:', searchTerm); // Log the search term

        if (searchTerm) {
            const lowercasedFilter = searchTerm.toLowerCase();
            const filtered = menuData
                .map(category => ({
                    ...category,
                    items: category.items.filter(item =>
                        item.name.toLowerCase().includes(lowercasedFilter)
                    )
                }))
                .filter(category => category.items.length > 0);
            
            console.log('Filtered Menu:', filtered); // Log the filtered menu

            setFilteredMenu(filtered);
        } else {
            setFilteredMenu(menuData); // Show the full menu if no search term
        }
    }, [searchTerm]);

    return (
        <div className="menu-section">
            <h2>Our Menu</h2>
            <div className="menu-items">
                {filteredMenu.length > 0 ? (
                    filteredMenu.map((category, index) => (
                        <div key={index} className="menu-category">
                            <h3>{category.category}</h3>
                            <div className="menu-items-list">
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="menu-item">
                                        <img src={item.image} alt={item.name} className="menu-item-image" />
                                        <h4>{item.name}</h4>
                                        <p>Price: R{item.price ? item.price.toFixed(2) : 'N/A'}</p>
                                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No menu items found</p>
                )}
            </div>

            {/* Cart Component */}
            <Cart cart={cart} />
        </div>
    );
};

export default Menu;


















