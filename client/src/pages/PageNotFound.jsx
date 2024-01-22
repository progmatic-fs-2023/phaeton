import React from 'react';
import error404Picture from '../assets/error_404_picture.png';
import '../components/styles/Pages/PageNotFound.css';

function PageNotFound() {
  return (
    <div className="not-found-container">
      <h1>Ooops!</h1>
      <div className="not-found-container-error-message">
        <h2>Error 404</h2>
        <p>The requested page does not exists</p>
      </div>
      <img src={error404Picture} alt={error404Picture} />
    </div>
  );
}

export default PageNotFound;
