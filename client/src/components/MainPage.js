import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (<container>

    <h1>Delivery Service</h1>
    <button><Link to="/create-request">Create Delivery Request and Get a Quote</Link></button>
    <button><Link to="/track-package">Track Your Package</Link></button>

  </container>);
};

export default MainPage;
