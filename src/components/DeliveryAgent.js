import React, { useEffect, useState } from 'react';
import './DeliveryAgent.css';

const DeliveryAgent = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch assigned orders from the backend
        fetch('/api/delivery/assigned-orders')
            .then(response => response.json())
            .then(data => setOrders(data));
    }, []);

    const handleUpdateStatus = (orderId, status) => {
        fetch(`/api/delivery/update-status/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        })
        .then(response => response.json())
        .then(data => {
            // Update the local state or refetch orders
            setOrders(prevOrders => prevOrders.map(order => 
                order.id === orderId ? { ...order, status } : order
            ));
        });
    };

    return (
        <div className="delivery-agent">
            <h2>Assigned Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Delivery Address: {order.deliveryAddress}</p>
                        <p>Status: {order.status}</p>
                        <button onClick={() => handleUpdateStatus(order.id, 'Delivered')}>
                            Mark as Delivered
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeliveryAgent;
