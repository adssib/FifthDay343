import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="main-page-container">
      <button><Link to="/create-request">Create Delivery Request and Get a Quote</Link></button>
      <button><Link to="/track-package">Track Your Package</Link>
      </button>
    </div>
  );
};

export default MainPage;
