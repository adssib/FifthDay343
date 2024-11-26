import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/PaymentPage.css';  

import CreditCardForm from './CreditCardForm';
import PayPalForm from './PayPalForm';

const PaymentPage = () => {
  const { state } = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handlePayment = async (paymentDetails) => {
    if (!name || (!email && !phone)) {
      setStatus("Please provide at least one contact detail (Email or Phone).");
      return;
    }

    if (!paymentMethod) {
      setStatus("Please select a payment method.");
      return;
    }

    const paymentData = {
      trackingId: state?.trackingId,  // Ensure trackingId is part of state
      name,
      email,
      phone,
      paymentMethod,
      ...paymentDetails
    };

    console.log('Sending payment details:', paymentData);
    try {
      const response = await axios.post('http://localhost:5002/api/payment/pay', paymentData);

      if (response.status === 200) {
        setStatus("Payment successful!");
        navigate('/success', { state: { trackingId: state?.trackingId } });
      } else {
        setStatus(`Error processing payment. Status code: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        setStatus(`Error processing payment. Status code: ${error.response.status}`);
      } else if (error.request) {
        setStatus('No response received from server.');
      } else {
        setStatus('Error setting up request.');
      }
    }
  };

  const renderPaymentForm = () => {
    if (paymentMethod === 'credit') {
      return <CreditCardForm onSubmit={handlePayment} />;
    }
    if (paymentMethod === 'paypal') {
      return <PayPalForm onSubmit={handlePayment} />;
    }
    return null;
  };

  return (
    <div className="payment-page-container">
      <h2>Payment</h2>
      <form onSubmit={handlePayment}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>


      </form>

      {status && <p>{status}</p>}
      {renderPaymentForm()}
    </div>
  );
};

export default PaymentPage;
