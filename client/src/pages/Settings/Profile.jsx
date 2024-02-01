import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import UserContext from '../../contexts/UserContext';
import '../../components/styles/Pages/ProfilePage.css';
import dateFormatterWithHyphen from '../../utils/dateFromatterWhitHyphen';
import ServiceMessage from '../../components/Booking/ServiceMessage';

function Profile() {
  const navigate = useNavigate();

  const modalRef = useRef(null);

  const [IsVisible, setIsVisible] = useState('non-visible');
  const [isBlurred, setIsBlurred] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const [message, setMessage] = useState('');

  const userCtx = useContext(UserContext);
  if (userCtx.user === 'GuestUser') {
    useEffect(() => {
      navigate('/');
    }, []);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsVisible('non-visible');
        setIsBlurred('');
        document.body.style.overflow = 'auto';
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeleteProfileConfirm = async (email) => {
    const response = await fetch('http://localhost:3000/users/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
      setIsDeleted(true);
      setMessage(data.message);
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    } else if (response.ok) {
      setIsDeleted(true);
      setMessage('User Deleted Successfully');
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    }
  };

  function handleDeleteProfile() {
    setIsVisible('visible');
    setIsBlurred('blurred');
    document.body.style.overflow = 'hidden';
  }

  function handleCancelDeleteButton() {
    setIsVisible('non-visible');
    setIsBlurred('');
    document.body.style.overflow = 'auto';
  }

  return (
    <div className="profile-data">
      {isBlurred === 'blurred' && <div className="overlay" />}
      <div className="profile-data-container">
        <h2>Profile</h2>
        <h3>
          <p>First name: {userCtx.user.firstName} </p>
        </h3>
        <h3>
          <p>Last name: {userCtx.user.lastName} </p>
        </h3>
        <h3>
          <p>E-mail address: {userCtx.user.email} </p>
        </h3>
        <h3>
          <p>Date of birth: {dateFormatterWithHyphen(userCtx.user.dateOfBirth)} </p>
        </h3>
      </div>
      <button type="button" className="delete-profile-button" onClick={handleDeleteProfile}>
        Delete Profile
      </button>
      <div className={IsVisible}>
        <div className="delete-modal-container" ref={modalRef}>
          {!isDeleted && (
            <>
              <h3>Would you like to delete your Profile?</h3>
              <p>
                Please be advised that this action is irreversible, and once deleted, your profile
                cannot be restored.
              </p>
              <div className="delete-profile-button-container">
                <button
                  type="button"
                  className="delete-profile-button"
                  onClick={() => handleDeleteProfileConfirm(userCtx.user.email)}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="delete-profile-cancel-button"
                  onClick={handleCancelDeleteButton}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
          {isDeleted && <ServiceMessage message={message} />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
