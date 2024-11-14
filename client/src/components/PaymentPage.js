import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const { state } = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!name || (!email && !phone)) {
      setStatus("Please provide at least one contact detail (Email or Phone).");
      return;
    }

    if (!paymentMethod) {
      setStatus("Please select a payment method.");
      return;
    }

    const paymentDetails = {
      trackingId: state?.trackingId,  // Ensure trackingId is part of state
      name,
      email,
      phone,
      paymentMethod
    };

    console.log('Sending payment details:', paymentDetails);
    try {
      const response = await axios.post('http://localhost:5000/api/payment/pay', paymentDetails);

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

  return (
    <div className='normal-div'>
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

        <div>
          <button type="submit">Pay</button>
        </div>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
};

export default PaymentPage;
