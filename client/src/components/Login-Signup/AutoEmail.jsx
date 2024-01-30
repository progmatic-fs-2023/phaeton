import emailjs from 'emailjs-com';
import PropTypes from 'prop-types';

function AutoEmail({ firstName, lastName, email }) {
  const generateActivationCode = () =>
    // Generate a random activation code here (you can use any method you prefer)
    Math.random().toString(36).substring(7);
  const sendActivationEmail = () => {
    const activationCode = generateActivationCode();

    // Use EmailJS to send the activation email
    emailjs
      .send(
        'service_yde3o5f',
        'template_egto16r',
        {
          to_name: `${firstName} ${lastName}`,
          user_email: email,
          message: `
        Thank you for registering on our website! Please activate your account with this <a href="#">Link</a>!
      `,
          activation_code: activationCode,
        },
        'O4GAt_vMnBOO_lMwn',
      )
      .then()
      .catch(() => {
        throw new Error('Network response was not OK!');
      });
  };
  sendActivationEmail();
  return null; // This component doesn't render anything visible
}
AutoEmail.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
export default AutoEmail;
