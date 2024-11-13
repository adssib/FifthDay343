import React, { useState } from 'react';
import axios from 'axios';

const TrackPackage = () => {
    const [trackingId, setTrackingId] = useState('');
    const [packageDetails, setPackageDetails] = useState(null);
    const [error, setError] = useState('');

    const handleTrack = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/track/${trackingId}`);
            setPackageDetails(response.data);
            setError('');
        } catch (error) {
            setError("Package not found.");
            setPackageDetails(null);
        }
    };

    return (
        <div>
            <h2>Track Your Package</h2>
            <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter Tracking ID"
            />
            <button onClick={handleTrack}>Track</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {packageDetails && (
                <div>
                    <h3>Tracking Details:</h3>
                    <strong>Tracking ID:</strong> {packageDetails.trackingId}<br></br>
                    <strong>Status:</strong> {packageDetails.status}<br></br>
                    <strong>Estimated Arrival at {packageDetails.dropoffLocation}:</strong> {packageDetails.estimatedArrival}<br></br>

                    <h3>Other Delivery Details:</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>Name:</strong></td>
                                <td>{packageDetails.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>{packageDetails.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone:</strong></td>
                                <td>{packageDetails.phone}</td>
                            </tr>
                            <tr>
                                <td><strong>Quote:</strong></td>
                                <td>${packageDetails.quote}</td>
                            </tr>
                            <tr>
                                <td><strong>Payment Status:</strong></td>
                                <td>{packageDetails.paymentStatus}</td>
                            </tr>

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
