import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setCartItems(cart || []);
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        if (setCart) setCart(cartItems); // Notify parent if needed
    }, [cartItems, setCart]);

    const handleQuantityChange = (item, delta) => {
        setCartItems(cartItems.map(cartItem =>
            cartItem.name === item.name
                ? { ...cartItem, quantity: Math.max((cartItem.quantity || 1) + delta, 1) }
                : cartItem
        ));
    };

    const removeItem = (item) => {
        setCartItems(cartItems.filter(cartItem => cartItem.name !== item.name));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 1;
            return total + (price * quantity);
        }, 0).toFixed(2);
    };

    const handleCheckout = () => {
        navigate('/checkout', { state: { cartItems: cartItems } }); // Pass cartItems to Checkout via state
    };

    return (
        <div className="cart-section">
            <h2>Shopping Cart</h2>
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h4>{item.name}</h4>
                                <p>Price: R{parseFloat(item.price).toFixed(2)}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                                    <span>{item.quantity || 1}</span>
                                    <button onClick={() => handleQuantityChange(item, 1)}>+</button>
                                </div>
                                <button onClick={() => removeItem(item)}>Remove</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
            <div className="cart-total">
                <h3>Total: R{calculateTotal()}</h3>
                <button onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;















