import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SuccessPage = () => {
  const { state } = useLocation();

  return (
    <div className='normal-div'>
      <h2>Payment Successful</h2>
      <p>Tracking ID: {state.trackingId}</p>
      <p>Your package is on its way!</p>

      <Link to="/" className="button">Go to Homepage</Link>
    </div>
  );
};

export default SuccessPage;
