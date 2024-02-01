import emailjs from 'emailjs-com';
import PropTypes from 'prop-types';

function AutoEmail({ firstName, lastName, email }) {
  const generateActivationCode = () => Math.random().toString(36).substring(7);
  const sendActivationEmail = () => {
    const activationCode = generateActivationCode();
    const activationLink = `http://localhost:5173/users/activate/${email}/${activationCode}`;

    // Use EmailJS to send the activation email
    emailjs
      .send(
        'service_pd14pij',
        'template_autoemail',
        {
          to_name: `${firstName} ${lastName}`,
          user_email: email,
          message: `
          Thank you for registering on our website! Please activate your account with this <a href="${activationLink}">activation link</a>!
      `,
        },
        'EbL3nVlFcKPfXly4p',
      )
      .then()
      .catch(() => {
        throw new Error('Network response was not OK!');
      });
  };
  sendActivationEmail();
  return null;
}
AutoEmail.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default AutoEmail;
