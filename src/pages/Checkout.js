import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const [cartItems, setCartItems] = useState(location.state?.cartItems || []);

    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        phone: '',
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
    });

    useEffect(() => {
        console.log('Cart Items in Checkout:', cartItems); // Debugging
    }, [cartItems]);

    const handleShippingChange = (e) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentChange = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            [e.target.name]: e.target.value
        });
    };

    const calculateTotal = () => {
        console.log('Calculating Total...');
        let total = 0;

        cartItems.forEach((item) => {
            const price = parseFloat(item.price);
            const quantity = parseInt(item.quantity, 10);

            console.log(`Item: ${item.name}, Price: ${price}, Quantity: ${quantity}`); // Debugging

            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            } else {
                console.warn(`Invalid data for item ${item.name}. Skipping...`);
            }
        });

        return total.toFixed(2);
    };

    const placeOrder = (e) => {
        e.preventDefault();

        if (!shippingInfo.fullName || !shippingInfo.address || !paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv) {
            alert('Please fill out all required fields.');
            return;
        }

        alert('Order placed successfully!');
        console.log('Shipping Info:', shippingInfo);
        console.log('Payment Info:', paymentInfo);
    };

    return (
        <div className="checkout-section">
            <h2>Checkout</h2>

            <div className="order-summary">
                <h3>Order Summary</h3>
                {cartItems.length > 0 ? (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <span>{item.name}</span>
                                <span>Quantity: {item.quantity}</span>
                                <span>Price: R{parseFloat(item.price).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your cart is empty.</p>
                )}
                <h4>Total: R{calculateTotal()}</h4>
            </div>

            <form onSubmit={placeOrder}>
                <div className="shipping-info">
                    <h3>Shipping Information</h3>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={shippingInfo.fullName}
                        onChange={handleShippingChange}
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        required
                    />
                    <input
                        type="text"
                        name="zip"
                        placeholder="ZIP Code"
                        value={shippingInfo.zip}
                        onChange={handleShippingChange}
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={shippingInfo.country}
                        onChange={handleShippingChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        required
                    />
                </div>

                <div className="payment-info">
                    <h3>Payment Information</h3>
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        required
                    />
                    <input
                        type="text"
                        name="expiry"
                        placeholder="Expiry Date (MM/YY)"
                        value={paymentInfo.expiry}
                        onChange={handlePaymentChange}
                        required
                    />
                    <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        required
                    />
                </div>

                <button type="submit" className="place-order-btn">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;










