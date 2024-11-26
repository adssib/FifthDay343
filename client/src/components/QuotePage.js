import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/QuotePage.css';  

const QuotePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trackingId, quote } = location.state || {};

  return (
    <div className='quote-page-container'>
      <h2>Delivery Quote</h2>
      <p><strong>Tracking ID:</strong> {trackingId}</p>
      <p><strong>Quote:</strong> <span className="quote-value">${quote}</span></p>

      <button className="back-button" onClick={() => navigate('/create-request')}>Back</button>
      <button className="proceed-button" onClick={() => navigate('/payment/pay', { state: { trackingId, quote } })}>Proceed to Payment</button>
    </div>
  );
};

export default QuotePage;
