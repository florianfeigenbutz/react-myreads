import React from 'react';
import Spinner from 'react-spinkit';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <Spinner name="pacman"/>
    </div>
  );
};

export default LoadingSpinner;