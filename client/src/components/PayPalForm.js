import React from 'react';

const PayPalForm = ({ onSubmit }) => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ paymentMethod: 'paypal', email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          placeholder="PayPal Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className='pay-button'
      >Submit PayPal Payment</button>
    </form>
  );
};

export default PayPalForm;
