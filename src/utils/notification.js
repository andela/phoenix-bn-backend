import Mailer from './email';
import template from './emailTemplate';

/**
 * NotifyUser Class
 */
export default class NotifyUser {
  /**
   * @param {*} email
   * @param {*} link
   * @returns {*} sends an email to a new user
   */
  static signupEmail(email, link) {
    const title = 'Welcome To WeTravel';
    const body = `<p>Hi There,</p>
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
   * @returns {*} sends an email to a new user
   */
  static confirmUserVerified(email, link) {
    const title = 'Congratulations You Are Verified...';
    const body = `<p>Hi There,</p>
    <p class="message">Your account Verification was successful</p>
    <p class="message">Click on the button below to complete your Registeration</p>
        <a class="btn" href="${link}">Lets Go!</a>`;
    const message = template(title, body);
    Mailer.sendMail(email, title, message);
  }

  /**
   * @param {*} email
   * @param {*} link
   * @param {*} name
   * @returns {*} sends an email to a new user
   */
  static sendReverify(email, link) {
    const title = 'Reverification Link';
    const body = `<p>Hi There,</p>
    <p class="message">Click the link below to Verify your account registration <br /> <br />
    <i>Verification Link Expires in <strong>2hrs</strong></i></p>
        <a class="btn" href="${link}">Verify Account</a>`;
    const message = template(title, body);
    Mailer.sendMail(email, title, message);
  }
}
