import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:3000/users/userbyid/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    const { email } = user;
    e.preventDefault();
    try {
      if (password === passwordConfirm) {
        const check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/g;
        if (!password.match(check)) {
          setErrorMsg(
            'A password should be 8 characters long and include uppercase and lowercase letters as well as numbers ',
          );
          setIsVisible(true);
        } else {
          const response = await fetch(`http://localhost:3000/users/reset-password`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, email }),
          });

          if (response.ok) {
            await response.json();
            setErrorMsg('Password changed successfully. Redirecting to Home.');
            setIsVisible(true);
            setTimeout(() => {
              navigate('/');
            }, 1000);
          } else {
            setErrorMsg('Failed to send password reset email please try again later');
            setIsVisible(true);
          }
        }
      } else {
        setErrorMsg('Passwords do not match');
        setIsVisible(true);
      }
    } catch (error) {
      throw new Error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h1>Reset your password.</h1>
      <form onSubmit={handleSubmit}>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {isVisible && <p>{errorMsg}</p>}
    </div>
  );
}

export default ResetPassword;
