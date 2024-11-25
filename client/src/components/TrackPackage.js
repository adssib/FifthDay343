import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TrackPackage.css';

const TrackPackage = () => {
    const [trackingId, setTrackingId] = useState(''); // Tracking ID input by the user
    const [packageDetails, setPackageDetails] = useState(null); // Stores package details fetched from the backend
    const [error, setError] = useState(''); // Error message if tracking fails

    const handleTrack = async () => {
        try {
            const response = await axios.get(`http://localhost:5002/api/track/${trackingId}`);
            console.log('Response data:', response.data);
            const data = response.data;

            // Set the package details directly
            setPackageDetails(data);
            setError('');
        } catch (error) {
            setError("Package not found."); // Display error if the package isn't found
            setPackageDetails(null);
        }
    };

    return (
        <div className='normal-div'>
            <h2>Track Your Package</h2>
            <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)} // Update tracking ID state
                placeholder="Enter Tracking ID"
            />
            <button onClick={handleTrack}>Track</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {packageDetails && (
                <div>
                    <h3>Tracking Details:</h3>
                    <strong>Tracking ID:</strong> {packageDetails.trackingId}<br />
                    <strong>Status:</strong> {packageDetails.status}<br />
                    <strong>Estimated Arrival:</strong> {packageDetails.estimatedArrival}<br />

                    <h3>Other Delivery Details:</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>Name:</strong></td>
                                <td>{packageDetails.customer.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>{packageDetails.customer.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone:</strong></td>
                                <td>{packageDetails.customer.phone}</td>
                            </tr>
                            <tr>
                                <td><strong>Quote:</strong></td>
                                <td>${packageDetails.quote}</td>
                            </tr>
                            <tr>
                                <td><strong>Payment Method:</strong></td>
                                <td>{packageDetails.payment.paymentMethod}</td>
                            </tr>
                            <tr>
                                <td><strong>Payment Status:</strong></td>
                                <td>{packageDetails.payment.status}</td>
                            </tr>
                            {/* Adjusted: Directly display the pickup and dropoff addresses */}
                            <tr>
                                <td><strong>Pickup Location:</strong></td>
                                <td>{packageDetails.pickupLocation}</td>
                            </tr>
                            <tr>
                                <td><strong>Dropoff Location:</strong></td>
                                <td>{packageDetails.dropoffLocation}</td>
                            </tr>
                            <tr>
                                <td><strong>Dimensions:</strong></td>
                                <td>{packageDetails.dimensions.length} x {packageDetails.dimensions.width} x {packageDetails.dimensions.height} cm</td>
                            </tr>
                            <tr>
                                <td><strong>Weight:</strong></td>
                                <td>{packageDetails.weight} kg</td>
                            </tr>
                            <tr>
                                <td><strong>Shipping Method:</strong></td>
                                <td>{packageDetails.shippingMethod}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TrackPackage;
