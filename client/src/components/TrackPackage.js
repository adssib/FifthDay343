import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TrackPackage.css';

const TrackPackage = () => {
    const [trackingId, setTrackingId] = useState(''); // Tracking ID input by the user
    const [packageDetails, setPackageDetails] = useState(null); // Stores package details fetched from the backend
    const [error, setError] = useState(''); // Error message if tracking fails
    const [intervalId, setIntervalId] = useState(null); // Interval for refreshing position
    const [isDelivered, setIsDelivered] = useState(false); // Flag to track delivery status

    // Simulated test package object
    const mockPackage = {
        trackingId: 'TEST123',
        status: 'In Transit',
        estimatedArrival: '1 min',
        pickupLocation: '45.4981, -73.5777',
        dropoffLocation: '45.5081, -73.5677',
        position: { lat: 45.4981, lng: -73.5777 },
    };

    const simulatePositionChange = (details) => {
        if (!details) return details;
        const newDetails = { ...details };

        if (newDetails.status !== 'Delivered') {
            newDetails.position.lat += 0.0005; // Simulate movement north
            newDetails.position.lng += 0.0005; // Simulate movement east

            // Simulate delivery within a minute
            if (
                newDetails.position.lat >= 45.5081 &&
                newDetails.position.lng >= -73.5677
            ) {
                newDetails.status = 'Delivered';
                newDetails.estimatedArrival = 'Delivered';
            }
        }

        return newDetails;
    };

    const refreshPackageDetails = async () => {
        // Prevent refresh if the package is already delivered
        if (isDelivered) {
            return;
        }

        try {
            let newPackageDetails;

            if (trackingId === mockPackage.trackingId) {
                // Use simulated data for test package
                newPackageDetails = simulatePositionChange(packageDetails || mockPackage);
            } else {
                // Fetch package details from the server
                const response = await axios.get(
                    `http://localhost:5002/api/track/${trackingId}`
                );
                newPackageDetails = response.data;
            }

            setPackageDetails(newPackageDetails);
            setError('');

            // Check if the package is delivered, and stop further refreshes
            if (newPackageDetails.status === 'Successfully Delivered' || newPackageDetails.status === 'Delivered') {
                setIsDelivered(true);
                clearInterval(intervalId);
            }
        } catch (error) {
            setError('Package not found.');
            setPackageDetails(null);
        }
    };

    const handleTrack = () => {
        setIsDelivered(false); // Reset the delivered status
        if (intervalId) clearInterval(intervalId); // Clear any existing interval
        refreshPackageDetails(); // Fetch details immediately
        const id = setInterval(refreshPackageDetails, 5000); // Start auto-refresh
        setIntervalId(id);
    };

    useEffect(() => {
        // Cleanup on component unmount
        return () => clearInterval(intervalId);
    }, [intervalId]);

    return (
        <div className="normal-div">
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
                <div className="trackingDetails">
                    <h3>Tracking Details</h3>
                    <table className="trackingTable">
                        <tbody>
                            <tr>
                                <td className="tableLabel"><strong>Tracking ID:</strong></td>
                                <td className="tableValue">{packageDetails.trackingId}</td>
                            </tr>
                            <tr>
                                <td className="tableLabel"><strong>Status:</strong></td>
                                <td className="tableValue">{packageDetails.status}</td>
                            </tr>
                            <tr>
                                <td className="tableLabel"><strong>Estimated Arrival:</strong></td>
                                <td className="tableValue">{packageDetails.estimatedArrival}</td>
                            </tr>
                            <tr>
                                <td className="tableLabel"><strong>Pickup Location:</strong></td>
                                <td className="tableValue">{packageDetails.pickupLocation}</td>
                            </tr>
                            <tr>
                                <td className="tableLabel"><strong>Dropoff Location:</strong></td>
                                <td className="tableValue">{packageDetails.dropoffLocation}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TrackPackage;
