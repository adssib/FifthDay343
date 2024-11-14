import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeliveryForm = () => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
    const [weight, setWeight] = useState('');
    const [shippingMethod, setShippingMethod] = useState('Standard');
    const [quote, setQuote] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const deliveryData = {
            pickupLocation,
            dropoffLocation,
            dimensions,
            weight,
            shippingMethod,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/create-request', deliveryData);
            const { trackingId, quote } = response.data;
            navigate('/quote', { state: { trackingId, quote } });

        } catch (error) {
            alert("There was an error creating your delivery request. Please try again.");
        }
    };

    return (
        <div className='forms'>
            <h2>Delivery Request Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Pickup Location"
                />
                <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    placeholder="Dropoff Location"
                />
                <input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                    placeholder="Length"
                    className="side-by-side"
                />
                <input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                    placeholder="Width"
                    className="side-by-side"
                />
                <input
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                    placeholder="Height"
                    className="side-by-side"
                />
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight (kg)"
                />
                <select
                    value={shippingMethod}
                    onChange={(e) => setShippingMethod(e.target.value)}
                >
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                </select>
                <button onClick={() => navigate('/')} className='back-button'>Back</button>
                <button type="submit" className='next-button'>Get Quote</button>
            </form>
        </div>
    );
};

export default DeliveryForm;
