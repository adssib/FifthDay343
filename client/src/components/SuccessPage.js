import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SuccessPage.css';

const SuccessPage = () => {
  const { state } = useLocation();

  useEffect(() => {
    // Function to initiate the delivery process
    const shipDelivery = async (trackingId) => {
      try {
        await axios.post(`http://localhost:5002/api/ship/${trackingId}`);
        console.log('Shipping process initiated successfully.');
      } catch (error) {
        console.error('Error initiating shipping process:', error);
      }
    };

    if (state && state.trackingId) {
      shipDelivery(state.trackingId);
    }
  }, [state]);

  return (
    <div className="success-page-container">
      <h2>Payment Successful! </h2>
      <p><strong>Tracking ID:</strong> {state?.trackingId}</p>
      <p>Your package is on its way!</p>

      <Link to="/" className="button">Go to Homepage</Link>
    </div>
  );
};

export default SuccessPage;
