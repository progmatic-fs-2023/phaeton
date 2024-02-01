import nodemailer from 'nodemailer';
import 'dotenv/config';

class AuthService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendPasswordResetEmail(userEmail, userID) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://localhost:5173/reset-password/${userID}`,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, error => {
        if (error) {
          // console.error(error);
          reject(new Error('Failed to send password reset email.'));
        } else {
          // console.log('Email sent: ' + info.response);
          resolve('Password reset email sent.');
        }
      });
    });
  }
}

export default AuthService;
