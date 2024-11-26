import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent, TimelineConnector } from '@mui/lab';
import { Button, TextField, Typography, Paper } from '@mui/material';
import '../styles/TrackPackage.css';

const TrackPackage = () => {
    const [trackingId, setTrackingId] = useState(''); // Tracking ID input by the user
    const [packageDetails, setPackageDetails] = useState(null); // Stores package details fetched from the backend
    const [error, setError] = useState(''); // Error message if tracking fails
    const [intervalId, setIntervalId] = useState(null); // Interval for refreshing position
    const [isDelivered, setIsDelivered] = useState(false); // Flag to track delivery status

    const statuses = [
        'Awaiting Pickup',
        'Picked Up',
        'In Transit',
        'Arrived at Facility',
        'Out for Delivery',
        'Successfully Delivered'
    ];

    // Simulated test package object
    const mockPackage = {
        trackingId: 'TEST123',
        status: 'In Transit',
        estimatedArrival: '1 min',
        pickupLocation: '45.4981, -73.5777',
        dropoffLocation: '45.5081, -73.5677',
        position: { lat: 45.4981, lng: -73.5777 },
    };

    // Simulate position change and update package status
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
                newDetails.status = 'Successfully Delivered';
                newDetails.estimatedArrival = 'Delivered';
            }
        }

        return newDetails;
    };

    const refreshPackageDetails = async () => {
        if (isDelivered) return;

        try {
            let newPackageDetails;
            
            if (trackingId === mockPackage.trackingId) {
                newPackageDetails = simulatePositionChange(packageDetails || mockPackage);
            } else {
                const response = await axios.get(`http://localhost:5002/api/track/${trackingId}`);
                newPackageDetails = response.data;
            }

            setPackageDetails(newPackageDetails);
            setError('');

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
        setIsDelivered(false);
        if (intervalId) clearInterval(intervalId);
        refreshPackageDetails();
        const id = setInterval(refreshPackageDetails, 5000);
        setIntervalId(id);
    };

    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);

    // Get the index of the current status
    const getTimelineIndex = (status) => {
        return statuses.indexOf(status);
    };

    // Get the index of the current status from the package details
    const currentStatusIndex = packageDetails ? getTimelineIndex(packageDetails.status) : -1;

    return (
        <div className="track-package-container">
            <Typography variant="h4" align="center" gutterBottom>
                Track Your Package
            </Typography>

            <div className="track-input-container">
                <TextField
                    variant="outlined"
                    label="Enter Tracking ID"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    fullWidth
                    className="track-input"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTrack}
                    className="track-btn"
                >
                    Track
                </Button>
            </div>

            {error && <Typography color="error" align="center">{error}</Typography>}

            {packageDetails && (
                <div className="tracking-details-container">
                    <Paper elevation={3} className="trackingDetails">
                        <Typography variant="h5" gutterBottom>Tracking Details</Typography>
                        <table className="trackingTable">
                            <tbody>
                                <tr>
                                    <td><strong>Tracking ID:</strong></td>
                                    <td>{packageDetails.trackingId}</td>
                                </tr>
                                <tr>
                                    <td><strong>Status:</strong></td>
                                    <td>{packageDetails.status}</td>
                                </tr>
                                <tr>
                                    <td><strong>Estimated Arrival:</strong></td>
                                    <td>{packageDetails.estimatedArrival}</td>
                                </tr>
                                <tr>
                                    <td><strong>Pickup Location:</strong></td>
                                    <td>{packageDetails.pickupLocation}</td>
                                </tr>
                                <tr>
                                    <td><strong>Dropoff Location:</strong></td>
                                    <td>{packageDetails.dropoffLocation}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Paper>

                    {/* Timeline Container */}
                    <Paper elevation={3} className="timelineDetails">
                        <Timeline align="alternate">
                            {statuses.map((status, index) => {
                                const isCompleted = currentStatusIndex >= index;
                                const isCurrent = currentStatusIndex === index;

                                return (
                                    <TimelineItem key={status}>
                                        <TimelineSeparator>
                                            <TimelineDot
                                                color={isCurrent ? 'primary' : isCompleted ? 'secondary' : 'grey'}
                                                className={isCurrent ? 'current-status' : ''}
                                            />
                                            {index < statuses.length - 1 && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>{status}</TimelineContent>
                                    </TimelineItem>
                                );
                            })}
                        </Timeline>
                    </Paper>
                </div>
            )}
        </div>
    );
};

export default TrackPackage;
