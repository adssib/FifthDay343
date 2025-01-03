import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage';
import DeliveryForm from './components/DeliveryForm';
import QuotePage from './components/QuotePage';
import PaymentPage from './components/PaymentPage';
import SuccessPage from './components/SuccessPage';
import TrackPackage from './components/TrackPackage';
import Chatbot from './components/Chatbot';
import ReviewForm from "./components/ReviewForm";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-request" element={<DeliveryForm />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/payment/pay" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/track-package" element={<TrackPackage />} />
        <Route path="/submit-review" element={<ReviewForm />} />

      </Routes>
      <Chatbot />
    </Router>
  );
};

export default App;
