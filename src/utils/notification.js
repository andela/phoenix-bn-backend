import Mailer from './email';
import template from './emailTemplate';

/**
 * NotifyUser Class
 */
export default class NotifyUser {
  /**
   * @param {*} email
   * @param {*} link
   * @param {*} name
   * @returns {*} sends an email to a new user
   */
  static signupEmail(email, link, name) {
    const title = 'Welcome To WeTravel';
    const body = `<p>Awesome! ${name},</p>
    <p class="message">We are thrilled to have you.</p>
    <p class="message">Click the link below to Verify your account registration <br /> <br />
    <i>Verification Link Expires in <strong>2hrs</strong></i></p>
        <a class="btn" href="${link}">Verify Account</a>`;
    const message = template(title, body);
    Mailer.sendMail(email, title, message);
  }

  /**
   * @param {*} email
   * @param {*} link
   * @param {*} name
   * @returns {*} sends an email to a new user
   */
  static confirmUserVerified(email, link, name) {
    const title = 'Congratulations You Are Verified...';
    const body = `<p>Awesome! ${name},</p>
    <p class="message">Your account Verification was successful</p>
    <p class="message">Click on the button below to Explore WeTravel</p>
        <a class="btn" href="${link}">Lets Go!</a>`;
    const message = template(title, body);
    Mailer.sendMail(email, title, message);
  }

  /**
   * @param {*} email
   * @param {*} link
   * @returns {*} sends an email for user to reset password
   */
  static resetPassword(email, link) {
    const title = 'Reset Password - WeTravel';
    const body = `<h3>Password Reset</h3>
    <div>
      <p class="message">You requested a password reset</p>
      <p class="message">Click on the button below to update your  WeTravel password</p>
      <p class="message"> This link expires in 20 minutes </p>
    </div>
    <a class="btn" href="${link}">Reset Password</a>

    <div>
      <p class="message">If the button does not work use the following link to reset your password ${link}</p>
    </div>
    <p class="message">If you do not request for a password change, kindly ignore</p>
    `;
    const message = template(title, body);
    Mailer.sendMail(email, title, message);
  }
}
