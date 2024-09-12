import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Order.css';

const Order = ({ cart }) => {
    const [deliveryInfo, setDeliveryInfo] = useState({
        address: '',
        phone: '',
        deliveryTime: '',
    });
    const history = useHistory();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo({ ...deliveryInfo, [name]: value });
    };

    const handleSubmit = () => {
        // Submit order to backend
        fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart, deliveryInfo }),
        })
        .then(response => response.json())
        .then(data => {
            // Redirect to confirmation page
            history.push(`/order-confirmation/${data.orderId}`);
        });
    };

    return (
        <div className="order-page">
            <h2>Order Summary</h2>
            {/* Display cart items */}
            {/* Delivery Information Form */}
            <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                value={deliveryInfo.address}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={deliveryInfo.phone}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="deliveryTime"
                placeholder="Preferred Delivery Time"
                value={deliveryInfo.deliveryTime}
                onChange={handleInputChange}
            />
            <button onClick={handleSubmit}>Place Order</button>
        </div>
    );
};

export default Order;
