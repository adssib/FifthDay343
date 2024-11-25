import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuotePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trackingId, quote } = location.state || {};

  return (
    <div className='normal-div'>
      <h2>Delivery Quote</h2>
      <p>Tracking ID: {trackingId}</p>
      <p>Quote: ${quote}</p>

      <button onClick={() => navigate('/create-request')}>Back</button>
      <button onClick={() => navigate('/payment/pay', { state: { trackingId, quote } })}>Proceed to Payment</button>
    </div>
  );
};

export default QuotePage;
