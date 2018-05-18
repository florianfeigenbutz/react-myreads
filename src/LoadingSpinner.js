import React from 'react';
import Spinner from 'react-spinkit';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <Spinner name="pacman"/>
    </div>
  );
};

export default LoadingSpinner;