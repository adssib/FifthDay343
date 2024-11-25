import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css'

const MainPage = () => {
  return (
    <div className="main-page-container" 
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }}>
      
      <div className="buttons-container">
        <button><Link to="/create-request">Rate & Ship</Link></button>
        <button><Link to="/track-package">Track</Link></button>
        <button><Link to="/submit-review">Review</Link></button>
      </div>
      <h2>Fast On Track</h2>

    </div>
    
  );

};

export default MainPage;
