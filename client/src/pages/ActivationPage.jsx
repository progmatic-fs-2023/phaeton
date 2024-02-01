import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ActivationPage() {
  const navigate = useNavigate();
  const { email, code } = useParams();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/activate/${email}/${code}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to activate account');
        } else {
          await response.json();

          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } catch (error) {
        throw new Error('Error activating account:', error);
      }
    };

    activateAccount();
  }, []);

  return (
    <div>
      <h1>Your account is active... Redirecting to HomePage!</h1>
    </div>
  );
}

export default ActivationPage;
