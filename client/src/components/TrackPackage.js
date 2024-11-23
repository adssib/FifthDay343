import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TrackPackage.css';

// Function to fetch the address from reverse geocoding API 
const getAddressFromCoordinates = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    try {
        const response = await axios.get(url);
        return response.data.display_name; 
    } catch (error) {
        console.error('Error fetching address:', error);
        return null;
    }
};

const TrackPackage = () => {
    const [trackingId, setTrackingId] = useState('');
    const [packageDetails, setPackageDetails] = useState(null);
    const [error, setError] = useState('');
    const [pickupAddress, setPickupAddress] = useState('');
    const [dropoffAddress, setDropoffAddress] = useState('');

    const handleTrack = async () => {
        try {
            const response = await axios.get(`http://localhost:5002/api/track/${trackingId}`);
            console.log('Response data:', response.data);
            const data = response.data;
            setPackageDetails(data);
            setError('');

            // Fetch the address for pickup and dropoff locations
            if (data.pickupLocation) {
                const pickupAddr = await getAddressFromCoordinates(data.pickupLocation.lat, data.pickupLocation.lng);
                setPickupAddress(pickupAddr);
            }
            if (data.dropoffLocation) {
                const dropoffAddr = await getAddressFromCoordinates(data.dropoffLocation.lat, data.dropoffLocation.lng);
                setDropoffAddress(dropoffAddr);
            }
        } catch (error) {
            setError("Package not found.");
            setPackageDetails(null);
        }
    };

    return (
        <div className='normal-div'>
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
                    <strong>Estimated Arrival:</strong> {packageDetails.estimatedArrival}<br></br>

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
                                <td>{packageDetails.paymentStatus}</td>
                            </tr>

                            <tr>
                                <td><strong>Pickup Location:</strong></td>
                                <td>{pickupAddress || 'Fetching address...'}</td>
                            </tr>
                            <tr>
                                <td><strong>Dropoff Location:</strong></td>
                                <td>{dropoffAddress || 'Fetching address...'}</td>
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
